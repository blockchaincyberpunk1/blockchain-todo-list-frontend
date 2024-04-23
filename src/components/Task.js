import React from 'react';
import { getContract } from '../utils/contract';

/**
 * Task component that represents a single to-do item.
 * @param {{ task: { id: number, content: string, isCompleted: boolean }, fetchTasks: Function }} props The component props containing task details and a fetchTasks function to refresh the list after updates.
 */
const Task = ({ task, fetchTasks }) => {
    /**
     * Handles the completion of a task by sending a transaction to the smart contract.
     */
    const handleComplete = async () => {
        const contract = getContract();
        if (!contract) {
            console.log('Contract not loaded, check MetaMask or contract details.');
            return;
        }

        try {
            const tx = await contract.completeTask(task.id);
            await tx.wait();  // Waiting for the transaction to be confirmed
            fetchTasks();     // Refresh the task list to reflect the changes
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    return (
        <div className="d-flex justify-content-between align-items-center mb-2">
            <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                {task.content}
            </span>
            {!task.isCompleted && (
                <button className="btn btn-success" onClick={handleComplete}>
                    Complete
                </button>
            )}
        </div>
    );
};

export default Task;
