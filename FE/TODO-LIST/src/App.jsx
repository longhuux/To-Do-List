import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { Stack } from "@mui/material";
import Project from "./pages/Project";
import {Routes, Route} from 'react-router-dom'


function App() {
  return (
    <Stack direction={"column"} alignItems={"center"} justifyContent={"center"}>
      <h1>TO-DO LIST</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<Project />} />
      </Routes>
    </Stack>
  );
}

export default App;


