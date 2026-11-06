import React, { useEffect, useState } from 'react';
import './AddEduc.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMember, selectMember, updateMemberDesignation } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';

const AddDesignation = () => {
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
    const [userDesignation, setUserDesignation] = useState(member);

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${id}`);
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDesignation({ ...userDesignation, [name]: value });
  };

  const saveMemberDesignation = async (e) => {
    e.preventDefault();

    const formData = {
        id: userDesignation?._id,
        userDesignation: [
            {
            so_Number: userDesignation?.so_Number,
            unitDesignation: userDesignation?.unitDesignation,
            date_start: userDesignation?.date_start,
            date_end: userDesignation?.date_end,
            }
        ],
    };
    await dispatch(updateMemberDesignation({ id, formData }));
    setIsOpen(false); // Close modal on submit
    setUserDesignation('');     // Reset field
    navigate(`/updateRids/${id}`);
  };

  return (
    <>
    {isLoading && <Loader />}
    <div className="educ-container">
      <h1>Military Designation</h1>
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
            
            <h2>Add Military Designation</h2>
            <form onSubmit={saveMemberDesignation}>
              <div className="form-group">
                <label style={{ color: "#0000ff" }}>Authority</label>
                <input
                type="text"
                placeholder=""
                name="so_Number"
                value={userDesignation?.so_Number}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>Unit Designation</label>
                <input
                type="text"
                placeholder=""
                name="unitDesignation"
                value={userDesignation?.unitDesignation}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>Date Start</label>
                <input
                type="date"
                placeholder=""
                name="date_start"
                value={userDesignation?.date_start}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>Date End</label>
                <input
                type="date"
                placeholder=""
                name="date_end"
                value={userDesignation?.date_end}
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

export default AddDesignation