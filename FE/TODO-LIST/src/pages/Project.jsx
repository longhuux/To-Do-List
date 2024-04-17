import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CircularProgress from "@mui/joy/CircularProgress";
import Kanban from "../components/Kanban";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const Project = () => {
  const [project, setProject] = useState();
  const [doneTasks, setDoneTasks] = useState();
  const [allTasksLength, setAllTasksLength] = useState(0);
  const [doneTasksLength, setDoneTasksLength] = useState(0);
  const [task, setTask] = useState();
  const { id } = useParams();
  const [columns, setColumns] = useState();

  const fetchData = async () => {
    try {
      const newTasksResponse = await axios.get(
        `http://localhost:8000/api/projects/${id}/new`
      );
      const inProgressTasksResponse = await axios.get(
        `http://localhost:8000/api/projects/${id}/inProgress`
      );
      const doneTasksResponse = await axios.get(
        `http://localhost:8000/api/projects/${id}/done`
      );

      const newTasks = newTasksResponse.data;
      const inProgressTasks = inProgressTasksResponse.data;
      const doneTasks = doneTasksResponse.data;

      const columnsData = {
        ["new"]: {
          title: "New",
          items: newTasks,
        },
        ["inProgress"]: {
          title: "In Progress",
          items: inProgressTasks,
        },
        ["done"]: {
          title: "Done",
          items: doneTasks,
        },
      };

      setColumns(columnsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchDoneTasks();
    fetchData();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/projects/${id}`
      );
      setProject(response.data);
      setAllTasksLength(response.data.tasks.length);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  const fetchDoneTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/projects/${id}/done`
      );
      setDoneTasks(response.data);
      setDoneTasksLength(response.data.length);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/projects/${id}/tasks`,
        { title: task }
      );
      fetchProjects();
      fetchData();
      setTask("");
    } catch (error) {
      console.error("Error add: ", error);
    }
  };
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/projects/${id}/tasks/${taskId}`
      );
      fetchProjects();
      fetchData();
    } catch (error) {
      console.error("Error add: ", error);
    }
  };
  const handleUpdateTask = async (taskId, title) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/projects/${id}/tasks/${taskId}`,
        {
          title: title,
        }
      );
      fetchProjects();
      fetchData();
    } catch (error) {
      console.error("Error add: ", error);
    }
  };
  const handleUpdateStatus = async (id, taskId, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/projects/${id}/tasks/${taskId}/status`,
        {
          status: status,
        }
      );
      fetchProjects();
      fetchData();
      fetchDoneTasks();
    } catch (error) {
      console.error("Error add: ", error);
    }
  };

  return (
    <Box
      p={5}
      sx={{
        backgroundColor: "white",
        height: "100vh",
        borderRadius: 8,
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        p={2}
        spacing={2}
      >
        <IconButton LinkComponent={Link} to="/" size="large">
          <ChevronLeftIcon fontSize="inherit" />
        </IconButton>
        <Typography variant="h5" color="black">
          Home
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} p={3} spacing={3}>
          <CircularProgress
            size="lg"
            determinate
            value={(doneTasksLength / allTasksLength) * 100}
          >
            {doneTasksLength} / {allTasksLength}
          </CircularProgress>
          <Typography variant="h3" color={"black"}>
            {project && project.name}
          </Typography>
        </Stack>
        <Stack sx={{ width: "40%" }} direction={"row"} spacing={3}>
          <TextField
            sx={{ width: "100%" }}
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a task..."
          />
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              handleAddTask();
            }}
          >
            Add
          </Button>
        </Stack>
      </Stack>
      <Kanban
        columns={columns}
        setColumns={setColumns}
        handleDeleteTask={handleDeleteTask}
        handleUpdateTask={handleUpdateTask}
        handleUpdateStatus={handleUpdateStatus}
      />
    </Box>
  );
};

export default Project;
