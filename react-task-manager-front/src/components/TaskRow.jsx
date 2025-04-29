import React from "react";

const TaskRow = React.memo(({ task }) => {
    return (
        <tr>
            <td>{task.title}</td>
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
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
})

export default TaskRow;