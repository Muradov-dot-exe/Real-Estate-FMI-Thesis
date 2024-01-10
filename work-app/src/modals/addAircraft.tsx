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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
};

interface Props {
  onAddAircraft: any;
  isEditButton: boolean;
  aircraftToEdit?: any;
}

const AddAircraft: React.FC<Props> = ({
  onAddAircraft,
  isEditButton,
  aircraftToEdit,
}): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const contextData = useContext(requestSender);
  const { user }: any = useUserAuth();
  let isUserAdmin = false;

  // if (user) {
  //   isUserAdmin = user.roles.includes("admin");
  // }

  // console.log(isUserAdmin);
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
  };

  const [newAircraft, setNewAircraft] = useState(
    aircraftToEdit || initialAircraftState
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewAircraft((prevData: any) => ({
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
      // If aircraftToEdit is provided, set initial values
      setNewAircraft(aircraftToEdit);
    }
  }, [aircraftToEdit]);

  return (
    <>
      {isEditButton ? (
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
      ) : (
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
      )}

      <FormControl fullWidth onSubmit={postData}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {isEditButton ? "Edit aircraft info:" : "New aircraft info:"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                onChange={handleChange}
                id="outlined-basic"
                label="Aircraft Type"
                variant="outlined"
                sx={{ display: "flex" }}
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
                sx={{ display: "flex" }}
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
                sx={{ display: "flex" }}
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
                sx={{ display: "flex" }}
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
                sx={{ display: "flex" }}
                value={newAircraft.registration_number}
                name="registration_number"
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                onChange={handleChange}
                id="outlined-basic"
                label="Year"
                variant="outlined"
                sx={{ display: "flex" }}
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
                sx={{ display: "flex" }}
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
                sx={{ display: "flex" }}
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
                sx={{ display: "flex" }}
                value={newAircraft.price}
                name="price"
              />
            </Typography>
            <Button
              color="primary"
              sx={{ marginLeft: 40, marginTop: 2 }}
              onClick={postData}
              type="submit"
            >
              {isEditButton ? "Save" : "Add"}
            </Button>
          </Grid>
        </Modal>
      </FormControl>
    </>
  );
};

export default AddAircraft;
