/* eslint-disable padding-line-between-statements */
/* eslint-disable newline-before-return */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import themeConfig from 'src/configs/themeConfig';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';
import { useAuth } from '../../hooks/useAuth';
import { baseUrl } from '../../@core/api';
import Carousel from 'react-material-ui-carousel';
import Link from '@mui/material/Link';

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '69rem' },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: theme.spacing(2)
  }
}));

const LoginPage = () => {
  const [values, setValues] = useState({
    nim: '',
    password: '',
    showPassword: false
  });
  const [errors, setErrors] = useState({ nim: '', password: '' });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { login, role } = useAuth();

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.nim) {
      setErrors((prev) => ({ ...prev, nim: 'Field tidak boleh kosong ! ' }));
    }
    if (!values.password) {
      setErrors((prev) => ({ ...prev, password: 'Field tidak boleh kosong ! ' }));
    }
    if (!values.nim || !values.password) {
      return;
    }
    try {
      const res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: values.nim, password: values.password }),
      });
      const { data } = await res.json();
      login(data.token, data);
      role(data.role);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        password: 'Nim atau password salah!',
      }));
    }
  };

  useEffect(() => {
    const imagePromises = [
      '/images/slide/slide1.jpg',
      '/images/slide/slide2.jpg',
      '/images/slide/slide3.jpg',
      '/images/slide/slide4.jpg',
      '/images/slide/slide5.jpg',
      '/images/slide/slide6.jpg',
      '/images/slide/slide7.jpg',
      '/images/slide/slide8.jpg',
      '/images/slide/slide9.jpg'
    ].map(src => new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    }));

    Promise.all(imagePromises)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: 'url(/images/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      className='content-center'>
      <Card sx={{ zIndex: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
        <Box sx={{ flex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(6, 3, 3)} !important` }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src='/images/logo.png' alt='logo' width='40' />
              <Typography
                variant='h6'
                sx={{
                  ml: 2,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1 }}>
                Welcome to {themeConfig.templateName}! 👋🏻
              </Typography>
              <Typography variant='body2'>Silahkan masukan nim dan password akun pendaftaran anda !</Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
              <TextField
                autoFocus
                fullWidth
                id='nim'
                label='Nim'
                sx={{ marginBottom: 4 }}
                value={values.nim}
                onChange={handleChange('nim')}
                error={!!errors.nim}
                helperText={errors.nim}
              />
              <FormControl fullWidth error={!!errors.password} sx={{ marginBottom: 4 }}>
                <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={values.password}
                  id='auth-login-password'
                  onChange={handleChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {values.showPassword ? <EyeOffOutline /> : <EyeOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.password && <Typography color="error">{errors.password}</Typography>}
              </FormControl>
              <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginBottom: 4 }}
                type='submit'
              >
                Login
              </Button>
              <Divider sx={{ mb: 3 }}>devnolife</Divider>
              <Link href='https://beasiswa.unismuh.ac.id/download/Panduan-BUMM-2024.pdf' target='_blank' rel='noopener' sx={{ mt: 3, display: 'block', textAlign: 'center' }}>
                Download Panduan Panduan Bumm 2024
              </Link>
            </form>
          </CardContent>
        </Box>
        <Box sx={{ flex: 1, backgroundColor: '#f0f0f0', display: { xs: 'none', md: 'block' } }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
            <Carousel indicators={false}>
              <img src="/images/slide/slide1.jpg" alt="slide1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <img src="/images/slide/slide2.jpg" alt="slide2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <img src="/images/slide/slide3.jpg" alt="slide3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <img src="/images/slide/slide4.jpg" alt="slide4" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <img src="/images/slide/slide5.jpg" alt="slide5" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <img src="/images/slide/slide6.jpg" alt="slide6" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <img src="/images/slide/slide7.jpg" alt="slide7" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <img src="/images/slide/slide8.jpg" alt="slide8" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <img src="/images/slide/slide9.jpg" alt="slide9" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Carousel>
          )}
        </Box>
      </Card >
      <FooterIllustrationsV1 />
    </Box >
  );
};

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>;
export default LoginPage;
