import {
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  TextField,
  Grid,
} from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import { requestSender } from "../context/context";
import { toast } from "react-toastify";
import CustomizedSnackbars from "../components/notificationPopup";

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

const ModalComponent = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const contextData = useContext(requestSender);

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
    notif();
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
    contextData.setDataValue(["1"]);
  };
  const notif = () => {
    toast.success("New location added");
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
          <Grid sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Info:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 3 }}>
              <TextField
                onChange={(e) => handleLocationChange(e)}
                id="outlined-basic"
                label="Location"
                variant="outlined"
                sx={{ display: "flex" }}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 5 }}>
              <TextField
                id="outlined-basic"
                label="Organization"
                variant="outlined"
                onChange={(e) => handleOrganizationChange(e)}
                sx={{ display: "flex" }}
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
          </Grid>
        </Modal>
      </FormControl>
    </>
  );
};
export default ModalComponent;
