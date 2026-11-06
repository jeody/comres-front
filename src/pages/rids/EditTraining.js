import React, { useEffect, useState } from 'react';
import './AddEduc.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editTraining, getMember, selectMember } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';
import DatePicker from 'react-datepicker';
import dateFormat from 'dateformat';

const EditTraining = () => {
    const { parentId, trainId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, message } = useSelector((state) => state.rids);
    const member = useSelector(selectMember);

  // State to manage modal visibility
  const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        dispatch(getMember(parentId));
    }, [dispatch, parentId]);

  // Form inputs state
    const [train, setTrain] = useState(member);

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${parentId}`);
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrain({ ...train, [name]: value });
  };

  const saveTrainingCourse = async (e) => {
    e.preventDefault();

    const formData = {
        parentId: parentId,
        trainId: trainId,
        course: train?.course,
        school: train?.school,
        conducted_by: train?.conducted_by,
        date_started: train?.date_started,
        date_completed: train?.date_completed,
    };
    dispatch(editTraining({ parentId, formData }));
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

              <h2>Edit Training</h2>
              <form onSubmit={saveTrainingCourse}>
                {member.training
                  .filter((item) => item._id === trainId)
                  .map((item) => (
                    <div className="form-group" key={item._id}>
                      <div>
                        <label style={{ color: '#0000ff' }}>Course</label>
                        <input
                          type="text"
                          placeholder=""
                          name="course"
                          value={item.course}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label style={{ color: '#0000ff' }}>School</label>
                        <input
                          type="text"
                          placeholder=""
                          name="school"
                          value={item.school}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label style={{ color: '#0000ff' }}>Conducted By</label>
                        <input
                          type="text"
                          placeholder=""
                          name="conducted_by"
                          value={item.conducted_by}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label style={{ color: '#0000ff' }}>
                          Date Started
                        </label>
                        <input
                         type="text"
                         placeholder=""
                         name="date_started"
                         defaultValue={item.date_started}
                         onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label style={{ color: '#0000ff' }}>
                          Date Completed
                        </label>
                        <input
                         type="text"
                         placeholder=""
                         name="date_completed"
                         defaultValue={item.date_completed}
                         onChange={handleInputChange}
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
  );
}

export default EditTraining