import React, { useEffect, useState } from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { activeDutyUpload, RESET_MEMBER } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';
import setBodyColor from '../../setBodyColor';

const ActiveDutyPdf = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { parentId, activeId } = useParams();
    const [isUploading, setIsUploading] = useState('');
    const { isLoading, message } = useSelector((state) => state.rids);

    // State to manage modal visibility
    const [isOpen, setIsOpen] = useState(true);

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${parentId}`);
    };

    // const parentId = user._id;
    const uploadHandler = async (images, parentId, activeId) => {
        const formData = new FormData();
        Array.from(images).forEach((image) => {
        formData.append('images', image);
        });
        try {
        await dispatch(activeDutyUpload({ parentId, activeId, formData })); 
        setIsOpen(false); // Close modal on submit
        } catch (err) {
        toast.error('Invalid file, not uploaded!');
        }
    };

    useEffect(() => {
        if (message === 'ADT uploaded successfully.') {
        navigate(`/updateRids/${parentId}`);
        }
        dispatch(RESET_MEMBER());
    }, [message, navigate, dispatch]);

    setBodyColor({ color: '#343a40' });

  return (
    <>
    {isLoading && <Loader />}
    <div className="educ-container">
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
            <h2>Upload Docs in PDF</h2>
            <form>
              <div className="form-group">
                <input
                type="file"
                multiple
                onChange={(e) => {
                setIsUploading('upload files in progress ...');
                uploadHandler(e.target.files, parentId, activeId)
                    .then((data) => {
                        setIsUploading('upload file completed');
                    })
                    .catch((er) =>
                        setIsUploading(
                            er.response.data.message
                              ? er.response.data.message
                              : er.response.data
                        )
                    );
                }}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default ActiveDutyPdf