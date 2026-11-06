import React, { useEffect } from 'react';
import './Rids.scss';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { approveDependentG1, approveDependentS1, deleteDependent, disApproveDependentG1, disApproveDependentS1, getMember, RESET_MEMBER } from '../../redux/features/rids/ridsSlice';
import { confirmAlert } from 'react-confirm-alert';
import { RiAttachmentFill, RiEditBoxFill, RiEditBoxLine } from 'react-icons/ri';
import { ImAttachment } from 'react-icons/im';
import { FaFile, FaLock, FaRegFile, FaRegThumbsDown, FaRegThumbsUp, FaTrashAlt } from 'react-icons/fa';
import Loader from '../../components/loader/Loader';
import dateFormat from 'dateformat';

const Dependents = ({ id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, message } = useSelector((state) => state.rids);
    const { member } = useSelector((state) => state.rids);

    //dependentFileUpload
    const dependentFileUpload = (parentId, dependentId) => {
        navigate(`/dependentPdf/${parentId}/dependentId/${dependentId}`);
    };
    
    useEffect(() => {
        if (message === 'Dependent details uploaded successfully.') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //viewDependentPdf

    //dependentApproveS1
    const dependentApproveS1 = (parentId, dependentId) => {
        dispatch(approveDependentS1({ parentId, dependentId }));
    };

    useEffect(() => {
        if (message === 'Dependent approved by S1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //dependentDisApproveS1
    const dependentDisApproveS1 = (parentId, dependentId) => {
        dispatch(disApproveDependentS1({ parentId, dependentId }));
    };

    useEffect(() => {
        if (message === 'Dependent disapproved by S1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //dependentApproveG1
    const dependentApproveG1 = (parentId, dependentId) => {
        dispatch(approveDependentG1({ parentId, dependentId }));
    };

    useEffect(() => {
        if (message === 'Dependent approved by G1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //dependentDisApproveG1
    const dependentDisApproveG1 = (parentId, dependentId) => {
        dispatch(disApproveDependentG1({ parentId, dependentId }));
    };

    useEffect(() => {
        if (message === 'Dependent disapproved by G1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    //dependentDelete
    const dependentDelete = (parentId, dependentId) => {
        confirmAlert({
        title: 'Delete This Record',
        message: "Are you sure to do delete this user's record?",
        buttons: [
            {
            label: 'Delete',
            onClick: () => removedDependent(parentId, dependentId)
            },
            {
            label: 'Cancel'
            //onClick: () => alert('Click No')
            }
        ]
        });
    };

    const removedDependent = async (parentId, dependentId) => {
        dispatch(deleteDependent({ parentId, dependentId }));
    };

    const checkDependents = (e, id, user_id) => {
        e.preventDefault();
        navigate(`/getOldDependents/${id}/userId/${user_id}`);
    };

    //dependents
    const dependentArray = member?.dependents;
    if (!dependentArray) return; // 👈 Prevent the API call if the ID is missing
    const sortedDependents = [...dependentArray].sort((a, b) => new Date(a.dep_birthdate) - new Date(b.dep_birthdate));

  return (
    <>
      {isLoading && <Loader />}
      <div className="rids-table">
        <table className="table-one">
          <thead>
            <tr>
              <td className="td-one" style={{ border: '0', width: '100%' }}>
                
                {member?.user_id && member?.isDependents === false ? (
                  <>
                    <b>DEPENDENTS: (Spouse & children if married)</b>&nbsp;
                    <button onClick={(e) => checkDependents(e, id, member?.user_id)}>
                      &nbsp; &#10003; &nbsp;
                    </button>
                  </>
                ) : (
                  <b>DEPENDENTS: (Spouse & children if married)</b>
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
                <i>NAME</i>
              </th>
              <th className="th-three" style={{ width: '40%' }}>
                <i>RELATION</i>&nbsp;
                <NavLink to={`/addDependent/${id}`}>
                  [<i style={{ color: '#0000ff' }}>add item</i>]
                </NavLink>
              </th>
              <th className="th-three" style={{ width: '16%' }}>
                <i>DATE OF BIRTH</i>
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
          {sortedDependents.length > 0 &&
            sortedDependents.map((dep) => (
              <tbody>
                <tr key={dep._id}>
                  <td className="td-three">{dep?.dep_name}</td>
                  <td className="td-three">{dep?.dep_relation}</td>
                  <td className="td-three">
                    <center>
                      {dateFormat(dep?.dep_birthdate, 'dd-mmm-yyyy')}
                    </center>
                  </td>
                  <td className="td-three">
                    <span>
                      {dep?.isGood && dep?.isViewed ? (
                        <RiEditBoxFill size={20} />
                      ) : (
                        <NavLink
                          to={`/editDependent/${member?._id}/dependentId/${dep?._id}`}
                        >
                          <RiEditBoxLine size={20} />
                        </NavLink>
                      )}
                    </span>
                  </td>
                  <td className="td-three">
                    <span>
                      <center>
                        {dep?.isGood && dep?.isViewed ? (
                          <RiAttachmentFill size={20} />
                        ) : (
                          <ImAttachment
                            size={15}
                            onClick={() =>
                              dependentFileUpload(member?._id, dep?._id)
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
                        {dep?.isUploaded ? (
                          <NavLink
                            to={`/viewDependentPdf/${member?._id}/dependentId/${dep?._id}`}
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
                          {!dep?.isGood ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                dependentApproveS1(member?._id, dep?._id)
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
                                dependentDisApproveS1(member?._id, dep?._id)
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
                          {!dep?.isViewed ? (
                            <FaRegThumbsDown
                              size={15}
                              onClick={() =>
                                dependentApproveG1(member?._id, dep?._id)
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
                                dependentDisApproveG1(member?._id, dep?._id)
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
                        {dep?.isGood && dep?.isViewed ? (
                          <FaLock size={15} />
                        ) : (
                          <FaTrashAlt
                            size={15}
                            color="red"
                            onClick={() =>
                              dependentDelete(member?._id, dep?._id)
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

export default Dependents