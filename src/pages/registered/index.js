/* eslint-disable newline-before-return */
/* eslint-disable padding-line-between-statements */
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import StatisticsCard from './card';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { baseUrl } from 'src/@core/api';
import { useRouter } from 'next/router';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import NilaiTable from './nilai';
import { useAuth } from 'src/hooks/useAuth';

const ImgStyled = styled('img')(({ theme }) => ({
  width: 180,
  height: 180,
  objectFit: 'cover',
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('sm')]: {
    width: 100,
    height: 100,
    marginRight: theme.spacing(2.5),
  },
}));

const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  maxWidth: '1200px',
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
  },
}));

const Registred = () => {
  const router = useRouter();
  const [profile, setProfile] = useState({});
  const [imgSrc, setImgSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { data } } = await axios.get(`${baseUrl}/user/profile`);
        setProfile(data);
        setImgSrc(`https://simak.unismuh.ac.id/upload/mahasiswa/${data?.nim}_.jpg`);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401) {
          toast.error('Sesi Anda telah berakhir, silahkan login kembali');
          setLoading(false);
          logout();
        }
        setLoading(false);
        toast.error('Gagal mengambil data');
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Container>
      <Box className=''>
        <CardContent>
          <Typography variant='h4' sx={{ fontWeight: 600, marginBottom: 3, textAlign: 'center', fontSize: { xs: '1.5rem', md: '2rem' } }}>
            BUMM 2024
          </Typography>
          <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 3, textAlign: 'center', fontSize: { xs: '1.25rem', md: '1.75rem' } }}>
            Registrasi telah berhasil, silahkan tunggu pengumuman selanjutnya
          </Typography>
          <Grid container spacing={7}>
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <Grid item xs={12}>
                  <StatisticsCard nama={profile?.nama || "Mahasiswa"} nim={profile?.nim || "-"} />
                </Grid>
              </Box>
            </Grid>
            <Card sx={{ width: '100%' }}>
              <CardHeader title='Data Diri Mahasiswa' titleTypographyProps={{ variant: 'h6' }} />
              <Divider sx={{ margin: 0 }} />
              <form>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <Typography variant='body' sx={{ fontWeight: 600 }}>
                        1. Informasi Akun
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Nim' placeholder='Nim' defaultValue={profile?.nim} disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Email' placeholder='Email' defaultValue={profile?.email} disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Nama' placeholder='Fulan' defaultValue={profile?.nama} disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Prodi' placeholder='Informatika' defaultValue={profile?.prodi} disabled />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ marginBottom: 0 }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='body' sx={{ fontWeight: 600 }}>
                        2. Informasi Nilai
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <NilaiTable />
                      <Divider sx={{ marginBottom: 0 }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: 2 }}>
                        3. Informasi Beasiswa
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Jenis Beasiswa</InputLabel>
                        <Select
                          value={profile?.beasiswa?.jenisBeasiswaId}
                          label='Jenis Beasiswa'
                          disabled
                        >
                          <MenuItem value='1'>Prestasi Akademik</MenuItem>
                          <MenuItem value='2'>Hafidz Qur'an</MenuItem>
                          <MenuItem value='3'>Bibit Unggulan</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Detail Beasiswa</InputLabel>
                        <Select
                          value={profile?.beasiswa?.detailJenis}
                          label='Detail Beasiswa'
                          disabled
                        >
                          <MenuItem value='pilih'>Pilih Detail Beasiswa</MenuItem>
                          <MenuItem value='1'>Kategori 1</MenuItem>
                          <MenuItem value='2'>Kategori 2</MenuItem>
                          <MenuItem value='3'>Kategori 3</MenuItem>
                          <MenuItem value='4'>Kategori 4</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginTop: 5 }}>
                        4. Upload Link Berkas Pendukung (Gabungkan dalam 1 file PDF)
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Link Berkas Pendukung'
                        placeholder='Link Berkas Pendukung'
                        value={profile?.beasiswa?.fileUpload?.fileName}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider sx={{ margin: 0 }} />
              </form>
            </Card>
          </Grid>
        </CardContent>
      </Box>
    </Container>
  );
};

Registred.getLayout = page => <BlankLayout>{page}</BlankLayout>;
export default Registred;
