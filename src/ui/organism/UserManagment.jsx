import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Typography,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../modules/user/userSlice';

const UserManagement = () => {
  const users = useSelector((state) => state.user.users);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  // fetch users
  useEffect(() => {
    setLoading(true);
    dispatch(fetchUsers());
    setLoading(false);
  }, [dispatch]);
 

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Export to CSV function
  const exportToCSV = () => {
    const headers = ['ID', 'Username', 'Email', 'Registration Date', 'Status', 'Role'];
    const csvContent = [
      headers.join(','),
      ...users.map(user => [
        user.id,
        user.username,
        user.email,
        user.registrationDate,
        user.role
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ p: 3, bgcolor: '#f5f5dc', borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#8B4513' }}>
            User Management
          </Typography>
          <AppButton
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={exportToCSV}
            sx={{
              bgcolor: '#8B4513',
              '&:hover': { bgcolor: '#A0522D' },
              borderRadius: 2,
            }}
          >
            Export CSV
          </AppButton>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead sx={{ bgcolor: '#8B4513' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Registration Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    '&:hover': { bgcolor: '#f9f9f9' },
                    '&:nth-of-type(even)': { bgcolor: '#fafafa' },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          bgcolor: '#8B4513',
                          mr: 2,
                          width: 40,
                          height: 40,
                        }}
                      >
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body1" fontWeight="bold">
                          {user.username} 
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: {user.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon sx={{ color: '#8B4513', mr: 1, fontSize: 20 }} />
                      {user.email}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarIcon sx={{ color: '#8B4513', mr: 1, fontSize: 20 }} />
                      {new Date(user.createdTime).toLocaleDateString()}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: '#8B4513',
                        color: '#8B4513',
                        textTransform: 'capitalize',
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={users.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        sx={{
          borderTop: '1px solid #e0e0e0',
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            color: '#8B4513',
            fontWeight: 'bold',
          },
        }}
      />
    </Paper>
  );
};

export default UserManagement;