import React, { useEffect, useState } from 'react';
import Task from './Task';
import { getContract } from '../utils/contract';

/**
 * TaskList component that fetches and displays all tasks from the smart contract.
 * It utilizes the Task component to render each individual task.
 */
const TaskList = () => {
    const [tasks, setTasks] = useState([]);  // State to store the array of tasks

    /**
     * Fetches all tasks from the smart contract and updates the state.
     */
    const fetchTasks = async () => {
        const contract = getContract();
        if (!contract) {
            console.error('Contract is not loaded.');
            return;
        }

        try {
            const taskCount = await contract.getTaskCount();  // Retrieve the number of tasks
            const tasks = [];

            for (let i = 0; i < taskCount; i++) {
                const task = await contract.getTask(i);  // Fetch each task by index
                tasks.push({ id: i, content: task[0], isCompleted: task[1] });
            }

            setTasks(tasks);  // Update the state with the fetched tasks
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    // Effect hook to load tasks when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            {tasks.length > 0 ? (
                tasks.map(task => <Task key={task.id} task={task} fetchTasks={fetchTasks} />)
            ) : (
                <p>No tasks found. Add some tasks!</p>
            )}
        </div>
    );
};

export default TaskList;
