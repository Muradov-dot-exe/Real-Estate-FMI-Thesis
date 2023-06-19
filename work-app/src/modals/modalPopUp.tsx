import {
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

type Data = {
  location?: any;
  organization?: any;
};

const ModalComponent: React.FC<Data> = ({
  location,
  organization,
}): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const [newLocation, setNewLocation] = useState<any>();
  const [newOrganization, setNewOrganization] = useState<any>();

  const handleLocationChange = (event: any) => {
    setNewLocation(event.target.value);
  };

  const handleOrganizationChange = (event: any) => {
    setNewOrganization(event.target.value);
  };

  const handleClose = () => {
    setNewLocation(null);
    setNewOrganization(null);
    setOpen(false);
  };

  const postData = async () => {
    await axios.post(
      "http://localhost:3001/department",
      JSON.stringify({
        locationName: newLocation,
        organizationName: newOrganization,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    handleClose();
  };

  return (
    <>
      <Button color="primary" onClick={handleOpen} sx={{ marginLeft: 180 }}>
        Add
      </Button>
      <FormControl fullWidth>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Info:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 3 }}>
              Location:
              <TextField
                onChange={(e) => handleLocationChange(e)}
                id="outlined-basic"
                label="Location"
                variant="outlined"
                sx={{ marginLeft: 1, marginTop: -2, width: 265 }}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 5 }}>
              Organization:
              <TextField
                value={organization}
                id="outlined-basic"
                label="Organization"
                variant="outlined"
                onChange={(e) => handleOrganizationChange(e)}
                sx={{ marginLeft: 1, marginTop: -2 }}
              />
            </Typography>
            <Button
              color="primary"
              sx={{ marginLeft: 35, marginTop: 5 }}
              onClick={postData}
              disabled={!newLocation || !newOrganization}
            >
              Add
            </Button>
          </Box>
        </Modal>
      </FormControl>
    </>
  );
};
export default ModalComponent;
