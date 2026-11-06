import { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ChangeAddress.scss';
import {
  getAllRegions,
  getAllProvinces,
  getAllMunicipalities,
  getAllBarangays,
  getPostalCodesByMunicipality,
} from '@aivangogh/ph-address';
import { countries } from 'countries-list';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { Spinner } from '../../loader/Loader';
import Card from '../../card/Card';
import { toast } from 'react-toastify';
import { changeAddress } from '../../../redux/features/auth/authSlice';

const initialState = {
  street: '',
  barangay: '',
  barangayId: '',
  city: '',
  cityId: '',
  province: '',
  provinceId: '',
  region: '',
  regionId: '',
  countryCode: '',
  country: '',
  postalCode: '',
  postalCodeId: '',
};

const PsgcAddress = () => {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((state) => state.auth);

  const regions = getAllRegions();
  const provinces = getAllProvinces();
  const city_mun = getAllMunicipalities();
  const barangays = getAllBarangays();
  // const postalCodes = getAllPostalCodes();
  
  const [formData, setFormData] = useState(initialState);
  const [street, setStreet] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('PH');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');
  const [selectedPostalCode, setSelectedPostalCode] = useState('');

  // State for filtered options
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredBarangays, setFilteredBarangays] = useState([]);
  const [filteredPostalCodes, setFilteredPostalCodes] = useState([]);

  const myRegion = regions.find((r) => r.psgcCode === selectedRegion);
  const myProvince = provinces.find((p) => p.psgcCode === selectedProvince);
  const myCity = city_mun.find((c) => c.psgcCode === selectedCity);
  const myBarangay = barangays.find((b) => b.psgcCode === selectedBarangay);
  const newPostalCodes = getPostalCodesByMunicipality(selectedCity);
  const metroManila = newPostalCodes?.find((pc) => pc.municipalityCode === selectedCity);
  const [provinceName, setProvinceName] = useState('');

  // Filter provinces when region changes
  useEffect(() => {
    // Reset downward selections
        if (selectedRegion) {
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
    setSelectedCity('');
    setSelectedBarangay('');
  }, [selectedRegion]);
  
  // Filter cities when province changes
  useEffect(() => {
        if (selectedProvince) {
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

  useLayoutEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        id: user?._id || '',
        street: street || '',
        barangay: myBarangay?.name || '',
        barangayId: selectedBarangay || '',
        city: myCity?.name || '',
        cityId: selectedCity || '',
        province: provinceName,
        provinceId: selectedProvince || '',
        region: myRegion?.name || '',
        regionId: selectedRegion || '',
        countryCode: selectedCountry || '',
        country: countries[selectedCountry]?.name || '',
        postalCodeId: selectedPostalCode || '',
      });
    }
  }, [user]);

  const updateAddress = async (e) => {
    e.preventDefault();

    const userData = {
      id: user?._id,
      street: street,
      barangay: myBarangay?.name,
      barangayId: selectedBarangay,
      city: myCity?.name,
      cityId: selectedCity,
      province: provinceName,
      provinceId: selectedProvince,
      region: myRegion?.name,
      regionId: selectedRegion,
      country: countries[selectedCountry]?.name,
      countryCode: selectedCountry,
      postalCodeId: selectedPostalCode,
    };

    toast.success('Address updated successfully');
    await dispatch(changeAddress(userData));
    navigate(`/${user?.role}/profile`);
    // console.log(userData);
  };

  return (
    <>
      <section>
        <div className='container'>
          <h2>Change Address</h2>
          <h3>Philippine Standard Geographic Code (PSGC)</h3>
          <div className='--flex-start change-address'>
            <Card cardClass={'card'}>
              <>
                <form onSubmit={updateAddress}>
                  <p>
                    <input
                      type='text'
                      placeholder='House Number/ Street'
                      name='street'
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </p>
                  <p>
                    <select
                      name='barangay'
                      value={selectedBarangay}
                      onChange={(e) => setSelectedBarangay(e.target.value)}
                      disabled={!selectedCity}
                    >
                      {!selectedCity && (
                        <option value=''>Barangay</option>
                      )}
                      {selectedCity && (
                        <option value=''>Select Barangay</option>
                      )}
                      {filteredBarangays.map((b) => (
                        <option key={b.psgcCode} value={b.psgcCode}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </p>
                  <p>
                    <select
                      name='postalCode'
                      value={selectedPostalCode}
                      onChange={(e) => setSelectedPostalCode(e.target.value)}
                      disabled={!selectedCity}
                    >
                      {!selectedCity && ( 
                        <option value=''>Postal Code</option>
                      )}
                      <option value=''>Select Postal Code</option>
                      {filteredPostalCodes.map((pc, index) => (
                        <option key={pc.postalCode + index} value={pc.postalCode}>
                          {`${pc.placeName} ${pc.postalCode}`}
                        </option>
                      ))}
                    </select>
                  </p>
                  <p>
                    <select
                      name='city'
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      disabled={!selectedProvince}
                    >
                      {!selectedProvince && (
                        <option value=''>City/Municipality</option>
                      )}
                      {selectedProvince && (
                        <option value=''>Select City/Municipality</option>
                      )}
                      {filteredCities.map((c) => (
                        <option key={c.psgcCode} value={c.psgcCode}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </p>
                  <p>
                    <select
                      name='province'
                      value={selectedProvince}
                      onChange={(e) => setSelectedProvince(e.target.value)}
                      disabled={!selectedRegion}
                    >
                      {!selectedRegion && (
                        <option value=''>Province</option>
                      )}
                      {selectedRegion && (
                        <option value=''>Select Province</option>
                      )}
                      {filteredProvinces.map((p) => (
                        <option key={p.psgcCode} value={p.psgcCode}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </p>
                  <p>
                    <select
                      name='region'
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                      <option value=''>Select Region</option>
                      {regions.map((r) => (
                        <option key={r.psgcCode} value={r.psgcCode}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </p>
                  <p>
                    <select
                      name='country'
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                      <option value=''>Select Country</option>
                      {Object.keys(countries).map((code) => (
                        <option key={code} value={code}>
                          {countries[code].name}
                        </option>
                      ))}
                    </select>
                  </p>

                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <button
                      type='submit'
                      className='--btn --btn-danger --btn-block'
                    >
                      Change Address
                    </button>
                  )}
                </form>
              </>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default PsgcAddress;
