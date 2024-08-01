import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { baseUrl } from 'src/@core/api';
import { useRouter } from 'next/router';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import NilaiTable from './nilai';
import PdfPreview from './PdfPreview';

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

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
  },
}));

const StyledTextField = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const getJenisBeasiswa = (id) => {
  switch (id) {
    case 1:
      return 'Prestasi Akademik';
    case 2:
      return 'Hafidz Qur\'an';
    case 3:
      return 'Bibit Unggulan';
    default:
      return '-';
  }
};

const Detail = () => {
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
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [nim]);

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#121212',
        color: '#ffffff',
      }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Container>
      <Box className='content-center'>
        <CardContent>
          <Typography variant='h4' sx={{ fontWeight: 600, marginBottom: 3, textAlign: 'center', fontSize: { xs: '1.5rem', md: '2rem' } }}>
            Detail Mahasiswa
          </Typography>
          <Grid container spacing={2}>
            <StyledCard sx={{ width: '100%' }}>
              <CardHeader title='Data Diri Mahasiswa' titleTypographyProps={{ variant: 'h6' }} />
              <Divider sx={{ margin: 0 }} />
              <CardContent>
                <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <ImgStyled src={imgSrc} alt='Profile Pic' />
                  </Box>
                </Grid>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Typography variant='body' sx={{ fontWeight: 600 }}>
                      1. Informasi Nilai
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField>NIM: {profile?.nim || '-'}</StyledTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField>Email: {profile?.email || '-'}</StyledTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField>Nama: {profile?.nama || '-'}</StyledTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField>Prodi: {profile?.prodi || '-'}</StyledTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField>Kode Prodi: {profile?.kodeProdi || '-'}</StyledTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ marginBottom: 0 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body' sx={{ fontWeight: 600 }}>
                      2. Informasi Pribadi
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField>Tempat Lahir: {profile?.tempatLahir || '-'}</StyledTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField>Tanggal Lahir: {profile?.tanggalLahir || '-'}</StyledTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField>Jenis Kelamin: {profile?.jenisKelamin || '-'}</StyledTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField>HP: {profile?.hp || '-'}</StyledTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField>Terdaftar: {profile?.isRegistered ? 'Ya' : 'Tidak'}</StyledTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ marginBottom: 0 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body' sx={{ fontWeight: 600 }}>
                      4. Informasi Nilai
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <NilaiTable nim={nim} />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ marginBottom: 0 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body' sx={{ fontWeight: 600 }}>
                      5. Informasi Beasiswa
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField>Jenis Beasiswa: {getJenisBeasiswa(profile?.beasiswa?.jenisBeasiswaId) || '-'}</StyledTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField>Detail Beasiswa: {profile?.beasiswa?.detailJenis || '-'}</StyledTextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField>Nilai Hasil: {profile?.beasiswa?.nilaiHasil || '-'}</StyledTextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ marginBottom: 0 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body1' sx={{ fontWeight: 600, marginBottom: 2 }}>
                      Informasi Upload Berkas
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {pdfUrl && (
                      <Box sx={{ marginTop: 4 }}>
                        <PdfPreview pdfUrl={pdfUrl} />
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
              <Divider sx={{ margin: 0 }} />
            </StyledCard>
          </Grid>
        </CardContent>
      </Box>
    </Container>
  );
};

Detail.getLayout = page => <BlankLayout>{page}</BlankLayout>;
export default Detail;
