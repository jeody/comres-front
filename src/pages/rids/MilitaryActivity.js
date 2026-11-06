import React, { useEffect } from 'react';
import './Rids.scss';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { approveActivityG1, approveActivityS1, deleteActivity, disApproveActivityG1, disApproveActivityS1, getMember, RESET_MEMBER } from '../../redux/features/rids/ridsSlice';
import { confirmAlert } from 'react-confirm-alert';
import { RiAttachmentFill, RiEditBoxFill, RiEditBoxLine } from 'react-icons/ri';
import { ImAttachment } from 'react-icons/im';
import { FaFile, FaLock, FaRegFile, FaRegThumbsDown, FaRegThumbsUp, FaTrashAlt } from 'react-icons/fa';
import Loader from '../../components/loader/Loader';
import dateFormat from 'dateformat';

const MilitaryActivity = ({ id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, message } = useSelector((state) => state.rids);
    const { member } = useSelector((state) => state.rids);
    // const id = member._id;

    //activityFileUpload
    const activityFileUpload = (parentId, activityId) => {
        navigate(`/activityPdf/${parentId}/activityId/${activityId}`);
    };

    //activityApproveS1
    const activityApproveS1 = (parentId, activityId) => {
        dispatch(approveActivityS1({ parentId, activityId }));
    };

    useEffect(() => {
        if (message === 'Military activity approved by S1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //activityDisApproveS1
    const activityDisApproveS1 = (parentId, activityId) => {
        dispatch(disApproveActivityS1({ parentId, activityId }));
    };

    useEffect(() => {
        if (message === 'Military activity disapproved by S1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //activityApproveG1
    const activityApproveG1 = (parentId, activityId) => {
        dispatch(approveActivityG1({ parentId, activityId }));
    };

    useEffect(() => {
        if (message === 'Military activity approved by G1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //activityDisApproveG1
    const activityDisApproveG1 = (parentId, activityId) => {
        dispatch(disApproveActivityG1({ parentId, activityId }));
    };

    useEffect(() => {
        if (message === 'Military activity disapproved by G1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //activityDelete
     const activityDelete = (parentId, activityId) => {
        confirmAlert({
        title: 'Delete This Record',
        message: "Are you sure to do delete this user's record?",
        buttons: [
            {
            label: 'Delete',
            onClick: () => removeActivity(parentId, activityId)
            },
            {
            label: 'Cancel'
            //onClick: () => alert('Click No')
            }
        ]
        });
    };

    const removeActivity = async (parentId, activityId) => {
        dispatch(deleteActivity({ parentId, activityId }));
    };

    const checkActivity = (e, id, user_id) => {
        e.preventDefault();
        navigate(`/getOldActivity/${id}/userId/${user_id}`);
    };

    //activities
    const activityArray = member?.activities;
    if (!activityArray) return; // 👈 Prevent the API call if the ID is missing
    const sortedActivities = [...activityArray].sort((a, b) => new Date(b.mil_startdate) - new Date(a.mil_startdate));

  return (
    <>
      {isLoading && <Loader />}
      <div className="rids-table">
        <table className="table-one">
          <thead>
            <tr>
              <td className="td-one" style={{ border: '0', width: '100%' }}>
                
                {member?.user_id && member?.isActivities === false ? (
                  <>
                    <b>MILITARY ACTIVITIES ATTENDED:</b>&nbsp;
                    <button onClick={(e) => checkActivity(e, id, member?.user_id)}>
                      &nbsp; &#10003; &nbsp;
                    </button>
                  </>
                ) : (
                  <b>MILITARY ACTIVITIES ATTENDED:</b>
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
              <th className="th-three" style={{ width: '18%' }}>
                <i>ACTIVITY</i>
              </th>
              <th className="th-three" style={{ width: '18%' }}>
                <i>UNIT</i>
              </th>
              <th className="th-three" style={{ width: '26%' }}>
                <i>VENUE</i>
                <NavLink to={`/addActivity/${id}`}>
                  [<i style={{ color: '#0000ff' }}>add item</i>]
                </NavLink>
              </th>
              <th className="th-three" style={{ width: '12%' }}>
                DATE START
              </th>
              <th className="th-three" style={{ width: '12%' }}>
                DATE END
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
          {sortedActivities.length > 0 &&
            sortedActivities.map((act) => (
              <tbody>
                <tr key={act._id}>
                  <td className="td-three">{act?.mil_activity}</td>
                  <td className="td-three">{act?.mil_unit}</td>
                  <td className="td-three">{act?.mil_venue}</td>
                  <td className="td-three">
                    <center>
                      {act?.mil_startdate ? dateFormat(act?.mil_startdate, 'dd-mmm-yyyy') : null}
                    </center>
                  </td>
                  <td className="td-three">
                    <center>
                      {act?.mil_enddate ? dateFormat(act?.mil_enddate, 'dd-mmm-yyyy') : null}
                    </center>
                  </td>
                  <td className="td-three">
                    <span>
                      {act?.isGood && act?.isViewed ? (
                        <RiEditBoxFill size={20} />
                      ) : (
                        <NavLink
                          to={`/editActivity/${member?._id}/activityId/${act?._id}`}
                        >
                          <RiEditBoxLine size={20} />
                        </NavLink>
                      )}
                    </span>
                  </td>
                  <td className="td-three">
                    <span>
                      <center>
                        {act?.isGood && act?.isViewed ? (
                          <RiAttachmentFill size={20} />
                        ) : (
                          <ImAttachment
                            size={15}
                            onClick={() =>
                              activityFileUpload(member?._id, act?._id)
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
                        {act?.isUploaded ? (
                          <NavLink
                            to={`/viewActivityPdf/${member?._id}/activityId/${act?._id}`}
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
                          {!act?.isGood ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                activityApproveS1(member?._id, act?._id)
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
                                activityDisApproveS1(member?._id, act?._id)
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
                          {!act?.isViewed ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                activityApproveG1(member?._id, act?._id)
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
                                activityDisApproveG1(member?._id, act?._id)
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
                        {act?.isGood && act?.isViewed ? (
                          <FaLock size={15} />
                        ) : (
                          <FaTrashAlt
                            size={15}
                            color="red"
                            onClick={() =>
                              activityDelete(member?._id, act?._id)
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
}

export default MilitaryActivity