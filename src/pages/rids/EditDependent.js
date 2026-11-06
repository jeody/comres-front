import React, { useEffect, useState } from 'react';
import './AddEduc.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editDependent, getMember, selectMember } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';
import DatePicker from 'react-datepicker';
import dateFormat from 'dateformat';

const EditDependent = () => {
    const { parentId, dependentId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.rids);
    const member = useSelector(selectMember);

    // State to manage modal visibility
    const [isOpen, setIsOpen] = useState(true);
    const [depBirthdate, setDepBirthdate] = useState('');

    useEffect(() => {
        dispatch(getMember(parentId));
    }, [dispatch, parentId]);

    // Form inputs state
    const [dependent, setDependent] = useState(member);

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${parentId}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDependent({ ...dependent, [name]: value });
    };

    const saveDependent = async (e) => {
        e.preventDefault();

        const formData = {
            parentId: parentId,
            dep_id: dependentId,
            dep_name: dependent?.dep_name,
            dep_relation: dependent?.dep_relation,
            dep_birthdate: depBirthdate
        };
        await dispatch(editDependent({ parentId, formData }));
        setIsOpen(false); // Close modal on submit
        navigate(`/updateRids/${parentId}`);
        // console.log('formdata:',formData)
    };

  return (
    <>
    {isLoading && <Loader />}
    <div className="educ-container">

      {/* Conditional rendering for the pop-up */}
      {isOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleModal}>
              &times;
            </button>
         
            <h2>Edit Dependent Details</h2>
            <form onSubmit={saveDependent}>
                {member.dependents
                .filter(item => item._id === dependentId)
                .map(item => (
                    <div className="form-group" key={item._id}>
                        <div>
                        <label style={{ color: "#0000ff" }}>Name</label>
                        <input
                         type="text"
                         placeholder=""
                         name="dep_name"
                         defaultValue={item.dep_name}
                         onChange={handleInputChange}
                        /> 
                        </div>
                        <div>
                        <label style={{ color: "#0000ff" }}>Relation</label>
                        <input
                         type="text"
                         placeholder=""
                         name="dep_relation"
                         defaultValue={item.dep_relation}
                         onChange={handleInputChange}
                        />
                        </div>
                        <div>
                            <label style={{ color: "#0000ff" }}>Date of Birth</label>
                            <DatePicker
                              selected={depBirthdate}
                              value={depBirthdate || dateFormat(item.dep_birthdate, 'dd/mm/yyyy')}
                              onChange={(date) => setDepBirthdate(date)}
                            />
                        </div>
                    </div>
                ))}             
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

export default EditDependent