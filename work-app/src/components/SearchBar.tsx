import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Stack,
  Grid,
} from "@mui/material";
import React from "react";
import axios from "axios";
import CardsGrid from "./DisplayCards";

function SearchBar() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const handleInput = (e: any) => {
    setInput(e.target.value.toLowerCase());
  };

  const fetchdata = async () => {
    try {
      const response = await axios.get("http://localhost:4200/");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const mappedList: any = list.map((item: any) => {
    return item.type;
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

        <CardsGrid searchString={input} list={list} />
      </Box>
    </>
  );
}

export default SearchBar;
