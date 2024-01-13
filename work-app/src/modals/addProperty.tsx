import {
  Button,
  Modal,
  Typography,
  FormControl,
  TextField,
  Grid,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
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
  onAddProperty: any;
  isEditButton: boolean;
  propertyToEdit?: any;
}

const AddProperty: React.FC<Props> = ({
  onAddProperty,
  isEditButton,
  propertyToEdit,
}): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const contextData = useContext(requestSender);
  const { user }: any = useUserAuth();
  const isUserAdmin = user.roles.includes("admin");
  const isUserMod = user.roles.includes("moderator");

  const initialPropertyState = {
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
  };

  const [newProperty, setNewProperty] = useState(
    propertyToEdit || initialPropertyState
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewProperty((prevData: any) => ({
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
      // Use PUT request if propertyToEdit is provided, otherwise use POST
      const axiosMethod = propertyToEdit ? axios.put : axios.post;

      await axiosMethod(
        `http://localhost:4200/property/${
          propertyToEdit ? `edit/${propertyToEdit.id}` : "add"
        }`,
        newProperty,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setNewProperty(initialPropertyState);

      handleClose();
      contextData.setDataValue(["1"]);
      onAddProperty();
      notif();
    } catch (error) {
      console.error(
        `Error ${propertyToEdit ? "editing" : "adding"} property:`,
        error
      );
      errorNotif();
    }
  };

  const notif = () => {
    toast.success(
      `Property ${propertyToEdit ? "edited" : "added"} successfully`
    );
  };

  const errorNotif = () => {
    toast.error(`Could not ${propertyToEdit ? "edit" : "add"} the property!`);
  };

  useEffect(() => {
    if (propertyToEdit) {
      // If propertyToEdit is provided, set initial values
      setNewProperty(propertyToEdit);
    }
  }, [propertyToEdit]);

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
          Add a new property
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
              {isEditButton ? "Edit property info:" : "New property info:"}
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
              {isEditButton ? "Save" : "Add"}
            </Button>
          </Grid>
        </Modal>
      </FormControl>
    </>
  );
};
export default AddProperty;
