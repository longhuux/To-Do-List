import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { Stack, Typography, IconButton,Modal,TextField,Button,Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 311px;
  /* background: ${({ isDragging }) =>
    isDragging ? "rgba(255, 59, 59, 0.15)" : "white"}; */
  background: white;
  margin-top: 15px;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
  /* .priority{ */
  /* margin-right: 12px; */
  /* align-self: center;
    svg{
      width: 12px !important;
      height: 12px !important;
      margin-right: 12px; */
  /* margin-top: 2px; */
  /* } */
  /* } */
`;

const TaskCard = ({ item, index, handleDeleteTask, handleUpdateTask }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const Update = () => {
        handleUpdateTask(item._id, title);
        handleClose();
      };
  return (
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskInformation>
            <Stack
              sx={{ width: "100%" }}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="h5" color={"black"}>
                {item.title}
              </Typography>
              <Stack direction={"row"}>
                <IconButton onClick={()=> setOpen(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteTask(item._id)}>
                  <DeleteIcon />
                </IconButton>
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Rename..."
                      />
                      <Button onClick={Update} variant="contained">
                        Update
                      </Button>
                    </Stack>
                  </Box>
                </Modal>
              </Stack>
            </Stack>
          </TaskInformation>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
