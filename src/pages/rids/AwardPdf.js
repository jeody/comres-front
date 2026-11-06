import React, { useEffect, useState } from 'react';
import './AddEduc.scss';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { awardUpload, RESET_MEMBER } from '../../redux/features/rids/ridsSlice';
import setBodyColor from '../../setBodyColor';
import Loader from '../../components/loader/Loader';

const AwardPdf = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { parentId, awardId } = useParams();
    const [isUploading, setIsUploading] = useState('');
    const { isLoading, message } = useSelector((state) => state.rids);

    // State to manage modal visibility
      const [isOpen, setIsOpen] = useState(true);

    // const parentId = user._id;
    const uploadHandler = async (images, parentId, awardId) => {
        const formData = new FormData();
        Array.from(images).forEach((image) => {
        formData.append('images', image);
        });
        try {
        dispatch(awardUpload({ parentId, awardId, formData })); 
        setIsOpen(false); // Close modal on submit
        } catch (err) {
        toast.error('Invalid file, not uploaded!');
        }
    };

    useEffect(() => {
        if (message === 'Award uploaded successfully.') {
        navigate(`/updateRids/${parentId}`);
        }
        dispatch(RESET_MEMBER());
    }, [message, navigate, dispatch]);

    setBodyColor({ color: '#343a40' });

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${parentId}`);
    };

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
                uploadHandler(e.target.files, parentId, awardId)
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

export default AwardPdf