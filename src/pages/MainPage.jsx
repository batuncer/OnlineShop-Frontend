// MUI
import {
  Stack,
  Typography,
  Box,
  Paper,
  Grid,
  Fade,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";

// Image
import coffeeMain from "../assets/coffeeMain.webp";

// Organisms
import Products from "../ui/organism/Products";

// Atoms
import AppButton from "../ui/atoms/AppButton";

export default function MainPage() {
  return (
    
    <Fade in timeout={800}>
      <Box>
        {/* Hero Section */}
        <Box sx={{ mx: { xs: 2, md: 32 } }}>
          <Stack alignItems="center" spacing={4} sx={{ mt: 4 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                borderRadius: 4,
                boxShadow: "0 8px 32px rgba(139, 69, 19, 0.3)",
              }}
            >
              <img
                src={coffeeMain}
                alt="Coffee"
                style={{
                  width: "100%",
                  height: "800px",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Overlay Content */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(45deg, rgba(139, 69, 19, 0.7) 0%, rgba(160, 82, 45, 0.5) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ textAlign: "center", color: "white", px: 4 }}>
                  <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "2.5rem", md: "4rem" },
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    Coffee & Tea Shop
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      fontSize: { xs: "1.2rem", md: "1.8rem" },
                      textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    }}
                  >
                    Discover the finest selection from around the world
                  </Typography>
                  <AppButton
                    size="large"
                    onClick={() => {
                      document
                        .getElementById("products-section")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        });
                    }}
                    sx={{bgcolor:"brown"}}
                  >
                    Shop Now
                  </AppButton>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Box>

        {/* Features Section */}
        <Box sx={{ mx: { xs: 2, md: 32 }, mt: 8, mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#8B4513",
              mb: 6,
            }}
          >
            Why Choose Us?
          </Typography>

          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            <Grid item xs={12} sm={6} md={3.8}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 3,
                  height: "100%",
                  background:
                    "linear-gradient(145deg, #f5f5dc 0%, #ffffff 100%)",
                  border: "2px solid #8B4513",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <LocalCafeIcon sx={{ fontSize: 60, color: "#8B4513", mb: 2 }} />
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ color: "#8B4513" }}
                >
                  Premium Coffee
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Freshly roasted beans from the world's finest coffee regions
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3.8}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 3,
                  height: "100%",
                  background:
                    "linear-gradient(145deg, #f5f5dc 0%, #ffffff 100%)",
                  border: "2px solid #8B4513",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <EmojiFoodBeverageIcon
                  sx={{ fontSize: 60, color: "#8B4513", mb: 2 }}
                />
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ color: "#8B4513" }}
                >
                  Exotic Teas
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Handpicked tea leaves offering unique flavors and aromas
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={12} md={3.8}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 3,
                  height: "100%",
                  background:
                    "linear-gradient(145deg, #f5f5dc 0%, #ffffff 100%)",
                  border: "2px solid #8B4513",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <ShoppingBagIcon
                  sx={{ fontSize: 60, color: "#8B4513", mb: 2 }}
                />
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ color: "#8B4513" }}
                >
                  Fast Delivery
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Quick and reliable shipping to bring flavors to your doorstep
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Products Section */}
        <Box id="products-section" sx={{ bgcolor: "#fafafa", py: 6 }}>
          <Box sx={{ mx: { xs: 2, md: 32 } }}>
            <Typography
              variant="h3"
              component="h2"
              align="center"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#8B4513",
                mb: 2,
              }}
            >
              Our Products
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Choose from our carefully curated selection
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <Box
                sx={{
                  width: 80,
                  height: 4,
                  bgcolor: "#8B4513",
                  borderRadius: 2,
                }}
              />
            </Box>
          </Box>

          <Products />
        </Box>
      </Box>
    </Fade>
  );
}
