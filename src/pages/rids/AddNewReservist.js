import React from 'react';
import './AddEduc.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getBranchOfServices } from '../../redux/features/branchOfService/brsvcOfServiceSlice';
import { getRanks } from '../../redux/features/rank/rankSlice';
import Loader from '../../components/loader/Loader';
import { addNewMember, RESET_MEMBER } from '../../redux/features/rids/ridsSlice';

const AddNewReservist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { branchOfServices } = useSelector((state) => state.branchOfService);
  const { ranks } = useSelector((state) => state.rank);
  const { isLoading, message } = useSelector((state) => state.rids);

  // State to manage modal visibility
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    dispatch(getBranchOfServices());
    dispatch(getRanks());
  }, [dispatch]);

  // Form inputs state
  const [rank, setRank] = useState('');
  const [filteredRanks, setFilteredRanks] = useState([]);
  const [brsvc, setBrsvc] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [suffix, setSuffix] = useState('');
  const [afpsn, setAfpsn] = useState('');

  const toggleModal = () => {
    // setIsOpen(!isOpen);
    setIsOpen(false);
    navigate(`/rids`);
  };

  // filter rank based on selected brsvc
  const filterRanks = (brsvc) => {
    const newRanks = ranks.filter((rank) => rank.brsvc === brsvc);
    const sortedRanks = [...newRanks].sort(
      (a, b) => {
        return a["ranking"] - b["ranking"]; // Numbers        
      },
    );
    setFilteredRanks(sortedRanks);
  };

  useEffect(() => {
    filterRanks(brsvc);
  }, [brsvc]);

  const saveNewMember = async (e) => {
    e.preventDefault();

    const formData = {
      id: id,
      rank: rank,
      name: firstName,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      suffix: suffix,
      afpsn: afpsn,
    };
    dispatch(addNewMember(formData));
    setIsOpen(false); // Close modal on submit
    setFirstName(''); // Reset field
    setMiddleName('');
    setLastName('');
    setSuffix('');
    setAfpsn('');
    navigate('/rids');
  };

    useEffect(() => {
        if (message === 'Member added successfully') {
        navigate('/rids');
        }
        dispatch(RESET_MEMBER());
    }, [message, navigate, dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="educ-container">
        <h1>New Record</h1>
        <button onClick={toggleModal} className="open-btn">
          Close Form
        </button>

        {/* Conditional rendering for the pop-up */}
        {isOpen && (
          <div className="modal-overlay" onClick={toggleModal}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={toggleModal}>
                &times;
              </button>

              <h2>Add New Record</h2>
              <form onSubmit={saveNewMember}>
                <div className="form-group">
                  <select
                    name="brsvc"
                    value={brsvc}
                    onChange={(e) => setBrsvc(e.target.value)}
                    required
                  >
                    <option className="item-select" value="">
                      Select Branch of Service
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
                  <select
                    name="rank"
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    required
                  >
                    <option className="item-select" value="">
                      Select Rank
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
                  <input
                    type="text"
                    placeholder="FIRST NAME"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="MIDDLE NAME"
                    name="middleName"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="LAST NAME"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Jr, Sr, III"
                    name="suffix"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="AFP SN"
                    name="afpsn"
                    value={afpsn}
                    onChange={(e) => setAfpsn(e.target.value)}
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddNewReservist;
