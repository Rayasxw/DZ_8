
import './Modal.css'

function Modal({ message, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
}

export default Modal;
