/* eslint-disable padding-line-between-statements */
/* eslint-disable newline-before-return */
import { useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { useAuth } from '../../hooks/useAuth'
import { baseUrl } from '../../@core/api'
import Carousel from 'react-material-ui-carousel'
import { Axis } from 'mdi-material-ui'
import axios from 'axios'
import { Link } from '@mui/material'

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '69rem' }
}))

const LoginPage = () => {
  const [values, setValues] = useState({
    nim: '',
    password: '',
    showPassword: false
  })
  const [errors, setErrors] = useState({ nim: '', password: '' });
  const router = useRouter()
  const { login, role } = useAuth()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
  }
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
      <Card sx={{ zIndex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Box sx={{ flex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src='/images/logo.png' alt='logo' width='40' />
              <Typography
                variant='h6'
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
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
              <FormControl fullWidth error={!!errors.password}>
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
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
              </FormControl>
              <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginBottom: 7, marginTop: 5 }}
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
        <Box sx={{ flex: 1, backgroundColor: '#f0f0f0' }}>
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
        </Box>
      </Card >
      <FooterIllustrationsV1 />
    </Box >
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
export default LoginPage
