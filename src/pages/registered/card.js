/* eslint-disable newline-before-return */
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/newline-after-import */

import { Card, CardHeader, CardContent, IconButton, Typography, Grid, Button } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import DotsVertical from 'mdi-material-ui/DotsVertical';
import { useAuth } from 'src/hooks/useAuth';

const StatisticsCard = ({ nama, nim }) => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <Card>
      <CardHeader
        title={nama}
        action={
          <>
            <Button
              variant='outlined'
              color='primary'
              size='small'
              onClick={handleLogout}
              sx={{ marginRight: 2 }}
            >
              Log Out
            </Button>
            <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
              <DotsVertical />
            </IconButton>
          </>
        }
        subheader={
          <Typography variant='body2'>
            <span className='text-muted'>Nim:</span> {nim}
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(1)} !important` }}>
        <Button
          component="a"
          href='https://chat.whatsapp.com/CVnP05dZZxLEiPVD86iNA1'
          target="_blank"
          rel="noopener noreferrer"
          variant='contained'
          color='primary'
          fullWidth={isMobile}
        >
          Gabung Grub WA
        </Button>
        <Grid container spacing={isMobile ? 2 : [5, 0]}>
          {/* Add any additional content here */}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
