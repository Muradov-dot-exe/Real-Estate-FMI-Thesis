import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Container, Grid, Paper, Typography } from "@mui/material";
import ContactUsField from "../emails/contactUs";
import { ItemType } from "../types/cardTypes";

const SingleAircraft = () => {
  const aircraftParams = useParams();
  const [aircrafts, setAircrafts] = useState<ItemType[]>([]);
  const aircraft = aircrafts.find((x) => x.id === Number(aircraftParams.id));

  useEffect(() => {
    axios.get<ItemType[]>("http://localhost:4200/aircraft").then((response) => {
      setAircrafts(response.data);
    });
  }, []);

  return (
    <Box>
      {aircraft !== undefined && (
        <>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "10%",
            }}
            src={aircraft.image}
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
                        View our luxury {aircraft.aircraft_type} aircraft
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Manufactured by: {aircraft.manufacturer}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Model: {aircraft.model}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Registration number: {aircraft.registration_number}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Production year: {aircraft.year}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Serial Number: {aircraft.serial_number}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Seats: {aircraft.seats}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      With a price of: {aircraft.price} $USD
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid container>
                    <Typography>{aircraft.description}</Typography>
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

export default SingleAircraft;
