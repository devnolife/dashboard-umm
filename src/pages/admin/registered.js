import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { baseUrl } from 'src/@core/api';
import { useRouter } from 'next/router';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import PdfPreview from './PdfPreview';
import NilaiTable from './nilai';

const ImgStyled = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '150px',
  height: '100%',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100px',
  },
}));


const CardStyle = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
  },
}))

const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: '1200px',
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
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
      <Box>
        <CardContent>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: { xs: '1.5rem', md: '2rem' }, textAlign: 'center' }}>
            ADMIN DASHBOARD BUMM 2024
          </Typography>
          <CardStyle container spacing={8} justifyContent="center">
            <CardStyle item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
            </CardStyle>
            <CardStyle item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant='body' sx={{ fontWeight: 600 }}>
                    1. Informasi Akun
                  </Typography>
                  <CardStyle container spacing={4}>
                    <CardStyle item xs={12} sm={6}>
                      <TextField fullWidth label='NIM' placeholder='NIM' defaultValue={profile?.nim} disabled />
                    </CardStyle>
                    <CardStyle item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Email' placeholder='Email' defaultValue={profile?.email} disabled />
                    </CardStyle>
                    <CardStyle item xs={12} sm={6}>
                      <TextField fullWidth label='Nama' placeholder='Nama' defaultValue={profile?.nama} disabled />
                    </CardStyle>
                    <CardStyle item xs={12} sm={6}>
                      <TextField fullWidth label='Prodi' placeholder='Prodi' defaultValue={profile?.prodi} disabled />
                    </CardStyle>
                  </CardStyle>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Typography variant='body' sx={{ fontWeight: 600 }}>
                    2. Informasi Nilai
                  </Typography>
                  <NilaiTable nim={nim} />
                  <Divider sx={{ marginBottom: 2 }} />
                  <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: 2 }}>
                    3. Informasi Beasiswa
                  </Typography>
                  <CardStyle container spacing={4}>
                    <CardStyle item xs={12} sm={6}>
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
                    </CardStyle>
                    <CardStyle item xs={12} sm={6}>
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
                    </CardStyle>
                    <CardStyle item xs={12}>
                      <Typography variant='body2' sx={{ fontWeight: 600, marginTop: 5 }}>
                        4. Upload Link Berkas Pendukung (Gabungkan dalam 1 file PDF)
                      </Typography>
                    </CardStyle>
                    <CardStyle item xs={12}>
                      <TextField
                        fullWidth
                        label='Link Berkas Pendukung'
                        placeholder='Link Berkas Pendukung'
                        value={profile?.beasiswa?.fileUpload?.fileName || ''}
                        disabled
                      />
                    </CardStyle>
                  </CardStyle>
                  {pdfUrl && (
                    <Box sx={{ marginTop: 4 }}>
                      <PdfPreview pdfUrl={pdfUrl} />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </CardStyle>
          </CardStyle>
        </CardContent>
      </Box>
    </Container>
  );
};

Registered.getLayout = page => <BlankLayout>{page}</BlankLayout>;
export default Registered;
