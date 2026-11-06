import { FaTh } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';

const candidateMenu = [
  {
    title: 'Dashboard',
    icon: <FaTh />,
    path: '/candidate/home',
  },
  {
    title: 'Account',
    icon: <BiUserCircle />,
    children: [
      {
        title: 'Profile',
        icon: <BiUserCircle />,
        path: '/candidate/profile',
      },
      {
        title: 'My RIDS',
        path: '/candidate/rids',
      },
      {
        title: 'Change Password',
        path: '/candidate/change-password',
      },
      {
        title: 'Change Address',
        path: '/candidate/change-psgc-address',
      },
    ],
  },
];

export default candidateMenu;
