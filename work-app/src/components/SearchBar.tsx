import { useState, useEffect, ChangeEvent } from "react";
import { Box, TextField, Autocomplete, Grid } from "@mui/material";
import React from "react";
import axios from "axios";
import CardsGrid from "./DisplayCards";
import { ItemType } from "../types/cardTypes";

interface SearchBarProps {
  aircraft: boolean;
  vehicles: boolean;
}

function SearchBar({ aircraft, vehicles }: SearchBarProps): JSX.Element {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  let url: string;

  if (aircraft) {
    url = "https://real-estate-fmi-thesis-ym9a.vercel.app/aircraft";
  } else if (vehicles) {
    url = "https://real-estate-fmi-thesis-ym9a.vercel.app/vehicles";
  } else {
    url = "https://real-estate-fmi-thesis-ym9a.vercel.app/";
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.toLowerCase());
  };

  const fetchdata = async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const mappedList: string[] = list.map((item: ItemType) => {
    if (aircraft) {
      return item.aircraft_type || "";
    } else if (vehicles) {
      return item.vehicle_type || "";
    } else {
      return item.type || "";
    }
  });

  const removedDuplicates = mappedList.filter(
    (x: string, y: number) => mappedList.indexOf(x) === y
  );

  useEffect(() => {
    fetchdata().then((res) => setList(res));
  }, []);

  const onClearIcon = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null,
    reason: string
  ) => {
    if (reason === "clear") {
      setInput("");
    }
  };

  return (
    <>
      <Box justifyContent="center">
        <Autocomplete
          options={removedDuplicates}
          disablePortal
          id="combo-box-demo"
          onChange={onClearIcon}
          renderInput={(params) => (
            <Grid container justifyContent={"center"} alignItems="center">
              <TextField
                {...params}
                label="Search property type"
                onSelect={handleInput}
                sx={{
                  width: "86.5%",

                  "& label.Mui-focused": {
                    color: "gray",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      borderColor: "gray",
                    },
                  },
                }}
              />
            </Grid>
          )}
        />
        <Box
          sx={{
            padding: "15px",
            marginLeft: 2,
          }}
        ></Box>

        <CardsGrid
          searchString={input}
          list={list}
          aircraft={aircraft}
          vehicles={vehicles}
        />
      </Box>
    </>
  );
}

export default SearchBar;
