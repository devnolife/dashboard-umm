/* eslint-disable padding-line-between-statements */

import React from 'react';
import { useRouter } from 'next/router';
import { Grid, Typography, Card, CardContent, CardMedia, ButtonBase, Box, Divider } from '@mui/material';

const CardBeasiswa = ({ url, personName, detailName, headName }) => {
  return (
    <ButtonBase
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

const Persyarikatan = () => {
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
        marginBottom: 15
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
        <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', md: '3rem' } }}>BUMM</Typography>
        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>Mahasiswa Baru Tahun Akademik 2024/2025</Typography>
        <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 2, fontSize: { xs: '1.5rem', md: '2.5rem' } }}>3,8 MILYAR</Typography>
        <Typography variant="h6" sx={{ marginBottom: 2, fontSize: { xs: '1rem', md: '1.5rem' } }}>Beasiswa Universitas Muhammadiyah Makassar</Typography>
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
            url={'/images/beasiswa/persyarikatan/ipm1.webp'}
            headName="Kategori 1"
            personName="Mantan dan atau Ketua, Sekretaris, Bendahara IPM"
            detailName="Beasiswa Uang Kuliah 100% selama 8 semester"
            imageName="hafidz-alquran"
            kategori='1'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardBeasiswa
            url={'/images/beasiswa/persyarikatan/ipm2.webp'}
            headName="Kategori 2"
            personName="Mantan dan atau Ketua Bidang, Sekretaris Bidang IPM"
            detailName="Beasiswa Uang Kuliah 75% selama 8 semester"
            imageName="hafidz-alquran"
            kategori='2'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardBeasiswa
            url={'/images/beasiswa/persyarikatan/ipm1.webp'}
            headName="Kategori 3"
            personName="Mantan dan atau Anggota PD atau PC IPM"
            detailName="Beasiswa Uang Kuliah 50% selama 8 semester"
            imageName="hafidz-alquran"
            kategori='3'
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          width: '100%',
          padding: { xs: 2, md: 4 },
          textAlign: 'center',
          borderTop: '1px solid #ddd',
          marginTop: 4
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 1, fontSize: { xs: '1rem', md: '1.5rem' } }}>
          Khusus Pendaftaran Beasiswa Bibit Unggul Persyarikatan melalui PW IPM Sulsel
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, marginBottom: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', margin: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', marginRight: 1 }} />
            <Typography>Zul Jalali Wal Ikram (0812-5101-5344)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', margin: 1 }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', marginRight: 1 }} />
            <Typography>Iham Sandewa (0822-9247-7830)</Typography>
          </Box>
        </Box>
      </Box>
    </Box >
  );
};
export default Persyarikatan;
