import React from "react";
import FormattedText from "../FormatText";

const FormattedBold = ({ formatObj, currIndex }) => {
  return (
    <strong>
      {formatObj.text}
      {formatObj.children &&
        formatObj.children.map((c, index) => (
          <FormattedText
            formatObj={c}
            key={currIndex + "-" + index}
            currIndex={currIndex + "-" + index}
          />
        ))}
    </strong>
  );
};
export default FormattedBold;
