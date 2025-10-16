import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Paper, 
  Container,
  Avatar,
  Alert,
  Chip
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Atoms
import AppTextField from '../atoms/AppTextField';
import AppButton from '../atoms/AppButton';
import AppSelect from '../atoms/AppSelect';
import AppText from '../atoms/AppText';

// Redux actions
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

  // Options for selects
  const brewColorOptions = [
    { value: 'AMBER', label: 'Amber' },
    { value: 'DARK_BROWN', label: 'Dark Brown' },
    { value: 'GOLDEN_BROWN', label: 'Golden Brown' }
  ];

  const categoryOptions = [
    { value: 'TEA', label: 'Tea' },
    { value: 'COFFEE', label: 'Coffee' }
  ];

  // Transform suppliers for select component
  const supplierOptions = suppliers?.data?.map(supplier => ({
    value: supplier.id,
    label: supplier.name
  })) || [];

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
            background:  "#c6a850ff",
            color: "white",
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: "rgba(255,255,255,0.2)",
                  mr: 3,
                }}
              >
                <AddIcon fontSize="large" />
              </Avatar>
              <Box>
                <AppText variant="h4" fontWeight="bold" gutterBottom color="inherit">
                  Product Management
                </AppText>
                <AppText variant="subtitle1" sx={{ opacity: 0.9 }} color="inherit">
                  Add new products to your inventory
                </AppText>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              {/* Supplier Selection  */}
              <AppSelect
                label="Supplier"
                name="supplierId"
                value={formData.supplierId}
                onChange={handleInputChange}
                options={supplierOptions}
                error={!!formErrors.supplierId}
                helperText={formErrors.supplierId}
                disabled={suppliersLoading}
                required
                placeholder="Select a supplier"
              />

              {/* Category  */}
              <AppSelect
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                options={categoryOptions}
                error={!!formErrors.category}
                helperText={formErrors.category}
                required
                placeholder="Select category"
              />

              {/* Type Name  */}
              <AppTextField
                fullWidth
                label="Product Name"
                name="typeName"
                value={formData.typeName}
                onChange={handleInputChange}
                error={!!formErrors.typeName}
                helperText={formErrors.typeName}
                required
                placeholder="Enter product name"
              />

              {/* Brew Color  */}
              <AppSelect
                label="Brew Color"
                name="brewColor"
                value={formData.brewColor}
                onChange={handleInputChange}
                options={brewColorOptions}
                error={!!formErrors.brewColor}
                helperText={formErrors.brewColor}
                required
                placeholder="Select brew color"
              />

              {/* Amount Grams */}
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
                placeholder="Enter amount in grams"
              />

              {/* Price GBP*/}
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
                placeholder="Enter price"
              />

              {/* Stock Quantity */}
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
                placeholder="Enter stock quantity"
              />

              {/* Caffeine Mg Per G */}
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
                placeholder="Enter caffeine content"
              />

              {/* Recommended Grams Per Cup */}
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
                placeholder="Enter recommended amount"
              />

              {/* Main Medicinal Use  */}
              <AppTextField
                fullWidth
                label="Main Medicinal Use"
                name="mainMedicinalUse"
                value={formData.mainMedicinalUse}
                onChange={handleInputChange}
                placeholder="Enter medicinal benefits (optional)"
              />

              {/* Description  */}
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
                placeholder="Enter product description"
              />

              {/* Submit Button  */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <AppButton
                  type="submit"
                  onClick={handleSubmit}
                  size="large"
                  disabled={loading}
                  startIcon={<AddIcon />}
                >
                  {loading ? 'Adding Product...' : 'Add Product'}
                </AppButton>
              </Box>

            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProductAdd;