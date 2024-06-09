import Link from 'next/link';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations';

// Styled components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}));

const Img = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(13)
  }
}));

// Main FinishRegister Component
const FinishRegister = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h1'>Terima Kasih</Typography>
          <Typography variant='h5' sx={{ fontSize: '1.5rem !important' }}>
            Terima kasih telah registrasi beasiswa UMM, tunggu jadwal pengumuman.
          </Typography>
        </BoxWrapper>
        <Img height='400' alt='success-illustration' src='/images/pages/finish.png' />
        <Link passHref href='/'>
          <Button component='a' variant='contained' sx={{ px: 5.5, mb: 2 }}>
            Back to Home
          </Button>
        </Link>
        <Link passHref href='/logout'>
          <Button component='a' variant='outlined' sx={{ px: 5.5 }}>
            Log Out
          </Button>
        </Link>
      </Box>
      <FooterIllustrations />
    </Box>
  );
};

// Layout Wrapping
FinishRegister.getLayout = page => <BlankLayout>{page}</BlankLayout>;

export default FinishRegister;
