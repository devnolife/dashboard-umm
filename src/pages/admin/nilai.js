import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl } from 'src/@core/api';
import { TextField } from '@mui/material';

const NilaiTable = ({ nim }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState([]);
  const [semesters, setSemesters] = useState({
    semester1: true,
    semester2: true,
    semester3: true,
    semester4: true,
    semester5: true,
  });
  const [nilai, handleChangeNilai] = useState(0);

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

  const handleSemesterChange = (event) => {
    setSemesters({
      ...semesters,
      [event.target.name]: event.target.checked,
    });
  };

  const calculateAverage = (row) => {
    const scores = [
      semesters.semester1 ? parseFloat(row.semester1) || 0 : 0,
      semesters.semester2 ? parseFloat(row.semester2) || 0 : 0,
      semesters.semester3 ? parseFloat(row.semester3) || 0 : 0,
      semesters.semester4 ? parseFloat(row.semester4) || 0 : 0,
      semesters.semester5 ? parseFloat(row.semester5) || 0 : 0,
    ];
    const count = scores.filter(score => score > 0).length;
    const total = scores.reduce((acc, score) => acc + score, 0);
    return count ? (total / count).toFixed(2) : '0.00';
  };

  const calculateSemesterAverages = (selectedRows) => {
    const averages = { semester1: 0, semester2: 0, semester3: 0, semester4: 0, semester5: 0 };
    const selectedCount = selectedRows.length;

    if (selectedCount === 0) return averages;

    selectedRows.forEach(row => {
      if (semesters.semester1) averages.semester1 += parseFloat(row.semester1) || 0;
      if (semesters.semester2) averages.semester2 += parseFloat(row.semester2) || 0;
      if (semesters.semester3) averages.semester3 += parseFloat(row.semester3) || 0;
      if (semesters.semester4) averages.semester4 += parseFloat(row.semester4) || 0;
      if (semesters.semester5) averages.semester5 += parseFloat(row.semester5) || 0;
    });

    if (semesters.semester1) averages.semester1 = (averages.semester1 / selectedCount).toFixed(2);
    if (semesters.semester2) averages.semester2 = (averages.semester2 / selectedCount).toFixed(2);
    if (semesters.semester3) averages.semester3 = (averages.semester3 / selectedCount).toFixed(2);
    if (semesters.semester4) averages.semester4 = (averages.semester4 / selectedCount).toFixed(2);
    if (semesters.semester5) averages.semester5 = (averages.semester5 / selectedCount).toFixed(2);

    return averages;
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${baseUrl}/admin/update-nilai`, {
        nim,
        nilaiRaport: nilai
      });
      toast.success('Data updated successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update data');
    }
  };

  const selectedRows = rows.filter(row => selected.find(item => item.id === row.id && item.selected));
  const semesterAverages = calculateSemesterAverages(selectedRows);

  const overallAverage = (
    (semesters.semester1 ? parseFloat(semesterAverages.semester1) : 0) +
    (semesters.semester2 ? parseFloat(semesterAverages.semester2) : 0) +
    (semesters.semester3 ? parseFloat(semesterAverages.semester3) : 0) +
    (semesters.semester4 ? parseFloat(semesterAverages.semester4) : 0) +
    (semesters.semester5 ? parseFloat(semesterAverages.semester5) : 0)
  ) / Object.values(semesters).filter(Boolean).length;

  useEffect(() => {
    handleChangeNilai(overallAverage.toFixed(2));
  }, [overallAverage, handleChangeNilai]);

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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      {selected.some(item => item.selected) && (
        <Card sx={{ marginTop: 10 }}>
          <Typography variant="h6" sx={{ padding: 2 }}>Rata-Rata Per Semester untuk Mata Pelajaran yang Dipilih</Typography>
          <FormGroup row sx={{ paddingLeft: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={semesters.semester1}
                  onChange={handleSemesterChange}
                  name="semester1"
                />
              }
              label="Semester 1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={semesters.semester2}
                  onChange={handleSemesterChange}
                  name="semester2"
                />
              }
              label="Semester 2"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={semesters.semester3}
                  onChange={handleSemesterChange}
                  name="semester3"
                />
              }
              label="Semester 3"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={semesters.semester4}
                  onChange={handleSemesterChange}
                  name="semester4"
                />
              }
              label="Semester 4"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={semesters.semester5}
                  onChange={handleSemesterChange}
                  name="semester5"
                />
              }
              label="Semester 5"
            />
          </FormGroup>
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label='selected subjects table'>
              <TableHead>
                <TableRow>
                  <TableCell>Semester 1</TableCell>
                  <TableCell>Semester 2</TableCell>
                  <TableCell>Semester 3</TableCell>
                  <TableCell>Semester 4</TableCell>
                  <TableCell>Semester 5</TableCell>
                  <TableCell>Rata-Rata</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover>
                  <TableCell>{semesters.semester1 ? semesterAverages.semester1 : 'N/A'}</TableCell>
                  <TableCell>{semesters.semester2 ? semesterAverages.semester2 : 'N/A'}</TableCell>
                  <TableCell>{semesters.semester3 ? semesterAverages.semester3 : 'N/A'}</TableCell>
                  <TableCell>{semesters.semester4 ? semesterAverages.semester4 : 'N/A'}</TableCell>
                  <TableCell>{semesters.semester5 ? semesterAverages.semester5 : 'N/A'}</TableCell>
                  <TableCell>{overallAverage.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 5 }}>
            <TextField
              label="Input Nilai Raport"
              variant="outlined"
              value={nilai}
              onChange={(e) => handleChangeNilai(e.target.value)}
              sx={{ marginRight: 2, width: '300px' }}
            />
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update Nilai
            </Button>
          </Box>
        </Card>
      )}
    </>
  );
};

NilaiTable.propTypes = {
  nim: PropTypes.string.isRequired,
  handleChangeNilai: PropTypes.func.isRequired,
};

export default NilaiTable;
