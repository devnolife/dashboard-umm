/* eslint-disable padding-line-between-statements */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl } from 'src/@core/api';

const NilaiTable = ({ nim }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { data } } = await axios.get(`${baseUrl}/admin/mahasiswa`);
        const studentData = data.find(item => item.nim === nim);
        if (studentData && studentData.beasiswa && studentData.beasiswa.nilaiRaport) {
          setRows(studentData.beasiswa.nilaiRaport);
        } else {
          setRows([]);
        }
        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Data gagal dimuat');
        setError(error?.response?.data?.message || 'Data gagal dimuat');
        setLoading(false);
      }
    };
    fetchData();
  }, [nim]);

  const calculateAverage = (row) => {
    const scores = [
      parseFloat(row.semester1) || 0,
      parseFloat(row.semester2) || 0,
      parseFloat(row.semester3) || 0,
      parseFloat(row.semester4) || 0,
      parseFloat(row.semester5) || 0
    ];
    const total = scores.reduce((acc, score) => acc + score, 0);
    return (total / 5).toFixed(2);
  };

  const calculateColumnAverages = () => {
    if (rows.length === 0) return { semester1: 0, semester2: 0, semester3: 0, semester4: 0, semester5: 0 };

    const total = rows.reduce((acc, row) => {
      acc.semester1 += parseFloat(row.semester1) || 0;
      acc.semester2 += parseFloat(row.semester2) || 0;
      acc.semester3 += parseFloat(row.semester3) || 0;
      acc.semester4 += parseFloat(row.semester4) || 0;
      acc.semester5 += parseFloat(row.semester5) || 0;
      return acc;
    }, { semester1: 0, semester2: 0, semester3: 0, semester4: 0, semester5: 0 });

    const numRows = rows.length;
    return {
      semester1: (total.semester1 / numRows).toFixed(2),
      semester2: (total.semester2 / numRows).toFixed(2),
      semester3: (total.semester3 / numRows).toFixed(2),
      semester4: (total.semester4 / numRows).toFixed(2),
      semester5: (total.semester5 / numRows).toFixed(2)
    };
  };

  const calculateOverallAverage = () => {
    const averages = rows.map(row => parseFloat(calculateAverage(row)));
    const total = averages.reduce((acc, avg) => acc + avg, 0);
    return (total / averages.length).toFixed(2);
  };

  if (loading) {
    return (
      <Card>
        <Typography align="center">
          <CircularProgress />
        </Typography>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Typography color="error" align="center">
          Error: {error}
        </Typography>
      </Card>
    );
  }

  if (rows.length === 0) {
    return (
      <Card>
        <Typography align="center">No data available</Typography>
      </Card>
    );
  }

  const columnAverages = calculateColumnAverages();
  const overallAverage = calculateOverallAverage();

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Mapel</TableCell>
              <TableCell>Semester 1</TableCell>
              <TableCell>Semester 2</TableCell>
              <TableCell>Semester 3</TableCell>
              <TableCell>Semester 4</TableCell>
              <TableCell>Semester 5</TableCell>
              <TableCell>Rata-Rata</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.mapel}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.semester1}</TableCell>
                <TableCell>{row.semester2}</TableCell>
                <TableCell>{row.semester3}</TableCell>
                <TableCell>{row.semester4}</TableCell>
                <TableCell>{row.semester5}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default NilaiTable;
