import FormattedText from "../FormatText";
import React from "react";

const FormattedNormal = ({ formatObj, currIndex }) => {
  return (
    <>
      {formatObj.text}
      {formatObj.children &&
        formatObj.children.map((c, index) => (
          <FormattedText
            formatObj={c}
            key={currIndex + "-" + index}
            currIndex={currIndex + "-" + index}
          />
        ))}
    </>
  );
};
export default FormattedNormal;
