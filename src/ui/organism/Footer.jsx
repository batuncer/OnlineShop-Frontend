// MUI Components
import {
  Box,
  Container,
  Typography,
  IconButton,
  Stack,
  Avatar,
} from "@mui/material";

// Icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#8B4513",
        color: "white",
        mt: "auto",
        background:
          "linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #8B4513 100%)",
        marginTop: 'auto',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 6,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              mr: 2,
              width: 48,
              height: 48,
            }}
          >
            <LocalCafeIcon fontSize="large" />
          </Avatar>
          <Typography
            variant="h5"
            component="h3"
            fontWeight="bold"
            sx={{ color: "#f5f5dc" }}
          >
            Coffee & Tea Shop
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            mb: 3,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.9)",
            maxWidth: "600px",
            textAlign: "center",
          }}
        >
          Discover the world's finest coffee and tea collections. From aromatic
          espresso to soothing herbal teas, we bring you premium quality
          beverages from around the globe.
        </Typography>

        {/* Social Media */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: "center" }}
        >
          <IconButton
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
