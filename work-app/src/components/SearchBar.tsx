import { useState, useEffect } from "react";
import { Box, TextField, Autocomplete } from "@mui/material";
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
      const response = await axios.get("http://localhost:3001/property");
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
    <Box>
      <Autocomplete
        options={removedDuplicates}
        disablePortal
        id="combo-box-demo"
        onChange={onClearIcon}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search property type"
            onSelect={handleInput}
            sx={{
              width: "86.5%",
              marginLeft: 17,

              marginBottom: "30px",
            }}
          />
        )}
      />
      <CardsGrid searchString={input} list={list} />
    </Box>
  );
}

export default SearchBar;
