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
import { AuthObjectType } from "../types/authTypes";
import { ItemType } from "../types/cardTypes";

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
  onAddProperty: () => void;
  isEditButton: boolean;
  propertyToEdit?: ItemType;
}

const AddProperty: React.FC<Props> = ({
  onAddProperty,
  isEditButton,
  propertyToEdit,
}): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const contextData = useContext(requestSender);
  const { user }: AuthObjectType = useUserAuth();
  const isUserAdmin = user!.roles.includes("admin");
  const isUserMod = user!.roles.includes("moderator");

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
    description: "",
  };

  const [newProperty, setNewProperty] = useState(
    propertyToEdit || initialPropertyState
  );

  const [isFormValid, setFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewProperty((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Check if all required fields have values
    const hasValues = Object.values(newProperty).every((value) => value !== "");
    setFormValid(hasValues);
  }, [newProperty]);

  const handleClose = () => {
    setOpen(false);
  };

  const postData = async (e: any) => {
    e.preventDefault();
    try {
      if (isFormValid) {
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
      } else {
        errorNotif();
      }
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
      setNewProperty(propertyToEdit);
    }
  }, [propertyToEdit]);

  return (
    <>
      {isEditButton && (isUserMod || isUserAdmin) ? (
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
          <Grid container direction="row" sx={style}>
            <Grid item xs={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {isEditButton ? "Edit property info:" : "New property info:"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Area"
                  variant="outlined"
                  sx={{ display: "flex", paddingRight: 2 }}
                  value={newProperty.area}
                  name="area"
                />
              </Typography>{" "}
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  required
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  onChange={handleChange}
                  sx={{ display: "flex", paddingRight: 2 }}
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
                  sx={{ display: "flex", paddingRight: 2 }}
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
                  sx={{ display: "flex", paddingRight: 2 }}
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
                  sx={{ display: "flex", paddingRight: 2 }}
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
                  sx={{ display: "flex", paddingRight: 2 }}
                  name="floorspace"
                  value={newProperty.floorspace}
                  placeholder="''"
                />
              </Typography>
            </Grid>
            <Grid item xs={6}>
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
                  label="Description"
                  variant="outlined"
                  onChange={handleChange}
                  sx={{ display: "flex" }}
                  name="description"
                  value={newProperty.description}
                  required
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
                  required
                />
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={postData}
                type="submit"
                disabled={!isFormValid} // Disable button if the form is not valid
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
export default AddProperty;
