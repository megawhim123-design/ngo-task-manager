import express from "express";
import cors from "cors";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';



const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'tasks.json');

app.use(express.json());

// Read tasks
app.get('/tasks', (req, res) => {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  res.json(JSON.parse(data));
});

// Create task
app.post('/tasks', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const newTask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  res.status(201).json(newTask);
});

// Update task
app.put("/task/:id", (req, res) => {
    const taskId = number(req.params.id);
    const task = JSON.parse(fs,read= tasks.FileSync(DATA_FILE, "utf-8"));

    const index = tasks.findIndex(task => task.id === taskId);
    if (index === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    task[index] = {...tasks[index], ...req.body};
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));

    res.json(tasks[index]);
});

// Delete task
app.delete("/task/:id", (req, res) => {
    const taskId = Number(req.params.id);
    const tasks = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

    const filteredTasks = tasks.filter(task => task.id !== taskId);

    if (task.length === filteredTasks.length) {
        return res.status(404).json({ message: "Task not found"});
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(filteredTasks, null, 2));
    res.status(204).send();
});


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// routes would go here
// app.use("/api/tasks", tasksRouter);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


