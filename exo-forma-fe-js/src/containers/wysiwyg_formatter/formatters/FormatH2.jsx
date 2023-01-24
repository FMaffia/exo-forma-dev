import FormattedText from "../FormatText";
import React from "react";

const FormattedH2 = ({ formatObj, currIndex }) => {
  return (
    <h2>
      {formatObj.text}
      {formatObj.children &&
        formatObj.children.map((c, index) => (
          <FormattedText
            formatObj={c}
            key={currIndex + "-" + index}
            currIndex={currIndex + "-" + index}
          />
        ))}
    </h2>
  );
};

export default FormattedH2;
