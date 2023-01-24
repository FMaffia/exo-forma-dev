import FormattedText from "../FormatText";
import React from "react";

const FormattedH3 = ({ formatObj, currIndex }) => {
  return (
    <h3>
      {formatObj.text}
      {formatObj.children &&
        formatObj.children.map((c, index) => (
          <FormattedText
            formatObj={c}
            key={currIndex + "-" + index}
            currIndex={currIndex + "-" + index}
          />
        ))}
    </h3>
  );
};
export default FormattedH3;
