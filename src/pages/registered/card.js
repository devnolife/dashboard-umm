
import { Card, CardHeader, CardContent, IconButton, Typography, Grid, Button } from '@mui/material';
import DotsVertical from 'mdi-material-ui/DotsVertical';
import { useAuth } from 'src/hooks/useAuth'
const StatisticsCard = ({ nama, nim }) => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

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
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
        </Grid>
      </CardContent>
    </Card>
  );
};


export default StatisticsCard
