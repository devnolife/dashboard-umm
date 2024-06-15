import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { baseUrl } from 'src/@core/api';
import { useRouter } from 'next/router';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import Link from 'next/link';
import NilaiTable from './nilai';
import PdfPreview from './PdfPreview';

const ImgStyled = styled('img')(({ theme }) => ({
  width: 250,
  height: 250,
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


const Registered = () => {
  const router = useRouter();
  const { nim } = router.query;
  const [profile, setProfile] = useState({});
  const [imgSrc, setImgSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { data } } = await axios.get(`${baseUrl}/admin/mahasiswa`);
        const studentData = data.find(item => item.nim === nim);
        setProfile(studentData);
        setImgSrc(`https://simak.unismuh.ac.id/upload/mahasiswa/${studentData?.nim}_.jpg`);
        const fileName = studentData?.beasiswa?.fileUpload?.fileName;
        if (fileName) {
          setPdfUrl(`https://api.beasiswa.unismuh.ac.id/api/admin/file/${fileName}`);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, [nim]);

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
      <Box className='content-center'>
        <CardContent>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: { xs: '1.5rem', md: '2rem' } }}>
            ADMIN DASHBOARD BUMM 2024
          </Typography>
          <Grid container spacing={7}>
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <Grid item xs={12}>
                  <Card sx={{ width: '100%' }}>
                    <CardContent>
                      <Grid container xs={12} spacing={5}>
                        <Grid xs={12} item>
                          <Typography variant='body' sx={{ fontWeight: 600 }}>
                            1. Informasi Akun
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='NIM' placeholder='NIM' defaultValue={profile?.nim} disabled />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth type='email' label='Email' placeholder='Email' defaultValue={profile?.email} disabled />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Nama' placeholder='Nama' defaultValue={profile?.nama} disabled />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth label='Prodi' placeholder='Prodi' defaultValue={profile?.prodi} disabled />
                        </Grid>
                      {/* <Typography variant="h6">{profile?.nama || "Mahasiswa"}</Typography>
                      <Typography variant="body1">NIM: {profile?.nim || "-"}</Typography>
                      <Link href={`/admin/detail?nim=${profile?.nim}`} passHref>
                        <Typography variant="body2" color="primary" component="a">
                          
                        </Typography>
                      </Link> */}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Box>
            </Grid>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Typography variant='body' sx={{ fontWeight: 600 }}>
                      2. Informasi Nilai
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <NilaiTable nim={nim} />
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
                        value={profile?.beasiswa?.jenisBeasiswaId || ''}
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
                        value={profile?.beasiswa?.detailJenis || ''}
                        label='Detail Beasiswa'
                        disabled
                      >
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
                      value={profile?.beasiswa?.fileUpload?.fileName || ''}
                      disabled
                    />
                  </Grid>
                </Grid>
                {pdfUrl && (
                  <Box sx={{ marginTop: 4 }}>
                    <PdfPreview pdfUrl={pdfUrl} />
                  </Box>
                )}
              </CardContent>
              <Divider sx={{ margin: 0 }} />
            </Card>
          </Grid>
        </CardContent>
      </Box>
    </Container>
  );
};

Registered.getLayout = page => <BlankLayout>{page}</BlankLayout>;
export default Registered;
