import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

type Data = {
  Data: (string | number | number[] | string[])[];
};

const AutoComplete: React.FC<Data> = ({ Data }): JSX.Element => {
  const [value, setValue] = useState(null);
  const handleValue = (event: React.ChangeEvent<{}>, newEvent: any) => {
    setValue(newEvent);
  };

  console.log(value);
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={value}
      onChange={handleValue}
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
