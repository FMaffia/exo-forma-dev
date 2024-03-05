import React from 'react';
import CustomCard from "../components/CustomCard";
import {Col, Row} from "react-bootstrap";
import project from '../assets/img/rabbit.png'
import allProject from '../assets/img/pinwheel.png'
import projectInCorso from '../assets/img/paper-fold.png'

const DashboardContainer = () => {
    const cardContentExample = [{
        id: 1,
        title: "Progetti completati",
        subTitle: "Last update: 23/05/2024",
        img: project,
        content: <button className={"btn-link text-muted btn text-decoration-none text-start"}>Consulta i progetti che hai portato a termine e di cui
            hai ottenuto le skills.</button>
    },
        {
            id: 2,
            title: "Progetti in corso",
            subTitle: "Last update: 23/05/2024",
            img: projectInCorso,
            content: <button className={"btn-link text-muted btn text-decoration-none text-start"}>
                Continua a lavorare sui progetti in corso riprendendo da dove avevi lasciato.
            </button>
        },
        {
            id: 3,
            title: "Sfoglia progetti",
            subTitle: "",
            img: allProject,
            content: <button className={"btn-link text-muted btn text-decoration-none text-start"}>
                Sfoglia i progetti suddivisi per skill seguendo step-by-step fino al completamento.
            </button>
        }
    ]
    return <div className="pagetitle">
        <section className={"section dashboard"}>
            <h1>Dashboard</h1>
            <nav>
                <ol class="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active">Dashboard</li>
                </ol>
            </nav>
            <Row>
                {cardContentExample.map(c => <Col key={c.id} xxl={4} md={6}>
                        <CustomCard cardContent={c}>
                            {c.content}
                        </CustomCard>
                    </Col>
                )}
            </Row>
        </section>
    </div>
};

export default DashboardContainer;
