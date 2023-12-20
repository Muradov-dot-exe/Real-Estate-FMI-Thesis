import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#aa6c39",
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Whether you're a first-time homebuyer, a seasoned investor, or a
              property owner looking to sell, Golden Estate is here for you. We
              invite you to embark on a journey with us, explore the world of
              real estate, and make your dreams a reality. Connect with us
              today, and let's begin this exciting journey together. Your
              perfect property is just a click away.
            </Typography>
            <br></br>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Disclaimer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All inquiries for purchases and needs of additional information
              happen through contacting us personally. We believe in the
              face-to-face contacts between the person representing our brand
              and the potential buyer. Send us an e-mail message or visit us
              directly and we will fulfil your request in the shortest amount of
              time.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ivan Vazov Str, Sopot, Bulgaria
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: amuradov239@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +359 88888888
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Typography color="inherit">Gold Estate</Typography>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
