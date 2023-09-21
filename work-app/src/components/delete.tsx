import { Box } from "@mui/material";

const DeleteFile = () => {
  const homeOffice = [
    {
      date: "2023-10-16",
    },
  ];
  const date = "2023-10-15";
  const entityDates = homeOffice.map((x) => {
    return x.date.includes(date);
  });
  return <Box></Box>;
};
export default DeleteFile;
