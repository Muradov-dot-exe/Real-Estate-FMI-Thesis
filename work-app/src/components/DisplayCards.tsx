import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import queryString from "query-string";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActions, Typography } from "@mui/material";

const CardsGrid = ({ searchString = "", list = [] }: any) => {
  const [cards, setCards] = useState<any[]>([]);

  async function fetchMoreData(page: any) {
    const url = queryString.stringifyUrl({
      url: "http://localhost:3001/property",
      query: {
        page,
        limit: 10,
      },
    });

    try {
      const res = await axios.get(url);
      setCards([...cards, ...res.data]);
    } catch (error) {}
  }
  const filteredList = cards.filter((element) => {
    if (searchString === "") {
      return element;
    } else {
      return element.type.toLowerCase().includes(searchString);
    }
  });

  useEffect(() => {
    fetchMoreData(0); // Initial data load
  }, []);

  return (
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
                  <Typography variant="body2" color="text.secondary">
                    {card.address}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </InfiniteScroll>
  );
};

export default CardsGrid;
