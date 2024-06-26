import { Button, Modal, Box, Typography, Grid } from "@mui/material";
import React, { useContext } from "react";
import axios from "axios";
import { requestSender } from "../context/context";
import { toast } from "react-toastify";

type DeleteData = {
  deleteId?: number;
  onDelete: () => void;
  aircraft: boolean;
  vehicles: boolean;
};

const DeleteModal: React.FC<DeleteData> = ({
  deleteId,
  onDelete,
  aircraft,
  vehicles,
}): JSX.Element => {
  const contextData = useContext(requestSender);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const deleteData = () => {
    if (aircraft) {
      axios.delete(
        `https://real-estate-fmi-thesis-ym9a.vercel.app/aircraft/delete/${deleteId}`
      );
    } else if (vehicles) {
      axios.delete(
        `https://real-estate-fmi-thesis-ym9a.vercel.app/vehicles/delete/${deleteId}`
      );
    } else {
      axios.delete(
        `https://real-estate-fmi-thesis-ym9a.vercel.app/delete/${deleteId}`
      );
    }
    handleClose();
    contextData.setDataValue(["1"]);
    notif();
    onDelete();
  };

  const notif = () => {
    toast.warning("Property deleted");
  };

  return (
    <>
      <div>
        <Button
          onClick={handleOpen}
          style={{
            textDecoration: "none",
            color: "#aa6c39",
          }}
        >
          Delete
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 430,
              bgcolor: "background.paper",
              border: "1px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" component="h2">
              {aircraft
                ? `Are you sure you want to delete this aircraft with id ${deleteId} ?`
                : vehicles
                ? `Are you sure you want to delete this vehicle with id ${deleteId} ?`
                : `Are you sure you want to delete this property with id ${deleteId} ?`}
            </Typography>
            <Grid sx={{ marginTop: 2 }}>
              <Button
                color="primary"
                onClick={deleteData}
                sx={{ marginLeft: 25 }}
              >
                DELETE
              </Button>
              <Button
                color="primary"
                onClick={handleClose}
                sx={{ marginLeft: 1 }}
              >
                CANCEL
              </Button>
            </Grid>
          </Box>
        </Modal>
      </div>
    </>
  );
};
export default DeleteModal;
