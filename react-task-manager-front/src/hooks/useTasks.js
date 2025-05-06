import { useState, useEffect } from "react";
const { VITE_API_URL } = import.meta.env;

export default function useTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => console.error(err));
    }, []);

    const addTask = async newTask => {
        const response = await fetch(`${VITE_API_URL}/tasks`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        });
        const { success, message, task } = await response.json();
        if (!success) throw new Error(message);

        setTasks(prev => [...prev, task])
    }

    const removeTask = async taskId => {
        const response = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        });
        const { success, message } = await response.json();
        if (!success) throw new Error(message);
        setTasks(prev => prev.filter(t => t.id !== taskId));
    }

    const removeMultipleTasks = async taskIds => {
        const deleteRequest = taskIds.map(taskId =>
            fetch(`${VITE_API_URL}/tasks/${taskId}`, { method: 'DELETE' })
                .then(res => res.json())
        );

        const results = await Promise.allSettled(deleteRequest);

        const fullfilledDeletions = [];
        const rejectedDeletions = [];

        results.forEach((result, index) => {
            const taskId = taskIds[index];
            if (result.status === 'fulfilled' && result.value.success) {
                fullfilledDeletions.push(taskId);
            } else {
                rejectedDeletions.push(taskId);
            }
        });

        if (fullfilledDeletions.length > 0) {
            setTasks(prev => prev.filter(t => !fullfilledDeletions.includes(t.id)))
        }

        if (rejectedDeletions.length > 0) {
            throw new Error(`Errore nell'eliminazione delle task con id: ${rejectedDeletions.join(", ")}`);
        }
    }

    const updateTask = async updatedTask => {
        const response = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        });
        const { success, message, task: newTask } = await response.json();
        if (!success) throw new Error(message);

        setTasks(prev => prev.map(oldTask => oldTask.id === newTask.id ? newTask : oldTask));
    }

    return { tasks, addTask, removeTask, updateTask, removeMultipleTasks };
}