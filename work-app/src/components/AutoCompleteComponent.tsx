import { Autocomplete, TextField } from "@mui/material";

type Data = {
  calories: number[];
};

const AutoComplete = (calorieInput: Data): JSX.Element => {
  const { calories } = calorieInput;
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={calories}
      sx={{
        width: 200,
        marginRight: -15,
      }}
      renderInput={(params) => <TextField {...params} label="Calories" />}
    />
  );
};

export default AutoComplete;
