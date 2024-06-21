const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB connection setup
mongoose.connect('mongodb+srv://prasheethaj:ZtBphCKRWOHjycpm@cluster0.kbqst04.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema for projects
const projectSchema = new mongoose.Schema({
    title: String,
    description: String
});

// Create a model based on the schema
const Project = mongoose.model('Project', projectSchema);

// Example route to fetch projects
app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Example route to add a new project
app.post('/projects', async (req, res) => {
    const { title, description } = req.body;
    try {
        const newProject = new Project({ title, description });
        await newProject.save();
        res.json(newProject);
    } catch (err) {
        console.error('Error adding project:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
