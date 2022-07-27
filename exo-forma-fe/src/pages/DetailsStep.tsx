import React, { useState } from 'react'
import { useMatch } from '@tanstack/react-location'
import Typography from '@mui/material/Typography'
import { useGetDetailsQuery, useGetStepByNumberQuery } from '../api/projectsApi'
import { Box, Divider, Paper, Slide } from '@mui/material'
import { CustomTitleAccordion } from '../layout/CustomMui'
import PaginationSteps from '../components/details/PaginationSteps'
import { CopyBlock, dracula } from 'react-code-blocks'

const DetailsStep = () => {
    const {
        params: { numberStep }
    } = useMatch()
    const {
        params: { projectPath }
    } = useMatch()

    const { data: currentProject } = useGetDetailsQuery(projectPath)
    const { data: step, isSuccess } = useGetStepByNumberQuery({ idProject: currentProject?.id, number: +numberStep })
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
            <Slide key={'step' + numberStep} direction={direction} in={true} id={'step' + numberStep} timeout={300} container={containerRef.current}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <CustomTitleAccordion>Step {`${numberStep}/${currentProject?.stepsCount}`}</CustomTitleAccordion>
                    <Typography variant="h3" gutterBottom component="div">
                        {step && step.title}
                    </Typography>

                    <CopyBlock
                        showLineNumbers
                        text={
                            'export const GAME_DIFFICULTIES = {\n' +
                            'EASY: {\n' +
                            "label: 'Facile',\n" +
                            'cols: 9,\n' +
                            'rows: 9,\n' +
                            'mines: 10,\n' +
                            '},\n' +
                            'INTERMEDIATE: {\n' +
                            "label: 'Medio',\n" +
                            'cols: 16,\n' +
                            'rows: 16,\n' +
                            'mines: 40,\n' +
                            '},\n' +
                            'HARD: {\n' +
                            "label: 'Difficile',\n" +
                            'cols: 30,\n' +
                            'rows: 16,\n' +
                            'mines: 99,\n' +
                            '},\n' +
                            '};'
                        }
                        startingLineNumber={1}
                        language={'javascript'}
                        wrapLines={true}
                        theme={dracula}
                    />

                    {step && (
                        <Typography sx={{ flexGrow: 2, display: 'flex', alignItems: 'center' }}>
                            {currentProject && <span className="content" dangerouslySetInnerHTML={{ __html: step.desc }} />}
                        </Typography>
                    )}
                </Box>
            </Slide>
            <div>
                <Divider sx={{ mb: 2 }} />
                <PaginationSteps setDirection={setDirection} />
            </div>
        </Paper>
    )
}

export default DetailsStep
