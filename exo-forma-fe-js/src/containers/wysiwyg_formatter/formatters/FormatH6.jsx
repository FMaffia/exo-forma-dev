import FormattedText from "../FormatText";
import React from "react";

const FormattedH6 = ({ formatObj, currIndex }) => {
  return (
    <h6>
      {formatObj.text}
      {formatObj.children &&
        formatObj.children.map((c, index) => (
          <FormattedText
            formatObj={c}
            key={currIndex + "-" + index}
            currIndex={currIndex + "-" + index}
          />
        ))}
    </h6>
  );
};
export default FormattedH6;
