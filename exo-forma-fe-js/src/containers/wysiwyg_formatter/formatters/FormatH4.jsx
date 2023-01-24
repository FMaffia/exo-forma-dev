import FormattedText from "../FormatText";
import React from "react";

const FormattedH4 = ({ formatObj, currIndex }) => {
  return (
    <h4>
      {formatObj.text}
      {formatObj.children &&
        formatObj.children.map((c, index) => (
          <FormattedText
            formatObj={c}
            key={currIndex + "-" + index}
            currIndex={currIndex + "-" + index}
          />
        ))}
    </h4>
  );
};
export default FormattedH4;
