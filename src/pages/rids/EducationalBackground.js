import React, { useEffect } from 'react';
import './Rids.scss';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    approveCourseG1,
    approveCourseS1,
    deleteCourse,
    disApproveCourseG1,
    disApproveCourseS1,
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
// import dateFormat from 'dateformat';


const EducationalBackground = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, message } = useSelector((state) => state.rids);
  const { member } = useSelector((state) => state.rids);
  
  const removeCourse = async (parentId, itemId) => {
      dispatch(deleteCourse({ parentId, itemId }));
  };

    useEffect(() => {
        if (message === 'Course updated successfully') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

  const courseDelete = (parentId, itemId) => {
    confirmAlert({
      title: 'Delete This Record',
      message: "Are you sure to do delete this user's record?",
      buttons: [
        {
          label: 'Delete',
          onClick: () => removeCourse(parentId, itemId)
        },
        {
          label: 'Cancel'
          //onClick: () => alert('Click No')
        }
      ]
    });
  };

  const educApproveS1 = async(parentId, itemId) => {
      dispatch(approveCourseS1({ parentId, itemId }));
  };

    useEffect(() => {
        if (message === 'Course approved by S1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

  const educDisApproveS1 = async(parentId, itemId) => {
      dispatch(disApproveCourseS1({ parentId, itemId }));
  };

    useEffect(() => {
        if (message === 'Course disapproved by S1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

  const educApproveG1 = async (parentId, itemId) => {
      dispatch(approveCourseG1({ parentId, itemId }));
  };

      useEffect(() => {
        if (message === 'Course approved by G1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

  const educDisApproveG1 = async (parentId, itemId) => {
    dispatch(disApproveCourseG1({ parentId, itemId }));
  };

      useEffect(() => {
        if (message === 'Course disapproved by G1') {
        navigate(`/updateRids/${id}`);
        }
        dispatch(RESET_MEMBER());
        dispatch(getMember(id));
    }, [message, id, navigate, dispatch]);

    const educFileUpload = (parentId, itemId) => {
        navigate(`/educPdf/${parentId}/educ/${itemId}`);
    };

    const checkEduc = (e, id, user_id) => {
        e.preventDefault();
        navigate(`/getOldEduc/${id}/userId/${user_id}`);
    };

  // Sort raw data before rendering (Newest First)
  const educationArray = member?.education;
  if (!educationArray) return; // 👈 Prevent the API call if the ID is missing
  const sortedEducation = [...educationArray].sort(
    (a, b) => new Date(b.date_completed) - new Date(a.date_completed),
  );

  return (
    <>
        {isLoading && <Loader />}
                            <div className="rids-table">
                                <table className="table-one">
                                    <thead>
                                        <tr>
                                            <td className="td-one" style={{ border: '0', width: "100%" }}>
                                                
                                                {member?.user_id && member?.isEduc === false ? (
                                                    <>
                                                    <b>EDUCATIONAL BACKGROUND:</b>&nbsp;
                                                    <button onClick={(e) => checkEduc(e, id, member?.user_id)}>&nbsp; &#10003; &nbsp;</button> 
                                                    </>
                                                ) : (
                                                    <b>EDUCATIONAL BACKGROUND:</b> 
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
                                        <th className="th-three" style={{ width: "31%" }}><i>COURSE</i></th>
                                        <th className="th-three" style={{ width: "37%" }}><i>SCHOOL</i>&nbsp;
                                            <NavLink to={`/addEduc/${id}`}>
                                                [<i style={{ color: "#0000ff" }}>add item</i>]
                                            </NavLink>
                                        </th>
                                        <th className="th-three" style={{ width: "18%" }}><i>DATE COMPLETED</i></th>
                                        <th className="th-three" style={{ width: "2%" }}>&nbsp;</th>
                                        <th className="th-three" style={{ width: "2%" }}>&nbsp;</th>
                                        <th className="th-three" style={{ width: "2%" }}>&nbsp;</th>
                                        <th className="th-three" style={{ width: "2%" }}><i>s1</i></th>
                                        <th className="th-three" style={{ width: "2%" }}><i>g1</i></th>
                                        <th className="th-three" style={{ width: "2%" }}>&nbsp;</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                      {sortedEducation.length > 0 &&
                        sortedEducation.map((educ) => (
                                    <tr key={educ._id}>
                                        <td className="td-three">{educ?.course}</td>
                                        <td className="td-three">{educ?.school}</td>
                                        <td className="td-three"><center>{educ?.date_completed}</center></td>
                                        <td className="td-three">
                                            <span>
                                                {educ?.isGood && educ?.isViewed ? (
                                                    <RiEditBoxFill size={20} />
                                                ) : (
                                                <NavLink to={`/editEduc/${member?._id}/educ/${educ?._id}`}>
                                                    <RiEditBoxLine size={20} />
                                                </NavLink>
                                                )}
                                            </span>
                                        </td>
                                        <td className="td-three">
                                            <span>
                                                <center>
                                                {educ?.isGood && educ?.isViewed ? (
                                                    <RiAttachmentFill size={20} />
                                                ) : (
                                                    <ImAttachment
                                                    size={15}
                                                    onClick={() => educFileUpload(member?._id, educ?._id)}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                                    />
                                                )}
                                                </center>
                                            </span>
                                        </td>
                                        <td className="td-three">
                                            <span>
                                                <center>
                                                    {educ?.isUploaded ? (
                                                        <NavLink to={`/viewCoursePdf/${member?._id}/educ/${educ?._id}`}>
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
                                                    {!educ?.isGood ? (
                                                        <FaRegThumbsDown
                                                        size={15}
                                                        onClick={() => educApproveS1(member?._id, educ?._id)}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                                        />
                                                    ) : (
                                                        <FaRegThumbsUp
                                                        size={15}
                                                        onClick={() => educDisApproveS1(member?._id, educ?._id)}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
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
                                                    {!educ?.isViewed ? (
                                                        <FaRegThumbsDown
                                                        size={15}
                                                        onClick={() => educApproveG1(member?._id, educ?._id)}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                                        />
                                                    ) : (                                                    
                                                        <FaRegThumbsUp
                                                        size={15}
                                                        onClick={() => educDisApproveG1(member?._id, educ?._id)}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                                        />
                                                    )}
                                                    </center>
                                                </span>  
                                            </>
                                        </td>
                                        <td className="td-three">
                                            <span>
                                                <center>
                                                {educ?.isGood && educ?.isViewed ? (
                                                    <FaLock size={15} />
                                                ) : (
                                                    <FaTrashAlt
                                                    size={15}
                                                    color="red"
                                                    onClick={() => courseDelete(member?._id, educ?._id)}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                                    />
                                                )}  
                                                </center>
                                            </span>
                                        </td>
                                    </tr>
                        ))}
                                </tbody>
                                </table>
                            </div>
    </>
  )
}

export default EducationalBackground