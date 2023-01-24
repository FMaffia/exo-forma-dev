import FormattedText from "../FormatText";
import React from "react";

const FormattedH5 = ({ formatObj, currIndex }) => {
  return (
    <h5>
      {formatObj.text}
      {formatObj.children &&
        formatObj.children.map((c, index) => (
          <FormattedText
            formatObj={c}
            key={currIndex + "-" + index}
            currIndex={currIndex + "-" + index}
          />
        ))}
    </h5>
  );
};
export default FormattedH5;
