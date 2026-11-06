import { FaTh } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';

const reservistMenu = [
  {
    title: 'Dashboard',
    icon: <FaTh />,
    path: '/reservist/home',
  },
  {
    title: 'Account',
    icon: <BiUserCircle />,
    children: [
      {
        title: 'Profile',
        icon: <BiUserCircle />,
        path: '/reservist/profile',
      },
      {
        title: 'My RIDS',
        path: '/updateRids/:id',
      },
      {
        title: 'My SOI',
        path: '/viewSummaryOfInformation/:id',
      },
    ],
  },
];

export default reservistMenu;
