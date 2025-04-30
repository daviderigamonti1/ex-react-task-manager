import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";

export default function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask } = useContext(GlobalContext);

    const task = tasks.find(t => t.id === parseInt(id));

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (!task) {
        return <h2 className="task-not-found">Task non trovata.</h2>
    }

    const handleDelete = async () => {
        try {
            await removeTask(task.id);
            alert("Task eliminata con succeso.");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    return (
        <div className="task-detail-wrapper">
            <div className="task-detail-card">
                <h1 className="task-detail-title">Dettaglio Task</h1>
                <div className="task-detail-info">
                    <p><strong>Nome:</strong> {task.title}</p>
                    <p><strong>Descrizione:</strong> {task.description}</p>
                    <p><strong>Stato:</strong> {task.status}</p>
                    <p><strong>Data di Creazione:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
                </div>
                <button onClick={() => setShowDeleteModal(true)} className="delete-task-button">Elimina Task</button>
                <Modal
                    title="Conferma Eliminazione"
                    content={<p>Sei sicuro di voler eliminare questa task?</p>}
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDelete}
                    confirmText="Elimina"
                />
            </div>
        </div>
    )
}