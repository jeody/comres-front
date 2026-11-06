import React, { useEffect, useState } from 'react';
import './AddEduc.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editActivity, getMember, selectMember } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';
import DatePicker from 'react-datepicker';
import dateFormat from 'dateformat';

const EditActivity = () => {
    const { parentId, activityId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.rids);
    const member = useSelector(selectMember);

    // State to manage modal visibility
    const [isOpen, setIsOpen] = useState(true);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    useEffect(() => {
        if (!parentId) return;
        dispatch(getMember(parentId));
    }, [dispatch, parentId]);

    // Form inputs state
    const [activity, setActivity] = useState(member);

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${parentId}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setActivity({ ...activity, [name]: value });
    };

    const saveActivity = async (e) => {
        e.preventDefault();

        const formData = {
            parentId: parentId,
            activityId: activityId,
            mil_activity: activity?.mil_activity,
            mil_unit: activity?.mil_unit,
            mil_venue: activity?.mil_venue,
            mil_startdate: dateStart,
            mil_enddate: dateEnd
        };
        await dispatch(editActivity({ parentId, formData }));
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
         
            <h2>Edit Activity</h2>
            <form onSubmit={saveActivity}>
                {member.activities
                .filter(item => item._id === activityId)
                .map(item => (
                    <div className="form-group" key={item._id}>
                        <div>
                        <label style={{ color: "#0000ff" }}>Activity</label>
                        <input
                         type="text"
                         placeholder=""
                         name="mil_activity"
                         defaultValue={item.mil_activity}
                         onChange={handleInputChange}
                        /> 
                        </div>
                        <div>
                        <label style={{ color: "#0000ff" }}>Unit</label>
                        <input
                         type="text"
                         placeholder=""
                         name="mil_unit"
                         defaultValue={item.mil_unit}
                         onChange={handleInputChange}
                        />
                        </div>
                        <div>
                            <label style={{ color: "#0000ff" }}>Venue</label>
                            <input
                            type="text"
                            placeholder=""
                            name="mil_venue"
                            defaultValue={item.mil_venue}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label style={{ color: "#0000ff" }}>Date Start</label>
                            <DatePicker
                              selected={dateStart}
                              value={dateStart || dateFormat(item.mil_startdate, 'dd/mm/yyyy')}
                              onChange={(date) => setDateStart(date)}
                            />
                        </div>
                        <div>
                            <label style={{ color: "#0000ff" }}>Date End</label>
                            <DatePicker
                              selected={dateEnd}
                              value={dateEnd || dateFormat(item.mil_enddate, 'dd/mm/yyyy')}
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

export default EditActivity