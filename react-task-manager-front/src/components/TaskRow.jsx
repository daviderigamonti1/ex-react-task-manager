import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const TaskRow = React.memo(({ task, checked, onToggle }) => {
    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(task.id)}
                />
            </td>
            <td><Link to={`/task/${task.id}`}>{task.title}</Link></td>
            <td style={{
                background:
                    (
                        task.status === "To do"
                            ? "#f8d7da"
                            : task.status === "Doing"
                                ? "#fff3cd"
                                : "#d4edda"
                    )
            }}>
                {task.status}
            </td>
            <td>{dayjs(task.createdAt).format("DD/MM/YYYY")}</td>
        </tr >
    )
})

export default TaskRow;