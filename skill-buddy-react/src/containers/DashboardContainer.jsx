import React from 'react';
import CustomCard from "../components/CustomCard";
import {Col, Row} from "react-bootstrap";
import project from '../assets/img/geometric1.png'
import allProject from '../assets/img/geometric2.png'
import projectInCorso from '../assets/img/geometric3.png'
import TimelineActivity from "../components/TimelineActivity";
import {GraficoSkills} from "../components/grafici/GraficoSkills";

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
    const timelineContent = [{
        id: 1,
        title: "Alessio Pavino ha pubblicato JPA e Company",
        date: "23/05/2024",
        icon: "bi bi-box",
        content: <p>Il brano standard del Lorem Ipsum usato sin dal sedicesimo secolo è riprodotto qui di seguito per coloro
            <button className={"btn-sm d-block ps-0  btn-link btn"}>Dettaglio</button>
        </p>
    },
        {
            id: 2,
            title: "Matteo Bartolin ha pubblicato Maven e Company",
            date: "23/05/2024",
            icon: "bi bi-bell",
            content: <p>Il brano standard del Lorem Ipsum usato sin dal sedicesimo secolo è riprodotto qui di seguito

                <button className={"btn-sm d-block ps-0  btn-link btn"}>Dettaglio</button>
            </p>
        }
    ]
    return <div className="fade-container pagetitle">
        <section className={"section dashboard"}>
            <h1>Dashboard</h1>
            <nav>
                <ol className="breadcrumb">
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
                <Col xxl={8} md={6} sm={12}>
                    <CustomCard cardContent={{title: "Skills ottenute"}}>
                        <GraficoSkills/>
                    </CustomCard>
                </Col>
                <Col xxl={4} md={6} sm={12}>
                    <CustomCard cardContent={{title: "Ultime attività"}}>

                        <TimelineActivity datas={timelineContent}/>
                    </CustomCard>
                </Col>
            </Row>
        </section>
    </div>
};

export default DashboardContainer;
