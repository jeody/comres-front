import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMember, selectMember, updateMemberDerogatory } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';

const AddDerogatory = () => {
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
    const [derogatory, setDerogatory] = useState(member);

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${id}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDerogatory({ ...derogatory, [name]: value });
    };

    const saveMemberDerogatory = async (e) => {
        e.preventDefault();

        const formData = {
            id: derogatory?._id,
            derogatory: [
                {
                complaint: derogatory?.complaint,
                dateFiled: derogatory?.dateFiled,
                adminUnit: derogatory?.adminUnit,
                caseStatus: derogatory?.caseStatus,
                disposition: derogatory?.disposition,
                remarks: derogatory?.remarks,
                }
            ],
        };
        dispatch(updateMemberDerogatory({ id, formData }));
        setIsOpen(false); // Close modal on submit
        setDerogatory('');     // Reset field
        navigate(`/updateRids/${id}`);
    };

  return (
    <>
    {isLoading && <Loader />}
    <div className="educ-container">
      <h1>Derogatory Report</h1>
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
            
            <h2>Add a Complaint</h2>
            <form onSubmit={saveMemberDerogatory}>
              <div className="form-group">
                <input
                type="text"
                placeholder="Complaint"
                name="complaint"
                value={derogatory?.complaint}
                onChange={handleInputChange}
                />
                <input
                type="text"
                placeholder="Administering Unit"
                name="adminUnit"
                value={derogatory?.adminUnit}
                onChange={handleInputChange}
                />
                <input
                type="text"
                placeholder="Case Status"
                name="caseStatus"
                value={derogatory?.caseStatus}
                onChange={handleInputChange}
                />
                <input
                type="text"
                placeholder="Disposition"
                name="disposition"
                value={derogatory?.disposition}
                onChange={handleInputChange}
                />
                <input
                type="text"
                placeholder="Remarks"
                name="remarks"
                value={derogatory?.remarks}
                onChange={handleInputChange}
                />
                <input
                type="text"
                placeholder="Date of Complaint"
                name="dateFiled"
                value={derogatory?.dateFiled}
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

export default AddDerogatory