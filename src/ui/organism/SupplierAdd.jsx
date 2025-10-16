import useState from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  Paper, 
  Alert,
  Container,
  Avatar,
  Chip
} from '@mui/material';
import { Business as BusinessIcon } from '@mui/icons-material';
import { Add as AddIcon } from '@mui/icons-material';

// Atoms
import AppTextField from '../atoms/AppTextField';
import AppButton from '../atoms/AppButton';

// Slice
import { addSupplier } from '../../modules/supplier/supplierSlice';


const SupplierAdd = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.supplier);
  
  const [formData, setFormData] = useState({
    name: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Supplier name is required';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const result = await dispatch(addSupplier(formData));
      if (result.type === 'supplier/add/fulfilled') {
        setFormData({
          name: ''
        });
        setFormErrors({});
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  return (
    <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            background: "#c6a850ff",
            color: "white",
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  mr: 3,
                  width: 56,
                  height: 56,
                }}
              >
                <BusinessIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Supplier Management
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                  Add new suppliers to your network
                </Typography>
              </Box>
            </Box>
            <Chip
              label="Add Supplier"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                py: 2,
                px: 1,
              }}
            />
          </Box>
        </Paper>

        {/* Form */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {/* Supplier Name */}
            <Box sx={{ mb: 4 }}>
              <AppTextField
                fullWidth
                label="Supplier Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
                required
                placeholder="Enter supplier name"
              />
            </Box>

            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <AppButton
                type="submit"
                size="large"
                disabled={loading}
                startIcon={<AddIcon />}
              >
                {loading ? 'Adding Supplier...' : 'Add Supplier'}
              </AppButton>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SupplierAdd;