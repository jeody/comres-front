import React, { useEffect, useState } from 'react';
import './AddEduc.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editAward, getMember, selectMember } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';
import DatePicker from 'react-datepicker';
import dateFormat from 'dateformat';

const EditAward = () => {
    const { parentId, awardId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading } = useSelector((state) => state.rids);
    const member = useSelector(selectMember);

    // State to manage modal visibility
    const [isOpen, setIsOpen] = useState(true);
    const [dateAwarded, setDateAwarded] = useState('');

    useEffect(() => {
        dispatch(getMember(parentId));
    }, [dispatch, parentId]);

    // Form inputs state
    const [award, setAward] = useState(member);

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${parentId}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAward({ ...award, [name]: value });
    };

    const saveAward = async (e) => {
        e.preventDefault();

        const formData = {
            parentId: parentId,
            awardId: awardId,
            award_type: award?.award_type,
            authority_from: award?.authority_from,
            date_awarded: dateAwarded
        };
        dispatch(editAward({ parentId, formData }));
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
         
            <h2>Edit Award</h2>
            <form onSubmit={saveAward}>
                {member.awards
                .filter(item => item._id === awardId)
                .map(item => (
                    <div className="form-group" key={item._id}>
                        <div>
                        <label style={{ color: "#0000ff" }}>Type of Award</label>
                        <input
                         type="text"
                         placeholder=""
                         name="award_type"
                         defaultValue={item.award_type}
                         onChange={handleInputChange}
                        /> 
                        </div>
                        <div>
                        <label style={{ color: "#0000ff" }}>Authority</label>
                        <input
                         type="text"
                         placeholder=""
                         name="authority_from"
                         defaultValue={item.authority_from}
                         onChange={handleInputChange}
                        />
                        </div>
                        <div>
                            <label style={{ color: "#0000ff" }}>Date Awarded</label>
                            <DatePicker
                              selected={dateAwarded}
                              value={dateAwarded || dateFormat(item.date_awarded, 'dd/mm/yyyy')}
                              onChange={(date) => setDateAwarded(date)}
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

export default EditAward