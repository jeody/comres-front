import React, { useEffect, useState } from 'react';
import './AddEduc.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMember, selectMember, updateMemberPromotion } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';
import { getBranchOfServices } from '../../redux/features/branchOfService/brsvcOfServiceSlice';
import { getRanks } from '../../redux/features/rank/rankSlice';

const AddPromotion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { branchOfServices } = useSelector((state) => state.branchOfService);
  const { ranks } = useSelector((state) => state.rank);

    const { isLoading } = useSelector((state) => state.rids);
    const member = useSelector(selectMember);

    // State to manage modal visibility
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (!id) return; 
        dispatch(getMember(id));
     }, [dispatch, id]);

    useEffect(() => {
        dispatch(getBranchOfServices());
        dispatch(getRanks());
    }, [dispatch]);
    
    // Form inputs state
    const [promotion, setPromotion] = useState(member);
    const [rank, setRank] = useState('');
    const [rankTo, setRankTo] = useState('');
    const [filteredRanks, setFilteredRanks] = useState([]);
    const [brsvc, setBrsvc] = useState('');

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${id}`);
    };

      // filter rank based on selected brsvc
    const filterRanks = (brsvc) => {
        const newRanks = ranks.filter((rank) => rank.brsvc === brsvc)
        const sortedRanks = [...newRanks].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setFilteredRanks(sortedRanks)
    };

    useEffect(() => {
        filterRanks(brsvc)
    }, [brsvc])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPromotion({ ...promotion, [name]: value });
    };

    const saveMemberPromotion = async (e) => {
        e.preventDefault();

        const formData = {
            id: promotion?._id,
            promotions: [
                {
                prom_from: rank,
                prom_to: rankTo,
                prom_authority: promotion?.prom_authority,
                prom_effectivity: promotion?.prom_effectivity,
                brsvc: brsvc,
                }
            ],
        };
        dispatch(updateMemberPromotion({ id, formData }));
        setIsOpen(false); // Close modal on submit
        setPromotion('');     // Reset field
        navigate(`/updateRids/${id}`);
    };

  return (
    <>
    {isLoading && <Loader />}
    <div className="educ-container">
      <h1>Promotion</h1>
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
            
            <h2>Add Promotion</h2>
            <form onSubmit={saveMemberPromotion}>
              <div className="form-group">

                <select
                  name="brsvc"
                  value={brsvc}
                  onChange={(e) => setBrsvc(e.target.value)} 
                  required
                >
                  <option className="item-select" value="">Select Branch of Service</option>
                    {branchOfServices.length > 0 &&
                     branchOfServices.map((brsvc) => (
                    <option className="item-select" key={brsvc._id} value={brsvc?.brsvc}>
                      {brsvc?.brsvc}
                    </option>
                  ))}
                </select>

                <label style={{ color: "#0000ff" }}>FROM</label>
                <select
                  name="prom_from"
                  value={rank || promotion?.prom_from}
                  onChange={(e) => setRank(e.target.value)} 
                  required
                >
                  <option className="item-select" value="">Select...</option>
                  <option className="item-select" value="Civilian">Civilian</option>
                    {filteredRanks.length > 0 &&
                      filteredRanks.map((rank) => (
                    <option className="item-select" key={rank._id} value={rank?.rank}>
                      {rank?.rank}
                    </option>
                  ))}
                </select>
                <label style={{ color: "#0000ff" }}>TO</label>
                <select
                  name="prom_to"
                  value={rankTo}
                  onChange={(e) => setRankTo(e.target.value)} 
                  required
                >
                  <option className="item-select" value="">Select...</option>
                    {filteredRanks.length > 0 &&
                      filteredRanks.map((rank) => (
                    <option className="item-select" key={rank._id} value={rank?.rank}>
                      {rank?.rank}
                    </option>
                  ))}
                </select>
                <label style={{ color: "#0000ff" }}>AUTHORITY</label>
                <input
                type="text"
                placeholder=""
                name="prom_authority"
                value={promotion?.prom_authority}
                onChange={handleInputChange}
                />
                <label style={{ color: "#0000ff" }}>EFFECTIVITY</label>
                <input
                type="date"
                placeholder=""
                name="prom_effectivity"
                value={promotion?.prom_effectivity}
                onChange={handleInputChange}
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
  )
}

export default AddPromotion