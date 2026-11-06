import React, { useEffect, useState } from 'react';
import './AddEduc.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editPromotion, getMember, selectMember } from '../../redux/features/rids/ridsSlice';
import Loader from '../../components/loader/Loader';
import { getBranchOfServices } from '../../redux/features/branchOfService/brsvcOfServiceSlice';
import { getRanks } from '../../redux/features/rank/rankSlice';
import DatePicker from 'react-datepicker';
import dateFormat from 'dateformat';

const EditPromotion = () => {
    const { parentId, promoId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { branchOfServices } = useSelector((state) => state.branchOfService);
    const { ranks } = useSelector((state) => state.rank);

    const { isLoading, message } = useSelector((state) => state.rids);
    const member = useSelector(selectMember);

  // State to manage modal visibility
  const [isOpen, setIsOpen] = useState(true);
  const [promEffectivity, setPromEffectivity] = useState('');

    useEffect(() => {
        dispatch(getMember(parentId));
        dispatch(getBranchOfServices());
        dispatch(getRanks());
    }, [dispatch, parentId]);

  // Form inputs state
    const [promotion, setPromotion] = useState(member);
    const [rank, setRank] = useState('');
    const [rankTo, setRankTo] = useState('');
    const [filteredRanks, setFilteredRanks] = useState([]);
    const [brsvc, setBrsvc] = useState('');

    const toggleModal = () => {
        // setIsOpen(!isOpen);
        setIsOpen(false);
        navigate(`/updateRids/${parentId}`);
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

  const savePromotion = async (e) => {
    e.preventDefault();

    const formData = {
        parentId: parentId,
        promoId: promoId,
        prom_from: rank,
        prom_to: rankTo,
        prom_authority: promotion?.prom_authority,
        prom_effectivity: promEffectivity,
        brsvc: brsvc,
    };
    dispatch(editPromotion({ parentId, formData }));
    setIsOpen(false); // Close modal on submit
    navigate(`/updateRids/${parentId}`);
    // console.log('formdata:',formData)
  };
  return (
    <>
    {isLoading && <Loader />}
    <div className="educ-container">

      {/* Conditional rendering for the pop-up */}
      {isOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleModal}>
              &times;
            </button>
         
            <h2>Edit Promotion</h2>
            <form onSubmit={savePromotion}>
                {member.promotions
                .filter(item => item._id === promoId)
                .map(item => (
                    <div className="form-group" key={item._id}>
                        <div>
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
                        </div>
                        <div>
                        <label style={{ color: "#0000ff" }}>FROM</label>
                            <select
                            name="prom_from"
                            value={rank}
                            onChange={(e) => setRank(e.target.value)} 
                            required
                            >
                            <option className="item-select" value="">Select...</option>
                            <option className="item-select" value="Civilian">Civilian</option>
                                {filteredRanks.length > 0 &&
                                filteredRanks.map((rango) => (
                                <option className="item-select" key={rango._id} value={rango?.rank}>
                                {rango?.rank}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div>
                        <label style={{ color: "#0000ff" }}>TO</label>
                        <select
                        name="prom_to"
                        value={rankTo}
                        onChange={(e) => setRankTo(e.target.value)} 
                        required
                        >
                        <option className="item-select" value="">Select...</option>
                            {filteredRanks.length > 0 &&
                            filteredRanks.map((myrank) => (
                            <option className="item-select" key={myrank._id} value={myrank?.rank}>
                            {myrank?.rank}
                            </option>
                        ))}
                        </select>
                        </div>
                        <div>
                            <label style={{ color: "#0000ff" }}>AUTHORITY</label>
                            <input
                            type="text"
                            placeholder=""
                            name="prom_authority"
                            defaultValue={item.prom_authority}
                            onChange={handleInputChange}
                            />
                        </div>
                        <div>
                        <label style={{ color: "#0000ff" }}>EFFECTIVITY</label>
                            <DatePicker
                              selected={promEffectivity}
                              value={promEffectivity || dateFormat(item.prom_effectivity, 'dd/mm/yyyy')}
                              onChange={(date) => setPromEffectivity(date)}
                            />
                        </div>
                    </div>
                ))}             
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

export default EditPromotion