import React, { useEffect, useState } from 'react';
import './Rids.scss';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import Loader, { Spinner } from '../../components/loader/Loader';
// import PageMenu from '../../components/pageMenu/PageMenu';
import {
  getMember,
  RESET_MEMBER,
  updateMember,
  photoUpload,
} from '../../redux/features/rids/ridsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import setBodyColor from '../../setBodyColor';
import dateFormat from 'dateformat';
import DatePicker from 'react-datepicker';
import { getUser } from '../../redux/features/auth/authSlice';
import { getBranchOfServices } from '../../redux/features/branchOfService/brsvcOfServiceSlice';
import { getRanks } from '../../redux/features/rank/rankSlice';
import MilitaryActivity from './MilitaryActivity';
import Promotion from './Promotion';
import Dependents from './Dependents';
import CivilianMilitaryAward from './CivilianMilitaryAward';
import MilitaryDesignation from './MilitaryDesignation';
import ActiveDutyTraining from './ActiveDutyTraining';
import MilitarySchooling from './MilitarySchooling';
import EducationalBackground from './EducationalBackground';
import { toast } from 'react-toastify';
import phil from 'phil-reg-prov-mun-brgy';
import printerImg from '../../assets/pdf-printer.png';
import Derogatory from './Derogatory';
import { getAllRegions, getAllProvinces, getAllMunicipalities, getPostalCodesByMunicipality, getAllBarangays } from '@aivangogh/ph-address';

const UpdateRids = () => {
  useRedirectLoggedOutUser('/login');
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, message } = useSelector((state) => state.rids);
  const { member } = useSelector((state) => state.rids);
  const { branchOfServices } = useSelector((state) => state.branchOfService);
  const { ranks } = useSelector((state) => state.rank);

  const userId = id;
  useEffect(() => {
    if (!id) return;
    dispatch(getMember(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getBranchOfServices());
    dispatch(getRanks());
  }, [dispatch]);

  const [membership, setMembership] = useState(member);
  const [birthDate, setBirthDate] = useState(
    membership?.birthdate ? new Date(membership.birthdate) : null,
  );
  const [unitDate, setUnitDate] = useState(
    membership?.effec_date_unit ? new Date(membership.effec_date_unit) : null,
  );
  const [dateUnitDesignation, setDateUnitDesignation] = useState(
    membership?.dateUnitDesignation
      ? new Date(membership.dateUnitDesignation)
      : null,
  );
  const [dateCommission, setDateCommission] = useState(
    membership?.date_commission ? new Date(membership.date_commission) : null,
  );
  const [dateLastPromotion, setDateLastPromotion] = useState(
    membership?.date_last_promotion
      ? new Date(membership.date_last_promotion)
      : null,
  );
  const [rank, setRank] = useState(membership?.rank);
  const [firstName, setFirstName] = useState(membership?.first_name);
  const [middleName, setMiddleName] = useState(membership?.middle_name);
  const [lastName, setLastName] = useState(membership?.last_name);
  const [suffix, setSuffix] = useState(membership?.suffix);
  const [bos, setBos] = useState(membership?.bos);
  const [brsvc, setBrsvc] = useState(membership?.brsvc);
  const [reservistStatus, setReservistStatus] = useState(
    membership?.reservist_status,
  );
  const [reserveGroup, setReserveGroup] = useState(membership?.reserveGroup);
  const [afos, setAfos] = useState(membership?.afos);
  const [sex, setSex] = useState(membership?.sex);
  const [maritalStatus, setMaritalStatus] = useState(
    membership?.marital_status,
  );
  const [bloodType, setBloodType] = useState(membership?.blood_type);
  const [build, setBuild] = useState(membership?.build);
  const [initialRank, setInitialRank] = useState(membership?.initial_rank);
  const [sizeBda, setSizeBda] = useState(membership?.size_bda);
  const [filteredRanks, setFilteredRanks] = useState([]);
  const [filteredBos, setFilteredBos] = useState([]);
  const [bosOption, setBosOption] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);
  const [age, setAge] = useState(null);

  // const { barangays } = phil;
  const regions = getAllRegions();
  const provinces = getAllProvinces();
  const city_mun = getAllMunicipalities();
  const barangays = getAllBarangays();
  const [selectedRegion, setSelectedRegion] = useState(membership?.regionId);
  const [selectedProvince, setSelectedProvince] = useState(membership?.provinceId);
  const [selectedCity, setSelectedCity] = useState(membership?.cityId);
  const [selectedBarangay, setSelectedBarangay] = useState(membership?.barangayId);
  const [selectedPostalCode, setSelectedPostalCode] = useState(membership?.postalCode);

  // State for filtered options
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredBarangays, setFilteredBarangays] = useState([]);
  const [filteredPostalCodes, setFilteredPostalCodes] = useState([]);
  const [filteredRankCode, setFilteredRankCode] = useState([]);

  // const myRegion = regions.find((r) => r.reg_code === selectedRegion);
  // const myProvince = provinces.find((p) => p.prov_code === selectedProvince);
  // const myCity = city_mun.find((c) => c.mun_code === selectedCity);
  const myRegion = regions.find((r) => r.psgcCode === selectedRegion);
  const myProvince = provinces.find((p) => p.psgcCode === selectedProvince);
  const myCity = city_mun.find((c) => c.psgcCode === selectedCity);
  const myBarangay = barangays.find((b) => b.psgcCode === selectedBarangay);
  const newPostalCodes = getPostalCodesByMunicipality(selectedCity);
  const metroManila = newPostalCodes?.find((pc) => pc.municipalityCode === selectedCity);
  const [provinceName, setProvinceName] = useState('');

  // Filter provinces when region changes
  useEffect(() => {
    if (selectedRegion) {
      // const result = provinces.filter((p) => p.reg_code === selectedRegion);
      const result = provinces.filter((p) => p.regionCode === selectedRegion);
      setFilteredProvinces(result);
    } else {
      setFilteredProvinces([]);
    }
      if(selectedRegion === '1300000000') {
        setSelectedProvince(selectedRegion);
      } else {
        setSelectedProvince('');
      }
    // Reset downward selections
    setSelectedCity('');
    setSelectedBarangay('');
  }, [selectedRegion]);

  // Filter cities when province changes
  useEffect(() => {
    if (selectedProvince) {
      // const result = city_mun.filter((c) => c.prov_code === selectedProvince);
      const result = city_mun.filter((c) => c.provinceCode === selectedProvince);
      setFilteredCities(result);

      setProvinceName(myProvince?.name);
    } else {
      setFilteredCities([]);
    }
    // Reset downward selections
      setSelectedCity('');
      setSelectedBarangay('');
  }, [selectedProvince, myProvince?.name]);

  // Filter barangays when city changes
  useEffect(() => {
    if (selectedCity) {
      // const result = barangays.filter((b) => b.mun_code === selectedCity);
      const result = barangays.filter((b) => b.municipalCityCode === selectedCity);
      setFilteredBarangays(result);

      setFilteredPostalCodes(newPostalCodes);
    } else {
      setFilteredBarangays([]);
      setFilteredPostalCodes([]);
    }
    setSelectedBarangay('');
  }, [selectedCity]);

  useEffect(() => {
    if(selectedRegion === '1300000000') {
        setProvinceName(metroManila?.regionName);
    } else {
        setProvinceName(myProvince?.name);
    } 
  }, [selectedRegion, myProvince, metroManila]);

  // filter rank based on selected brsvc
  const filterRanks = (brsvc) => {
    const newRanks = ranks.filter((rank) => rank.brsvc === brsvc);
    const sortedRanks = [...newRanks].sort((a, b) => {
      return a['ranking'] - b['ranking']; // Numbers
    });
    setFilteredRanks(sortedRanks);
  };

  // Find the rank object based on the selected rank
  useEffect(() => {
    if (rank) {
      const result = ranks.filter((r) => r.rank === rank);
      setFilteredRankCode(result);
    } else {
      setFilteredRankCode([]);
    }
  }, [rank]);
  const myRankCode = filteredRankCode[0]?.rank_code;

  useEffect(() => {
    filterRanks(brsvc);
  }, [brsvc]);

  // filter BOS based on selected reserve group
  const filterBos = (reserveGroup) => {
    if (reserveGroup === 'TAS RESERVE') {
      const tasOption = [
        { bos: 'JAGS (Res)' },
        { bos: 'MC (Res)' },
        { bos: 'NC (Res)' },
        { bos: 'DS (Res)' },
        { bos: 'VC (Res)' },
        { bos: 'CoP (Res)' },
        { bos: 'MAC (Res)' },
        { bos: 'CHS (Res)' },
      ];
      setBosOption(tasOption);
    } else {
      const tasOption = [
        { bos: 'PA (Res)' },
        { bos: 'PN (Res)' },
        { bos: 'PN(M) (Res)' },
        { bos: 'PAF (Res)' },
      ];
      setBosOption(tasOption);
    }
  };
  // console.log('BOS:', filteredBos);

  useEffect(() => {
    setFilteredBos(bosOption);
  }, [bosOption]);

  useEffect(() => {
    filterBos(reserveGroup);
  }, [reserveGroup]);

  useEffect(() => {
    setAge(calculateAge(birthDate));
  }, [birthDate]);

  const calculateAge = (birthdateString) => {
    if (!birthdateString) return null;

    const today = new Date();
    const birthDate = new Date(birthdateString);

    // Initial age calculation based purely on years
    let computedAge = today.getFullYear() - birthDate.getFullYear();

    // Check the difference in months and days
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // If the birth month hasn't arrived yet, or it's the birth month
    // but the birth day hasn't passed, reduce age by 1
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      computedAge--;
    }

    return computedAge;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMembership({ ...membership, [name]: value });
  };

  const saveMember = async (e) => {
    e.preventDefault();

    const formData = {
      rank: rank,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      suffix: suffix,
      afpsn: membership?.afpsn,
      designation: membership?.designation,
      reserve_unit: membership?.reserve_unit,
      authority: membership?.authority,
      date_incorporated: membership?.date_incorporated,
      date_retired: membership?.date_retired,
      source_commission: membership?.source_commission,
      lastPromotionAuthority: membership?.lastPromotionAuthority,
      unitAssignment: membership?.unitAssignment,
      unitAssignmentAuthority: membership?.unitAssignmentAuthority,
      unit_designation: membership?.unit_designation,
      unitDesignationAuthority: membership?.unitDesignationAuthority,
      reservist_status: reservistStatus,
      afos: afos,
      mobilization_unit: membership?.mobilization_unit,
      job: membership?.job,
      busi_address: membership?.busi_address,
      busi_number: membership?.busi_number,
      phone: membership?.phone,
      email_add: membership?.email_add,
      street: membership?.street,
      barangay: myBarangay?.name,
      barangayId: selectedBarangay,
      city: myCity.name,
      cityId: selectedCity,
      province: provinceName,
      provinceId: selectedProvince,
      region: myRegion?.name,
      regionId: selectedRegion,
      sex: sex,
      marital_status: maritalStatus,
      nationality: membership?.nationality,
      birthplace: membership?.birthplace,
      religion: membership?.religion,
      blood_type: bloodType,
      sss: membership?.sss,
      height: membership?.height,
      weight: membership?.weight,
      eyes: membership?.eyes,
      hair: membership?.hair,
      size_boots: membership?.size_boots,
      size_cap: membership?.size_cap,
      size_bda: sizeBda,
      scars: membership?.scars,
      tin: membership?.tin,
      spoken_dialects: membership?.spoken_dialects,
      gsis: membership?.gsis,
      skills: membership?.skills,
      emergency_name: membership?.emergency_name,
      emergency_address: membership?.emergency_address,
      emergency_relation: membership?.emergency_relation,
      emergency_number: membership?.emergency_number,
      isVerified: membership?.isVerified,
      branchOfService: membership?.branchOfService,
      birthdate: birthDate,
      effec_date_unit: unitDate,
      dateUnitDesignation: dateUnitDesignation,
      date_commission: dateCommission,
      date_last_promotion: dateLastPromotion,
      brsvc: brsvc,
      initial_rank: initialRank,
      age: age,
      build: build,
      rank_code: myRankCode,
      reserveGroup: reserveGroup,
      bos: bos,
    };
    // console.log('FormData:', formData);
    dispatch(updateMember({ id, formData }));
  };

  useEffect(() => {
    if (message === 'Member updated successfully') {
      navigate(`/updateRids/${id}`);
    }
    dispatch(RESET_MEMBER());
    dispatch(getMember(id));
  }, [message, navigate, dispatch]);

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

  setBodyColor({ color: '#343a40' });

  const checkAfpsn = (e, id, afpsn) => {
    e.preventDefault();
    navigate(`/getOldData/${id}/afpsn/${afpsn}`);
  };

  const handleImageClick = (e, id) => {
    e.preventDefault();
    navigate(`/printRids/${id}`);
  };

  return (
    <>
      {isLoading && <Loader />}
      <section>
        <div className="container">
          {isLoading && <Spinner />}
          {/* <PageMenu /> */}
          <div className="rids">
            <div className="rids-frame">
              <center>
                <h5>ARMED FORCES OF THE PHILIPPINES</h5>
                <h3>RESERVIST INFORMATION DATA SHEET</h3>
              </center>
              <br />
              <form onSubmit={saveMember}>
                <div className="rids-container nowrap">
                  <div className="item-one" style={{ width: '9%' }}>
                    <div>
                      <select
                        name="rank"
                        value={rank || ''}
                        onChange={(e) => setRank(e.target.value)}
                        required
                      >
                        <option className="item-select" value="">
                          Select...
                        </option>
                        {filteredRanks.length > 0 &&
                          filteredRanks.map((rank) => (
                            <option
                              className="item-select"
                              key={rank._id}
                              value={rank?.rank}
                            >
                              {rank?.rank}
                            </option>
                          ))}
                      </select>
                      <label>(RANK)</label>
                    </div>
                  </div>
                  <div className="item-one" style={{ width: '20%' }}>
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        value={firstName || ''}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <label>(FIRST NAME)</label>
                    </div>
                  </div>
                  <div className="item-one" style={{ width: '20%' }}>
                    <div>
                      <input
                        type="text"
                        placeholder="Middle Name"
                        name="middle_name"
                        value={middleName || ''}
                        onChange={(e) => setMiddleName(e.target.value)}
                      />
                      <label>(MIDDLE NAME)</label>
                    </div>
                  </div>
                  <div className="item-one" style={{ width: '20%' }}>
                    <div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        value={lastName || ''}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <label>(LAST NAME)</label>
                    </div>
                  </div>
                  <div className="item-one" style={{ width: '10%' }}>
                    <div>
                      <input
                        type="text"
                        placeholder="Jr, Sr, III"
                        name="suffix"
                        value={suffix || ''}
                        onChange={(e) => setSuffix(e.target.value)}
                      />
                      <label>(SUFFIX)</label>
                    </div>
                  </div>
                  <div className="item-one" style={{ width: '13%' }}>
                    <div>
                      <input
                        type="text"
                        placeholder="AFP SN"
                        name="afpsn"
                        value={membership?.afpsn || ''}
                        onChange={handleInputChange}
                      />

                      {member?.afpsn && member?.isMain === false ? (
                        <label
                          onClick={(e) => checkAfpsn(e, id, membership?.afpsn)}
                        >
                          AFPSN &#10003;
                        </label>
                      ) : (
                        <label>AFPSN</label>
                      )}
                    </div>
                  </div>
                  <div className="item-one" style={{ width: '12%' }}>
                    <div>
                      <select
                        name="bos"
                        placeholder="BR SVC"
                        value={bos || ''}
                        onChange={(e) => setBos(e.target.value)}
                        required
                      >
                        <option className="item-select" value="">
                          Select...
                        </option>
                        {filteredBos.length > 0 &&
                          filteredBos.map((bo) => (
                            <option
                              className="item-select"
                              key={bo._id}
                              value={bo?.bos}
                            >
                              {bo?.bos}
                            </option>
                          ))}
                      </select>
                      <label>BR SVC</label>
                    </div>
                  </div>
                </div>
                <br />
                <div className="rids-container nowrap">
                  <div className="item" style={{ width: '50%' }}>
                    <div>
                      <input
                        className="input-one"
                        type="text"
                        placeholder=""
                        name="designation"
                        value={membership?.designation || ''}
                        onChange={handleInputChange}
                      />
                      <label className="label-one">(APPOINTMENT)</label>
                    </div>
                  </div>
                  <div className="item" style={{ width: '50%' }}>
                    <div>
                      <input
                        className="input-one"
                        type="text"
                        placeholder=""
                        name="reserve_unit"
                        value={membership?.reserve_unit || ''}
                        onChange={handleInputChange}
                      />
                      <label className="label-one">(RESERVE UNIT)</label>
                    </div>
                  </div>
                </div>

                <div className="rids-container nowrap">
                  <div className="item" style={{ width: '50%' }}>
                    <div>
                      <input
                        className="input-one"
                        type="text"
                        placeholder=""
                        name="date_incorporated"
                        value={membership?.date_incorporated || ''}
                        onChange={handleInputChange}
                      />
                      <label className="label-one">
                        (DATE OF INCORPORATION: for Retired AFP Officers and
                        Enlisted Personnel only)
                      </label>
                    </div>
                  </div>
                  <div className="item" style={{ width: '50%' }}>
                    <div>
                      <input
                        className="input-one"
                        type="text"
                        placeholder=""
                        name="date_retired"
                        value={membership?.date_retired || ''}
                        onChange={handleInputChange}
                      />
                      <label className="label-one">(DATE OF RETIREMENT)</label>
                    </div>
                  </div>
                </div>
                <div className="rids-container nowrap">
                  <div className="item" style={{ width: '50%' }}>
                    <div>
                      <input
                        className="input-one"
                        type="text"
                        placeholder=""
                        name="source_commission"
                        value={membership?.source_commission || ''}
                        onChange={handleInputChange}
                      />
                      <label className="label-one">
                        (SOURCE OF COMMISION / ENLISTMENT)
                      </label>
                    </div>
                  </div>
                  <div className="item" style={{ width: '50%' }}>
                    <div>
                      <select
                        name="afos"
                        value={afos}
                        onChange={(e) => setAfos(e.target.value)}
                      >
                        <option className="item-select" value="">
                          -- select --
                        </option>
                        <option className="item-select" value="JAGS">
                          Judge Advocate General Service (Res)
                        </option>
                        <option className="item-select" value="MC">
                          Medical Corps (Res)
                        </option>
                        <option className="item-select" value="NC">
                          Nurse Corps (Res)
                        </option>
                        <option className="item-select" value="DS">
                          Dental Service (Res)
                        </option>
                        <option className="item-select" value="VC">
                          Veterinary Corps (Res)
                        </option>
                        <option className="item-select" value="CoP">
                          Corps of Professors (Res)
                        </option>
                        <option className="item-select" value="MAC">
                          Medical Administrative Corps (Res)
                        </option>
                        <option className="item-select" value="CoE">
                          Corps of Engineers (Res)
                        </option>
                        <option className="item-select" value="CHS">
                          Chaplain Service (Res)
                        </option>
                      </select>
                      <label className="label-one">TAS Reserve (Corps)</label>
                    </div>
                  </div>
                </div>
                <div className="rids-container nowrap">
                  <div className="item" style={{ width: '30%' }}>
                    <div>
                      <select
                        name="reserveGroup"
                        value={reserveGroup}
                        onChange={(e) => setReserveGroup(e.target.value)}
                      >
                        <option className="item-select" value="">
                          -- select --
                        </option>
                        <option className="item-select" value="TAS RESERVE">
                          TAS RESERVE
                        </option>
                        <option
                          className="item-select"
                          value="AFFILIATED RESERVE"
                        >
                          AFFILIATED RESERVE
                        </option>
                      </select>
                      <label className="label-one">(RESERVIST GROUP)</label>
                    </div>
                  </div>
                  <div className="item" style={{ width: '18%' }}>
                    <div>
                      <select
                        name="reservist_status"
                        value={reservistStatus}
                        onChange={(e) => setReservistStatus(e.target.value)}
                      >
                        <option
                          style={{ textAlign: 'center' }}
                          className="item-select"
                          value=""
                        >
                          -- select --
                        </option>
                        <option
                          style={{ textAlign: 'center' }}
                          className="item-select"
                          value="READY RESERVE"
                        >
                          READY RESERVE
                        </option>
                        <option
                          style={{ textAlign: 'center' }}
                          className="item-select"
                          value="STANDBY RESERVE"
                        >
                          STANDBY RESERVE
                        </option>
                        <option
                          style={{ textAlign: 'center' }}
                          className="item-select"
                          value="RETIRED RESERVE"
                        >
                          RETIRED RESERVE
                        </option>
                      </select>
                      <label
                        className="label-one"
                        style={{ textAlign: 'center' }}
                      >
                        (MILITARY STATUS)
                      </label>
                    </div>
                  </div>
                  <div className="item" style={{ width: '50%' }}>
                    <div>
                      <input
                        className="input-one"
                        type="text"
                        placeholder=""
                        name="mobilization_unit"
                        value={membership?.mobilization_unit}
                        onChange={handleInputChange}
                      />
                      <label className="label-one">(MOBILIZATION UNIT)</label>
                    </div>
                  </div>
                </div>
                <div className="rids-container nowrap">
                  <div className="item" style={{ width: '30%' }}>
                    <div>
                      <DatePicker
                        selected={dateCommission}
                        value={dateFormat(dateCommission, 'dd-mmm-yyyy')}
                        onChange={(date) => setDateCommission(date)}
                      />
                      <label className="label-one">
                        (DATE OF COMMISSION/ENLISTMENT)
                      </label>
                    </div>
                  </div>
                  <div className="item" style={{ width: '18%' }}>
                    <div>
                      <select
                        name="initial_rank"
                        value={initialRank || ''}
                        onChange={(e) => setInitialRank(e.target.value)}
                        required
                      >
                        <option
                          className="item-select"
                          value=""
                          style={{ textAlign: 'center' }}
                        >
                          Select...
                        </option>
                        {filteredRanks.length > 0 &&
                          filteredRanks.map((ranke) => (
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              key={ranke._id}
                              value={ranke?.rank}
                            >
                              {ranke?.rank}
                            </option>
                          ))}
                      </select>
                      <label
                        className="label-one"
                        style={{ textAlign: 'center' }}
                      >
                        (INITIAL RANK)
                      </label>
                    </div>
                  </div>
                  <div className="item" style={{ width: '50%' }}>
                    <div>
                      <input
                        className="input-one"
                        type="text"
                        placeholder=""
                        name="authority"
                        value={membership?.authority || ''}
                        onChange={handleInputChange}
                      />
                      <label className="label-one">(AUTHORITY)</label>
                    </div>
                  </div>
                </div>
                <div className="rids-container nowrap">
                  <div className="item" style={{ width: '30%' }}>
                    <div>
                      <select
                        name="brsvc"
                        value={brsvc || ''}
                        onChange={(e) => setBrsvc(e.target.value)}
                        required
                      >
                        <option className="item-select" value="">
                          Select...
                        </option>
                        {branchOfServices.length > 0 &&
                          branchOfServices.map((brsvc) => (
                            <option
                              className="item-select"
                              key={brsvc._id}
                              value={brsvc?.brsvc}
                            >
                              {brsvc?.brsvc}
                            </option>
                          ))}
                      </select>
                      <label className="label-one">MAJOR SVC (Rank)</label>
                    </div>
                  </div>
                  <div className="item" style={{ width: '18%' }}>
                    <div>
                      <DatePicker
                        selected={dateLastPromotion}
                        value={dateFormat(dateLastPromotion, 'dd-mmm-yyyy')}
                        onChange={(date) => setDateLastPromotion(date)}
                      />
                      <label
                        className="label-one"
                        style={{ textAlign: 'center' }}
                      >
                        (DATE OF LAST PROMOTION)
                      </label>
                    </div>
                  </div>
                  <div className="item" style={{ width: '50%' }}>
                    <div>
                      <input
                        className="input-one"
                        type="text"
                        placeholder=""
                        name="lastPromotionAuthority"
                        value={membership?.lastPromotionAuthority || ''}
                        onChange={handleInputChange}
                      />
                      <label className="label-one">
                        (AUTHORITY OF LAST PROMOTION)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="rids-container nowrap">
                  <div className="item" style={{ width: '30%' }}>
                    <div>
                      <input
                        className="input-one"
                        type="text"
                        placeholder=""
                        name="reserve_unit"
                        value={membership?.reserve_unit || ''}
                        onChange={handleInputChange}
                      />
                      <label className="label-one">(UNIT ASSIGNMENT)</label>
                    </div>
                  </div>
                  <div className="item" style={{ width: '18%' }}>
                    <div>
                      <DatePicker
                        selected={unitDate}
                        value={dateFormat(unitDate, 'dd-mmm-yyyy')}
                        onChange={(date) => setUnitDate(date)}
                      />
                      <label
                        className="label-one"
                        style={{ textAlign: 'center' }}
                      >
                        (EFFECTIVE DATE)
                      </label>
                    </div>
                  </div>
                  <div className="item" style={{ width: '50%' }}>
                    <div>
                      <input
                        className="input-one"
                        type="text"
                        placeholder=""
                        name="unitAssignmentAuthority"
                        value={membership?.unitAssignmentAuthority || ''}
                        onChange={handleInputChange}
                      />
                      <label className="label-one">
                        (AUTHORITY OF UNIT ASSIGNMENT)
                      </label>
                    </div>
                  </div>
                </div>
                <div className="rids-container nowrap">
                  <div className="item" style={{ width: '30%' }}>
                    <div>
                      <input
                        className="input-one"
                        type="text"
                        placeholder=""
                        name="unit_designation"
                        value={membership?.unit_designation || ''}
                        onChange={handleInputChange}
                      />
                      <label className="label-one">(UNIT DESIGNATION)</label>
                    </div>
                  </div>
                  <div className="item" style={{ width: '18%' }}>
                    <div>
                      <DatePicker
                        selected={dateUnitDesignation}
                        value={dateFormat(dateUnitDesignation, 'dd-mmm-yyyy')}
                        onChange={(date) => setDateUnitDesignation(date)}
                      />
                      <label
                        className="label-one"
                        style={{ textAlign: 'center' }}
                      >
                        (EFFECTIVE DATE)
                      </label>
                    </div>
                  </div>
                  <div className="item" style={{ width: '50%' }}>
                    <div>
                      <input
                        className="input-one"
                        type="text"
                        placeholder=""
                        name="unitDesignationAuthority"
                        value={membership?.unitDesignationAuthority || ''}
                        onChange={handleInputChange}
                      />
                      <label className="label-one">
                        (AUTHORITY OF UNIT DESIGNATION)
                      </label>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <div className="--flex-start">
                  <table className="table">
                    {/* <!-- Row 1: Headers --> */}
                    <tbody>
                      <tr>
                        <th style={{ width: '35%' }}>
                          Civilian Occupation/Designation
                        </th>
                        <td style={{ width: '65%' }}>
                          <input
                            className="input-two"
                            type="text"
                            placeholder=""
                            name="job"
                            value={membership?.job}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>

                      {/* <!-- Row 2: First data row --> */}
                      <tr>
                        <th>Business Address</th>
                        <td>
                          <input
                            className="input-two"
                            type="text"
                            placeholder=""
                            name="busi_address"
                            value={membership?.busi_address}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Business Contact Number</th>
                        <td>
                          <input
                            className="input-two"
                            type="text"
                            placeholder=""
                            name="busi_number"
                            value={membership?.busi_number}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <br />
                <br />
                <h5>
                  <b>HOME ADDRESS</b>
                </h5>
                <div className="--flex-start">
                  <table className="table">
                    <tbody>
                      {/* <!-- Row 2: First data row --> */}
                      <tr>
                        <th style={{ width: '35%' }}>House/Bldg Nr/ Street</th>
                        <td style={{ width: '65%' }}>
                          <input
                            className="input-two"
                            type="text"
                            placeholder=""
                            name="street"
                            value={membership?.street}
                            onChange={handleInputChange}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Subd/Brgy/Dist/locality</th>
                        <td>
                          <select
                            name="barangay"
                            style={{ border: '0px' }}
                            value={selectedBarangay}
                            onChange={(e) =>
                              setSelectedBarangay(e.target.value)
                            }
                            disabled={!selectedCity}
                            required
                          >
                            {!selectedCity && (
                              <option value="">
                                Select City/Municipality first
                              </option>
                            )}
                            {selectedCity && (
                              <option value="">Select Barangay</option>
                            )}
                            {filteredBarangays.map((b) => (
                              <option key={b.psgcCode} value={b.psgcCode}>
                                {b.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th>Postal Code</th>
                        <td>
                          <select
                            name="postalCode"
                            style={{ border: '0px' }}
                            value={selectedPostalCode}
                            onChange={(e) =>
                              setSelectedPostalCode(e.target.value)
                            }
                            disabled={!selectedCity}
                            required
                          >
                            {!selectedCity && ( 
                              <option value=''>Postal Code</option>
                            )}
                            {selectedCity && (
                              <option value="">Select Postal Code</option>
                            )}
                              {filteredPostalCodes.map((pc, index) => (
                                <option key={pc.postalCode + index} value={pc.postalCode}>
                                  {`${pc.placeName} ${pc.postalCode}`}
                                </option>
                              ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th>City/Municipality</th>
                        <td>
                          <select
                            name="city"
                            style={{ border: '0px' }}
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            disabled={!selectedProvince}
                            required
                          >
                            {!selectedProvince && (
                              <option value="">Select Province first</option>
                            )}
                            {selectedProvince && (
                              <option value="">Select City/Municipality</option>
                            )}
                            {filteredCities.map((c) => (
                                <option key={c.psgcCode} value={c.psgcCode}>
                                  {c.name}
                                </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th>Province/District</th>
                        <td>
                          <select
                            name="province"
                            style={{ border: '0px' }}
                            value={selectedProvince}
                            onChange={(e) =>
                              setSelectedProvince(e.target.value)
                            }
                            disabled={!selectedRegion}
                          >
                            {!selectedRegion && (
                              <option value="">Select Region first</option>
                            )}
                            {selectedRegion && (
                              <option value="">Select Province</option>
                            )}
                            {filteredProvinces.map((p, index) => (
                              <option key={p.psgcCode + index} value={p.psgcCode}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th>Region</th>
                        <td>
                          <select
                            name="region"
                            style={{ border: '0px' }}
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            required
                          >
                            <option value="">Select Region</option>
                            {regions.map((r) => (
                              <option key={r.psgcCode} value={r.psgcCode}>
                                {r.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th>Contact Nr (Cellphone Nr)</th>
                        <td>
                          <input
                            className="input-two"
                            type="text"
                            placeholder=""
                            name="phone"
                            value={membership?.phone}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Email Address</th>
                        <td>
                          <input
                            className="input-two"
                            type="text"
                            placeholder=""
                            name="email_add"
                            value={membership?.email_add}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <br />
                <br />
                <div className="rids-table">
                  <table className="table-one">
                    <tbody>
                      <tr>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '4%' }}
                        >
                          SEX:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '16%' }}
                        >
                          <select
                            name="sex"
                            value={sex}
                            onChange={(e) => setSex(e.target.value)}
                          >
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value=""
                            >
                              -- select --
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="Male"
                            >
                              Male
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="Female"
                            >
                              Female
                            </option>
                          </select>
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '15%' }}
                        >
                          &nbsp;MARITAL STATUS:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '25%' }}
                        >
                          <select
                            name="marital_status"
                            value={maritalStatus}
                            onChange={(e) => setMaritalStatus(e.target.value)}
                          >
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value=""
                            >
                              -- select --
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="Single"
                            >
                              Single
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="Married"
                            >
                              Married
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="Separated"
                            >
                              Separated
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="Widowed"
                            >
                              Widowed
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="Annulled"
                            >
                              Annulled
                            </option>
                          </select>
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '12%' }}
                        >
                          &nbsp;NATIONALITY:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '28%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="nationality"
                            value={membership?.nationality}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rids-table">
                  <table className="table-one">
                    <tbody>
                      <tr>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '25%' }}
                        >
                          DATE OF BIRTH (dd/mm/yyyy):
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '19%' }}
                        >
                          <div>
                            <DatePicker
                              selected={birthDate}
                              value={birthDate}
                              onChange={(date) => setBirthDate(date)}
                            />
                          </div>
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '15%' }}
                        >
                          &nbsp;PLACE OF BIRTH:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '17%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="birthplace"
                            value={membership?.birthplace}
                            onChange={handleInputChange}
                          />
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '8%' }}
                        >
                          &nbsp;RELIGION:&nbsp;
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '16%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="religion"
                            value={membership?.religion}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rids-table">
                  <table className="table-one">
                    <tbody>
                      <tr>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '12%' }}
                        >
                          BLOOD TYPE:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '8%' }}
                        >
                          <select
                            name="blood_type"
                            value={bloodType}
                            onChange={(e) => setBloodType(e.target.value)}
                          >
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="Uncategorized"
                            >
                              -- select --
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="A"
                            >
                              A
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="A+"
                            >
                              A+
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="A-"
                            >
                              A-
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="B"
                            >
                              B
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="B+"
                            >
                              B+
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="B-"
                            >
                              B-
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="AB"
                            >
                              AB
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="AB+"
                            >
                              AB+
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="AB-"
                            >
                              AB-
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="O"
                            >
                              O
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="O+"
                            >
                              O+
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="O-"
                            >
                              O-
                            </option>
                          </select>
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '7%' }}
                        >
                          &nbsp;SSS Nr:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '17%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="sss"
                            value={membership?.sss}
                            onChange={handleInputChange}
                          />
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '8%' }}
                        >
                          &nbsp;HEIGHT:&nbsp;
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '12%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="height"
                            value={membership?.height}
                            onChange={handleInputChange}
                          />
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '8%' }}
                        >
                          &nbsp;WEIGHT:&nbsp;
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '12%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="weight"
                            value={membership?.weight}
                            onChange={handleInputChange}
                          />
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '6%' }}
                        >
                          BUILD:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '10%' }}
                        >
                          <select
                            name="build"
                            value={build}
                            onChange={(e) => setBuild(e.target.value)}
                          >
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="Uncategorized"
                            >
                              -- select --
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="Heavy"
                            >
                              Heavy
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="Medium"
                            >
                              Medium
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="Light"
                            >
                              Light
                            </option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rids-table">
                  <table className="table-one">
                    <tbody>
                      <tr>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '14%' }}
                        >
                          COLOR OF EYES:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '18%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="eyes"
                            value={membership?.eyes}
                            onChange={handleInputChange}
                          />
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '15%' }}
                        >
                          &nbsp;COLOR OF HAIR:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '17%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="hair"
                            value={membership?.hair}
                            onChange={handleInputChange}
                          />
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '22%' }}
                        >
                          &nbsp;SIZE OF COMBAT BOOTS:&nbsp;
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '14%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="size_boots"
                            value={membership?.size_boots}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rids-table">
                  <table className="table-one">
                    <tbody>
                      <tr>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '11%' }}
                        >
                          SIZE OF CAP:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '9%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="size_cap"
                            value={membership?.size_cap}
                            onChange={handleInputChange}
                          />
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '12%' }}
                        >
                          &nbsp;SIZE OF BDA:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '13%' }}
                        >
                          <select
                            name="size_bda"
                            value={sizeBda}
                            onChange={(e) => setSizeBda(e.target.value)}
                          >
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value=""
                            >
                              -- select --
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="small"
                            >
                              small
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="medium"
                            >
                              medium
                            </option>
                            <option
                              style={{ textAlign: 'center' }}
                              className="item-select"
                              value="large"
                            >
                              large
                            </option>
                          </select>
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '23%' }}
                        >
                          &nbsp;OTHER IDENTIFYING DATA:&nbsp;
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '32%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="scars"
                            value={membership?.scars}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rids-table">
                  <table className="table-one">
                    <tbody>
                      <tr>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '7%' }}
                        >
                          TIN Nr:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '21%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="tin"
                            value={membership?.tin}
                            onChange={handleInputChange}
                          />
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '16%' }}
                        >
                          &nbsp;DIALECTS SPOKEN:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '56%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="spoken_dialects"
                            value={membership?.spoken_dialects}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rids-table">
                  <table className="table-one">
                    <tbody>
                      <tr>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '7%' }}
                        >
                          GSIS Nr:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '15%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="gsis"
                            value={membership?.gsis}
                            onChange={handleInputChange}
                          />
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '31%' }}
                        >
                          &nbsp;PROFESSIONAL SKILL AND SPECIALTY:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '47%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="skills"
                            value={membership?.skills}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <br />
                <br />
                <h5>
                  <b>PERSON TO BE NOTIFIED IN CASE OF EMERGENCY:</b>
                </h5>
                <div className="rids-table">
                  <table className="table-one">
                    <tbody>
                      <tr>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '6%' }}
                        >
                          NAME:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '29%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="emergency_name"
                            value={membership?.emergency_name}
                            onChange={handleInputChange}
                          />
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '9%' }}
                        >
                          &nbsp;ADDRESS:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '56%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="emergency_address"
                            value={membership?.emergency_address}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rids-table">
                  <table className="table-one">
                    <tbody>
                      <tr>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '17%' }}
                        >
                          CONTACT NUMBER:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '29%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="emergency_number"
                            value={member?.emergency_number}
                            onChange={handleInputChange}
                          />
                        </td>
                        <th
                          className="th-one"
                          style={{ border: '0', width: '10%' }}
                        >
                          &nbsp;RELATIONSHIP:
                        </th>
                        <td
                          className="td-one"
                          style={{ border: '0', width: '44%' }}
                        >
                          <input
                            className="input-three"
                            type="text"
                            placeholder=""
                            name="emergency_relation"
                            value={member?.emergency_relation}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <br />
                <br />
                <EducationalBackground id={id} />
                <br />
                <br />
                <MilitarySchooling id={id} />
                <br />
                <br />
                <ActiveDutyTraining id={id} />
                <br />
                <br />
                <MilitaryDesignation id={id} />
                <br />
                <br />
                <CivilianMilitaryAward id={id} />
                <br />
                <br />
                <Dependents id={id} />
                <br />
                <br />
                <Promotion id={id} />
                <br />
                <br />
                <MilitaryActivity id={id} />
                <br />
                <br />
                <Derogatory id={id} />
                <br />
                <br />
                <h5>
                  <b>
                    I HEREBY CERTIFY that all entries in this document are
                    correct:
                  </b>
                </h5>
                <div className="rids-table">
                  <table className="table-two">
                    <tbody>
                      <tr>
                        <td
                          className="td-two"
                          style={{ border: '0', width: '10%' }}
                        >
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
                        <td
                          className="td-two"
                          style={{ border: '0', width: '10%' }}
                        >
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
                        <td
                          className="td-two"
                          style={{ border: '0', width: '10%' }}
                        >
                          &nbsp;
                        </td>
                        <td
                          className="td-two"
                          style={{ border: '0', width: '24%' }}
                        >
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
                        <td
                          className="td-two"
                          style={{ border: '0', width: '10%' }}
                        >
                          &nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td className="td-two" style={{ border: '0' }}>
                          &nbsp;
                        </td>
                        <td className="td-two" style={{ border: '0' }}>
                          LEFT THUMBMARK
                          <br />
                          <div className="--my">
                            <button type="submit" className="--btn --btn-primary">
                              Update RIDS
                            </button>
                          </div>
                        </td>
                        <td className="td-two" style={{ border: '0' }}>
                          &nbsp;
                        </td>
                        <td className="td-two" style={{ border: '0' }}>
                          RIGHT THUMBMARK
                          <br />
                          <div className="--my">
                            &nbsp;
                          </div>
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
              </form>
                    <div>
                    <img 
                      src={printerImg} 
                      alt='Print RIDS'
                      onClick={(e) => handleImageClick(e, id)}
                      style={{ cursor: 'pointer', width: '50px', borderRadius: '8px' }} />
                  </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateRids;
