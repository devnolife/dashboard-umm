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
import Button from '@mui/material/Button';
import StatisticsCard from 'src/views/dashboard/StatisticsCard';
import CardActions from '@mui/material/CardActions';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

const ImgStyled = styled('img')(({ theme }) => ({
  width: 180,
  height: 180,
  objectFit: 'cover',
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
  justifyItems: 'center',
  alignItems: 'center'
}));

const Dashboard = () => {
  const [data, setData] = useState({ jenisBeasiswa: "", detailBeasiswa: "" });
  const [profile, setProfile] = useState({});
  const [imgSrc, setImgSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const [supportingDocumentLink, setSupportingDocumentLink] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { data } } = await axios.get('https:/api.beasiswa.unismuh.ac.id/api/user/profile');
        setProfile(data);
        setImgSrc(`https://simak.unismuh.ac.id/upload/mahasiswa/${data?.nim}_.jpg`);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error('Gagal mengambil data');
      }
    };
    fetchData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.jenisBeasiswa || data.jenisBeasiswa === 'pilihan') {
      toast.error('Jenis beasiswa harus dipilih');
      return;
    }
    if (!data.detailBeasiswa || data.detailBeasiswa === 'pilih') {
      toast.error('Detail beasiswa harus dipilih');
      return;
    }
    if (!supportingDocumentLink) {
      toast.error('Link berkas pendukung harus diupload');
      return;
    }
    try {
      const res = await axios.post('https://api.beasiswa.unismuh.ac.id/api/user/beasiswa/register', {
        nim: profile.nim,
        jenisBeasiswaId: Number(data.jenisBeasiswa),
        detailJenis: Number(data.detailBeasiswa),
        urlFile: supportingDocumentLink
      });
      if (res.status === 200) {
        toast.success('Data berhasil disimpan');
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message || 'Gagal menyimpan data'}`);
    }
  };

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
    <CardContent>
      <Grid container spacing={7}>
        <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ImgStyled src={imgSrc} alt='Profile Pic' />
            <Grid item xs={12}>
              <StatisticsCard nama={profile?.nama || "Mahasiswa"} nim={profile?.nim || "-"} />
            </Grid>
          </Box>
        </Grid>
        <Card>
          <CardHeader title='Data Diri Mahasiswa' titleTypographyProps={{ variant: 'h6' }} />
          <Divider sx={{ margin: 0 }} />
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
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
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    2. Informasi Beasiswa
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Jenis Beasiswa</InputLabel>
                    <Select
                      onChange={e => setData({ ...data, jenisBeasiswa: e.target.value })}
                      label='Jenis Beasiswa'
                      defaultValue='pilih'
                    >
                      <MenuItem value='pilih'>Jenis Beasiswa</MenuItem>
                      <MenuItem value='1'>Prestasi Akademik</MenuItem>
                      <MenuItem value='2'>Hafidz Qur'an</MenuItem>
                      <MenuItem value='3'>Bibit Unggulan</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {data.jenisBeasiswa === '1' && (
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Select
                        defaultValue='pilih'
                        onChange={e => setData({ ...data, detailBeasiswa: e.target.value })}
                      >
                        <MenuItem value='pilih'>Pilih Prestasi</MenuItem>
                        <MenuItem value='1'>Kategori 1</MenuItem>
                        <MenuItem value='2'>Kategori 2</MenuItem>
                        <MenuItem value='3'>Kategori 3</MenuItem>
                        <MenuItem value='4'>Kategori 4</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {data.jenisBeasiswa === '2' && (
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Select
                        defaultValue='pilih'
                        onChange={e => setData({ ...data, detailBeasiswa: e.target.value })}
                      >
                        <MenuItem value='pilih'>Pilih Prestasi</MenuItem>
                        <MenuItem value='1'>Kategori 1</MenuItem>
                        <MenuItem value='2'>Kategori 2</MenuItem>
                        <MenuItem value='3'>Kategori 3</MenuItem>
                        <MenuItem value='4'>Kategori 4</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {data.jenisBeasiswa === '3' && (
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Select
                        defaultValue='pilih'
                        onChange={e => setData({ ...data, detailBeasiswa: e.target.value })}
                      >
                        <MenuItem value='pilih'>Pilih Prestasi</MenuItem>
                        <MenuItem value='1'>Kategori 1</MenuItem>
                        <MenuItem value='2'>Kategori 2</MenuItem>
                        <MenuItem value='3'>Kategori 3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
              </Grid>
              <Grid container spacing={5}>
                <Divider sx={{ margin: 0 }} />
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600, marginTop: 5 }}>
                    3.Upload Link Berkas Pendukung
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Link Berkas Pendukung'
                    placeholder='Link Berkas Pendukung'
                    value={supportingDocumentLink}
                    onChange={e => setSupportingDocumentLink(e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider sx={{ margin: 0 }} />
            <CardActions>
              <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                Next
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </CardContent>
  );
};

export default Dashboard;
