import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import CircularProgress from "@mui/joy/CircularProgress";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 12,
  boxShadow: 24,
  p: 4,
};

const Project = ({ project, handleDelete, handleUpdate }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState();
  const [doneTaskLength, setDoneTasksLength]= useState()

  const Update = () => {
    handleUpdate(project._id, name);
    handleClose();
  };
  useEffect(() => {
    fetchDoneTasks();
  }, []);

  const fetchDoneTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/projects/${project._id}/done`
      );
      setDoneTasksLength(response.data.length);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <Stack
      sx={{ backgroundColor: "rgb(139, 186, 186)", borderRadius: 13 }}
      p={3}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      marginY={5}
      overflow={"scroll"}
    >
      <Stack spacing={2} direction={"row"} alignItems={"center"}>
        <CircularProgress size="lg" determinate value={(doneTaskLength/project.tasks.length)*100}>
          {doneTaskLength}/ {project.tasks.length}
        </CircularProgress>
        <Typography variant="h4">{project.name}</Typography>
      </Stack>
      <Stack direction={"row"}>
        <IconButton onClick={handleOpen}>
          <EditIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => handleDelete(project._id)}>
          <DeleteIcon fontSize="large" />
        </IconButton>
        <IconButton
          component={Link}
          to={`/project/${project._id}`}
          aria-label=""
        >
          <ChevronRightIcon fontSize="large" />
        </IconButton>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ width: "100%" }}
            spacing={3}
          >
            <TextField
              sx={{ width: "100%" }}
              id=""
              label=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Rename..."
            />
            <Button onClick={Update} variant="contained">
              Update
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};

export default Project;
