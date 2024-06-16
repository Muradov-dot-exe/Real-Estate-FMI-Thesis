import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import queryString from "query-string";
import CardMedia from "@mui/material/CardMedia";
import {
  Box,
  Button,
  CardActions,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import homepagestyledline from "../img/decorativehomepageline.jpg";
import { Link } from "react-router-dom";
import DeleteModal from "../modals/deleteModal";
import AddProperty from "../modals/addProperty";
import AddAircraft from "../modals/addAircraft";
import AddVehicle from "../modals/addVehicles";
import { useUserAuth } from "../context/authContext";
import { AuthObjectType } from "../types/authTypes";
import { ItemType } from "../types/cardTypes";
import StarIcon from "@mui/icons-material/Star";

const CardsGrid = ({
  searchString = "",
  list = [],
  aircraft,
  vehicles,
}: {
  searchString?: string;
  list?: any[];
  aircraft?: boolean;
  vehicles?: boolean;
}) => {
  const [cards, setCards] = useState<ItemType[]>([]);
  const { user }: AuthObjectType = useUserAuth();
  const isUserMod = user!.roles.includes("moderator");
  const isUserAdmin = user!.roles.includes("admin");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  let usedUrl: string;
  if (aircraft) {
    usedUrl = "https://real-estate-fmi-thesis-ym9a.vercel.app/aircraft";
  } else if (vehicles) {
    usedUrl = "https://real-estate-fmi-thesis-ym9a.vercel.app/vehicles";
  } else {
    usedUrl = "https://real-estate-fmi-thesis-ym9a.vercel.app";
  }

  const fetchMoreData = async (updateCards = false) => {
    if (!hasMore) return;

    const url = queryString.stringifyUrl({
      url: usedUrl,
      query: {
        page: page + 1,
        limit: 10,
      },
    });

    try {
      setLoading(true);
      const res = await axios.get<ItemType[]>(url);
      setLoading(false);

      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        if (updateCards) {
          setCards(res.data);
        } else {
          setCards([...cards, ...res.data]);
        }
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (deleteId: number) => {
    try {
      await axios.delete(`${usedUrl}/delete/${deleteId}`);
      setCards(cards.filter((card) => card.id !== deleteId));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await axios.get<number[]>(
        `https://real-estate-fmi-thesis-ym9a.vercel.app/favorites`,
        {
          withCredentials: true,
        }
      );
      setFavorites(res.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const toggleFavorite = async (itemId: number) => {
    try {
      const url = `https://real-estate-fmi-thesis-ym9a.vercel.app/favorites`;
      const isOfferFavorited = favorites.map((x: any) => x.offerId === itemId);
      if (isOfferFavorited.includes(true)) {
        await axios.delete(`${url}/${itemId}`, { withCredentials: true });
        fetchFavorites();
      } else {
        await axios.post(url, { offerId: itemId }, { withCredentials: true });
        fetchFavorites();
      }
      setFavorites((prevFavorites) =>
        prevFavorites.includes(itemId)
          ? prevFavorites.filter((id) => id !== itemId)
          : [...prevFavorites, itemId]
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    fetchMoreData();
    fetchFavorites();
  }, []);

  const handlePriceFilter = () => {
    const filteredByPrice = [...cards].sort(
      (a: ItemType, b: ItemType) => a.price - b.price
    );
    setCards(filteredByPrice);
  };

  const handleAddProperty = () => {
    window.location.reload();
  };

  const handleSizeFilter = () => {
    const filteredBySize = [...cards].sort((a: ItemType, b: ItemType) => {
      if (aircraft || vehicles) {
        return a.year !== undefined && b.year !== undefined
          ? a.year - b.year
          : 0;
      } else {
        return a.floorspace !== undefined && b.floorspace !== undefined
          ? a.floorspace - b.floorspace
          : 0;
      }
    });
    setCards(filteredBySize);
  };

  const handleRoomFilter = () => {
    const filteredByRoom = [...cards].sort((a: ItemType, b: ItemType) => {
      if (aircraft || vehicles) {
        return a.seats !== undefined && b.seats !== undefined
          ? a.seats - b.seats
          : 0;
      } else {
        return a.beds !== undefined && b.beds !== undefined
          ? a.beds - b.beds
          : 0;
      }
    });
    setCards(filteredByRoom);
  };

  const filteredList = cards.filter((element) => {
    if (searchString === "") {
      return element;
    } else {
      if (aircraft && element.aircraft_type) {
        return element.aircraft_type.toLowerCase().includes(searchString);
      } else if (vehicles && element.vehicle_type) {
        return element.vehicle_type.toLowerCase().includes(searchString);
      } else if (element.type) {
        return element.type.toLowerCase().includes(searchString);
      } else {
        return false;
      }
    }
  });

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
          {aircraft || vehicles ? "Filter by year" : "Filter by floor space"}
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
          {aircraft || vehicles ? "Filter by seats" : "Filter by rooms"}
        </Button>
        <Grid item>
          {aircraft ? (
            <AddAircraft
              onAddAircraft={handleAddProperty}
              isEditButton={false}
            />
          ) : vehicles ? (
            <AddVehicle onAddVehicle={handleAddProperty} isEditButton={false} />
          ) : (
            <AddProperty
              onAddProperty={handleAddProperty}
              isEditButton={false}
            />
          )}
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
        loadMore={() => fetchMoreData()}
        hasMore={true}
      >
        <Grid container spacing={3} justifyContent="center">
          {filteredList.map((card: ItemType, index) => {
            const isOfferFavorited = favorites.some(
              (x: any) => x.offerId === card.id
            );

            const isFavorite = isOfferFavorited;
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
                    title={
                      aircraft
                        ? card.aircraft_type
                        : vehicles
                        ? card.vehicle_type
                        : card.type
                    }
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      {aircraft
                        ? card.aircraft_type
                        : vehicles
                        ? card.vehicle_type
                        : card.type}
                      <IconButton
                        sx={{ marginLeft: "auto" }}
                        onClick={() => toggleFavorite(card.id)}
                      >
                        <StarIcon
                          sx={{
                            color: isFavorite ? "#FFA500" : "inherit",
                            transition: "color 0.3s ease",
                          }}
                        />
                      </IconButton>
                      <Typography variant="body2" color="text.secondary">
                        Favorite
                      </Typography>
                    </Typography>
                    <Typography>
                      {aircraft
                        ? "Year:"
                        : vehicles
                        ? "Manufacturer:"
                        : "Location:"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {aircraft
                        ? card.year
                        : vehicles
                        ? card.manufacturer
                        : card.city}
                    </Typography>
                    {vehicles && (
                      <>
                        <Typography>Year:</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {card.year}
                        </Typography>
                        <Typography>Seats:</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {card.seats}
                        </Typography>
                      </>
                    )}
                    <Typography>Price:</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.price} $
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" sx={{ minWidth: 95 }}>
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

                    {aircraft ? (
                      <AddAircraft
                        onAddAircraft={handleAddProperty}
                        isEditButton={true}
                        aircraftToEdit={card}
                      />
                    ) : vehicles ? (
                      <AddVehicle
                        onAddVehicle={handleAddProperty}
                        isEditButton={true}
                        vehicleToEdit={card}
                      />
                    ) : (
                      <AddProperty
                        onAddProperty={handleAddProperty}
                        isEditButton={true}
                        propertyToEdit={card}
                      />
                    )}
                    {(aircraft && isUserMod) || isUserAdmin ? (
                      <DeleteModal
                        deleteId={card.id}
                        onDelete={() => handleDelete(card.id)}
                        aircraft={true}
                        vehicles={false}
                      />
                    ) : isUserMod || (isUserAdmin && vehicles) ? (
                      <DeleteModal
                        deleteId={card.id}
                        onDelete={() => handleDelete(card.id)}
                        aircraft={false}
                        vehicles={true}
                      />
                    ) : isUserMod || isUserAdmin ? (
                      <DeleteModal
                        deleteId={card.id}
                        onDelete={() => handleDelete(card.id)}
                        aircraft={false}
                        vehicles={false}
                      />
                    ) : null}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </InfiniteScroll>
    </>
  );
};

export default CardsGrid;
