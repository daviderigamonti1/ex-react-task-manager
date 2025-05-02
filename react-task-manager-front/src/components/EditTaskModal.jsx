import { useState, useRef } from 'react';
import Modal from "./Modal"

export default function EditTaskModal({ show, onClose, task, onSave }) {
    const [editedTask, setEditedTask] = useState(task);
    const editFormRef = useRef();

    const changeEditedTask = (key, event) => {
        setEditedTask(prev => ({ ...prev, [key]: event.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave(editedTask);
    }

    const { title, description, status } = editedTask;

    return (
        <Modal
            title="Modifica Task"
            content={
                <form ref={editFormRef} onSubmit={handleSubmit} className="edit-form">
                    <label className="form-label">
                        Nome Task:
                        <input
                            type='text'
                            value={title}
                            onChange={e => changeEditedTask('title', e)}
                            className="form-input"
                        />
                    </label>
                    <label className="form-label">
                        Descrizione:
                        <textarea
                            value={description}
                            onChange={e => changeEditedTask('description', e)}
                            className="form-textarea"
                        />
                    </label>
                    <label className="form-label">
                        Stato:
                        <select
                            value={status}
                            onChange={e => changeEditedTask('status', e)}
                            className="form-select"
                        >
                            {["To do", "Doing", "Done"].map((value, index) => (
                                <option key={index} value={value}>{value}</option>
                            ))}
                        </select>
                    </label>
                </form>
            }
            show={show}
            onClose={onClose}
            confirmText="Salva"
            onConfirm={() => editFormRef.current.requestSubmit()}
        />
    )
}