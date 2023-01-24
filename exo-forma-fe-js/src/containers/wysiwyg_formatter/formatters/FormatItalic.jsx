import React from "react";
import FormattedText from "../FormatText";

const FormattedItalic = ({ formatObj, currIndex }) => {
  return (
    <em>
      {formatObj.text}
      {formatObj.children &&
        formatObj.children.map((c, index) => (
          <FormattedText
            formatObj={c}
            key={currIndex + "-" + index}
            currIndex={currIndex + "-" + index}
          />
        ))}
    </em>
  );
};
export default FormattedItalic;
