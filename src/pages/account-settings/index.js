import { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import CardActions from '@mui/material/CardActions'
import { toast, Toaster } from 'react-hot-toast';
const ImgStyled = styled('img')(({ theme }) => ({
  width: 180,
  height: 180,
  objectFit: 'cover',
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
  justifyItems: 'center',
  alignItems: 'center'
}))


const TabAccount = () => {
  const [data, setData] = useState({
    jenisBeasiswa: "",
  });
  const [imgSrc, setImgSrc] = useState('https://simak.unismuh.ac.id/upload/mahasiswa/105841107321_.jpg')
  return (
    <CardContent>
      <Grid container spacing={7}>
        <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ImgStyled src={imgSrc} alt='Profile Pic' />
            <Grid item xs={12}>
              <StatisticsCard />
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
                  <TextField fullWidth label='Nim' placeholder='10584110100' defaultValue={"10584110100"} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth type='email' label='Email' placeholder='10584110100@gmail.com' defaultValue={"10584110100@gmail.com"} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Nama' placeholder='Fulan' defaultValue={"Chalidah Az-zahrah. H"} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Prodi' placeholder='Informatika' defaultValue={"Informatika"} />
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
                      defaultValue={"pilihan"}
                    >
                      <MenuItem value='pilihan'>Jenis Beasiswa</MenuItem>
                      <MenuItem value='prestasi'>Prestasi Akademik</MenuItem>
                      <MenuItem value='hafidz'>Hafidz Qur'an</MenuItem>
                      <MenuItem value='bibitunggulan'>Bibit Unggulan</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {
                  data?.jenisBeasiswa === 'prestasi' ? (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Select
                          label='Peringkat (Rangking)' defaultValue={"rangkin1umum"}>
                          <MenuItem value='rangkin1umum'>Peringkat (Rangking) 1 Umum</MenuItem>
                          <MenuItem value='rangkin1kelas'>Peringkat (Rangking) 1 Kelas</MenuItem>
                          <MenuItem value='rangkin23kelas'>Peringkat (Rangking) 2 dan 3 Kelas</MenuItem>
                          <MenuItem value='rangkin45kelas'>Peringkat (Rangking) 4 dan 5 Kelas</MenuItem>
                        </Select>
                      </Grid>
                    </>
                  ) : data?.jenisBeasiswa === 'bibitunggulan' ? (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Select
                          label='Bibit Unggul Persyarikatan'>
                          <MenuItem value='ketua'>Mantan dan atau Ketua,Sekretaris dan Bendahara PD atau PC IPM</MenuItem>
                          <MenuItem value='kabidsekbid'>Mantan atau Ketua Bidang dan Sekretatis PD atau PC IPM</MenuItem>
                          <MenuItem value='anggota'>Mantan dan atau Anggota Bidang PD atau PC IPM</MenuItem>
                          <MenuItem value='depertemen'>Mantan dan atau Departemen atau Seksi PD IPM</MenuItem>
                        </Select>
                      </Grid>
                    </>
                  ) : data?.jenisBeasiswa === 'hafidz' ? (
                    <>
                      <Grid item xs={12} sm={6}>
                        <Select
                          label='Hafidz Quran'
                          defaultValue={"pilihan"}
                        >
                          <MenuItem value='20juzmutqin'>Hafalan Al-Quran minimal 20 juz mutqin</MenuItem>
                          <MenuItem value='15juzmutqin'>Hafalan Al-Quran minimal 15 juz mutqin</MenuItem>
                          <MenuItem value='10juzmutqin'>Hafalan Al-Quran minimal 10 juz mutqin</MenuItem>
                          <MenuItem value='5juzmutqin'>Hafalan Al-Quran minimal 5 juz mutqin</MenuItem>
                        </Select>
                      </Grid>
                    </>
                  ) : null
                }
              </Grid>
            </CardContent>
            <Divider sx={{ margin: 0 }} />
            <CardActions>
              <Button
               
                size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                Next
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </CardContent >
  )
}

export default TabAccount
