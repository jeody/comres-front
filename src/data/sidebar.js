import { FaTh } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';

const menu = [
  {
    title: 'Dashboard',
    icon: <FaTh />,
    path: '/admin/home',
  },
  {
    title: 'Account',
    icon: <BiUserCircle />,
    children: [
      {
        title: 'Profile',
        path: '/admin/profile',
      },
      {
        title: 'Subscription',
        path: '/admin/account',
      },
      {
        title: 'Users',
        path: '/admin/users',
      },
      {
        title: 'Change Password',
        path: '/admin/change-password',
      },
    ],
  },
];

export default menu;
