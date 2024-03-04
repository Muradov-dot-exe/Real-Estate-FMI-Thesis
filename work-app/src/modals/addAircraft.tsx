import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Modal,
  Typography,
  FormControl,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";
import { requestSender } from "../context/context";
import { toast } from "react-toastify";
import { useUserAuth } from "../context/authContext";
import { ItemType } from "../types/cardTypes";
import { AuthObjectType } from "../types/authTypes";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
};

interface Props {
  onAddAircraft: () => void;
  isEditButton: boolean;
  aircraftToEdit?: ItemType;
}

const AddAircraft: React.FC<Props> = ({
  onAddAircraft,
  isEditButton,
  aircraftToEdit,
}): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const contextData = useContext(requestSender);
  const { user }: AuthObjectType = useUserAuth();
  const isUserAdmin = user!.roles.includes("admin");
  const isUserMod = user!.roles.includes("moderator");

  const initialAircraftState = {
    aircraft_type: "",
    manufacturer: "",
    model: "",
    image: "",
    registration_number: "",
    year: "",
    serial_number: "",
    seats: "",
    price: "",
    description: "",
  };

  const [newAircraft, setNewAircraft] = useState(
    aircraftToEdit || initialAircraftState
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewAircraft((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postData = async (e: any) => {
    e.preventDefault();
    try {
      const axiosMethod = aircraftToEdit ? axios.put : axios.post;

      await axiosMethod(
        `http://localhost:4200/aircraft/${
          aircraftToEdit ? `edit/${aircraftToEdit.id}` : "add"
        }`,
        newAircraft,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setNewAircraft(initialAircraftState);

      handleClose();
      contextData.setDataValue(["1"]);
      onAddAircraft();
      notif();
    } catch (error) {
      console.error(
        `Error ${aircraftToEdit ? "editing" : "adding"} aircraft:`,
        error
      );
      errorNotif();
    }
  };

  const notif = () => {
    toast.success(
      `Aircraft ${aircraftToEdit ? "edited" : "added"} successfully`
    );
  };

  const errorNotif = () => {
    toast.error(`Could not ${aircraftToEdit ? "edit" : "add"} the aircraft!`);
  };

  useEffect(() => {
    if (aircraftToEdit) {
      setNewAircraft(aircraftToEdit);
    }
  }, [aircraftToEdit]);

  return (
    <>
      {isEditButton && isUserMod ? (
        <Button
          onClick={handleOpen}
          size="small"
          style={{
            color: "#aa6c39",
            textDecoration: "none",
          }}
        >
          Edit
        </Button>
      ) : isUserAdmin ? (
        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{
            height: 50,
            borderColor: "#aa6c39",
            color: "#aa6c39",
            "&:hover": {
              backgroundColor: "beige",
              color: "orange",
              borderColor: "orange",
            },
          }}
        >
          Add a new aircraft
        </Button>
      ) : null}

      <FormControl fullWidth onSubmit={postData}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid container direction="row" sx={style}>
            <Grid item xs={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {isEditButton ? "Edit aircraft info:" : "New aircraft info:"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Aircraft Type"
                  variant="outlined"
                  sx={{ display: "flex", paddingRight: 2 }}
                  value={newAircraft.aircraft_type}
                  name="aircraft_type"
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Manufacturer"
                  variant="outlined"
                  sx={{ display: "flex", paddingRight: 2 }}
                  value={newAircraft.manufacturer}
                  name="manufacturer"
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Model"
                  variant="outlined"
                  sx={{ display: "flex", paddingRight: 2 }}
                  value={newAircraft.model}
                  name="model"
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Image"
                  placeholder="Add imgur link (ex: https://i.imgur.com/kC3uZtb.jpg)"
                  variant="outlined"
                  sx={{ display: "flex", paddingRight: 2 }}
                  value={newAircraft.image}
                  name="image"
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Registration Number"
                  variant="outlined"
                  sx={{ display: "flex", paddingRight: 2 }}
                  value={newAircraft.registration_number}
                  name="registration_number"
                />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Year"
                  variant="outlined"
                  sx={{ display: "flex", paddingRight: 2 }}
                  value={newAircraft.year}
                  name="year"
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Serial Number"
                  variant="outlined"
                  sx={{ display: "flex", paddingRight: 2 }}
                  value={newAircraft.serial_number}
                  name="serial_number"
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Seats"
                  variant="outlined"
                  sx={{ display: "flex", paddingRight: 2 }}
                  value={newAircraft.seats}
                  name="seats"
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  sx={{ display: "flex", paddingRight: 2 }}
                  value={newAircraft.price}
                  name="price"
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  sx={{ display: "flex", paddingRight: 2 }}
                  value={newAircraft.description}
                  name="description"
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={postData}
                type="submit"
              >
                {isEditButton ? "Save" : "Add"}
              </Button>
            </Grid>
          </Grid>
        </Modal>
      </FormControl>
    </>
  );
};

export default AddAircraft;
