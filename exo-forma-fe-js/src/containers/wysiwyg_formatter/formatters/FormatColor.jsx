import FormattedText from '../FormatText'
import React from 'react'

const FormattedColor = ({ formatObj, currIndex }) => {
    return (
        <span className={'text-primary'}>
            {formatObj.text}
            {formatObj.children &&
                formatObj.children.map((c, index) => <FormattedText formatObj={c} key={currIndex + '-' + index} currIndex={currIndex + '-' + index} />)}
        </span>
    )
}
export default FormattedColor
