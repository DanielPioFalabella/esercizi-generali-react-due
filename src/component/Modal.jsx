import "./Modal.css"

const Modal = ({title, content, onClose, onConfirm, show}) => {
    if (!show) return null;

    return (
        <div className="modal-container">
            <div className="modal">
                <h4>{title}</h4>
                <p>{content}</p>
                <div className="btn-modal-section">
                    <button className="btn-modal" onClick={onClose}>Chiudi</button>
                    <button className="btn-modal" onClick={onConfirm}>Conferma</button>
                </div>
            </div>
        </div>
    )
}

export default Modal