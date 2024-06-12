/* eslint-disable newline-before-return */
/* eslint-disable padding-line-between-statements */
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
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

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
  const jenisBeasiswaMapping = {
    'prestasi-akademik': 1,
    'hafidz-alquran': 2,
    'bibit-unggulan': 3
  };
  const [update, setUpdate] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [initialProfile, setInitialProfile] = useState({});
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { data } } = await axios.get(`${baseUrl}/user/profile`);
        setProfile(data);
        setInitialProfile(data);
        let filename = data?.beasiswa?.fileUpload?.fileName;
        if (filename) {
          setUpdate(true);
          setSupportingDocumentLink(data?.beasiswa?.fileUpload?.fileName);
        } else {
          setUpdate(false);
        }
        const image = `https://simak.unismuh.ac.id/upload/mahasiswa/${data?.nim}_.jpg`;
        if (image) {
          setImgSrc(image);
        } else {
          setImgSrc('/images/default.jpg');
        }
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

  const hasChanges = () => {
    return (
      profile?.nim !== initialProfile?.nim ||
      profile?.email !== initialProfile?.email ||
      profile?.nama !== initialProfile?.nama ||
      profile?.prodi !== initialProfile?.prodi ||
      supportingDocumentLink !== initialProfile?.beasiswa?.fileUpload?.fileName ||
      data.detailBeasiswa !== initialProfile?.beasiswa?.detailBeasiswa
    );
  };

  const simpanData = async (e) => {
    e.preventDefault();
    if (!data.detailBeasiswa || data.detailBeasiswa === 'pilih') {
      toast.error('Detail beasiswa harus dipilih');
      return;
    }
    if (!supportingDocumentLink) {
      toast.error('Link berkas pendukung harus diupload');
      return;
    }
    const jenisBeasiswaId = jenisBeasiswaMapping[data.jenisBeasiswa];
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/user/beasiswa/register`, {
        nim: profile.nim,
        jenisBeasiswaId: Number(jenisBeasiswaId),
        detailJenis: Number(data.detailBeasiswa),
        urlFile: supportingDocumentLink.name
      });

      if (res.status === 200 && newFile) {
        const formData = new FormData();
        formData.append('file', newFile);
        formData.append('jenis_beasiswa', slug);
        const fileRes = await axios.post(`${baseUrl}/user/beasiswa/upload`, formData);
        if (fileRes.status === 200) {
          toast.success('Data berhasil disimpan');
        } else {
          throw new Error('File upload failed');
        }
      } else {
        toast.success('Data berhasil disimpan tanpa perubahan pada berkas');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(`${error?.response?.data?.message || 'Gagal menyimpan data'}`);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Hanya file PDF yang diperbolehkan');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Ukuran file maksimum adalah 10MB');
        return;
      }
      setUpdate(true);
      setNewFile(file);
      setSupportingDocumentLink(file);
    }
  };

  const handleKonfirmasi = () => {
    if (!supportingDocumentLink) {
      toast.error('Link berkas pendukung harus diupload');
      return;
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirm = async () => {
    try {
      await axios.put(`${baseUrl}/users/update-register`);
      setOpenDialog(false);
      toast.success('Data dikonfirmasi');
      router.push('/registered');
    } catch (error) {
      toast.error('Gagal mengonfirmasi data');
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
          <form onSubmit={simpanData}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant='body' sx={{ fontWeight: 600 }}>
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
                {
                  data.jenisBeasiswa === 'prestasi-akademik' && (
                    <>
                      <Grid item xs={12}>
                        <Typography variant='body' sx={{ fontWeight: 600 }}>
                          2. Informasi Nilai
                        </Typography>
                        <Typography variant='body2' sx={{ fontWeight: 1000, marginLeft: 2, marginTop: 1 }}>
                          Silakan tambahkan mata pelajaran yang diperlukan atau hapus mata pelajaran yang tidak diperlukan sesuai dengan kelompok A dalam raport .
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <NilaiTable />
                        <Divider sx={{ marginBottom: 0 }} />
                      </Grid>
                    </>
                  )
                }
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: 2 }}>
                    {
                      data.jenisBeasiswa === 'prestasi-akademik' ? '3. Informasi Beasiswa' : '2. Informasi Beasiswa'
                    }
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
                      <MenuItem value='hafidz-alquran'>Hafidz Qur'an</MenuItem>
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
                    {
                      data.jenisBeasiswa === 'prestasi-akademik' ? '4. Informasi Berkas Pendukung (Gabungkan dalam 1 file PDF dan Maximal File Upload 10 MB)' : '3. Informasi Berkas Pendukung  (Gabungkan dalam 1 file PDF dan Maximal File Upload 10 MB)'
                    }
                  </Typography>
                  <ol style={{ color: 'gray', fontSize: 14 }}>
                    <li>Foto (Resmi dan sopan)</li>
                    <li>KTP/KK (Salah satunya)</li>
                    <li>Ijazah Terakhir atau SKL/SKHU</li>
                    <li>Surat Pernyataan Penerima Beasiswa -  <a href="https://bit.ly/PERNYATAAN-KOMITMEN" target="_blank" rel="noopener noreferrer">
                      https://bit.ly/PERNYATAAN-KOMITMEN
                    </a></li>
                    {
                      data.jenisBeasiswa === 'hafidz-alquran' && (
                        <>
                          <li>Sertifikat Munakasyah Hafisdzh Qur'an/Keterangan dari guru penghapal atau yang setara</li>
                        </>
                      ) || data.jenisBeasiswa === 'prestasi-akademik' && (
                        <>
                          <li>Sampul rapor yang berisikan biodata siswa</li>
                          <li>Nilai raport semester 1 s.d 5</li>
                        </>
                      )
                    }
                  </ol>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Link Berkas Pendukung'
                    placeholder='Link Berkas Pendukung'
                    value={supportingDocumentLink?.name ? supportingDocumentLink.name : supportingDocumentLink}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" component="label">
                    Upload File
                    <input
                      type="file"
                      hidden
                      accept='application/pdf'
                      onChange={handleFileChange}
                    />
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
            <Divider sx={{ margin: 0 }} />
            <CardActions sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 2
            }}>
              {hasChanges() && (
                <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                  Simpan Data
                </Button>
              )}
              <Button
                onClick={handleKonfirmasi}
                size='large' sx={{ mr: 2 }} variant='contained' color='error'>
                Konfirmasi
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Konfirmasi Data"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah Anda yakin ingin mengonfirmasi data? Setelah konfirmasi, data tidak dapat diubah!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Batal
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Konfirmasi
          </Button>
        </DialogActions>
      </Dialog>
    </CardContent>
  );
};

export default Dashboard;
