import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Add as AddIcon,
} from '@mui/icons-material';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
            color: 'white',
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  mr: 3,
                  width: 56,
                  height: 56,
                }}
              >
                <DashboardIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Admin Dashboard
                </Typography>
              </Box>
            </Box>
            <Chip
              label="Administrator"
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                py: 2,
                px: 1,
              }}
            />
          </Box>
        </Paper>

        {/* Navigation Tabs */}
        <Paper elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                py: 2,
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                '&.Mui-selected': {
                  color: '#8B4513',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#8B4513',
                height: 3,
              },
            }}
          >
            <Tab
              icon={<PeopleIcon />}
              label="User Management"
              iconPosition="start"
            />
            <Tab
              icon={<InventoryIcon />}
              label="Product Management"
              iconPosition="start"
            />
            <Tab
              icon={<AddIcon />}
              label="Add Product"
              iconPosition="start"
            />
          </Tabs>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminPage;