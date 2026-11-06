import React, { useState } from 'react'
import CandidateSideItem from './CandidateSideItem';
import styles from './CandidateSidebar.scss';
import { useNavigate } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi';
import { FaLink } from 'react-icons/fa';
import candidateMenu from '../../../data/candidateBar';

const CandidateSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const openSidebar = () => setIsOpen(true);
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/candidate/home');
  };

return (
    <div className='layout'>
      <div
        className={isOpen ? 'sidebar-overlay show-overlay' : 'sidebar-overlay'}
        onClick={closeSidebar}
      ></div>

      <div
        className='sidebar'
        style={{ width: isOpen ? '230px' : '60px' }}
        onMouseEnter={openSidebar}
        onMouseLeave={closeSidebar}
      >
        <div className='top_section'>
          <div className='logo' style={{ display: isOpen ? 'block' : 'none' }}>
            <FaLink size={30} style={{ cursor: 'pointer' }} onClick={goHome} />
          </div>
          <div
            className='bars'
            style={{ marginLeft: isOpen ? '135px' : '0px' }}
          >
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        {candidateMenu.map((item, index) => {
          return (
            <CandidateSideItem
              key={index}
              item={item}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          );
        })}
      </div>
    </div>
  )
}

export default CandidateSidebar