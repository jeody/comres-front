import React, { useEffect } from 'react';
import './Rids.scss';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { confirmAlert } from 'react-confirm-alert';
import { RiAttachmentFill, RiEditBoxFill, RiEditBoxLine } from 'react-icons/ri';
import { ImAttachment } from 'react-icons/im';
import { FaFile, FaLock, FaRegFile, FaRegThumbsDown, FaRegThumbsUp, FaTrashAlt } from 'react-icons/fa';
import { getMember, RESET_MEMBER } from '../../redux/features/rids/ridsSlice';
import dateFormat from 'dateformat';

const Derogatory = ({ id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, message } = useSelector((state) => state.rids);
    const { member } = useSelector((state) => state.rids);

    //derogatoryFileUpload
    const derogatoryFileUpload = (parentId, derogatoryId) => {
        navigate(`/derogatoryPdf/${parentId}/derogatoryId/${derogatoryId}`);
    };

    //derogatoryApproveS1
    const derogatoryApproveS1 = (parentId, derogatoryId) => {
        // dispatch(approveDerogatoryS1({ parentId, derogatoryId }));
    };

    useEffect(() => {
        if (message === 'Derogatory complaint approved by S1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //derogatoryDisApproveS1
    const derogatoryDisApproveS1 = (parentId, derogatoryId) => {
        // dispatch(disApproveDerogatoryS1({ parentId, derogatoryId }));
    };

    useEffect(() => {
        if (message === 'Derogatory complaint disapproved by S1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //derogatoryApproveG1
    const derogatoryApproveG1 = (parentId, derogatoryId) => {
        // dispatch(approveDerogatoryG1({ parentId, derogatoryId }));
    };

    useEffect(() => {
        if (message === 'Derogatory complaint approved by G1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //derogatoryDisApproveG1
    const derogatoryDisApproveG1 = (parentId, derogatoryId) => {
        // dispatch(disApproveDerogatoryG1({ parentId, derogatoryId }));
    };

    useEffect(() => {
        if (message === 'Derogatory complaint disapproved by G1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //derogatoryDelete
     const derogatoryDelete = (parentId, derogatoryId) => {
        confirmAlert({
        title: 'Delete This Record',
        message: "Are you sure to do delete this user's record?",
        buttons: [
            {
            label: 'Delete',
            onClick: () => removeDerogatory(parentId, derogatoryId)
            },
            {
            label: 'Cancel'
            //onClick: () => alert('Click No')
            }
        ]
        });
    };

    const removeDerogatory = async (parentId, derogatoryId) => {
        // dispatch(deleteDerogatory({ parentId, derogatoryId }));
    };

    //derogatory
    const derogatoryArray = member?.derogatory;
    if (!derogatoryArray) return; // 👈 Prevent the API call if the ID is missing
    const sortedDerogatory = [...derogatoryArray].sort((a, b) => new Date(b.dateFiled) - new Date(a.dateFiled));

  return (
    <>
      {isLoading && <Loader />}
      <div className="rids-table">
        <table className="table-one">
          <thead>
            <tr>
              <td className="td-one" style={{ border: '0', width: '100%' }}>
                
                {member?.user_id && member?.isDerogatory === false ? (
                  <>
                    <b>DEROGATORY:</b>&nbsp;
                    {/* <button onClick={(e) => checkActivity(e, id, member?.user_id)}>
                      &nbsp; &#10003; &nbsp;
                    </button> */}
                  </>
                ) : (
                  <b>DEROGATORY:</b>
                )}
                &nbsp;
                <NavLink to={`/addDerogatory/${id}`}>
                  [<i style={{ color: '#0000ff' }}>add complaint</i>]
                </NavLink>
              </td>
            </tr>
          </thead>
        </table>
      </div>
      <div className="rids-table">
        <table className="table-three">
          <thead>
            <tr>
              <th className="th-three" style={{ width: '12%' }}>
                <i>Report/Complaint</i>
              </th>
              <th className="th-three" style={{ width: '12%' }}>
                <i>Date Filed</i>
              </th>
              <th className="th-three" style={{ width: '18%' }}>
                <i>Administering Unit</i>
              </th>
              <th className="th-three" style={{ width: '12%' }}>
                Case Status
              </th>
              <th className="th-three" style={{ width: '12%' }}>
                Disposition
              </th>
              <th className="th-three" style={{ width: '12%' }}>
                Remarks
              </th>
              <th className="th-three" style={{ width: '2%' }}>
                &nbsp;
              </th>
              <th className="th-three" style={{ width: '2%' }}>
                &nbsp;
              </th>
              <th className="th-three" style={{ width: '2%' }}>
                &nbsp;
              </th>
              <th className="th-three" style={{ width: '2%' }}>
                <i>s1</i>
              </th>
              <th className="th-three" style={{ width: '2%' }}>
                <i>g1</i>
              </th>
              <th className="th-three" style={{ width: '2%' }}>
                &nbsp;
              </th>
            </tr>
          </thead>
          {sortedDerogatory.length > 0 &&
            sortedDerogatory.map((derog) => (
              <tbody>
                <tr key={derog._id}>
                  <td className="td-three">{derog?.complaint}</td>
                  <td className="td-three">
                    <center>
                      {derog?.dateFiled ? derog?.dateFiled : null}
                    </center>
                  </td>
                  <td className="td-three">{derog?.adminUnit}</td>
                  <td className="td-three">{derog?.caseStatus}</td>
                  <td className="td-three">{derog?.disposition}</td>
                  <td className="td-three">{derog?.remarks}</td>
                  <td className="td-three">
                    <span>
                      {derog?.isGood && derog?.isViewed ? (
                        <RiEditBoxFill size={20} />
                      ) : (
                        <NavLink
                          to={`/editDerogatory/${member?._id}/derogatoryId/${derog?._id}`}
                        >
                          <RiEditBoxLine size={20} />
                        </NavLink>
                      )}
                    </span>
                  </td>
                  <td className="td-three">
                    <span>
                      <center>
                        {derog?.isGood && derog?.isViewed ? (
                          <RiAttachmentFill size={20} />
                        ) : (
                          <ImAttachment
                            size={15}
                            onClick={() =>
                              derogatoryFileUpload(member?._id, derog?._id)
                            }
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                            }}
                          />
                        )}
                      </center>
                    </span>
                  </td>
                  <td className="td-three">
                    <span>
                      <center>
                        {derog?.isUploaded ? (
                          <NavLink
                            to={`/viewDerogatoryPdf/${member?._id}/derogatoryId/${derog?._id}`}
                          >
                            <FaFile size={15} />
                          </NavLink>
                        ) : (
                          <FaRegFile size={15} />
                        )}
                      </center>
                    </span>
                  </td>
                  <td className="td-three">
                    <>
                      <span>
                        <center>
                          {!derog?.isGood ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                derogatoryApproveS1(member?._id, derog?._id)
                              }
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            />
                          ) : (
                            <FaRegThumbsUp
                              size={15}
                              onClick={() =>
                                derogatoryDisApproveS1(member?._id, derog?._id)
                              }
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            />
                          )}
                        </center>
                      </span>
                    </>
                  </td>
                  <td className="td-three">
                    <>
                      <span>
                        <center>
                          {!derog?.isViewed ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                derogatoryApproveG1(member?._id, derog?._id)
                              }
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            />
                          ) : (
                            <FaRegThumbsUp
                              size={15}
                              onClick={() =>
                                derogatoryDisApproveG1(member?._id, derog?._id)
                              }
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            />
                          )}
                        </center>
                      </span>
                    </>
                  </td>
                  <td className="td-three">
                    <span>
                      <center>
                        {derog?.isGood && derog?.isViewed ? (
                          <FaLock size={15} />
                        ) : (
                          <FaTrashAlt
                            size={15}
                            color="red"
                            onClick={() =>
                              derogatoryDelete(member?._id, derog?._id)
                            }
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                            }}
                          />
                        )}
                      </center>
                    </span>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </>
  )
}

export default Derogatory