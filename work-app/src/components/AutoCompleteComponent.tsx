import { Autocomplete, TextField } from "@mui/material";
import { Specs } from "../types/specTypes";
import React, { useEffect, useState } from "react";

type Data = {
  Data: (string | number | number[] | string[])[];
};

const AutoComplete: React.FC<Data> = ({ Data }): JSX.Element => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={Data}
      sx={{
        width: 200,
        marginRight: -15,
      }}
      renderInput={(params) => <TextField {...params} label="Calories" />}
    />
  );
};

export default AutoComplete;
