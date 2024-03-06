import React from 'react';
import {Container, Modal} from "react-bootstrap";
import loading from "../assets/img/loading.gif";

const LoadingModal = () => {
    return <Modal size={'sm'} show={true} centered>
        <Container fluid className="d-flex justify-content-center align-items-center flex-column p-5 ">
            <img className={"mb-4 opacity-75"} src={loading} height={50}/>
            <div className={"fs-5 d-flex"}>Loading...
            </div>
        </Container>
    </Modal>
};

export default LoadingModal;
