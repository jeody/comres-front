import React, { useEffect } from 'react';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import setBodyColor from '../../setBodyColor';
import { getUser } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';
// import PageMenu from '../../components/pageMenu/PageMenu';
import { pdf, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import CreateRsoiPdf from './CreateRsoiPdf';
import { useParams } from 'react-router-dom';
import { getMember } from '../../redux/features/rids/ridsSlice';

const ViewRsoi = () => {
    useRedirectLoggedOutUser('/login');
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isLoading, member } = useSelector((state) => state.rids);

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
      <CreateRsoiPdf reservist={reservist} />
    ).toBlob();
    saveAs(blob, 'generated_document.pdf');

    // If you have a URL or existing file:
    // saveAs('path/to/your/existing_file.pdf', 'downloaded_document.pdf');
  };

  return (
    <>
      {isLoading && <Loader />}
      <section>
        <div className="container">
          {/* <PageMenu /> */}
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
                <CreateRsoiPdf reservist={reservist} />
              </PDFViewer>
              <PDFDownloadLink
                document={<CreateRsoiPdf reservist={reservist} />}
                filename="RSOI"
              >
                {({ loading }) =>
                  loading ? (
                    <p>Loading Document...</p>
                  ) : (
                    <button className="btn" style={{ color: 'white' }}>
                      Download RSOI
                    </button>
                  )
                }
              </PDFDownloadLink>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default ViewRsoi