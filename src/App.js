import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importing Bootstrap for global styling

/**
 * Main application component that serves as the entry point for the task management application.
 * It renders the TaskForm and TaskList components, providing a user interface for interacting with tasks.
 */
const App = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">ToDo List App</h1>
            <TaskForm />
            <TaskList />
        </div>
    );
};

export default App;
