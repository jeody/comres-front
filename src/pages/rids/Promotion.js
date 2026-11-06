import React, { useEffect } from 'react';
import './Rids.scss';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { approvePromotionG1, approvePromotionS1, deletePromotion, disApprovePromotionG1, disApprovePromotionS1, getMember, RESET_MEMBER } from '../../redux/features/rids/ridsSlice';
import { confirmAlert } from 'react-confirm-alert';
import { RiAttachmentFill, RiEditBoxFill, RiEditBoxLine } from 'react-icons/ri';
import { ImAttachment } from 'react-icons/im';
import { FaFile, FaLock, FaRegFile, FaRegThumbsDown, FaRegThumbsUp, FaTrashAlt } from 'react-icons/fa';
import Loader from '../../components/loader/Loader';
import dateFormat from 'dateformat';

const Promotion = ({ id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, message } = useSelector((state) => state.rids);
    const { member } = useSelector((state) => state.rids);

    //promotionFileUpload
    const promotionFileUpload = (parentId, promotionId) => {
        navigate(`/promotionPdf/${parentId}/promotionId/${promotionId}`);
    };

    //promotionApproveS1
    const promotionApproveS1 = (parentId, promotionId) => {
        dispatch(approvePromotionS1({ parentId, promotionId }));
    };

    useEffect(() => {
        if (message === 'Promotion approved by S1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //promotionDisApproveS1
    const promotionDisApproveS1 = (parentId, promotionId) => {
        dispatch(disApprovePromotionS1({ parentId, promotionId }));
    };

    useEffect(() => {
        if (message === 'Promotion disapproved by S1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //promotionApproveG1
    const promotionApproveG1 = (parentId, promotionId) => {
        dispatch(approvePromotionG1({ parentId, promotionId }));
    };

    useEffect(() => {
        if (message === 'Promotion approved by G1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //promotionDisApproveG1
    const promotionDisApproveG1 = (parentId, promotionId) => {
        dispatch(disApprovePromotionG1({ parentId, promotionId }));
    };

    useEffect(() => {
        if (message === 'Promotion disapproved by G1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //promotionDelete
    const promotionDelete = (parentId, promotionId) => {
        confirmAlert({
        title: 'Delete This Record',
        message: "Are you sure to do delete this user's record?",
        buttons: [
            {
            label: 'Delete',
            onClick: () => removePromotion(parentId, promotionId)
            },
            {
            label: 'Cancel'
            //onClick: () => alert('Click No')
            }
        ]
        });
    };

    const removePromotion = async (parentId, promotionId) => {
        dispatch(deletePromotion({ parentId, promotionId }));
    };

    const checkPromotion = (e, id, user_id) => {
        e.preventDefault();
        navigate(`/getOldPromotion/${id}/userId/${user_id}`);
    };

    //promotions
    const promotionArray = member?.promotions;
    if (!promotionArray) return; // 👈 Prevent the API call if the ID is missing
    const sortedPromotions = [...promotionArray].sort((a, b) => new Date(b.prom_effectivity) - new Date(a.prom_effectivity));


  return (
    <>
      {isLoading && <Loader />}
      <div className="rids-table">
        <table className="table-one">
          <thead>
            <tr>
              <td className="td-one" style={{ border: '0', width: '100%' }}>
                
                {member?.user_id && member?.isPromotions === false ? (
                  <>
                    <b>PROMOTION /DEMOTION:</b>&nbsp;
                    <button onClick={(e) => checkPromotion(e, id, member?.user_id)}>
                      &nbsp; &#10003; &nbsp;
                    </button>
                  </>
                ) : (
                  <b>PROMOTION /DEMOTION:</b>
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
              <th className="th-three" style={{ width: '15%' }}>
                <i>FROM</i>
              </th>
              <th className="th-three" style={{ width: '15%' }}>
                <i>TO</i>
              </th>
              <th className="th-three" style={{ width: '38%' }}>
                <i>AUTHORITY</i>
                <NavLink to={`/addPromotion/${id}`}>
                  [<i style={{ color: '#0000ff' }}>add item</i>]
                </NavLink>
              </th>
              <th className="th-three" style={{ width: '18%' }}>
                EFFECTIVITY
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
          {sortedPromotions.length > 0 &&
            sortedPromotions.map((prom) => (
              <tbody>
                <tr key={prom._id}>
                  <td className="td-three">{prom?.prom_from}</td>
                  <td className="td-three">{prom?.prom_to}</td>
                  <td className="td-three">{prom?.prom_authority}</td>
                  <td className="td-three">
                    <center>
                      {dateFormat(prom?.prom_effectivity, 'dd-mmm-yyyy')}
                    </center>
                  </td>
                  <td className="td-three">
                    <span>
                      {prom?.isGood && prom?.isViewed ? (
                        <RiEditBoxFill size={20} />
                      ) : (
                        <NavLink
                          to={`/editPromotion/${member?._id}/promoId/${prom?._id}`}
                        >
                          <RiEditBoxLine size={20} />
                        </NavLink>
                      )}
                    </span>
                  </td>
                  <td className="td-three">
                    <span>
                      <center>
                        {prom?.isGood && prom?.isViewed ? (
                          <RiAttachmentFill size={20} />
                        ) : (
                          <ImAttachment
                            size={15}
                            onClick={() =>
                              promotionFileUpload(member?._id, prom?._id)
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
                        {prom?.isUploaded ? (
                          <NavLink
                            to={`/viewPromotionPdf/${member?._id}/promotionId/${prom?._id}`}
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
                          {!prom?.isGood ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                promotionApproveS1(member?._id, prom?._id)
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
                                promotionDisApproveS1(member?._id, prom?._id)
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
                          {!prom?.isViewed ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                promotionApproveG1(member?._id, prom?._id)
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
                                promotionDisApproveG1(member?._id, prom?._id)
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
                        {prom?.isGood && prom?.isViewed ? (
                          <FaLock size={15} />
                        ) : (
                          <FaTrashAlt
                            size={15}
                            color="red"
                            onClick={() =>
                              promotionDelete(member?._id, prom?._id)
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

export default Promotion