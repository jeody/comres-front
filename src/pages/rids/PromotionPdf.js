import React, { useEffect, useState } from 'react';
import './AddEduc.scss';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import setBodyColor from '../../setBodyColor';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';
import { promotionUpload, RESET_MEMBER } from '../../redux/features/rids/ridsSlice';

const PromotionPdf = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { parentId, promotionId } = useParams();
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
  const uploadHandler = async (images, parentId, promotionId) => {
    const formData = new FormData();
    Array.from(images).forEach((image) => {
      formData.append('images', image);
    });
    try {
      // await axios.post(
      //   'http://localhost:5000/api/members/permitUpload?parentId=' + parentId,
      //   formData
      // );
      // toast.success('Files uploaded!');
      dispatch(promotionUpload({ parentId, promotionId, formData })); 
      setIsOpen(false); // Close modal on submitc
      } catch (err) {
      toast.error('Invalid file, not uploaded!');
    }
  };

    useEffect(() => {
        if (message === 'Promotion details uploaded successfully.') {
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
                uploadHandler(e.target.files, parentId, promotionId)
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

export default PromotionPdf