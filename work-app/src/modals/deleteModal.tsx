import {
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  IconButton,
  Grid,
} from "@mui/material";
import React, { useContext } from "react";
import axios from "axios";
import { requestSender } from "../context/context";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

type DeleteData = {
  deleteId?: number;
};

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

const DeleteModal: React.FC<DeleteData> = ({ deleteId }): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const contextData = useContext(requestSender);

  const handleClose = () => {
    setOpen(false);
  };

  const deleteData = () => {
    axios.delete(`http://localhost:3001/department/${deleteId}`);
    handleClose();
    contextData.setDataValue(["1"]);
    notif();
  };

  const notif = () => {
    toast.warning("Location deleted");
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <FormControl fullWidth>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" component="h2">
              Are you sure you want to delete this row ?
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
      </FormControl>
    </>
  );
};
export default DeleteModal;
