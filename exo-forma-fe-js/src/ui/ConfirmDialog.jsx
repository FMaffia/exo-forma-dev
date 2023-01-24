import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'

const ConfirmDialog = ({ handleClose, open, body, handleConfirm }) => {
    return (
        <Modal show={open} onHide={handleClose}>
            <Modal.Body>
                <p>{body}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-primary" onClick={handleClose}>
                    Annulla
                </Button>
                <Button variant="info" onClick={handleConfirm}>
                    Conferma
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmDialog
