import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { darken } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { baseUrl } from 'src/@core/api';
import { useRouter } from 'next/router';

const createData = (nim, nama, prodi, jenisBeasiswa, kategoriBeasiswa, status) => {
  return { nim, nama, prodi, jenisBeasiswa, kategoriBeasiswa, status };
};

const statusColors = {
  Terdaftar: { background: '#4caf50', color: '#ffffff' },
  'Tidak Terdaftar': { background: '#f44336', color: '#ffffff' },
};

const StyledChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor: statusColors[status]?.background || theme.palette.grey[300],
  color: statusColors[status]?.color || theme.palette.text.primary,
  borderRadius: '16px',
  fontWeight: 'bold',
  justifyContent: 'center',
  width: '90px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: statusColors[status] ? darken(statusColors[status].background, 0.2) : theme.palette.grey[400],
  }
}));

const StyledLink = styled(Chip)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.grey[400],
  borderRadius: '16px',
  fontWeight: 'bold',
  justifyContent: 'center',
  width: '90px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.grey[400],
  }
}));

const ListMahasiswa = () => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin/mahasiswa`);
        const data = response.data.data.map(item => {
          const jenisBeasiswa = item.beasiswa?.jenisBeasiswa?.nama || 'N/A';
          const kategoriBeasiswa = item.beasiswa?.detailJenis || 'N/A';
          const status = item.beasiswa ? 'Terdaftar' : 'Tidak Terdaftar';
          return createData(
            item.nim,
            item.nama,
            item.prodi,
            jenisBeasiswa,
            kategoriBeasiswa,
            status
          );
        });
        setRows(data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };
    fetchData();
  }, []);

  const handleStatusClick = (nim) => {
    router.push(`/admin/registered?nim=${nim}`);
  };

  const handleProfileClick = (nim) => {
    router.push(`/admin/detail?nim=${nim}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.nama.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === '' || row.status === statusFilter)
    );
  });

  const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        List Mahasiswa
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value=""><em>All</em></MenuItem>
            <MenuItem value="Terdaftar">Terdaftar</MenuItem>
            <MenuItem value="Tidak Terdaftar">Tidak Terdaftar</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight="bold" sx={{ textTransform: 'uppercase' }}>NIM</Typography></TableCell>
              <TableCell align='center'><Typography fontWeight="bold" sx={{ textTransform: 'uppercase' }}>Nama</Typography></TableCell>
              <TableCell align='center'><Typography fontWeight="bold" sx={{ textTransform: 'uppercase' }}>Prodi</Typography></TableCell>
              <TableCell align='center'><Typography fontWeight="bold" sx={{ textTransform: 'uppercase' }}>Jenis Beasiswa</Typography></TableCell>
              <TableCell align='center'><Typography fontWeight="bold" sx={{ textTransform: 'uppercase' }}>Kategori Beasiswa</Typography></TableCell>
              <TableCell align='center'><Typography fontWeight="bold" sx={{ textTransform: 'uppercase' }}>Status</Typography></TableCell>
              <TableCell align='center'><Typography fontWeight="bold" sx={{ textTransform: 'uppercase' }}>Info Selengkapnya</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.nim}>
                <TableCell component="th" scope="row" sx={{ textTransform: 'uppercase' }}>{String(row.nim)}</TableCell>
                <TableCell align="center" sx={{ textTransform: 'uppercase' }}>{String(row.nama)}</TableCell>
                <TableCell align="center" sx={{ textTransform: 'uppercase' }}>{String(row.prodi)}</TableCell>
                <TableCell align="center" sx={{ textTransform: 'uppercase' }}>{String(row.jenisBeasiswa)}</TableCell>
                <TableCell align="center" sx={{ textTransform: 'uppercase' }}>{String(row.kategoriBeasiswa)}</TableCell>
                <TableCell align="center">
                  <StyledChip
                    label={row.status}
                    status={row.status}
                    onClick={() => handleStatusClick(row.nim)}
                  />
                </TableCell>
                <TableCell align="center">
                  <StyledLink
                    label="Detail"
                    onClick={() => handleProfileClick(row.nim)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default ListMahasiswa;
