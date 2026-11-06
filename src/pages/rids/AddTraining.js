import React, { useEffect, useState } from 'react'
import './AddEduc.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMember, selectMember, updateMemberTraining } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';

const AddTraining = () => {
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
    const [training, setTraining] = useState(member);

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${id}`);
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTraining({ ...training, [name]: value });
  };

  const saveMemberTraining = async (e) => {
    e.preventDefault();

    const formData = {
        id: training?._id,
        training: [
            {
            course: training?.course,
            school: training?.school,
            conducted_by: training?.conducted_by,
            date_completed: training?.date_completed,
            }
        ],
    };
    await dispatch(updateMemberTraining({ id, formData }));
    setIsOpen(false); // Close modal on submit
    setTraining('');     // Reset field
    navigate(`/updateRids/${id}`);
  };

  return (
    <>
    {isLoading && <Loader />}
    <div className="educ-container">
      <h1>Military Schooling/Training</h1>
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
            
            <h2>Add Military Training</h2>
            <form onSubmit={saveMemberTraining}>
              <div className="form-group">
                <label style={{ color: "#0000ff" }}>Course</label>
                <input
                type="text"
                placeholder=""
                name="course"
                value={training?.course}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>School</label>
                <input
                type="text"
                placeholder=""
                name="school"
                value={training?.school}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>Conducted By</label>
                <input
                type="text"
                placeholder=""
                name="conducted_by"
                value={training?.conducted_by}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>Date Completed</label>
                <input
                type="date"
                placeholder=""
                name="date_completed"
                value={training?.date_completed}
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

export default AddTraining