import "./Modal.css"

const Modal = ({title, content, onClose, show}) => {
    if (!show) return null;

    return (
        <div className="modal-container">
            <div className="modal">
                <h4>{title}</h4>
                <p>{content}</p>
                <button className="btn-modal" onClick={onClose}>Chiudi</button>
            </div>
        </div>
    )
}

export default Modal