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
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl } from 'src/@core/api';

const NilaiTable = ({ nim }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { data } } = await axios.get(`${baseUrl}/admin/mahasiswa`);
        const studentData = data.find(item => item.nim === nim);
        if (studentData && studentData.beasiswa && studentData.beasiswa.nilaiRaport) {
          setRows(studentData.beasiswa.nilaiRaport);
          setSelected(studentData.beasiswa.nilaiRaport.map(row => ({ id: row.id, selected: false })));
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

  const handleCheckboxChange = (id) => {
    setSelected(prevSelected => {
      return prevSelected.map(item => {
        if (item.id === id) {
          return { ...item, selected: !item.selected };
        }
        return item;
      });
    });
  };

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

  const calculateSemesterAverages = (selectedRows) => {
    const averages = { semester1: 0, semester2: 0, semester3: 0, semester4: 0, semester5: 0 };
    const selectedCount = selectedRows.length;

    if (selectedCount === 0) return averages;

    selectedRows.forEach(row => {
      averages.semester1 += parseFloat(row.semester1) || 0;
      averages.semester2 += parseFloat(row.semester2) || 0;
      averages.semester3 += parseFloat(row.semester3) || 0;
      averages.semester4 += parseFloat(row.semester4) || 0;
      averages.semester5 += parseFloat(row.semester5) || 0;
    });

    averages.semester1 = (averages.semester1 / selectedCount).toFixed(2);
    averages.semester2 = (averages.semester2 / selectedCount).toFixed(2);
    averages.semester3 = (averages.semester3 / selectedCount).toFixed(2);
    averages.semester4 = (averages.semester4 / selectedCount).toFixed(2);
    averages.semester5 = (averages.semester5 / selectedCount).toFixed(2);

    return averages;
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

  const selectedRows = rows.filter(row => selected.find(item => item.id === row.id && item.selected));
  const semesterAverages = calculateSemesterAverages(selectedRows);

  return (
    <>
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>Pilih</TableCell>
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
                    <Checkbox
                      checked={selected.find(item => item.id === row.id).selected}
                      onChange={() => handleCheckboxChange(row.id)}
                    />
                  </TableCell>
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
                  <TableCell>{calculateAverage(row)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      {selected.some(item => item.selected) && (
        <Card sx={{ marginTop: 10 }}>
          <Typography variant="h6" sx={{ padding: 2 }}>Rata-Rata Per Semester untuk Mata Pelajaran yang Dipilih</Typography>
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label='selected subjects table'>
              <TableHead>
                <TableRow>
                  <TableCell>Semester 1</TableCell>
                  <TableCell>Semester 2</TableCell>
                  <TableCell>Semester 3</TableCell>
                  <TableCell>Semester 4</TableCell>
                  <TableCell>Semester 5</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell>{semesterAverages.semester1}</TableCell>
                  <TableCell>{semesterAverages.semester2}</TableCell>
                  <TableCell>{semesterAverages.semester3}</TableCell>
                  <TableCell>{semesterAverages.semester4}</TableCell>
                  <TableCell>{semesterAverages.semester5}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </>
  );
};

export default NilaiTable;
