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
  onAddVehicle: any;
  isEditButton: boolean;
  vehicleToEdit?: any;
}

const AddVehicle: React.FC<Props> = ({
  onAddVehicle,
  isEditButton,
  vehicleToEdit,
}): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const contextData = useContext(requestSender);
  const { user }: any = useUserAuth();
  const isUserAdmin = user.roles.includes("admin");
  const isUserMod = user.roles.includes("moderator");

  const initialVehicleState = {
    vehicle_type: "",
    manufacturer: "",
    model: "",
    image: "",
    year: "",
    VIN: "",
    seats: "",
    price: "",
  };

  const [newVehicle, setNewVehicle] = useState(
    vehicleToEdit || initialVehicleState
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewVehicle((prevData: any) => ({
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
      const axiosMethod = vehicleToEdit ? axios.put : axios.post;

      await axiosMethod(
        `http://localhost:4200/vehicle/${
          vehicleToEdit ? `edit/${vehicleToEdit.id}` : "add"
        }`,
        newVehicle,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setNewVehicle(initialVehicleState);

      handleClose();
      contextData.setDataValue(["1"]);
      onAddVehicle();
      notif();
    } catch (error) {
      console.error(
        `Error ${vehicleToEdit ? "editing" : "adding"} vehicle:`,
        error
      );
      errorNotif();
    }
  };

  const notif = () => {
    toast.success(`Vehicle ${vehicleToEdit ? "edited" : "added"} successfully`);
  };

  const errorNotif = () => {
    toast.error(`Could not ${vehicleToEdit ? "edit" : "add"} the vehicle!`);
  };

  useEffect(() => {
    if (vehicleToEdit) {
      setNewVehicle(vehicleToEdit);
    }
  }, [vehicleToEdit]);

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
          Add a new vehicle
        </Button>
      ) : null}

      <FormControl fullWidth onSubmit={postData}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {isEditButton ? "Edit vehicle info:" : "New vehicle info:"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                onChange={handleChange}
                id="outlined-basic"
                label="Vehicle Type"
                variant="outlined"
                sx={{ display: "flex" }}
                value={newVehicle.vehicle_type}
                name="vehicle_type"
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
                value={newVehicle.manufacturer}
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
                value={newVehicle.model}
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
                value={newVehicle.image}
                name="image"
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
                value={newVehicle.year}
                name="year"
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                onChange={handleChange}
                id="outlined-basic"
                label="VIN"
                variant="outlined"
                sx={{ display: "flex" }}
                value={newVehicle.VIN}
                name="VIN"
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
                value={newVehicle.seats}
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
                value={newVehicle.price}
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

export default AddVehicle;
