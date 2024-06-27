import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { baseUrl } from 'src/@core/api';
import { useRouter } from 'next/router';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const Container = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    maxWidth: '1200px',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.5),
    },
}));

const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.5),
    },
}));

const Penilaian = () => {
    const router = useRouter();
    const { nim } = router.query;
    const [nilai, setNilai] = useState([]);
    const [loading, setLoading] = useState(true);
    const [evaluation, setEvaluation] = useState('');
    const [comments, setComments] = useState('');
    const [eligibility, setEligibility] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { data } } = await axios.get(`${baseUrl}/admin/nilai?nim=${nim}`);
                setNilai(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [nim]);

    const handleEvaluationSubmit = async () => {
        try {
            await axios.post(`${baseUrl}/admin/penilaian`, {
                nim,
                evaluation,
                comments,
                eligibility,
            });
            alert('Penilaian berhasil disimpan!');
            router.push(`/admin/detail?nim=${nim}`);
        } catch (error) {
            console.error("Failed to submit evaluation", error);
            alert('Gagal menyimpan penilaian.');
        }
    };

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#121212',
                color: '#ffffff',
            }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container>
            <Box className='content-center'>
                <CardContent>
                    <Typography variant='h4' sx={{ fontWeight: 600, marginBottom: 3, textAlign: 'center', fontSize: { xs: '1.5rem', md: '2rem' } }}>
                        Penilaian Mahasiswa
                    </Typography>
                    <Grid container spacing={2}>

                        {/* Tabel Nilai */}
                        <StyledCard sx={{ width: '100%' }}>
                            <CardHeader title='Daftar Nilai' titleTypographyProps={{ variant: 'h6' }} />
                            <Divider sx={{ margin: 0 }} />
                            <CardContent>
                                <Box sx={{ height: 400, width: '100%' }}>
                                    <Grid container spacing={2}>
                                        {nilai.map((item, index) => (
                                            <Grid item xs={12} sm={6} key={index}>
                                                <Typography>{item.mataKuliah}</Typography>
                                                <Typography>{item.semester}</Typography>
                                                <Typography>{item.nilai}</Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </CardContent>
                        </StyledCard>

                        {/* Form Penilaian */}
                        <StyledCard sx={{ width: '100%' }}>
                            <CardHeader title='Form Penilaian' titleTypographyProps={{ variant: 'h6' }} />
                            <Divider sx={{ margin: 0 }} />
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            select
                                            label='Kelayakan Beasiswa'
                                            value={eligibility}
                                            onChange={(e) => setEligibility(e.target.value)}
                                            fullWidth
                                        >
                                            <MenuItem value='Layak'>Layak</MenuItem>
                                            <MenuItem value='Tidak Layak'>Tidak Layak</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label='Penilaian'
                                            value={evaluation}
                                            onChange={(e) => setEvaluation(e.target.value)}
                                            fullWidth
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label='Komentar'
                                            value={comments}
                                            onChange={(e) => setComments(e.target.value)}
                                            fullWidth
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
                                <Button variant='contained' color='primary' onClick={handleEvaluationSubmit}>
                                    Simpan Penilaian
                                </Button>
                            </Box>
                        </StyledCard>

                        <Button variant='contained' color='primary' onClick={() => router.push(`/admin/detail?nim=${nim}`)}>
                            Kembali ke Detail
                        </Button>
                    </Grid>
                </CardContent>
            </Box>
        </Container>
    );
};

Penilaian.getLayout = page => <BlankLayout>{page}</BlankLayout>;
export default Penilaian;
