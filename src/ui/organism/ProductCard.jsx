// Assets
import teaImage from "../../assets/teaImage.jpg";
import coffeeImage from "../../assets/coffeImage.webp";

//MUI
import CardActions from "@mui/material/CardActions";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ProductCard = ({ product, handleAddToBasket, handleCardClick }) => {
  if (!product) return null;
  // Get the image source based on the product type
  const getImage = () => {
    if (product.type.toLowerCase().includes("tea")) return teaImage;
    if (product.type.toLowerCase().includes("coffee")) return coffeeImage;
    return "https://via.placeholder.com/140";
  };

  // Get the image source
  const imageSrc = getImage();

  return (
    <Card sx={{ width: 345, border: "1px solid red" }}>
      <CardMedia
        component="img"
        alt={product.name}
        image={imageSrc}
        sx={{
          height: 255,
          width: "100%",
          objectFit: "cover", // or 'contain' depending on your preference
        }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          onClick={handleCardClick}
        >
          {product.name}
        </Typography>
        <Typography variant="h6" color="text.primary" sx={{ marginTop: 1 }}>
          £{product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleAddToBasket}>
          Add to Basket
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
