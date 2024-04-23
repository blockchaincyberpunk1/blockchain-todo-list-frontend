import React, { useState } from 'react';
import { getContract } from '../utils/contract';

/**
 * TaskForm component for submitting new tasks to the blockchain.
 * It provides a form with an input field to enter the task and a button to submit it.
 */
const TaskForm = () => {
    const [task, setTask] = useState('');  // State to hold the input field value

    /**
     * Handles the form submission event by sending the new task to the blockchain.
     * @param {React.FormEvent<HTMLFormElement>} event The form event triggered on submit.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent the default form submit behavior

        if (!task) return;  // Prevent empty submissions

        const contract = getContract();
        if (!contract) {
            console.error('Contract is not loaded.');
            return;
        }

        try {
            const tx = await contract.addTask(task);  // Call the smart contract function to add a task
            await tx.wait();  // Wait for the transaction to be mined
            setTask('');  // Reset the input field after submission
        } catch (error) {
            console.error('Error submitting new task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add new task"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                    required
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">Add Task</button>
                </div>
            </div>
        </form>
    );
};

export default TaskForm;
