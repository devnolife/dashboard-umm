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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import toast from 'react-hot-toast';
import { baseUrl } from 'src/@core/api';

const NilaiTable = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [addMapelOpen, setAddMapelOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    mapel: '',
    nim: '',
    semester1: '',
    semester2: '',
    semester3: '',
    semester4: '',
    semester5: ''
  });
  const [newMapel, setNewMapel] = useState({
    mapel: '',
    semester1: '',
    semester2: '',
    semester3: '',
    semester4: '',
    semester5: ''
  });
  const [newRow, setNewRow] = useState({
    mapel: '',
    semester1: '',
    semester2: '',
    semester3: '',
    semester4: '',
    semester5: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { data } } = await axios.get(`${baseUrl}/user/nilai-raport`);
        setRows(data.nilai || []);
        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Data gagal dimuat');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [loading]);

  const handleClickOpen = (row) => {
    setCurrentRow(row);
    setFormData(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddMapelClickOpen = () => {
    setAddMapelOpen(true);
  };

  const handleAddMapelClose = () => {
    setAddMapelOpen(false);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleNewMapelChange = (event) => {
    setNewMapel({
      ...newMapel,
      [event.target.name]: event.target.value
    });
  };

  const handleUpdate = async () => {
    const updatedData = {
      idRaport: currentRow.id,
      semester1: formData.semester1 || currentRow.semester1,
      semester2: formData.semester2 || currentRow.semester2,
      semester3: formData.semester3 || currentRow.semester3,
      semester4: formData.semester4 || currentRow.semester4,
      semester5: formData.semester5 || currentRow.semester5
    };

    if (Number(updatedData.semester1) > 100
      || Number(updatedData.semester2) > 100
      || Number(updatedData.semester3) > 100
      || Number(updatedData.semester4) > 100) {
      toast.error('Nilai tidak boleh lebih dari 100 😊');
      handleClose();
    } else {
      try {
        await axios.put(`${baseUrl}/user/nilai-raport`, updatedData);
        setLoading(true);
        toast.success('Data berhasil diperbarui');
        handleClose();
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message || 'Data gagal diperbarui');
        handleClose();
      }
    }
  };

  const handleAddMapel = async () => {
    if (Number(newMapel.semester1) > 100
      || Number(newMapel.semester2) > 100
      || Number(newMapel.semester3) > 100
      || Number(newMapel.semester4) > 100) {
      toast.error('Nilai tidak boleh lebih dari 100 😊');
      handleClose();
    } else {
      try {
        await axios.post(`${baseUrl}/user/nilai-raport`, newMapel);
        setNewMapel({
          mapel: '',
          semester1: '',
          semester2: '',
          semester3: '',
          semester4: '',
          semester5: ''
        });
        setLoading(true);
        toast.success('Data berhasil ditambahkan');
        handleAddMapelClose();
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Data gagal ditambahkan');
        handleAddMapelClose();
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/user/nilai-raport/${id}`);
      setLoading(true);
      toast.success('Data berhasil dihapus');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Data gagal dihapus');
    }
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

  return (
    <div>
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
                <TableCell>Aksi</TableCell>
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
                  <TableCell>
                    <Button variant='outlined' onClick={() => handleClickOpen(row)}>Edit</Button>
                    <Button variant='outlined' color='error' onClick={() => handleDelete(row.id)}>Hapus</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={addMapelOpen} onClose={handleAddMapelClose}>
          <DialogTitle>Tambahkan Mapel</DialogTitle>
          <DialogContent>
            <TextField
              margin='dense'
              name='mapel'
              label='Mapel'
              type='text'
              fullWidth
              value={newMapel.mapel}
              onChange={handleNewMapelChange}
            />
            <TextField
              margin='dense'
              name='semester1'
              label='Semester 1'
              type='text'
              fullWidth
              value={newMapel.semester1}
              onChange={handleNewMapelChange}
            />
            <TextField
              margin='dense'
              name='semester2'
              label='Semester 2'
              type='text'
              fullWidth
              value={newMapel.semester2}
              onChange={handleNewMapelChange}
            />
            <TextField
              margin='dense'
              name='semester3'
              label='Semester 3'
              type='text'
              fullWidth
              value={newMapel.semester3}
              onChange={handleNewMapelChange}
            />
            <TextField
              margin='dense'
              name='semester4'
              label='Semester 4'
              type='text'
              fullWidth
              value={newMapel.semester4}
              onChange={handleNewMapelChange}
            />
            <TextField
              margin='dense'
              name='semester5'
              label='Semester 5'
              type='text'
              fullWidth
              value={newMapel.semester5}
              onChange={handleNewMapelChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddMapelClose}>Batalkan</Button>
            <Button onClick={handleAddMapel}>Tambahkan</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Row</DialogTitle>
          <DialogContent>
            <TextField
              margin='dense'
              name='mapel'
              label='Mapel'
              type='text'
              fullWidth
              value={formData.mapel}
              onChange={handleChange}
              disabled
            />
            <TextField
              margin='dense'
              name='semester1'
              label='Semester 1'
              type='text'
              fullWidth
              value={formData.semester1}
              onChange={handleChange}
            />
            <TextField
              margin='dense'
              name='semester2'
              label='Semester 2'
              type='text'
              fullWidth
              value={formData.semester2}
              onChange={handleChange}
            />
            <TextField
              margin='dense'
              name='semester3'
              label='Semester 3'
              type='text'
              fullWidth
              value={formData.semester3}
              onChange={handleChange}
            />
            <TextField
              margin='dense'
              name='semester4'
              label='Semester 4'
              type='text'
              fullWidth
              value={formData.semester4}
              onChange={handleChange}
            />
            <TextField
              margin='dense'
              name='semester5'
              label='Semester 5'
              type='text'
              fullWidth
              value={formData.semester4}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions xs={
            { display: 'flex', justifyContent: 'space-between' }
          }>
            <Button onClick={handleClose}>Batalkan</Button>
            <Button onClick={handleUpdate}>Perbarui</Button>
          </DialogActions>
        </Dialog>
      </Card >
      <Box sx={{ p: 2, justifyContent: 'flex-end', display: 'flex', marginTop: 2 }}>
        <Button variant='contained' color='primary' onClick={handleAddMapelClickOpen} sx={{ ml: 2 }}>Tambahkan Mapel</Button>
      </Box>
    </div>
  );
};

export default NilaiTable;
