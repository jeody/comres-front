import React, { useEffect, useState } from 'react';
import './AddEduc.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMember, selectMember, updateMemberDependent } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';

const AddDependent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.rids);
    const member = useSelector(selectMember);

    // State to manage modal visibility
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (!id) return; 
        dispatch(getMember(id));
    }, [dispatch, id]);

    // Form inputs state
    const [dependent, setDependent] = useState(member);

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${id}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDependent({ ...dependent, [name]: value });
    };

    const saveMemberDependent = async (e) => {
        e.preventDefault();

        const formData = {
            id: dependent?._id,
            dependents: [
                {
                dep_name: dependent?.dep_name,
                dep_relation: dependent?.dep_relation,
                dep_birthdate: dependent?.dep_birthdate,
                }
            ],
        };
        dispatch(updateMemberDependent({ id, formData }));
        setIsOpen(false); // Close modal on submit
        setDependent('');     // Reset field
        navigate(`/updateRids/${id}`);
    };

  return (
    <>
    {isLoading && <Loader />}
    <div className="educ-container">
      <h1>Dependents</h1>
      <button onClick={toggleModal} className="open-btn">
        Open Form
      </button>

      {/* Conditional rendering for the pop-up */}
      {isOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleModal}>
              &times;
            </button>
            
            <h2>Add Dependent</h2>
            <form onSubmit={saveMemberDependent}>
              <div className="form-group">
                <label style={{ color: "#0000ff" }}>Name</label>
                <input
                type="text"
                placeholder=""
                name="dep_name"
                value={dependent?.dep_name}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>Relation</label>
                <input
                type="text"
                placeholder=""
                name="dep_relation"
                value={dependent?.dep_relation}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>Date of Birth</label>
                <input
                type="date"
                placeholder=""
                name="dep_birthdate"
                value={dependent?.dep_birthdate}
                onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default AddDependent