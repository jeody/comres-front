import React, { useEffect, useState } from 'react';
import './AddEduc.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMember, selectMember, updateMemberAward } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';

const AddAward = () => {
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
    const [award, setAward] = useState(member);

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${id}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAward({ ...award, [name]: value });
    };

    const saveMemberAward = async (e) => {
        e.preventDefault();

        const formData = {
            id: award?._id,
            awards: [
                {
                award_type: award?.award_type,
                authority_from: award?.authority_from,
                date_awarded: award?.date_awarded,
                }
            ],
        };
        dispatch(updateMemberAward({ id, formData }));
        setIsOpen(false); // Close modal on submit
        setAward('');     // Reset field
        navigate(`/updateRids/${id}`);
    };

  return (
    <>
    {isLoading && <Loader />}
    <div className="educ-container">
      <h1>Civilian/Military Award</h1>
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
            
            <h2>Add Civilian/Military Award</h2>
            <form onSubmit={saveMemberAward}>
              <div className="form-group">
                <label style={{ color: "#0000ff" }}>Type of Awards</label>
                <input
                type="text"
                placeholder=""
                name="award_type"
                value={award?.award_type}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>Authority</label>
                <input
                type="text"
                placeholder=""
                name="authority_from"
                value={award?.authority_from}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>Date of Award</label>
                <input
                type="date"
                placeholder=""
                name="date_awarded"
                value={award?.date_awarded}
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

export default AddAward