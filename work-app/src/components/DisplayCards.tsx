import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import queryString from "query-string";
import CardMedia from "@mui/material/CardMedia";
import { Box, Button, CardActions, Stack, Typography } from "@mui/material";
import homepagestyledline from "../img/decorativehomepageline.jpg";
import { Link } from "react-router-dom";
import DeleteModal from "../modals/deleteModal";
import { Property } from "../types/propertyTypes";
import AddProperty from "../modals/addProperty";

const CardsGrid = ({ searchString = "", list = [] }: any) => {
  const [cards, setCards] = useState<Property[]>([]);

  let filteredByPrice;

  async function fetchMoreData(page: any) {
    const url = queryString.stringifyUrl({
      url: "http://localhost:4200/",
      query: {
        page,
        limit: 10,
      },
    });

    try {
      const res = await axios.get(url);
      setCards(res.data);
    } catch (error) {}
  }
  const handleDelete = async (deleteId: number) => {
    try {
      await axios.delete(`http://localhost:4200/delete/${deleteId}`);
      fetchMoreData(0);
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const filteredList = cards.filter((element) => {
    if (searchString === "") {
      return element;
    } else {
      return element.type.toLowerCase().includes(searchString);
    }
  });

  useEffect(() => {
    fetchMoreData(0);
  }, []);

  const handlePriceFilter = () => {
    filteredByPrice = [...cards].sort((a: any, b: any) => a.price - b.price);
    return setCards(filteredByPrice);
  };

  const handleAddProperty = () => {
    fetchMoreData(0);
  };

  const handleSizeFilter = () => {
    filteredByPrice = [...cards].sort(
      (a: any, b: any) => a.floorspace - b.floorspace
    );
    return setCards(filteredByPrice);
  };

  const handleRoomFilter = () => {
    filteredByPrice = [...cards].sort((a: any, b: any) => a.beds - b.beds);
    return setCards(filteredByPrice);
  };
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        marginBottom={"13px"}
      >
        <Button
          variant="outlined"
          sx={{
            height: 50,
            borderColor: "#aa6c39",
            color: "#aa6c39",
            "&:hover": {
              backgroundColor: "beige",
              color: "orange",
              borderColor: "orange",
            },
          }}
          onClick={handlePriceFilter}
        >
          Filter By Price
        </Button>
        <Button
          variant="outlined"
          sx={{
            height: 50,
            borderColor: "#aa6c39",
            color: "#aa6c39",
            "&:hover": {
              backgroundColor: "beige",
              color: "orange",
              borderColor: "orange",
            },
          }}
          onClick={handleSizeFilter}
        >
          Filter by floor space
        </Button>
        <Button
          variant="outlined"
          sx={{
            height: 50,
            borderColor: "#aa6c39",
            color: "#aa6c39",
            "&:hover": {
              backgroundColor: "beige",
              color: "orange",
              borderColor: "orange",
            },
          }}
          onClick={handleRoomFilter}
        >
          Filter by rooms
        </Button>
        <Grid item>
          <AddProperty onAddProperty={handleAddProperty} />
        </Grid>
      </Stack>

      <Grid container justifyContent={"center"} alignItems="center">
        <Box
          component="img"
          src={homepagestyledline}
          alt="wavy line"
          sx={{
            width: "50%",
            marginBottom: "6px",
            padding: "5px",
          }}
        />
      </Grid>

      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMoreData}
        loader={
          <div style={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress />
          </div>
        }
      >
        <Grid container spacing={3} justifyContent="center">
          {filteredList.map((card: any, index) => {
            return (
              <Grid
                item
                key={index}
                xs={12}
                sm={6}
                md={2}
                sx={{ marginLeft: 2 }}
                alignItems="center"
                justifyContent="center"
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={card.image}
                    title={card.area}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.type}
                    </Typography>
                    <Typography>Location:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.city}
                    </Typography>
                    <Typography>Price:</Typography>

                    <Typography variant="body2" color="text.secondary">
                      {card.price} $
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "#aa6c39",
                        }}
                        to={`/properties/${card.id}`}
                      >
                        Learn More
                      </Link>
                    </Button>
                    <Button
                      size="small"
                      style={{
                        textDecoration: "none",
                        color: "#aa6c39",
                      }}
                    >
                      Edit
                    </Button>

                    <DeleteModal
                      deleteId={card.id}
                      onDelete={() => handleDelete(card.id)}
                    />
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <br></br>
      </InfiniteScroll>
    </>
  );
};

export default CardsGrid;
