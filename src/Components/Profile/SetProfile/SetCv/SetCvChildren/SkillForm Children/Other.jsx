import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import styles from "./Other.module.css"
import ExtensionIcon from '@material-ui/icons/Extension';

function Other() {
    const [modalShow, setModalShow] = useState(true)
    const [next, setNext] = useState(false)
    return (
        <div>
            <Modal
                show={modalShow}
                color="primary"
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new skill block</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {next ? (<></>) : (<div className="row">
                        <div className="col-md-4" onClick={() => setNext(true)}>
                            <div className={`${styles.card} ${styles.card_1}`}>
                                <h3>Bureautique</h3>
                                <p>A bunch of skills related to desktop</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={`${styles.card} ${styles.card_2}`}>
                                <div className="row align-center">
                                    <ExtensionIcon />
                                    <h3>Custom</h3>
                                </div>
                                <p>Customize Your block</p>
                            </div>
                        </div>
                    </div>)}

                </Modal.Body>
            </Modal>

        </div >
    )
}

export default Other
