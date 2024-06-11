/* eslint-disable padding-line-between-statements */
import React from 'react';
import { useRouter } from 'next/router';
import { Grid, Typography, Card, CardContent, CardMedia, ButtonBase, Box, useMediaQuery, useTheme } from '@mui/material';

const CardBeasiswa = ({ url, personName, detailName, imageName, headName, onClick, kategori }) => {
  return (
    <ButtonBase
      onClick={() => onClick(imageName, kategori)}
      sx={{
        width: '100%',
        height: '100%',
        '&:hover .MuiCard-root': {
          boxShadow: 6,
        },
        '&:hover .MuiCardMedia-root': {
          transform: 'scale(1.05)',
        }
      }}
    >
      <Card
        className="MuiCard-root"
        sx={{
          position: 'relative',
          height: { xs: '300px', md: '400px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'box-shadow 0.3s ease-in-out',
          textAlign: 'center'
        }}
      >
        <Typography sx={{ marginTop: '20px' }} variant="h6">{headName}</Typography>
        <Typography sx={{ marginLeft: '10px', marginRight: '10px' }} variant="caption">{detailName}</Typography>
        <CardMedia
          className="MuiCardMedia-root"
          component="img"
          image={url}
          sx={{
            height: '60%',
            width: '60%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease-in-out',
          }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography>{personName}</Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
};

const Beasiswa = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleImageClick = (jenis, kategori) => {
    router.push(`/pendaftaran/${jenis}-${kategori}`);
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: { xs: 2, md: 4 },
        marginBottom: 4
      }}
    >
      <Box
        sx={{
          width: '100%',
          padding: { xs: 2, md: 4 },
          textAlign: 'center',
          borderBottom: '1px solid #ddd'
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>BUMM</Typography>
        <Typography variant="h6">Mahasiswa Baru Tahun Akademik 2024/2025</Typography>
        <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 2 }}>3,8 MILYAR</Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>Beasiswa Universitas Muhammadiyah Makassar</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', margin: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', marginRight: 1 }} />
            <Typography>Prestasi Akademik</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', margin: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', marginRight: 1 }} />
            <Typography>Hafidz Qur'an</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', margin: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', marginRight: 1 }} />
            <Typography>Bibit Unggul Persyarikatan</Typography>
          </Box>
        </Box>
      </Box>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: 4 }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <CardBeasiswa
            url={'/images/beasiswa/prestasi/95.webp'}
            headName="Kategori 1"
            personName="Nilai Raport Semester 1-5 Rata-rata 95"
            detailName="Beasiswa Uang Kuliah 100% selama 8 semester"
            imageName="prestasi-akademik"
            kategori='1'
            onClick={handleImageClick}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardBeasiswa
            url={'/images/beasiswa/prestasi/90.webp'}
            headName="Kategori 2"
            personName="Nilai Raport Semester 1-5 Rata-rata 90"
            detailName="Beasiswa Uang Kuliah 75% selama 8 semester"
            imageName="prestasi-akademik"
            kategori='2'
            onClick={handleImageClick}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardBeasiswa
            url={'/images/beasiswa/prestasi/85.webp'}
            headName="Kategori 3"
            personName="Nilai Raport Semester 1-5 Rata-rata 85"
            detailName="Beasiswa Uang Kuliah 50% selama 8 semester"
            imageName="prestasi-akademik"
            kategori='3'
            onClick={handleImageClick}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardBeasiswa
            url={'/images/beasiswa/prestasi/80.webp'}
            headName="Kategori 4"
            personName="Nilai Raport Semester 1-5 Rata-rata 80"
            detailName="Beasiswa Uang Kuliah 25% selama 8 semester"
            imageName="prestasi-akademik"
            kategori='4'
            onClick={handleImageClick}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Beasiswa;
