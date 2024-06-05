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
  const [data, setData] = useState({ jenisBeasiswa: "" });
  const [profile, setProfile] = useState({});
  const [imgSrc, setImgSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [nilaiRaport, setNilaiRaport] = useState([
    { mapel: "", semester1: "", semester2: "", semester3: "", semester4: "" }
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { data } } = await axios.get('http://localhost:8000/api/user/profile');
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

  const handleNextClick = () => {
    setShowUploadSection(true);
  };

  const handleNilaiRaportChange = (index, field, value) => {
    const newNilaiRaport = [...nilaiRaport];
    newNilaiRaport[index][field] = value;
    setNilaiRaport(newNilaiRaport);
  };

  const handleAddMapel = () => {
    setNilaiRaport([...nilaiRaport, { mapel: "", semester1: "", semester2: "", semester3: "", semester4: "" }]);
  };

  return (
    <CardContent>
      <Grid container spacing={7}>
        <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ImgStyled src={imgSrc} alt='Profile Pic' />
            <Grid item xs={12}>
              <StatisticsCard nama={profile.nama} nim={profile.nim} />
            </Grid>
          </Box>
        </Grid>
        <Card>
          <CardHeader title='Data Diri Mahasiswa' titleTypographyProps={{ variant: 'h6' }} />
          <Divider sx={{ margin: 0 }} />
          <form onSubmit={e => e.preventDefault()}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600 }}>
                    1. Informasi Akun
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Nim' placeholder='Nim' defaultValue={profile.nim} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth type='email' label='Email' placeholder='Email' defaultValue={profile.email} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Nama' placeholder='Fulan' defaultValue={profile.nama} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Prodi' placeholder='Informatika' defaultValue='Informatika' />
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
                      label='Prestasi Akademik'
                      defaultValue='pilihan'
                    >
                      <MenuItem value='pilihan'>Jenis Beasiswa</MenuItem>
                      <MenuItem value='prestasi'>Prestasi Akademik</MenuItem>
                      <MenuItem value='hafidz'>Hafidz Qur'an</MenuItem>
                      <MenuItem value='bibitunggulan'>Bibit Unggulan</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {data.jenisBeasiswa === 'prestasi' && (
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Peringkat (Rangking)</InputLabel>
                      <Select defaultValue='rangkin1umum'>
                        <MenuItem value='rangkin1umum'>Peringkat (Rangking) 1 Umum</MenuItem>
                        <MenuItem value='rangkin1kelas'>Peringkat (Rangking) 1 Kelas</MenuItem>
                        <MenuItem value='rangkin23kelas'>Peringkat (Rangking) 2 dan 3 Kelas</MenuItem>
                        <MenuItem value='rangkin45kelas'>Peringkat (Rangking) 4 dan 5 Kelas</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {data.jenisBeasiswa === 'bibitunggulan' && (
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Bibit Unggul Persyarikatan</InputLabel>
                      <Select>
                        <MenuItem value='ketua'>Mantan dan atau Ketua, Sekretaris dan Bendahara PD atau PC IPM</MenuItem>
                        <MenuItem value='kabidsekbid'>Mantan atau Ketua Bidang dan Sekretaris PD atau PC IPM</MenuItem>
                        <MenuItem value='anggota'>Mantan dan atau Anggota Bidang PD atau PC IPM</MenuItem>
                        <MenuItem value='depertemen'>Mantan dan atau Departemen atau Seksi PD IPM</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {data.jenisBeasiswa === 'hafidz' && (
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Hafidz Quran</InputLabel>
                      <Select defaultValue='pilihan'>
                        <MenuItem value='20juzmutqin'>Hafalan Al-Quran minimal 20 juz mutqin</MenuItem>
                        <MenuItem value='15juzmutqin'>Hafalan Al-Quran minimal 15 juz mutqin</MenuItem>
                        <MenuItem value='10juzmutqin'>Hafalan Al-Quran minimal 10 juz mutqin</MenuItem>
                        <MenuItem value='5juzmutqin'>Hafalan Al-Quran minimal 5 juz mutqin</MenuItem>
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
                  <TextField fullWidth label='Link Berkas Pendukung' placeholder='Link Berkas Pendukung' />
                </Grid>
              </Grid>
              <Divider sx={{ margin: 0 }} />
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, marginTop: 5 }}>
                  4.Input Nilai Raport
                </Typography>
              </Grid>
              {nilaiRaport.map((nilai, index) => (
                <Grid container spacing={3} key={index} marginTop={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label='Mata Pelajaran'
                      value={nilai.mapel}
                      onChange={e => handleNilaiRaportChange(index, 'mapel', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label='Semester 1'
                      value={nilai.semester1}
                      onChange={e => handleNilaiRaportChange(index, 'semester1', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label='Semester 2'
                      value={nilai.semester2}
                      onChange={e => handleNilaiRaportChange(index, 'semester2', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label='Semester 3'
                      value={nilai.semester3}
                      onChange={e => handleNilaiRaportChange(index, 'semester3', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      fullWidth
                      label='Semester 4'
                      value={nilai.semester4}
                      onChange={e => handleNilaiRaportChange(index, 'semester4', e.target.value)}
                    />
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button variant='contained' sx={{ marginTop: 2 }} onClick={handleAddMapel}>
                  Add Mata Pelajaran
                </Button>
              </Grid>
            </CardContent>
            <Divider sx={{ margin: 0 }} />
            <CardActions>
              <Button size='large' type='button' sx={{ mr: 2 }} variant='contained' onClick={handleNextClick}>
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
