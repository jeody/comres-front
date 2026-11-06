import { useEffect, useState } from 'react';
import './AddEduc.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMember, selectMember, updateMemberEduc } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';

const AddEduc = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, message } = useSelector((state) => state.rids);
    const member = useSelector(selectMember);

  // State to manage modal visibility
  const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (!id) return; 
        dispatch(getMember(id));
    }, [dispatch, id]);

  // Form inputs state
    const [education, setEducation] = useState(member);

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${id}`);
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducation({ ...education, [name]: value });
  };

  const saveMemberEducation = async (e) => {
    e.preventDefault();

    const formData = {
        id: education?._id,
        education: [
            {
            course: education?.course,
            school: education?.school,
            location: education?.location,
            date_started: education?.date_started,
            date_completed: education?.date_completed,
            }
        ],
    };
    await dispatch(updateMemberEduc({ id, formData }));
    setIsOpen(false); // Close modal on submit
    setEducation('');     // Reset field
    navigate(`/updateRids/${id}`);
    // console.log('formdata:',formData)
  };

  return (
    <>
    {isLoading && <Loader />}
    <div className="educ-container">
      <h1>Welcome to My App</h1>
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
            
            <h2>Add Education</h2>
            <form onSubmit={saveMemberEducation}>
              <div className="form-group">
                <input
                type="text"
                placeholder="Course"
                name="course"
                value={education?.course}
                onChange={handleInputChange}
                />
                <input
                type="text"
                placeholder="School"
                name="school"
                value={education?.school}
                onChange={handleInputChange}
                />
                <input
                type="text"
                placeholder="Location"
                name="location"
                defaultValue={education.location}
                onChange={handleInputChange}
                />
                <input
                type="text"
                placeholder="Date Started"
                name="date_started"
                value={education?.date_started}
                onChange={handleInputChange}
                />
                <input
                type="text"
                placeholder="Date Completed"
                name="date_completed"
                value={education?.date_completed}
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

export default AddEduc