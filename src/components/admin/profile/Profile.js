import { useEffect, useLayoutEffect, useState } from 'react';
import './Profile.scss';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, profileUpload, selectUser, updateUser } from '../../../redux/features/auth/authSlice';
import Notification from '../../notification/Notification';
import Card from '../../card/Card';
import { Spinner } from '../../loader/Loader';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { getBranchOfServices } from '../../../redux/features/branchOfService/brsvcOfServiceSlice';
import { getMember } from '../../../redux/features/rids/ridsSlice';
import { Link } from 'react-router-dom';

const Profile = () => {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.auth);
  const { branchOfServices } = useSelector((state) => state.branchOfService);

  const initialState = {
    name: user?.name || '',
    email: user?.email || '',
    birthdate: user?.birthdate || '',
    branchOfService: user?.branchOfService || '',
    phone: user?.phone || '',
    address: user?.address || '',
    photo: user?.photo || '',
    role: user?.role || '',
    isVerified: user?.isVerified || false,
    isAddedMember: user?.isAddedMember || false
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);
  const [startDate, setStartDate] = useState(user?.birthdate ? new Date(user.birthdate) : null);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getBranchOfServices());
  }, [dispatch]);

  const id = user?.memberId;
  useEffect(() => {
      if (!id) return; // 👈 Prevent the API call if the ID is missing
      dispatch(getMember(id));
  }, [dispatch, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    // save profile to MongoDB
    const userData = {
      id: profile._id,
      name: profile.name,
      phone: profile.phone,
      email: profile.email,
      birthdate: startDate,
      branchOfService: profile.branchOfService,
      address: profile.address
    };
    await dispatch(updateUser(userData));
  };

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        id: user?._id || '',
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        photo: user?.photo || '',
        address: user?.address || '',
        birthdate: user?.birthdate || '',
        branchOfService: user?.branchOfService || '',
        role: user?.role || '',
        isVerified: user?.isVerified || '',
        isAddedMember: user?.isAddedMember || '',
      });
    }
  }, [user]);

  const userId = profile.id;
  const uploadHandler = async (images, userId) => {
    setProfileImage(images[0]);
    setImagePreview(URL.createObjectURL(images[0]));
    const formData = new FormData();
    Array.from(images).forEach((image) => {
      formData.append('images', image);
    });
    try {
      await dispatch(profileUpload({ userId, formData }));
      toast.success('Files uploaded!');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const [pageIsLoading, setPageIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPageIsLoading(false);
    }, 2000);
  }, [pageIsLoading]);

  return (
    <>
    <div className='homeBackground'>
    <div className='profile'>
      {!profile.isVerified && <Notification />}

      <Card cardClass={'card'}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
                  <div className="profile-photo">
                    <div>
                      <img
                        src={
                          imagePreview === null ? profile?.photo : imagePreview
                        }
                        alt="Profileimg"
                      />
                    </div>
                  </div>

          <form onSubmit={saveProfile}>
                    <p>
                      <label>Change Photo</label>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => {
                          setIsUploading('upload files in progress ...');
                          uploadHandler(e.target.files, userId)
                            .then((data) => {
                              setIsUploading('upload file completed');
                              setImageUploaded(!imageUploaded);
                            })
                            .catch((er) =>
                              setIsUploading(
                                er.response.data.message
                                  ? er.response.data.message
                                  : er.response.data
                              )
                            );
                        }}
                      />
                    </p>
                    <p>
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={profile?.name}
                        onChange={handleInputChange}
                      />
                    </p>
                    <div className="--flex-start">
                      <p>
                      <label>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={profile?.phone}
                        onChange={handleInputChange}
                      />
                      </p>
                      <p>
                        <label>Date Of Birth</label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                      </p>
                    </div>
                    <p>Branch of Service:</p>
                    <select
                      name="branchOfService"
                      value={profile?.branchOfService}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select...</option>
                      {branchOfServices.length > 0 &&
                        branchOfServices.map((brsvc) => (
                          <option key={brsvc._id} value={brsvc?.name}>
                            {brsvc?.name}
                          </option>
                        ))}
                    </select>
                    <p>
                      {profile?.isVerified ? (
                      <>
                        <label>Email: <span><b>{profile?.email}</b></span></label>
                      </>
                      ) : (
                        <>
                      <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={profile?.email}
                          onChange={handleInputChange}
                        />
                      </>
                      )}
                    </p>
                    <br />
                    <button className="--btn --btn-primary --btn-block">
                      Update Profile
                    </button>
          </form>
                  <br />
                  <div className="--flex-start">
                  <button className="--btn --btn-info">
                    <b><Link to={`/${user?.role}/change-address`}>Change Address</Link></b>
                  </button>
                  <button className="--btn --btn-info">
                    <b><Link to={`/${user?.role}/change-password`}>Change Password</Link></b>
                  </button>
                  </div>
          </>
        )}
      </Card>
    </div>
  </div>
  </>
  );
}

export const shortenText = (text, n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat('...');
    return shortenedText;
  }
  return text;
};

export const UserName = () => {
  const user = useSelector(selectUser);
  const username = user?.name || '...';

  return (
    <p className="--color-white">
      {shortenText(username, 12)}&nbsp; {' '}
    </p>
  );
};

export default Profile;
