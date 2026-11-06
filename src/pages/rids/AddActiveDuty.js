import React, { useEffect, useState } from 'react';
import './AddEduc.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMember, selectMember, updateActiveDuty } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';

const AddActiveDuty = () => {
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
    const [activeDuty, setActiveDuty] = useState(member);

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${id}`);
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActiveDuty({ ...activeDuty, [name]: value });
  };

  const saveActiveDutyTraining = async (e) => {
    e.preventDefault();

    const formData = {
        id: activeDuty?._id,
        activeDuty: [
            {
            soNumber: activeDuty?.soNumber,
            adtUnitAssignment: activeDuty?.adtUnitAssignment,
            dateStart: activeDuty?.dateStart,
            dateEnd: activeDuty?.dateEnd,
            }
        ],
    };
    dispatch(updateActiveDuty({ id, formData }));
    setIsOpen(false); // Close modal on submit
    setActiveDuty('');     // Reset field
    navigate(`/updateRids/${id}`);
  };

  return (
    <>
    {isLoading && <Loader />}
    <div className="educ-container">
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
            
            <h2>Active Duty Training (ADT)</h2>
            <form onSubmit={saveActiveDutyTraining}>
              <div className="form-group">
                <label style={{ color: "#0000ff" }}>SO Number</label>
                <input
                type="text"
                placeholder=""
                name="soNumber"
                value={activeDuty?.soNumber}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>Unit Assignment</label>
                <input
                type="text"
                placeholder=""
                name="adtUnitAssignment"
                value={activeDuty?.adtUnitAssignment}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>Start Date</label>
                <input
                type="date"
                placeholder=""
                name="dateStart"
                value={activeDuty?.dateStart}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>End Date</label>
                <input
                type="date"
                placeholder=""
                name="dateEnd"
                value={activeDuty?.dateEnd}
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

export default AddActiveDuty