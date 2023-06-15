import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

type Data = {
  Data: string[][];
  disabled?: boolean;
};

const AutoComplete: React.FC<Data> = ({ Data, disabled }): JSX.Element => {
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
        width: 200,
        marginRight: -1.1,
        marginLeft: -1.1,
      }}
      renderInput={(params) => <TextField {...params} label="Parameter" />}
    />
  );
};

export default AutoComplete;
