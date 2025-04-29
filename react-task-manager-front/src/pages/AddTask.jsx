import { useState, useRef, useMemo, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

export default function AddTask() {
    const [taskTitle, setTaskTitle] = useState("");
    const [error, setError] = useState("");

    const descriptionRef = useRef();
    const statusRef = useRef();

    const { addTask } = useContext(GlobalContext);

    const taskTitleError = useMemo(() => {
        if (!taskTitle.trim())
            return "Inserire il nome della task."
        if ([...taskTitle].some(char => symbols.includes(char)))
            return "Non può contenere simboli."
        return "";
    }, [taskTitle]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (taskTitleError) {
            setError(taskTitleError);
            return;
        }

        const newTask = {
            title: taskTitle.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value
        }
        try {
            await addTask(newTask);
            alert("Task creata con successo.");
            setTaskTitle("");
            descriptionRef.current.value = "";
            statusRef.current.value = "";
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="form-container">
            <h1 className="form-title">Aggiungi una Task</h1>
            <form onSubmit={handleSubmit} className="task-form">
                <label className="form-label">
                    Nome Task:
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={e => setTaskTitle(e.target.value)}
                        className="form-input"
                    />
                </label>
                {error && (
                    <p className="form-error">{error}</p>
                )}
                <label className="form-label">
                    Descrizione:
                    <textarea ref={descriptionRef} className="form-textarea" />
                </label>
                <label className="form-label">
                    Stato:
                    <select ref={statusRef} defaultValue="To do" className="form-select">
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </label>
                <button type="submit" className="form-button">Aggiungi Task</button>
            </form>
        </div>
    )
}

