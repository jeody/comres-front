import React, { useEffect } from 'react';
import './Rids.scss';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  approveAwardG1,
  approveAwardS1,
  deleteAward,
  disApproveAwardG1,
  disApproveAwardS1,
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

const CivilianMilitaryAward = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, message } = useSelector((state) => state.rids);
  const { member } = useSelector((state) => state.rids);

  //awardDelete
  const awardDelete = (parentId, awardId) => {
    confirmAlert({
      title: 'Delete This Record',
      message: "Are you sure to do delete this user's record?",
      buttons: [
        {
          label: 'Delete',
          onClick: () => removeAward(parentId, awardId),
        },
        {
          label: 'Cancel',
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const removeAward = async (parentId, awardId) => {
    dispatch(deleteAward({ parentId, awardId }));
  };

  //awardApproveG1
  const awardApproveG1 = async (parentId, awardId) => {
    dispatch(approveAwardG1({ parentId, awardId }));
    // console.log("Award approved by G1:", parentId, awardId);
  };

  useEffect(() => {
    if (message === 'Award approved by G1') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

  //awardDisApproveG1
  const awardDisApproveG1 = async (parentId, awardId) => {
    dispatch(disApproveAwardG1({ parentId, awardId }));
  };

  useEffect(() => {
    if (message === 'Award disapproved by G1') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

  //awardApproveS1
  const awardApproveS1 = async (parentId, awardId) => {
    dispatch(approveAwardS1({ parentId, awardId }));
  };

  useEffect(() => {
    if (message === 'Award approved by S1') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

  //awardDisApproveS1
  const awardDisApproveS1 = async (parentId, awardId) => {
    dispatch(disApproveAwardS1({ parentId, awardId }));
  };

  useEffect(() => {
    if (message === 'Award disapproved by S1') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

  //awardFileUpload
  const awardFileUpload = (parentId, awardId) => {
    navigate(`/awardPdf/${parentId}/awardId/${awardId}`);
  };

  useEffect(() => {
    if (message === 'Award uploaded successfully.') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, id, navigate, dispatch]);

    const checkAwards = (e, id, user_id) => {
        e.preventDefault();
        navigate(`/getOldAwards/${id}/userId/${user_id}`);
    };

  //awards
  const awardArray = member?.awards;
  if (!awardArray) return; // 👈 Prevent the API call if the ID is missing
  const sortedAwards = [...awardArray].sort(
    (a, b) => b.award_type - a.award_type,
  );

  return (
    <>
      {isLoading && <Loader />}
      <div className="rids-table">
        <table className="table-one">
          <thead>
            <tr>
              <td className="td-one" style={{ border: '0', width: '100%' }}>
                {member?.user_id && member?.isAwards === false ? (
                  <>
                    <b>CIVILIAN AND MILITARY AWARDS RECEIVED:</b>&nbsp;
                    <button onClick={(e) => checkAwards(e, id, member?.user_id)}>
                      &nbsp; &#10003; &nbsp;
                    </button>
                  </>
                ) : (
                  <b>CIVILIAN AND MILITARY AWARDS RECEIVED:</b>
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
              <th className="th-three" style={{ width: '30%' }}>
                <i>TYPE OF AWARDS</i>
              </th>
              <th className="th-three" style={{ width: '40%' }}>
                <i>AUTHORITY</i>&nbsp;
                <NavLink to={`/addAward/${id}`}>
                  [<i style={{ color: '#0000ff' }}>add item</i>]
                </NavLink>
              </th>
              <th className="th-three" style={{ width: '16%' }}>
                <i>DATE AWARDED</i>
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
          {sortedAwards.length > 0 &&
            sortedAwards.map((award) => (
              <tbody>
                <tr key={award._id}>
                  <td className="td-three">{award?.award_type}</td>
                  <td className="td-three">{award?.authority_from}</td>
                  <td className="td-three">
                    <center>
                      {award?.date_awarded ? dateFormat(award?.date_awarded, "dd-mmm-yyyy") : null }
                    </center>
                  </td>
                  <td className="td-three">
                    <span>
                      {award?.isGood && award?.isViewed ? (
                        <RiEditBoxFill size={20} />
                      ) : (
                        <NavLink
                          to={`/editAward/${member?._id}/awardId/${award?._id}`}
                        >
                          <RiEditBoxLine size={20} />
                        </NavLink>
                      )}
                    </span>
                  </td>
                  <td className="td-three">
                    <span>
                      <center>
                        {award?.isGood && award?.isViewed ? (
                          <RiAttachmentFill size={20} />
                        ) : (
                          <ImAttachment
                            size={15}
                            onClick={() =>
                              awardFileUpload(member?._id, award?._id)
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
                        {award?.isUploaded ? (
                          <NavLink
                            to={`/viewAwardPdf/${member?._id}/awardId/${award?._id}`}
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
                          {!award?.isGood ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                awardApproveS1(member?._id, award?._id)
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
                                awardDisApproveS1(member?._id, award?._id)
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
                          {!award?.isViewed ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                awardApproveG1(member?._id, award?._id)
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
                                awardDisApproveG1(member?._id, award?._id)
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
                        {award?.isGood && award?.isViewed ? (
                          <FaLock size={15} />
                        ) : (
                          <FaTrashAlt
                            size={15}
                            color="red"
                            onClick={() => awardDelete(member?._id, award?._id)}
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

export default CivilianMilitaryAward;
