import React, { useEffect, useLayoutEffect, useState } from 'react'
import './Rids.scss';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewLoader from '../profile/NewLoader';
import { Page } from '@react-pdf/renderer';
import PageMenu from '../../components/pageMenu/PageMenu';
import setBodyColor from '../../setBodyColor';
import { getUser } from '../../redux/features/auth/authSlice';
import { getBranchOfServices } from '../../redux/features/branchOfService/brsvcOfServiceSlice';
import DatePicker from 'react-datepicker';
import Card from '../../components/card/Card';
import { toast } from 'react-toastify';
import axios from 'axios';
import { addMember, RESET_MEMBER } from '../../redux/features/rids/ridsSlice';

const initialState = {
  name: '',
  email: '',
  photo: '',
  phone: '',
  isVerified: false,
  address: '',
  barangay: '',
  city: '',
  cityId: '',
  country: '',
  province: '',
  provinceId: '',
  region: '',
  regionId: '',
  street: '',
  branchOfService: '',
  birthdate: '',
  message: '',
};

const AddRids = () => {
    useRedirectLoggedOutUser('/login');
    const { isLoading, user } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.rids);
    const { branchOfServices } = useSelector((state) => state.branchOfService);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [member, setMember] = useState(initialState);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState('');
    const [imageUploaded, setImageUploaded] = useState(false);
    const [startDate, setStartDate] = useState(user?.birthdate ? new Date(user.birthdate) : null);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getBranchOfServices());
  }, [dispatch]);

    const {
        name,
        email,
        photo,
        phone,
        isVerified,
        address,
        barangay,
        city,
        cityId,
        country,
        province,
        provinceId,
        region,
        regionId,
        street,
        branchOfService,
        birthdate
    } = member;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMember({ ...member, [name]: value });
    };
  
    const saveMember = async (e) => {
        e.preventDefault();

        const formData = {
            id: user?._id || '',
            name,
            email,
            phone,
            photo,
            isVerified,
            address,
            street,
            barangay,
            city,
            cityId,
            country,
            province,
            provinceId,
            region,
            regionId,
            branchOfService,
            birthdate
        };
        //  console.log('FormData:', formData);
        dispatch(addMember(formData));
    };

    useLayoutEffect(() => {
        if (user) {
          setMember({
            ...member,
            id: user?._id || '',
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            photo: user?.photo || '',
            isVerified: user?.isVerified || '',
            address: user?.address || '',
            street: user?.street || '',
            barangay: user?.barangay || '',
            city: user?.city || '',
            cityId: user?.cityId || '',
            province: user?.province || '',
            provinceId: user?.provinceId || '',
            region: user?.region || '',
            regionId: user?.regionId || '',
            country: user?.country || '',
            branchOfService: user?.branchOfService || '',
            birthdate: user?.birthdate || '',
            role: user?.role || ''
          });
        }
    }, [user]);

    useEffect(() => {
        if (message === 'Member added successfully') {
        navigate('/profile');
        }
        dispatch(RESET_MEMBER());
    }, [message, navigate, dispatch]);

    const userId = member.id;
    const uploadHandler = async (images, userId) => {
        setProfileImage(images[0]);
        setImagePreview(URL.createObjectURL(images[0]));
        const formData = new FormData();
        Array.from(images).forEach((image) => {
        formData.append('images', image);
        });
        try {
        await axios.post(
            'http://localhost:5000/api/users/upload?userId=' + userId,
            formData
        );
        toast.success('Files uploaded!');
        } catch (err) {
        toast.error(err?.data?.message || err.error);
        }
    };

    setBodyColor({ color: '#ffffff' });
    return (
        <>
        {isLoading && <NewLoader />}
        <section>
            <div className="container">
                <PageMenu />
                <h3>Reservist Information Data Sheet (RIDS)</h3>
                <div className="--flex-start profile">
                    <Card cardClass={'card'}>
                    {!isLoading && user && (
                        <>
                        <div className="profile-photo">
                            <div>
                            <img
                                src={
                                imagePreview === null ? member?.photo : imagePreview
                                }
                                alt="Profileimg"
                            />
                            </div>
                        </div>
                        <form onSubmit={saveMember}>
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
                            <p><label>ID: <span><b>{member?.id}</b></span></label></p>
                            <p><label>Name: <span><b>{member?.name}</b></span></label></p>
                            <p><label>Email: <span><b>{member?.email}</b></span></label></p>
                            <p><label>Date Of Birth: <span><b>{member?.birthdate}</b></span></label></p>
                            <p><label>Phone: <span><b>{member?.phone}</b></span></label></p>
                            <p><label>Branch of Service: <span><b>{member?.branchOfService}</b></span></label></p>
                            <p><label>Street: <span><b>{member?.street}</b></span></label></p>
                            <p><label>Barangay: <span><b>{member?.barangay}</b></span></label></p>
                            <p><label>City: <span><b>{member?.city}</b></span></label></p>
                            <p><label>Province: <span><b>{member?.province}</b></span></label></p>
                            <p><label>Region: <span><b>{member?.region}</b></span></label></p>
                            <p><label>City Code: <span><b>{member?.cityId}</b></span></label></p>
                            <p><label>Province Code: <span><b>{member?.provinceId}</b></span></label></p>
                            <p><label>Region Code: <span><b>{member?.regionId}</b></span></label></p>
                            <br />
                            <button className="--btn --btn-primary --btn-block">
                            Save Profile to RIDS
                            </button>
                        </form>
                        </>
                    )}
                    </Card>
                </div>
            </div>
        </section>
        </>
    )
}

export default AddRids