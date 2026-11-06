import React, { useState } from 'react';
import './AddEduc.scss';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMember } from '../../redux/features/rids/ridsSlice';
import setBodyColor from '../../setBodyColor';
import Loader from '../../components/loader/Loader';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ViewTrainingPdf = () => {
  useRedirectLoggedOutUser('/login');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { parentId, trainId } = useParams();
  const { isLoading, member } = useSelector((state) => state.rids);

    useEffect(() => {
        if (!parentId) return; // 👈 Prevent the API call if the ID is missing
        dispatch(getMember(parentId));
    }, [dispatch, parentId]);

  // State to manage modal visibility
  const [isOpen, setIsOpen] = useState(true);

  const toggleModal = () => {
    // setIsOpen(!isOpen);
    setIsOpen(false);
    navigate(`/updateRids/${parentId}`);
  };

  setBodyColor({ color: '#343a40' });

  return (
    <>
      <section>
      {isLoading && <Loader />}
      {isOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-pdfbox" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleModal} >
              &times;
            </button>
              <div className="pdf-container">
                {member.training
                .filter(item => item._id === trainId)
                .map(item => (
                    <div key={item._id}>
                      <iframe
                        src={`${BACKEND_URL}/${item.coursePdf}`}
                        width="750px"
                        height="600px"
                        title="PDF Viewer"
                      />
                    </div>
                  ))}
              </div>
              {/*<PDFViewer />*/}
          </div>
        </div>
      )}
      </section>
    </>
  )
}

export default ViewTrainingPdf