import React, { useEffect, useState } from "react";
import { Stack, Box, TextField, Button, Typography } from "@mui/material";
import Project from "../components/Project";
import axios from "axios";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState();

  console.log(project);
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error(`Error deleting project with id ${id}:`, error);
    }
  };
  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:8000/api/projects", {
        name: project,
      });
      fetchProjects();
      setProject('');
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };
  const updateProject = async (id, data) => {
    try {
      await axios.patch(`http://localhost:8000/api/projects/${id}`, {
        name: data,
      });
      fetchProjects();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <Box
      p={5}
      sx={{
        backgroundColor: "white",
        height: "100vh",
        width: "50%",
        borderRadius: 8,
      }}
    >
      <Stack direction={"row"} sx={{ width: "100%" }} spacing={3}>
        <TextField

          sx={{ width: "100%" }}
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder="Add a project..."
        />
        <Button onClick={(e) => { e.preventDefault(); handleAdd(); }} variant="contained">
          Add
        </Button>
      </Stack>
      {projects && projects.length > 0 ? (
        projects.map((project) => (
          <Project
            key={project.id}
            project={project}
            handleDelete={deleteProject}
            handleUpdate={updateProject}
          />
        ))
      ) : (
        <Box p={12}>
          <Typography variant="h4" color="black">
            Nothing...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Home;
