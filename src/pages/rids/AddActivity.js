import React, { useEffect, useState } from 'react';
import './AddEduc.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMember, selectMember, updateMemberActivity } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';

const AddActivity = () => {
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
    const [activity, setActivity] = useState(member);

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${id}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setActivity({ ...activity, [name]: value });
    };

    const saveMemberActivity = async (e) => {
        e.preventDefault();

        const formData = {
            id: activity?._id,
            activities: [
                {
                mil_activity: activity?.mil_activity,
                mil_unit: activity?.mil_unit,
                mil_venue: activity?.mil_venue,
                mil_startdate: activity?.mil_startdate,
                mil_enddate: activity?.mil_enddate
                }
            ],
        };
        dispatch(updateMemberActivity({ id, formData }));
        setIsOpen(false); // Close modal on submit
        setActivity('');     // Reset field
        navigate(`/updateRids/${id}`);
    };

  return (
    <>
    {isLoading && <Loader />}
    <div className="educ-container">
      <h1>Military Activity</h1>
      <button onClick={toggleModal} className="open-btn">
        Close Form
      </button>

      {/* Conditional rendering for the pop-up */}
      {isOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleModal}>
              &times;
            </button>
            
            <h2>Add Military Activity</h2>
            <form onSubmit={saveMemberActivity}>
              <div className="form-group">
                <label style={{ color: "#0000ff" }}>Activity</label>
                <input
                type="text"
                placeholder=""
                name="mil_activity"
                value={activity?.mil_activity}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>Unit</label>
                <input
                type="text"
                placeholder=""
                name="mil_unit"
                value={activity?.mil_unit}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>Venue</label>
                <input
                type="text"
                placeholder=""
                name="mil_venue"
                value={activity?.mil_venue}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>Date Start</label>
                <input
                type="date"
                placeholder=""
                name="mil_startdate"
                value={activity?.mil_startdate}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>Date End</label>
                <input
                type="date"
                placeholder=""
                name="mil_enddate"
                value={activity?.mil_enddate}
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

export default AddActivity