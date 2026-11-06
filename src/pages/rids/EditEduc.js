import React, { useEffect, useState } from 'react'
import './AddEduc.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editEduc, getMember, selectMember } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';

const EditEduc = () => {
    const { parentId, educId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, message } = useSelector((state) => state.rids);
    const member = useSelector(selectMember);
    // console.log(member);

  // State to manage modal visibility
  const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        dispatch(getMember(parentId));
    }, [dispatch, parentId]);

  // Form inputs state
    const [educ, setEduc] = useState(member);

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${parentId}`);
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEduc({ ...educ, [name]: value });
  };

  const saveEducCourse = async (e) => {
    e.preventDefault();

    const formData = {
        parentId: parentId,
        educId: educId,
        course: educ?.course,
        school: educ?.school,
        location: educ?.location,
        date_started: educ?.date_started,
        date_completed: educ?.date_completed,
    };
    await dispatch(editEduc({ parentId, formData }));
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
         
            <h2>Edit Course</h2>
            <form onSubmit={saveEducCourse}>
                {member.education
                .filter(item => item._id === educId)
                .map(item => (
                    <div className="form-group" key={item._id}>
                        <div>
                        <label style={{ color: "#0000ff" }}>Course</label>
                        <input
                         type="text"
                         placeholder=""
                         name="course"
                         defaultValue={item.course}
                         onChange={handleInputChange}
                        /> 
                        </div>
                        <div>
                        <label style={{ color: "#0000ff" }}>School</label>
                        <input
                         type="text"
                         placeholder=""
                         name="school"
                         defaultValue={item.school}
                         onChange={handleInputChange}
                        />
                        </div>
                        <div>
                        <label style={{ color: "#0000ff" }}>Location</label>
                        <input
                         type="text"
                         placeholder=""
                         name="location"
                         defaultValue={item.location}
                         onChange={handleInputChange}
                        />
                        </div>
                        <div>
                        <label style={{ color: "#0000ff" }}>Date Started</label>
                        <input
                         type="text"
                         placeholder=""
                         name="date_started"
                         defaultValue={item.date_started}
                         onChange={handleInputChange}
                        />
                        </div>
                        <div>
                        <label style={{ color: "#0000ff" }}>Date Completed</label>
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
  )
}

export default EditEduc