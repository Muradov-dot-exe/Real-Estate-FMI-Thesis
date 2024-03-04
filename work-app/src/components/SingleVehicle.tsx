import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Container, Grid, Paper, Typography } from "@mui/material";
import ContactUsField from "../emails/contactUs";
import { ItemType } from "../types/cardTypes";

const SingleVehicle = () => {
  const vehicleParams = useParams();
  const [vehicles, setVehicles] = useState<ItemType[]>([]);
  const vehicle = vehicles.find((x) => x.id === Number(vehicleParams.id));

  useEffect(() => {
    axios.get("http://localhost:4200/vehicles").then((response) => {
      setVehicles(response.data);
    });
  }, []);

  return (
    <Box>
      {vehicle !== undefined && (
        <>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "10%",
            }}
            src={vehicle.image}
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
                        Enjoy our new {vehicle.vehicle_type}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Manufactured by: {vehicle.manufacturer}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Model: {vehicle.model}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">VIN: {vehicle.VIN}</Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Production year: {vehicle.year}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Seats: {vehicle.seats}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      With a price of: {vehicle.price} $USD
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid container>
                    <Typography>{vehicle.description}</Typography>
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
