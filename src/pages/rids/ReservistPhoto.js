import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { photoUpload } from '../../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const ReservistPhoto = ({ userId }) => {
  const dispatch = useDispatch();
  const { member } = useSelector((state) => state.rids);

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);

  const uploadHandler = async (e, images, userId) => {
    e.preventDefault();
    setProfileImage(images[0]);
    setImagePreview(URL.createObjectURL(images[0]));
    const formData = new FormData();
    Array.from(images).forEach((image) => {
      formData.append('images', image);
    });
    try {
      dispatch(photoUpload({ formData, userId }));
      toast.success('Files uploaded!');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="rids-table">
        <table className="table-two">
          <tbody>
            <tr>
              <td className="td-two" style={{ border: '0', width: '10%' }}>
                &nbsp;
              </td>
              <td
                className="td-two"
                style={{ border: '0', width: '18%', valign: 'top' }}
              >
                <table
                  height="195"
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  border="1"
                >
                  <tbody>
                    <tr>
                      <td>&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="td-two" style={{ border: '0', width: '10%' }}>
                &nbsp;
              </td>
              <td
                className="td-two"
                style={{ border: '0', width: '18%', valign: 'top' }}
              >
                <table
                  height="195"
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  border="1"
                >
                  <tbody>
                    <tr>
                      <td>&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="td-two" style={{ border: '0', width: '10%' }}>
                &nbsp;
              </td>
              <td className="td-two" style={{ border: '0', width: '24%' }}>
                <table
                  height="220"
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  border="1"
                >
                  <tbody>
                    <tr>
                      <td align="center">
                        <div className="profile-photo">
                          <div>
                            <img
                              src={
                                imagePreview === null
                                  ? member?.photo
                                  : imagePreview
                              }
                              alt="Profileimg"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="td-two" style={{ border: '0', width: '10%' }}>
                &nbsp;
              </td>
            </tr>
            <tr>
              <td className="td-two" style={{ border: '0' }}>
                &nbsp;
              </td>
              <td className="td-two" style={{ border: '0' }}>
                LEFT THUMBMARK
              </td>
              <td className="td-two" style={{ border: '0' }}>
                &nbsp;
              </td>
              <td className="td-two" style={{ border: '0' }}>
                RIGHT THUMBMARK
              </td>
              <td className="td-two" style={{ border: '0' }}>
                &nbsp;
              </td>
              <td className="td-two" style={{ border: '0' }}>
                <label>Change Photo</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    setIsUploading('upload files in progress ...');
                    uploadHandler(e, e.target.files, userId)
                      .then((data) => {
                        setIsUploading('upload file completed');
                        setImageUploaded(!imageUploaded);
                      })
                      .catch((er) =>
                        setIsUploading(
                          er.response.data.message
                            ? er.response.data.message
                            : er.response.data,
                        ),
                      );
                  }}
                />
              </td>
              <td className="td-two" style={{ border: '0' }}>
                &nbsp;
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReservistPhoto;
