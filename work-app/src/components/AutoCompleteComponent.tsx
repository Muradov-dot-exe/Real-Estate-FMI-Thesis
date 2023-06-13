import { Autocomplete, TextField } from "@mui/material";
import { Food } from "../types/foodsTypes";

type Data = {
  food: number[];
};

const AutoComplete = (incomingData: Data): JSX.Element => {
  const { food } = incomingData;
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={food}
      sx={{ width: 300, display: "flex", alignContent: "center" }}
      renderInput={(params) => <TextField {...params} label="Calories" />}
    />
  );
};

export default AutoComplete;
