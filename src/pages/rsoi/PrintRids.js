import React, { useEffect, useState } from 'react';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMember } from '../../redux/features/rids/ridsSlice';
import { getUser } from '../../redux/features/auth/authSlice';
import setBodyColor from '../../setBodyColor';
import CreateRidsPdf from './CreateRidsPdf';
import Loader from '../../components/loader/Loader';
import { pdf, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

const PrintRids = () => {
    useRedirectLoggedOutUser('/login');
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, member } = useSelector((state) => state.rids);

      // State to manage modal visibility
      const [isOpen, setIsOpen] = useState(true);

  const toggleModal = () => {
    setIsOpen(false);
    navigate(`/updateRids/${id}`);
  };

    // const id = user?.memberId;
    useEffect(() => {
        if (!id) return; 
        dispatch(getMember(id));
    }, [dispatch, id]);

    const reservist = member;

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  setBodyColor({ color: '#ffffff' });

  const handleDownloadPdf = async () => {
    // If generating dynamically:
    const blob = await pdf(
    
    <CreateRidsPdf reservist={reservist} />
    ).toBlob();
    saveAs(blob, 'generated_document.pdf');
    // If you have a URL or existing file: CreateRidsPdf
    // saveAs('path/to/your/existing_file.pdf', 'downloaded_document.pdf');
  };

  return (
    <>
      {isLoading && <Loader />}
      <section>
        <div className="container">
        {isOpen && (
            <div onClick={toggleModal}>
                <div onClick={(e) => e.stopPropagation()}>
                    <div style={{ width: '80%' }}>
                    <button className="close-btn" onClick={toggleModal} >
                        <b>&times;</b>
                    </button>
                    </div>
                {member?.isAddedMember === false ? (
                    <>
                    {!isLoading && <Loader />}
                    <h2 className="--btn --btn-info">
                        <strong>Your RIDS lacks basic information!</strong>
                    </h2>
                    </>
                ) : (
                    <>
                    <PDFViewer style={{ width: '100%', height: '600px' }}>
                        <CreateRidsPdf reservist={reservist} />
                    </PDFViewer>
                    </>
                )}
                <div>
                    <PDFDownloadLink
                        document={<CreateRidsPdf reservist={reservist} />}
                        filename="RSOI"
                    >
                        {({ loading }) =>
                        loading ? (
                            <p>Loading Document...</p>
                        ) : (
                            <button className="btn" style={{ color: 'white' }}>
                                Download RIDS
                            </button>
                        )
                        }
                    </PDFDownloadLink>
                </div>
                </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default PrintRids