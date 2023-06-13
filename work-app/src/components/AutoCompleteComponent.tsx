import { Autocomplete, TextField } from "@mui/material";

const AutoComplete: React.FC<any> = ({ incomingData }: any): JSX.Element => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={incomingData}
      sx={{ width: 300, display: "flex", alignContent: "center" }}
      renderInput={(params) => <TextField {...params} label="Calories" />}
    />
  );
};

export default AutoComplete;
