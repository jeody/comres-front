import React, { useEffect, useState } from 'react';
import './AddEduc.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editDesignation, getMember, selectMember } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';
import DatePicker from 'react-datepicker';
import dateFormat from 'dateformat';

const EditDesignation = () => {
    const { parentId, desigId } = useParams();
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
    const [userDesignation, setUserDesignation] = useState(member);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${parentId}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDesignation({ ...userDesignation, [name]: value });
    };

    const saveDesignation = async (e) => {
        e.preventDefault();

        const formData = {
            parentId: parentId,
            desigId: desigId,
            so_Number: userDesignation?.so_Number,
            unitDesignation: userDesignation?.unitDesignation,
            date_start: dateStart,
            date_end: dateEnd,
        };
        dispatch(editDesignation({ parentId, formData }));
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
         
            <h2>Edit Unit Designation</h2>
            <form onSubmit={saveDesignation}>
                {member.userDesignation
                .filter(item => item._id === desigId)
                .map(item => (
                    <div className="form-group" key={item._id}>
                        <div>
                        <label style={{ color: "#0000ff" }}>Authority</label>
                        <input
                         type="text"
                         placeholder=""
                         name="so_Number"
                         defaultValue={item.so_Number}
                         onChange={handleInputChange}
                        /> 
                        </div>
                        <div>
                        <label style={{ color: "#0000ff" }}>Unit Designation</label>
                        <input
                         type="text"
                         placeholder=""
                         name="unitDesignation"
                         defaultValue={item.unitDesignation}
                         onChange={handleInputChange}
                        />
                        </div>
                        <div>
                            <label style={{ color: "#0000ff" }}>Start Date</label>
                            <DatePicker
                              selected={dateStart}
                              value={dateStart || dateFormat(item.date_start, 'dd/mm/yyyy')}
                              onChange={(date) => setDateStart(date)}
                            />
                        </div>
                        <div>
                        <label style={{ color: "#0000ff" }}>End Date</label>
                            <DatePicker
                              selected={dateEnd}
                              value={dateEnd || dateFormat(item.date_end, 'dd/mm/yyyy')}
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

export default EditDesignation