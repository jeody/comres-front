import React, { useEffect } from 'react';
import './Rids.scss';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { approveDesignationG1, approveDesignationS1, deleteDesignation, disApproveDesignationG1, disApproveDesignationS1, getMember, RESET_MEMBER } from '../../redux/features/rids/ridsSlice';
import { confirmAlert } from 'react-confirm-alert';
import { RiAttachmentFill, RiEditBoxFill, RiEditBoxLine } from 'react-icons/ri';
import { ImAttachment } from 'react-icons/im';
import { FaFile, FaLock, FaRegFile, FaRegThumbsDown, FaRegThumbsUp, FaTrashAlt } from 'react-icons/fa';
import Loader from '../../components/loader/Loader';
import dateFormat from 'dateformat';

const MilitaryDesignation = ({ id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, message } = useSelector((state) => state.rids);
    const { member } = useSelector((state) => state.rids);

    //designationApproveS1
    const designationApproveS1 = async (parentId, desigId) => {
        dispatch(approveDesignationS1({ parentId, desigId }));
    };

    useEffect(() => {
        if (message === 'Unit Designation approved by S1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //designationDisApproveS1
    const designationDisApproveS1 = async (parentId, desigId) => {
        dispatch(disApproveDesignationS1({ parentId, desigId }));
    };

    useEffect(() => {
        if (message === 'Unit Designation disapproved by S1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //designationApproveG1
    const designationApproveG1 = async (parentId, desigId) => {
        dispatch(approveDesignationG1({ parentId, desigId }));
    };

    useEffect(() => {
        if (message === 'Unit Designation approved by G1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //designationDisApproveG1
    const designationDisApproveG1 = async (parentId, desigId) => {
        dispatch(disApproveDesignationG1({ parentId, desigId }));
    };

    useEffect(() => {
        if (message === 'Unit Designation disapproved by G1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //designationDelete
    const designationDelete = (parentId, desigId) => {
        confirmAlert({
        title: 'Delete This Record',
        message: "Are you sure to do delete this user's record?",
        buttons: [
            {
            label: 'Delete',
            onClick: () => removeDesignation(parentId, desigId)
            },
            {
            label: 'Cancel'
            //onClick: () => alert('Click No')
            }
        ]
        });
    };

    const removeDesignation = async (parentId, desigId) => {
        dispatch(deleteDesignation({ parentId, desigId }));
    };

    //designationFileUpload
    const designationFileUpload = (parentId, itemId) => {
        navigate(`/designationPdf/${parentId}/desigId/${itemId}`);
    };

    const checkDesignation = (e, id, user_id) => {
        e.preventDefault();
        navigate(`/getOldDesignation/${id}/userId/${user_id}`);
    };
    
    //designation
    const designationArray = member?.userDesignation;
    if (!designationArray) return; // 👈 Prevent the API call if the ID is missing
    const sortedDesignation = [...designationArray].sort((a, b) => new Date(b.date_start) - new Date(a.date_start));

  return (
    <>
      {isLoading && <Loader />}
      <div className="rids-table">
        <table className="table-one">
          <thead>
            <tr>
              <td className="td-one" style={{ border: '0', width: '100%' }}>
                {member?.user_id && member?.isDesignation === false ? (
                  <>
                    <b>MILITARY DESIGNATION:</b>&nbsp;
                    <button onClick={(e) => checkDesignation(e, id, member?.user_id)}>
                      &nbsp; &#10003; &nbsp;
                    </button>
                  </>
                ) : (
                  <b>MILITARY DESIGNATION:</b>
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
                <i>AUTHORITY</i>
              </th>
              <th className="th-three" style={{ width: '34%' }}>
                <i>Unit Designation</i>&nbsp;
                <NavLink to={`/addDesignation/${id}`}>
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
          {sortedDesignation.length > 0 &&
            sortedDesignation.map((desig) => (
              <tbody>
                <tr key={desig._id}>
                  <td className="td-three">{desig?.so_Number}</td>
                  <td className="td-three">{desig?.unitDesignation}</td>
                  <td className="td-three">
                    <center>
                      {dateFormat(desig?.date_start, 'dd-mmm-yyyy')}
                    </center>
                  </td>
                  <td className="td-three">
                    <center>
                      {dateFormat(desig?.date_end, 'dd-mmm-yyyy')}
                    </center>
                  </td>
                  <td className="td-three">
                    <span>
                      {desig?.isGood && desig?.isViewed ? (
                        <RiEditBoxFill size={20} />
                      ) : (
                        <NavLink
                          to={`/editDesignation/${member?._id}/desigId/${desig?._id}`}
                        >
                          <RiEditBoxLine size={20} />
                        </NavLink>
                      )}
                    </span>
                  </td>
                  <td className="td-three">
                    <span>
                      <center>
                        {desig?.isGood && desig?.isViewed ? (
                          <RiAttachmentFill size={20} />
                        ) : (
                          <ImAttachment
                            size={15}
                            onClick={() =>
                              designationFileUpload(member?._id, desig?._id)
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
                        {desig?.isUploaded ? (
                          <NavLink
                            to={`/viewDesignationPdf/${member?._id}/desigId/${desig?._id}`}
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
                          {!desig?.isGood ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                designationApproveS1(member?._id, desig?._id)
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
                                designationDisApproveS1(member?._id, desig?._id)
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
                          {!desig?.isViewed ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                designationApproveG1(member?._id, desig?._id)
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
                                designationDisApproveG1(member?._id, desig?._id)
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
                        {desig?.isGood && desig?.isViewed ? (
                          <FaLock size={15} />
                        ) : (
                          <FaTrashAlt
                            size={15}
                            color="red"
                            onClick={() =>
                              designationDelete(member?._id, desig?._id)
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

export default MilitaryDesignation