import { useState } from "react";

// Assets
import teaImage from "../../assets/teaImage.jpg";
import coffeeImage from "../../assets/coffeImage.webp";

// MUI
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  CardActionArea,
  Stack,
  Chip,
  Box,
  Fade,
} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const ProductCard = ({ product, handleAddToBasket, handleCardClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!product) return null;

  // Get the image source based on the product type
  const getImage = () => {
    if (product.type?.toLowerCase().includes("tea")) return teaImage;
    if (product.type?.toLowerCase().includes("coffee")) return coffeeImage;
    return "https://via.placeholder.com/345x255";
  };

  const imageSrc = getImage();


  return (
    <Fade in timeout={600}>
      <Card 
        sx={{ 
          width: 345,
          height: 500,
          display: 'flex',
          flexDirection: 'column',
          border: "2px solid #8B4513",
          borderRadius: 3,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(139, 69, 19, 0.2)',
            borderColor: '#A0522D'
          }
        }}
      >
        <CardActionArea sx={{ flexGrow: 1 }}            onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick();
                  }}
                >
          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              alt={product.name}
              image={imageSrc}
              onLoad={() => setImageLoaded(true)}
              sx={{
                height: 255,
                width: "100%",
                objectFit: "cover",
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            />
            
            {/* Category Chip */}
            {product.type && (
              <Chip
                label={product.type}
                color="primary"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  fontWeight: 'bold',
                  bgcolor: 'rgba(139, 69, 19, 0.9)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(139, 69, 19, 1)',
                  }
                }}
              />
            )}
            
            {/* Quick View Button */}
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                opacity: 0,
                transition: 'opacity 0.3s ease-in-out',
                '.MuiCard-root:hover &': {
                  opacity: 1,
                }
              }}
            >
         
            </Box>
          </Box>

          <Stack onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
            <CardContent sx={{ flexGrow: 1, p: 3 }} >
              <Typography 
                gutterBottom 
                variant="h6" 
                component="div"
                sx={{ 
                  fontWeight: 'bold',
                  color: '#8B4513',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {product.name}
              </Typography>
              
              {product.description && (
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    mb: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: 1.5
                  }}
                >
                  {product.description}
                </Typography>
              )}
              
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#8B4513',
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}
              >
                £{product.price?.toFixed(2)}
              </Typography>
            </CardContent>
          </Stack>
        </CardActionArea>

        <CardActions sx={{ p: 3, pt: 0 }}>
          <Button 
            size="medium"
            variant="contained"
            fullWidth
            startIcon={<AddShoppingCartIcon />}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToBasket();
            }}
            sx={{
              bgcolor: '#8B4513',
              py: 1.5,
              fontWeight: 'bold',
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#A0522D',
              }
            }}
          >
            Add to Basket
          </Button>
        </CardActions>
      </Card>
    </Fade>
  );
};

export default ProductCard;