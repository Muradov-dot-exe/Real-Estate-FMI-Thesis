import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Container, Grid, Paper, Typography } from "@mui/material";
import ContactUsField from "../emails/contactUs";

const SingleProperty = () => {
  const propertyParams = useParams();
  const [properties, setProperties] = useState<any>([]);
  const property = properties.find(
    (x: any) => x.id === Number(propertyParams.id)
  );

  useEffect(() => {
    axios.get("http://localhost:4200/").then((response) => {
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
                        Enter our premium {property.type}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Located at: {property.area}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      City: {property.city}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Address: {property.address}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Floor space: {property.floorspace}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Beds: {property.beds}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Baths: {property.baths}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      Parking slots: {property.parking}
                    </Typography>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Typography fontWeight="450">
                      With a price of: {property.price} $USD
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid container>
                    <Typography>{property.description}</Typography>
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
export default SingleProperty;
