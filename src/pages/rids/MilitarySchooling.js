import React, { useEffect } from 'react';
import './Rids.scss';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  approveTrainingG1,
  approveTrainingS1,
  deleteTraining,
  disApproveTrainingG1,
  disApproveTrainingS1,
  getMember,
  RESET_MEMBER,
} from '../../redux/features/rids/ridsSlice';
import { confirmAlert } from 'react-confirm-alert';
import { RiAttachmentFill, RiEditBoxFill, RiEditBoxLine } from 'react-icons/ri';
import { ImAttachment } from 'react-icons/im';
import {
  FaFile,
  FaLock,
  FaRegFile,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaTrashAlt,
} from 'react-icons/fa';
import Loader from '../../components/loader/Loader';
import dateFormat from 'dateformat';

const MilitarySchooling = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, message } = useSelector((state) => state.rids);
  const { member } = useSelector((state) => state.rids);

  const removeTraining = async (parentId, itemId) => {
    dispatch(deleteTraining({ parentId, itemId }));
  };

  useEffect(() => {
    if (message === 'Training updated successfully.') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

  const trainingDelete = (parentId, itemId) => {
    confirmAlert({
      title: 'Delete This Record',
      message: "Are you sure to do delete this user's record?",
      buttons: [
        {
          label: 'Delete',
          onClick: () => removeTraining(parentId, itemId),
        },
        {
          label: 'Cancel',
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const trainFileUpload = (parentId, itemId) => {
    navigate(`/trainPdf/${parentId}/train/${itemId}`);
  };

  useEffect(() => {
    if (message === 'Training course uploaded successfully.') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

  const trainApproveS1 = async (parentId, itemId) => {
    dispatch(approveTrainingS1({ parentId, itemId }));
  };

  useEffect(() => {
    if (message === 'Training approved by S1') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

  const trainDisApproveS1 = async (parentId, itemId) => {
    dispatch(disApproveTrainingS1({ parentId, itemId }));
  };

  useEffect(() => {
    if (message === 'Training disapproved by S1') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

  const trainApproveG1 = async (parentId, itemId) => {
    dispatch(approveTrainingG1({ parentId, itemId }));
  };

  useEffect(() => {
    if (message === 'Training approved by G1') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

  const trainDisApproveG1 = async (parentId, itemId) => {
    dispatch(disApproveTrainingG1({ parentId, itemId }));
  };

  useEffect(() => {
    if (message === 'Training disapproved by g1') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

    const checkTraining = (e, id, user_id) => {
        e.preventDefault();
        navigate(`/getOldTraining/${id}/userId/${user_id}`);
    };

  // Sort raw data before rendering (Newest First)
  const trainingArray = member?.training;
  if (!trainingArray) return; // 👈 Prevent the API call if the ID is missing
  const sortedTraining = [...trainingArray].sort(
    (a, b) => new Date(b.date_completed) - new Date(a.date_completed),
  );

  return (
    <>
      {isLoading && <Loader />}
      <div className="rids-table">
        <table className="table-one">
          <thead>
            <tr>
              <td className="td-one" style={{ border: '0', width: '100%' }}>
                {member?.user_id && member?.isTraining === false ? (
                  <>
                    <b>MILITARY SCHOOLING/TRAINING:</b>&nbsp;
                    <button onClick={(e) => checkTraining(e, id, member?.user_id)}>
                      &nbsp; &#10003; &nbsp;
                    </button>
                  </>
                ) : (
                  <b>MILITARY SCHOOLING/TRAINING:</b>
                )}
              </td>
            </tr>
          </thead>
        </table>
      </div>
      <div className="rids-table">
        <table className="table-three">
          <thead>
            <tr>
              <th className="th-three" style={{ width: '26%' }}>
                <i>COURSE</i>
              </th>
              <th className="th-three" style={{ width: '26%' }}>
                <i>SCHOOL</i>&nbsp;
                <NavLink to={`/addTraining/${id}`}>
                  [<i style={{ color: '#0000ff' }}>add item</i>]
                </NavLink>
              </th>
              <th className="th-three" style={{ width: '18%' }}>
                <i>CONDUCTED BY</i>
              </th>
              <th className="th-three" style={{ width: '16%' }}>
                <i>DATE COMPLETED</i>
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
          {sortedTraining.length > 0 &&
            sortedTraining.map((train) => (
              <tbody>
                <tr key={train._id}>
                  <td className="td-three">{train?.course}</td>
                  <td className="td-three">{train?.school}</td>
                  <td className="td-three">{train?.conducted_by}</td>
                  <td className="td-three">
                    <center>
                      {train?.date_completed ? dateFormat(train?.date_completed, 'dd-mmm-yyyy') : ''}
                    </center>
                  </td>
                  <td className="td-three">
                    <span>
                      {train?.isGood && train?.isViewed ? (
                        <RiEditBoxFill size={20} />
                      ) : (
                        <NavLink
                          to={`/editTraining/${member?._id}/train/${train?._id}`}
                        >
                          <RiEditBoxLine size={20} />
                        </NavLink>
                      )}
                    </span>
                  </td>
                  <td className="td-three">
                    <span>
                      <center>
                        {train?.isGood && train?.isViewed ? (
                          <RiAttachmentFill size={20} />
                        ) : (
                          <ImAttachment
                            size={15}
                            onClick={() =>
                              trainFileUpload(member?._id, train?._id)
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
                        {train?.isUploaded ? (
                          <NavLink
                            to={`/viewTrainingPdf/${member?._id}/train/${train?._id}`}
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
                          {!train?.isGood ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                trainApproveS1(member?._id, train?._id)
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
                                trainDisApproveS1(member?._id, train?._id)
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
                          {!train?.isViewed ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                trainApproveG1(member?._id, train?._id)
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
                                trainDisApproveG1(member?._id, train?._id)
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
                        {train?.isGood && train?.isViewed ? (
                          <FaLock size={15} />
                        ) : (
                          <FaTrashAlt
                            size={15}
                            color="red"
                            onClick={() =>
                              trainingDelete(member?._id, train?._id)
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
  );
};

export default MilitarySchooling;
