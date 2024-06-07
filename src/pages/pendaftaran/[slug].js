/* eslint-disable newline-before-return */
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
import { baseUrl } from 'src/@core/api';
import NilaiTable from './nilai';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const { slug } = router?.query;
  const [data, setData] = useState({ jenisBeasiswa: "", detailBeasiswa: "" });
  const [profile, setProfile] = useState({});
  const [imgSrc, setImgSrc] = useState("");
  const [loading, setLoading] = useState(true);
  const [supportingDocumentLink, setSupportingDocumentLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { data } } = await axios.get(`${baseUrl}/user/profile`);
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

  useEffect(() => {
    if (slug) {
      const lastDashIndex = slug.lastIndexOf('-');
      const jenis = slug.substring(0, lastDashIndex);
      const detail = slug.substring(lastDashIndex + 1);
      setData({
        jenisBeasiswa: jenis,
        detailBeasiswa: detail
      });
    }
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.detailBeasiswa || data.detailBeasiswa === 'pilih') {
      toast.error('Detail beasiswa harus dipilih');
      return;
    }
    if (!supportingDocumentLink) {
      toast.error('Link berkas pendukung harus diupload');
      return;
    }
    try {
      const res = await axios.post(`${baseUrl}/user/beasiswa/register`, {
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

  const handleFileUpload = async (file) => {
    console.log("🚀 ~ handleFileUpload ~ file:", file)
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('http://localhost:8000/api/user/beasiswa/upload', formData);
      if (res.status === 200) {
        toast.success('File berhasil diupload');
        setSupportingDocumentLink(file?.name);
      }
    } catch (error) {
      toast.error('Gagal mengupload file');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
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
                    2. Informasi Nilai
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <NilaiTable />
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
                      value={data.jenisBeasiswa}
                      label='Jenis Beasiswa'
                      disabled
                    >
                      <MenuItem value='prestasi-akademik'>Prestasi Akademik</MenuItem>
                      <MenuItem value='hafidz-quran'>Hafidz Qur'an</MenuItem>
                      <MenuItem value='bibit-unggulan'>Bibit Unggulan</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Detail Beasiswa</InputLabel>
                    <Select
                      value={data.detailBeasiswa}
                      onChange={e => setData({ ...data, detailBeasiswa: e.target.value })}
                      label='Detail Beasiswa'
                      disabled
                    >
                      <MenuItem value='pilih'>Pilih Detail Beasiswa</MenuItem>
                      <MenuItem value='1'>Kategori 1</MenuItem>
                      <MenuItem value='2'>Kategori 2</MenuItem>
                      <MenuItem value='3'>Kategori 3</MenuItem>
                      <MenuItem value='4'>Kategori 4</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600, marginTop: 5 }}>
                    4. Upload Link Berkas Pendukung
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Link Berkas Pendukung'
                    placeholder='Link Berkas Pendukung'
                    value={supportingDocumentLink}
                    disabled  
                    onChange={e => setSupportingDocumentLink(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" component="label">
                    Upload File
                    <input
                      type="file"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
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
