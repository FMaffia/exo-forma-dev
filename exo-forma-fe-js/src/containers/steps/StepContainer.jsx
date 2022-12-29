import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import Typography from '@mui/material/Typography'
import {Box, Divider, Paper, Slide} from '@mui/material'
import {useGetDetailsQuery, useGetStepByNumberQuery} from "../../api/projectsApi";
import {CustomTitleAccordion} from "../../components/mui/accordion";
import NavigationSteps from "./NavigationSteps";

const StepContainer = () => {
    const {numberStep} = useParams()
    const {projectPath} = useParams()

    const {data: currentProject} = useGetDetailsQuery(projectPath)
    const {data: currentStep, isSuccess} = useGetStepByNumberQuery({idProject: currentProject?.id, number: +numberStep})
    const containerRef = React.useRef(null)
    const [direction, setDirection] = useState('left')

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                minHeight: '50vh',
                mt: 1,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
            ref={containerRef}
        >
            {/*@ts-ignore*/}
            <Slide key={'step' + numberStep} direction={direction} in={true} id={'step' + numberStep} timeout={300}
                   container={containerRef.current}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <CustomTitleAccordion>Step {`${numberStep}/${currentProject?.stepsCount}`}</CustomTitleAccordion>
                    <Typography variant="h3" gutterBottom component="div">
                        {currentStep && currentStep.title}
                    </Typography>

                    {currentStep && (
                        <Typography sx={{flexGrow: 2, display: 'flex', alignItems: 'center'}}>
                            {currentProject &&
                                <span className="content" dangerouslySetInnerHTML={{__html: currentStep.desc}}/>}
                        </Typography>
                    )}
                </Box>
            </Slide>
            <div>
                <Divider sx={{mb: 2}}/>
                <NavigationSteps setDirection={setDirection} currentStep={currentStep} currentProject={currentProject}/>
            </div>
        </Paper>
    )
};

export default StepContainer;