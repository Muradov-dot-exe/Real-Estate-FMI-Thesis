import {
  Button,
  Modal,
  Typography,
  FormControl,
  TextField,
  Grid,
} from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import { requestSender } from "../context/context";
import { toast } from "react-toastify";

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

const AddProperty = ({ onAddProperty }: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const contextData = useContext(requestSender);

  const [newProperty, setNewProperty] = useState({
    area: "",
    address: "",
    city: "",
    image: "",
    type: "",
    floorspace: "",
    beds: "",
    baths: "",
    price: "",
    parking: "",
    construction: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewProperty((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(newProperty);

  const handleClose = () => {
    setOpen(false);
  };

  const postData = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4200/property/add", newProperty, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Clear the form fields
      setNewProperty({
        area: "",
        address: "",
        city: "",
        image: "",
        type: "",
        floorspace: "",
        beds: "",
        baths: "",
        price: "",
        parking: "",
        construction: "",
      });

      handleClose();
      contextData.setDataValue(["1"]);
      onAddProperty();
      notif();
    } catch (error) {
      console.error("Error adding property:", error);
      errorNotif();
    }
  };

  const notif = () => {
    toast.success("New location added");
  };
  const errorNotif = () => {
    toast.error("Could not create new property!");
  };

  return (
    <>
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
        Add a new property
      </Button>

      <FormControl fullWidth onSubmit={postData}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              New property info:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                onChange={handleChange}
                id="outlined-basic"
                label="Area"
                variant="outlined"
                sx={{ display: "flex" }}
                value={newProperty.area}
                name="area"
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                id="outlined-basic"
                label="Address"
                variant="outlined"
                onChange={handleChange}
                sx={{ display: "flex" }}
                value={newProperty.address}
                name="address"
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                id="outlined-basic"
                label="City"
                variant="outlined"
                onChange={handleChange}
                sx={{ display: "flex" }}
                value={newProperty.city}
                name="city"
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                id="outlined-basic"
                label="Image"
                placeholder="Add imgur link (ex: https://i.imgur.com/kC3uZtb.jpg)"
                variant="outlined"
                onChange={handleChange}
                sx={{ display: "flex" }}
                value={newProperty.image}
                name="image"
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                id="outlined-basic"
                label="Type"
                variant="outlined"
                onChange={handleChange}
                sx={{ display: "flex" }}
                value={newProperty.type}
                name="type"
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                id="outlined-basic"
                label="Floor space"
                variant="outlined"
                onChange={handleChange}
                sx={{ display: "flex" }}
                name="floorspace"
                value={newProperty.floorspace}
                placeholder="''"
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                id="outlined-basic"
                label="Beds"
                variant="outlined"
                onChange={handleChange}
                sx={{ display: "flex" }}
                name="beds"
                placeholder="''"
                value={newProperty.beds}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                id="outlined-basic"
                label="Baths"
                variant="outlined"
                name="baths"
                onChange={handleChange}
                sx={{ display: "flex" }}
                value={newProperty.baths}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                id="outlined-basic"
                label="Price"
                variant="outlined"
                onChange={handleChange}
                sx={{ display: "flex" }}
                value={newProperty.price}
                name="price"
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                required
                id="outlined-basic"
                label="Parking"
                variant="outlined"
                onChange={handleChange}
                sx={{ display: "flex" }}
                value={newProperty.parking}
                name="parking"
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                id="outlined-basic"
                label="Construction"
                variant="outlined"
                onChange={handleChange}
                sx={{ display: "flex" }}
                name="construction"
                value={newProperty.construction}
              />
            </Typography>

            <Button
              color="primary"
              sx={{ marginLeft: 40, marginTop: 2 }}
              onClick={postData}
              type="submit"
            >
              Add
            </Button>
          </Grid>
        </Modal>
      </FormControl>
    </>
  );
};
export default AddProperty;
