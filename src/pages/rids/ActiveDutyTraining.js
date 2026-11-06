import React, { useEffect } from 'react';
import './Rids.scss';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  approveActiveDutyG1,
  approveActiveDutyS1,
  deleteActiveDuty,
  disapproveActiveDutyG1,
  disapproveActiveDutyS1,
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

const ActiveDutyTraining = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, message } = useSelector((state) => state.rids);
  const { member } = useSelector((state) => state.rids);

  const activeApproveS1 = async (parentId, itemId) => {
    dispatch(approveActiveDutyS1({ parentId, itemId }));
  };

  useEffect(() => {
    if (message === 'Active Duty approved by S1') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

  const activeDisApproveS1 = async (parentId, itemId) => {
    dispatch(disapproveActiveDutyS1({ parentId, itemId }));
  };

  useEffect(() => {
    if (message === 'Active Duty disapproved by S1') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

  const activeApproveG1 = async (parentId, itemId) => {
    dispatch(approveActiveDutyG1({ parentId, itemId }));
  };

  useEffect(() => {
    if (message === 'Active Duty approved by G1') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

  const activeDisApproveG1 = async (parentId, itemId) => {
    dispatch(disapproveActiveDutyG1({ parentId, itemId }));
  };

  useEffect(() => {
    if (message === 'Active Duty disapproved by G1') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

  const removeActiveDuty = async (parentId, itemId) => {
    dispatch(deleteActiveDuty({ parentId, itemId }));
  };

  const activeDelete = (parentId, itemId) => {
    confirmAlert({
      title: 'Delete This Record',
      message: "Are you sure to do delete this user's record?",
      buttons: [
        {
          label: 'Delete',
          onClick: () => removeActiveDuty(parentId, itemId),
        },
        {
          label: 'Cancel',
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const activeFileUpload = (parentId, itemId) => {
    navigate(`/activeDutyPdf/${parentId}/active/${itemId}`);
  };

  useEffect(() => {
    if (message === 'ADT uploaded successfully.') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

    const checkAdt = (e, id, user_id) => {
        e.preventDefault();
        navigate(`/getOldAdt/${id}/userId/${user_id}`);
    };

  // Sort raw data before rendering (Newest First)
  const activeDutyArray = member?.activeDuty;
  if (!activeDutyArray) return; // 👈 Prevent the API call if the ID is missing
  const sortedActiveDuty = [...activeDutyArray].sort(
    (a, b) => new Date(b.dateStart) - new Date(a.dateStart),
  );

  return (
    <>
      {isLoading && <Loader />}
      <div className="rids-table">
        <table className="table-one">
          <thead>
            <tr>
              <td className="td-one" style={{ border: '0', width: '100%' }}>
                {member?.user_id && member?.isActiveDuty === false ? (
                  <>
                    <b>ACTIVE DUTY TRAINING (ADT):</b>&nbsp;
                    <button onClick={(e) => checkAdt(e, id, member?.user_id)}>
                      &nbsp; &#10003; &nbsp;
                    </button>
                  </>
                ) : (
                  <b>ACTIVE DUTY TRAINING (ADT):</b>
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
              <th className="th-three" style={{ width: '22%' }}>
                <i>SO NUMBER</i>
              </th>
              <th className="th-three" style={{ width: '34%' }}>
                <i>Unit Assignment</i>&nbsp;
                <NavLink to={`/addActiveDuty/${id}`}>
                  [<i style={{ color: '#0000ff' }}>add item</i>]
                </NavLink>
              </th>
              <th className="th-three" style={{ width: '15%' }}>
                <i>Date Start</i>
              </th>
              <th className="th-three" style={{ width: '15%' }}>
                <i>Date End</i>
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
          {sortedActiveDuty.length > 0 &&
            sortedActiveDuty.map((active) => (
              <tbody>
                <tr key={active._id}>
                  <td className="td-three">{active?.soNumber}</td>
                  <td className="td-three">{active?.adtUnitAssignment}</td>
                  <td className="td-three">
                    <center>
                      {active?.dateStart ? dateFormat(active?.dateStart, 'dd-mmm-yyyy') : null}
                    </center>
                  </td>
                  <td className="td-three">
                    <center>
                      {active?.dateEnd ? dateFormat(active?.dateEnd, 'dd-mmm-yyyy') : null}
                    </center>
                  </td>
                  <td className="td-three">
                    <span>
                      {active?.isGood && active?.isViewed ? (
                        <RiEditBoxFill size={20} />
                      ) : (
                        <NavLink
                          to={`/editActive/${member?._id}/active/${active?._id}`}
                        >
                          <RiEditBoxLine size={20} />
                        </NavLink>
                      )}
                    </span>
                  </td>
                  <td className="td-three">
                    <span>
                      <center>
                        {active?.isGood && active?.isViewed ? (
                          <RiAttachmentFill size={20} />
                        ) : (
                          <ImAttachment
                            size={15}
                            onClick={() =>
                              activeFileUpload(member?._id, active?._id)
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
                        {active?.isUploaded ? (
                          <NavLink
                            to={`/viewActivePdf/${member?._id}/active/${active?._id}`}
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
                          {!active?.isGood ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                activeApproveS1(member?._id, active?._id)
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
                                activeDisApproveS1(member?._id, active?._id)
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
                          {!active?.isViewed ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                activeApproveG1(member?._id, active?._id)
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
                                activeDisApproveG1(member?._id, active?._id)
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
                        {active?.isGood && active?.isViewed ? (
                          <FaLock size={15} />
                        ) : (
                          <FaTrashAlt
                            size={15}
                            color="red"
                            onClick={() =>
                              activeDelete(member?._id, active?._id)
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

export default ActiveDutyTraining;
