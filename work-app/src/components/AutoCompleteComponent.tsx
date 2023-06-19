import { Autocomplete, Box, TextField } from "@mui/material";
import React, { useState } from "react";

type Data = {
  Data: (string | number | number[] | string[])[];
  disabled?: boolean;
  componentWidth?: number;
};

const AutoComplete: React.FC<Data> = ({
  Data,
  disabled,
  componentWidth,
}): JSX.Element => {
  const [value, setValue] = useState(null);
  const handleValue = (event: any, newEvent: any) => {
    setValue(newEvent);
  };

  console.log(value);
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={value}
      disabled={disabled}
      onChange={handleValue}
      options={Data}
      sx={{
        width: componentWidth || 200,
        marginRight: -15,
      }}
      renderInput={(params) => <TextField {...params} label="Parameter" />}
    />
  );
};

export default AutoComplete;
