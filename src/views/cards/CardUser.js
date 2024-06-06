// File: src/pages/Home.js

import React from 'react';
import withAuth from '../hoc/withAuth';
import { Grid, ButtonBase, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const Home = () => {
  const handleImageClick = (imageName) => {
    console.log(`${imageName} clicked`);
  };

  return (
    <Grid
      container
      spacing={6}
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <ButtonBase
          onClick={() => handleImageClick('Image 1')}
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
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'box-shadow 0.3s ease-in-out',
            }}
          >
            <CardMedia
              className="MuiCardMedia-root"
              component="img"
              image={'/images/prestasi-akademik.png'}
              sx={{
                height: '70%',
                width: '70%',
                objectFit: 'contain',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant='h6'>Robert Meyer</Typography>
            </CardContent>
          </Card>
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ButtonBase
          onClick={() => handleImageClick('Image 2')}
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
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'box-shadow 0.3s ease-in-out',
            }}
          >
            <CardMedia
              className="MuiCardMedia-root"
              component="img"
              image={'/images/hafids-alquran.png'}
              sx={{
                height: '70%',
                width: '70%',
                objectFit: 'contain',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant='h6'>Robert Meyer</Typography>
            </CardContent>
          </Card>
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ButtonBase
          onClick={() => handleImageClick('Image 3')}
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
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'box-shadow 0.3s ease-in-out',
            }}
          >
            <CardMedia
              className="MuiCardMedia-root"
              component="img"
              image={'/images/persyarikatan.png'}
              sx={{
                height: '70%',
                width: '70%',
                objectFit: 'contain',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant='h6'>Robert Meyer</Typography>
            </CardContent>
          </Card>
        </ButtonBase>
      </Grid>
    </Grid>
  );
};

export default withAuth(Home);
