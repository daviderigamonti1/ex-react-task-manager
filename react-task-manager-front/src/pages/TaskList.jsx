import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import React from "react";
import TaskRow from "../components/TaskRow";

const TaskList = React.memo(() => {
    const { tasks } = useContext(GlobalContext);
    console.log("Tasks:", tasks);

    return (
        <>
            <h1>Lista delle Task</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </>
    )
})

export default TaskList;