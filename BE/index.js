const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const projects = require('./routes/projects');

const app = express();

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());


app.use('/api/projects', projects);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
