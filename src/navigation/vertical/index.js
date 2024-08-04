import HomeOutline from 'mdi-material-ui/HomeOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DashboardIcon from '@mui/icons-material/Dashboard';


const navigation = (role) => {
  let navItems = [];

  if (role !== 'admin') {
    navItems.push({
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    });
  }

  if (role === 'admin') {
    navItems.push(
      {
        title: 'Admin',
        icon: PermIdentityIcon,
        path: '/admin'
      },
      {
        title: 'Rekap ',
        icon: DashboardIcon,
        path: '/admin/rekap'

      },
      {
        title: 'Registered',
        icon: HowToRegIcon,
        path: 'admin/registered/?nim=105841108621'
      }
    );
  }

  return navItems;
};

export default navigation;
