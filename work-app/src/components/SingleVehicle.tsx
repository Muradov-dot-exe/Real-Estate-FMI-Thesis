import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Container, Grid, Paper, Typography } from "@mui/material";
import ContactUsField from "../emails/contactUs";

const SingleVehicle = () => {
  const propertyParams = useParams();
  const [properties, setProperties] = useState<any>([]);
  const property = properties.find(
    (x: any) => x.id === Number(propertyParams.id)
  );

  useEffect(() => {
    axios.get("http://localhost:4200/vehicles").then((response) => {
      setProperties(response.data);
    });
  }, []);

  return (
    <Box>
      {property !== undefined && (
        <>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "10%",
            }}
            src={property.image}
          />
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Paper style={{ padding: 20, backgroundColor: "#f2f2f2" }}>
                  <Grid container justifyContent="center" alignItems="center">
                    <Box>
                      <Typography
                        fontSize="3rem"
                        fontWeight="400"
                        sx={{ fontFamily: "Times New Roman" }}
                      >
                        Enjoy our new {property.vehicle_type}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Manufactured by: {property.manufacturer}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Model: {property.model}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      VIN: {property.VIN}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Production year: {property.year}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Seats: {property.seats}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      With a price of: {property.price} $USD
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid container>
                    <Typography>
                      Step into a world of comfort and style with meticulously
                      designed interiors that boast high-end finishes, spacious
                      layouts, and an abundance of natural light. Our
                      condominiums provide an oasis of tranquility amidst the
                      vibrancy of the city, offering a perfect retreat for
                      relaxation and rejuvenation.
                    </Typography>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  style={{
                    padding: 20,
                    backgroundColor: "#333",
                    color: "#fff",
                    position: "sticky",
                    marginBottom: 6,
                  }}
                >
                  <Typography variant="h5">Quick Contact</Typography>
                  <ContactUsField />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </Box>
  );
};
export default SingleVehicle;
