import FormattedText from "../FormatText";
import React from "react";

const Formatted = ({ formatObj, currIndex }) => {
  return (
    <h1>
      {formatObj.text}
      {formatObj.children &&
        formatObj.children.map((c, index) => (
          <FormattedText
            formatObj={c}
            key={currIndex + "-" + index}
            currIndex={currIndex + "-" + index}
          />
        ))}
    </h1>
  );
};

export default Formatted;
