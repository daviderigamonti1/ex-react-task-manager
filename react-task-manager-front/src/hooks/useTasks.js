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

    const removeTask = (taskId) => {

    }

    const updateTask = () => {

    }

    return { tasks, addTask, removeTask, updateTask };
}