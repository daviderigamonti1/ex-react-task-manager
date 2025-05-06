import { useCallback, useContext, useMemo, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import React from "react";
import TaskRow from "../components/TaskRow";

function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay)
    }
}

const TaskList = React.memo(() => {
    const { tasks, removeMultipleTasks } = useContext(GlobalContext);

    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSetSearchQuery = useCallback(
        debounce(setSearchQuery, 500)
        , []);

    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);

    const sortIcon = sortOrder === 1 ? "↓" : "↑";

    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const toggleSelection = taskId => {
        setSelectedTaskIds(prev => {
            if (selectedTaskIds.includes(taskId)) {
                return prev.filter(id => id !== taskId);
            } else {
                return [...prev, taskId];
            }
        })
    }

    const handleDeleteSelected = async () => {
        try {
            await removeMultipleTasks(selectedTaskIds);
            alert("Task eliminate con successo!");
            setSelectedTaskIds([]);
        } catch (err) {
            console.error(err);
            alert(err.message)
        }
        removeMultipleTasks(selectedTaskIds);
    }

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1);
        } else {
            setSortBy(field);
            setSortOrder(1);
        }
    }

    const filteredAndSortedTask = useMemo(() => {
        return [...tasks]
            .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => {
                let comparison;
                if (sortBy === 'title') {
                    comparison = a.title.localeCompare(b.title);
                } else if (sortBy === 'status') {
                    const statusOptions = ["To do", "Doing", "Done"];
                    const indexA = statusOptions.indexOf(a.status);
                    const indexB = statusOptions.indexOf(b.status);
                    comparison = indexA - indexB;
                } else if (sortBy === 'createdAt') {
                    const dateA = new Date(a.createdAt).getTime();
                    const dateB = new Date(b.createdAt).getTime();
                    comparison = dateA - dateB;
                }
                return comparison * sortOrder;
            })
    }, [tasks, sortBy, sortOrder, searchQuery])

    console.log("Tasks:", tasks);

    return (
        <>
            <h1>Lista delle Task</h1>

            <input
                type="text"
                onChange={e => debouncedSetSearchQuery(e.target.value)}
                placeholder="Cerca una task..."
                className="search-input"
            />

            {selectedTaskIds.length > 0 && (
                <button onClick={handleDeleteSelected} className="bulk-delete-button">
                    Elimina Selezionate
                </button>
            )}
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th onClick={() => handleSort('title')}>
                            Nome {sortBy === "title" && <span className="sort-icon">{sortIcon}</span>}
                        </th>
                        <th onClick={() => handleSort('status')}>
                            Stato {sortBy === "status" && <span className="sort-icon">{sortIcon}</span>}
                        </th>
                        <th onClick={() => handleSort('createdAt')}>
                            Data di creazione {sortBy === "createdAt" && <span className="sort-icon">{sortIcon}</span>}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAndSortedTask.map(task => (
                        <TaskRow
                            key={task.id}
                            task={task}
                            checked={selectedTaskIds.includes(task.id)}
                            onToggle={toggleSelection}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
})

export default TaskList;