import React from 'react'
import { parseText } from '../wysiwyg_formatter/formatFunction'
import FormattedText from '../wysiwyg_formatter/FormatText'

const PreviewStep = ({ step }) => {
    const parsedText = step ? parseText(step.desc) : ''
    return (
        <div style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
            <FormattedText formatObj={parsedText} />
        </div>
    )
}

export default PreviewStep
