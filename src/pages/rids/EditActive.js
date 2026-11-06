import React, { useEffect, useState } from 'react';
import './AddEduc.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editActiveDuty, getMember, selectMember } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from 'dateformat';

const EditActive = () => {
    const { parentId, activeId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.rids);
    const member = useSelector(selectMember);

  // State to manage modal visibility
  const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        dispatch(getMember(parentId));
    }, [dispatch, parentId]);

  // Form inputs state
    const [activeDuty, setActiveDuty] = useState(member);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${parentId}`);
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActiveDuty({ ...activeDuty, [name]: value });
  };

  const saveActiveDutyTraining = async (e) => {
    e.preventDefault();

    const formData = {
        parentId: parentId,
        activeId: activeId,
        soNumber: activeDuty?.soNumber,
        adtUnitAssignment: activeDuty?.adtUnitAssignment,
        dateStart: dateStart,
        dateEnd: dateEnd,
    };
    dispatch(editActiveDuty({ parentId, formData }));
    setIsOpen(false); // Close modal on submit
    navigate(`/updateRids/${parentId}`);
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
         
            <h2>Edit Active Duty</h2>
            <form onSubmit={saveActiveDutyTraining}>
                {member.activeDuty
                .filter(item => item._id === activeId)
                .map(item => (
                    <div className="form-group" key={item._id}>
                        <div>
                        <label style={{ color: "#0000ff" }}>SO Number</label>
                        <input
                         type="text"
                         placeholder=""
                         name="soNumber"
                         defaultValue={item.soNumber}
                         onChange={handleInputChange}
                        /> 
                        </div>
                        <div>
                        <label style={{ color: "#0000ff" }}>Unit Assignment</label>
                        <input
                         type="text"
                         placeholder=""
                         name="adtUnitAssignment"
                         defaultValue={item.adtUnitAssignment}
                         onChange={handleInputChange}
                        />
                        </div>
                        <div>
                            <label style={{ color: "#0000ff" }}>Start Date</label>
                            <DatePicker
                              selected={dateStart}
                              defaultValue={dateStart || dateFormat(item.dateStart, 'dd/mm/yyyy')}
                              onChange={(date) => setDateStart(date)}
                            />
                        </div>
                        <div>
                        <label style={{ color: "#0000ff" }}>Date End</label>
                            <DatePicker
                              selected={dateEnd}
                              defaultValue={dateEnd || dateFormat(item.dateEnd, 'dd/mm/yyyy')}
                              onChange={(date) => setDateEnd(date)}
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

export default EditActive