import { Box, Button } from "@mui/material";
import React, { useState } from "react";

import { Paper, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { TitleContext } from "../context/context";

const backgroundImage = "url('https://imgur.com/l6SgGS8.jpg')";

const AboutPage = () => {
  const value = useContext(TitleContext);

  useEffect(() => {
    value.setTitle("About");
  }, [value]);

  const [expanded, setExpanded] = useState<boolean>(false);

  const handleLearnMoreClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          width: "400px",
          height: expanded ? "650px" : "400px",
          padding: (theme) => theme.spacing(3),
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: (theme) => theme.spacing(1),
          textAlign: "center",
          position: "relative",
          transition: "height 0.3s",
        }}
      >
        <Typography variant="h2" color="text.primary">
          About Us
        </Typography>
        <br></br>
        <Typography variant="body1">
          Whether you're a first-time homebuyer, a seasoned investor, or a
          property owner looking to sell, Golden Estate is here for you. We
          invite you to embark on a journey with us, explore the world of real
          estate, and make your dreams a reality. Connect with us today, and
          let's begin this exciting journey together. Your perfect property is
          just a click away.
        </Typography>
        {expanded && (
          <>
            <br></br>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                CEO: Ali Muradov
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                CSO:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                General Secretary:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Main consultant:
              </Typography>
            </Box>
            <br></br>
            <Typography variant="h6">
              If you want to reach us directly , please contact our main
              consultant: amuradov239@gmail.com
            </Typography>
          </>
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={handleLearnMoreClick}
          sx={{
            position: "absolute",
            bottom: (theme) => theme.spacing(2),
            left: "50%",
            transform: "translateX(-50%)",
            height: 50,
            borderColor: "#aa6c39",
            color: "#aa6c39",
            "&:hover": {
              backgroundColor: "beige",
              color: "orange",
              borderColor: "orange",
            },
          }}
        >
          Learn More
        </Button>
      </Paper>
    </Box>
  );
};
export default AboutPage;
