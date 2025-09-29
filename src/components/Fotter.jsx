import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        mt: 6,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Teesverse
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Bringing you the best tees with style & comfort. Your go-to place
              for premium T-shirts.
            </Typography>
          </Grid>

          {/* Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Link href="/about" color="inherit" underline="hover">
                About Us
              </Link>
              <Link href="/shop" color="inherit" underline="hover">
                Shop
              </Link>
              <Link href="/contact" color="inherit" underline="hover">
                Contact
              </Link>
              <Link href="/faq" color="inherit" underline="hover">
                FAQ
              </Link>
            </Box>
          </Grid>

          {/* Socials */}
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                color="inherit"
                href="https://www.facebook.com/profile.php?id=61575009245661"
                target="_blank"
              >
                <Facebook />
              </IconButton>
              {/* <IconButton
                color="inherit"
                href="https://twitter.com"
                target="_blank"
              >
                <Twitter />
              </IconButton> */}
              <IconButton
                color="inherit"
                href="https://www.instagram.com/teesverse_fashionbrand/"
                target="_blank"
              >
                <Instagram />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://youtube.com"
                target="_blank"
              >
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom note */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Teesverse. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
