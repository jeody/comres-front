import React, { useEffect, useState } from 'react';
import './RidsList.scss';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReservist, getMembers, RESET_MEMBER } from '../../redux/features/rids/ridsSlice';
import ReactPaginate from 'react-paginate';
import setBodyColor from '../../setBodyColor';
import PageMenu from '../../components/pageMenu/PageMenu';
import { Spinner } from '../../components/loader/Loader';
import Search from '../../components/search/Search';
import { FaTrashAlt } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { NavLink, useNavigate } from 'react-router-dom';

const RidsList = () => {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { members, isLoading, message } = useSelector(
    (state) => state.rids,
  );

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

//   const [reservists, setReservists] = useState(members);
  const [search, setSearch] = useState('');

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete This Reservist',
      message: 'Are you sure to remove this reservist record?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => removeReservist(id)
        },
        {
          label: 'Cancel'
          //onClick: () => alert('Click No')
        }
      ]
    });
  };

  const removeReservist = async (id) => {
    dispatch(deleteReservist(id));
    dispatch(getMembers());
  };

  useEffect(() => {
    if (message === 'Reservist deleted successfully') {
      navigate('/rids');
    }
    dispatch(RESET_MEMBER());
    dispatch(getMembers());
  }, [message, navigate, dispatch]);

  // Begin Pagination

  const itemsPerPage = 10;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = members.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(members.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % members.length;

    setItemOffset(newOffset);
  };

  // End Pagination
  setBodyColor({ color: '#ffffff' });

  const getAcronym = (str) => {
    const matches = str.match(/\b([A-Za-z0-9])/g);
    if (matches) {
      return matches.join('').toUpperCase();
    }
    return '';
  };

  return (
    <section>
        <div className="container">
            <PageMenu />
            <div className="rids-list">
                {isLoading && <Spinner />}
                <div className="table">
                    <div className="--flex-between">
                        <span>
                            <h3>All Resevists
                                <NavLink to={`/addNewReservist/${user?._id}`} style={{ fontSize: '12px', marginLeft: '10px' }}>
                                [<i style={{ color: '#0000ff' }}>add new record</i>]
                                </NavLink>
                            </h3>
                        </span>
                        <span>
                            <Search
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            />
                        </span>
                    </div>
                    {currentItems.length === 0 ? (
                        <p>No reservists found...</p>
                    ) : (
                        <table className="table-one">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>NAME</th>
                                    <th>AFPSN</th>
                                    <th>RANK</th>
                                    <th>AFOS</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                    <th>View</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((reservist, index) => (
                                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                                        <td className="td-one" style={{ border: '0' }}>
                                            {index + 1}.
                                        </td>
                                        <td className="td-one" style={{ border: '0' }}>{reservist?.rank?.toUpperCase()} {reservist?.first_name?.toUpperCase()} {getAcronym(`${reservist?.middle_name}`)} {reservist?.last_name?.toUpperCase()} {reservist?.suffix ? `${reservist?.suffix?.toUpperCase()}` : ''}</td>    
                                        <td className="td-one" style={{ border: '0' }}>{reservist?.afpsn}</td>
                                        <td className="td-one" style={{ border: '0' }}>{reservist?.rank_code}</td>
                                        <td className="td-one" style={{ border: '0' }}>{reservist?.afos}</td>
                                        <td className="td-one" style={{ border: '0' }}>{reservist?.email}</td>
                                        <td className="td-one" style={{ border: '0' }}>
                                            <NavLink to={`/updateRids/${reservist._id}`}>Update</NavLink>
                                        </td>
                                        <td className="td-one" style={{ border: '0' }}>
                                            <NavLink to={`/viewSummaryOfInformation/${reservist._id}`}>SOI</NavLink>
                                        </td>
                                        <td className="td-one" style={{ border: '0' }}>
                                            <FaTrashAlt
                                            size={15}
                                            color="red"
                                            onClick={() => confirmDelete(reservist._id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <hr />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName="activePage"
                />
            </div>
        </div>
    </section>
  );
};

export default RidsList;
