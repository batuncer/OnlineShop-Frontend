import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Alert,
  Container,
  Avatar,
  Chip
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import AppTextField from '../atoms/AppTextField';
import AppButton from '../atoms/AppButton';
import { addProduct } from '../../modules/product/productSlice';
import { fetchSuppliers } from '../../modules/supplier/supplierSlice';

const ProductAdd = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);
  const { suppliers, loading: suppliersLoading } = useSelector((state) => state.supplier);
  
  const [formData, setFormData] = useState({
    supplierId: '',
    typeName: '',
    amountGrams: '',
    priceGbp: '',
    brewColor: '',
    caffeineMgPerG: '',
    mainMedicinalUse: '',
    recommendedGramsPerCup: '',
    stockQuantity: '',
    description: '',
    category: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const brewColors = [
    { value: 'AMBER', label: 'Amber' },
    { value: 'DARK_BROWN', label: 'Dark Brown' },
    { value: 'GOLDEN_BROWN', label: 'Golden Brown' }
  ];

  const categories = [
    { value: 'TEA', label: 'Tea' },
    { value: 'COFFEE', label: 'Coffee' }
  ];

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
    
    if (!formData.supplierId) errors.supplierId = 'Supplier is required';
    if (!formData.typeName.trim()) errors.typeName = 'Type name is required';
    if (!formData.amountGrams || formData.amountGrams <= 0) errors.amountGrams = 'Valid amount in grams is required';
    if (!formData.priceGbp || formData.priceGbp <= 0) errors.priceGbp = 'Valid price in GBP is required';
    if (!formData.brewColor) errors.brewColor = 'Brew color is required';
    if (!formData.caffeineMgPerG || formData.caffeineMgPerG < 0) errors.caffeineMgPerG = 'Valid caffeine mg per gram is required';
    if (!formData.recommendedGramsPerCup || formData.recommendedGramsPerCup <= 0) errors.recommendedGramsPerCup = 'Valid recommended grams per cup is required';
    if (!formData.stockQuantity || formData.stockQuantity < 0) errors.stockQuantity = 'Valid stock quantity is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.category) errors.category = 'Category is required';

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
      const productData = {
        ...formData,
        supplierId: parseInt(formData.supplierId),
        amountGrams: parseInt(formData.amountGrams),
        priceGbp: parseFloat(formData.priceGbp),
        caffeineMgPerG: parseInt(formData.caffeineMgPerG),
        recommendedGramsPerCup: parseInt(formData.recommendedGramsPerCup),
        stockQuantity: parseInt(formData.stockQuantity)
      };
      
      const result = await dispatch(addProduct(productData));
      if (result.type === 'product/add/fulfilled') {
        setFormData({
          supplierId: '',
          typeName: '',
          amountGrams: '',
          priceGbp: '',
          brewColor: '',
          caffeineMgPerG: '',
          mainMedicinalUse: '',
          recommendedGramsPerCup: '',
          stockQuantity: '',
          description: '',
          category: ''
        });
        setFormErrors({});
      }
    } catch (error) {
      console.error('Error adding product:', error);
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
            background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
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
                <AddIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Product Management
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                  Add new products to your inventory
                </Typography>
              </Box>
            </Box>
            <Chip
              label="Add Product"
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
            {/* Supplier Selection */}
            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth error={!!formErrors.supplierId}>
                <InputLabel>Supplier *</InputLabel>
                <Select
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleInputChange}
                  label="Supplier *"
                  disabled={suppliersLoading}
                  sx={{ bgcolor: 'white' }}
                >
                  {suppliers?.data?.map((supplier) => (
                    <MenuItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.supplierId && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                    {formErrors.supplierId}
                  </Typography>
                )}
              </FormControl>
            </Box>

            {/* Type Name */}
            <Box sx={{ mb: 3 }}>
              <AppTextField
                fullWidth
                label="Type Name"
                name="typeName"
                value={formData.typeName}
                onChange={handleInputChange}
                error={!!formErrors.typeName}
                helperText={formErrors.typeName}
                required
              />
            </Box>

            {/* Category */}
            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth error={!!formErrors.category}>
                <InputLabel>Category *</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  label="Category *"
                  sx={{ bgcolor: 'white' }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.category && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                    {formErrors.category}
                  </Typography>
                )}
              </FormControl>
            </Box>

            {/* Brew Color */}
            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth error={!!formErrors.brewColor}>
                <InputLabel>Brew Color *</InputLabel>
                <Select
                  name="brewColor"
                  value={formData.brewColor}
                  onChange={handleInputChange}
                  label="Brew Color *"
                  sx={{ bgcolor: 'white' }}
                >
                  {brewColors.map((color) => (
                    <MenuItem key={color.value} value={color.value}>
                      {color.label}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.brewColor && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                    {formErrors.brewColor}
                  </Typography>
                )}
              </FormControl>
            </Box>

            {/* Amount Grams */}
            <Box sx={{ mb: 3 }}>
              <AppTextField
                fullWidth
                label="Amount (Grams)"
                name="amountGrams"
                type="number"
                inputProps={{ min: 1 }}
                value={formData.amountGrams}
                onChange={handleInputChange}
                error={!!formErrors.amountGrams}
                helperText={formErrors.amountGrams}
                required
              />
            </Box>

            {/* Price GBP */}
            <Box sx={{ mb: 3 }}>
              <AppTextField
                fullWidth
                label="Price (GBP)"
                name="priceGbp"
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                value={formData.priceGbp}
                onChange={handleInputChange}
                error={!!formErrors.priceGbp}
                helperText={formErrors.priceGbp}
                required
              />
            </Box>

            {/* Caffeine Mg Per G */}
            <Box sx={{ mb: 3 }}>
              <AppTextField
                fullWidth
                label="Caffeine (mg per gram)"
                name="caffeineMgPerG"
                type="number"
                inputProps={{ min: 0 }}
                value={formData.caffeineMgPerG}
                onChange={handleInputChange}
                error={!!formErrors.caffeineMgPerG}
                helperText={formErrors.caffeineMgPerG}
                required
              />
            </Box>

            {/* Recommended Grams Per Cup */}
            <Box sx={{ mb: 3 }}>
              <AppTextField
                fullWidth
                label="Recommended Grams Per Cup"
                name="recommendedGramsPerCup"
                type="number"
                inputProps={{ min: 1 }}
                value={formData.recommendedGramsPerCup}
                onChange={handleInputChange}
                error={!!formErrors.recommendedGramsPerCup}
                helperText={formErrors.recommendedGramsPerCup}
                required
              />
            </Box>

            {/* Stock Quantity */}
            <Box sx={{ mb: 3 }}>
              <AppTextField
                fullWidth
                label="Stock Quantity"
                name="stockQuantity"
                type="number"
                inputProps={{ min: 0 }}
                value={formData.stockQuantity}
                onChange={handleInputChange}
                error={!!formErrors.stockQuantity}
                helperText={formErrors.stockQuantity}
                required
              />
            </Box>

            {/* Main Medicinal Use */}
            <Box sx={{ mb: 3 }}>
              <AppTextField
                fullWidth
                label="Main Medicinal Use"
                name="mainMedicinalUse"
                value={formData.mainMedicinalUse}
                onChange={handleInputChange}
              />
            </Box>

            {/* Description */}
            <Box sx={{ mb: 4 }}>
              <AppTextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                error={!!formErrors.description}
                helperText={formErrors.description}
                required
              />
            </Box>

            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <AppButton
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ 
                  py: 2,
                  px: 6,
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                  '&:hover': {
                    background: "linear-gradient(135deg, #1565c0 0%, #1976d2 100%)",
                  }
                }}
              >
                {loading ? 'Adding Product...' : 'Add Product'}
              </AppButton>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProductAdd;