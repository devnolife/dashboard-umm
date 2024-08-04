import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { darken } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { baseUrl } from 'src/@core/api';
import { useRouter } from 'next/router';

const createData = (nim, nama, prodi, jenisBeasiswa, kategoriBeasiswa, status) => {
  return { nim, nama, prodi, jenisBeasiswa, kategoriBeasiswa, status };
};

const statusColors = {
  Approved: { background: '#4caf50', color: '#ffffff' },
  Rejected: { background: '#f44336', color: '#ffffff' },
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

const Mahasiswa = () => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/admin/mahasiswa`);
        const data = response.data.data.map(item => {
          const jenisBeasiswa = item.beasiswa?.jenisBeasiswa || 'N/A';
          const kategoriBeasiswa = item.beasiswa?.detailJenis || 'N/A';
          const status = item.isRegistered ? 'Approved' : 'Rejected';
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

  const filteredRows = rows.filter((row) =>
    row.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        List Mahasiswa
      </Typography>
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight="bold">NIM</Typography></TableCell>
              <TableCell align='center'><Typography fontWeight="bold">Nama</Typography></TableCell>
              <TableCell align='center'><Typography fontWeight="bold">Prodi</Typography></TableCell>
              <TableCell align='center'><Typography fontWeight="bold">Jenis Beasiswa</Typography></TableCell>
              <TableCell align='center'><Typography fontWeight="bold">Kategori Beasiswa</Typography></TableCell>
              <TableCell align='center'><Typography fontWeight="bold">Status</Typography></TableCell>
              <TableCell align='center'><Typography fontWeight="bold">Info Selengkapnya</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.nim}>
                <TableCell component="th" scope="row">{String(row.nim)}</TableCell>
                <TableCell align="center">{String(row.nama)}</TableCell>
                <TableCell align="center">{String(row.prodi)}</TableCell>
                <TableCell align="center">{String(row.jenisBeasiswa)}</TableCell>
                <TableCell align="center">{String(row.kategoriBeasiswa)}</TableCell>
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
      </TableContainer>
    </Box>
  );
};

export default Mahasiswa;
