import { useState, useEffect } from "react";
import { Box, TextField, Autocomplete, Grid } from "@mui/material";
import React from "react";
import axios from "axios";
import CardsGrid from "./DisplayCards";

function SearchBar({ aircraft, vehicles }: any) {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  let url: string;

  if (aircraft) {
    url = "http://localhost:4200/aircraft";
  } else if (vehicles) {
    url = "http://localhost:4200/vehicles";
  } else {
    url = "http://localhost:4200/";
  }

  const handleInput = (e: any) => {
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

  const mappedList: any = list.map((item: any) => {
    if (aircraft) {
      return item.aircraft_type;
    } else if (vehicles) {
      return item.vehicle_type;
    } else {
      return item.type;
    }
  });

  const removedDuplicates = mappedList.filter((x: any, y: any) => {
    return mappedList.indexOf(x) === y;
  });

  useEffect(() => {
    fetchdata().then((res) => setList(res));
  }, []);

  const onClearIcon = (event: any, value: any, reason: any) => {
    if (reason === "clear") {
      setInput("");
    }
  };

  console.log(list);

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
