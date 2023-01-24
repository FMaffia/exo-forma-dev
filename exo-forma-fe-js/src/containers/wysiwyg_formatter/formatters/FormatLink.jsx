import React from "react";
import FormattedText from "../FormatText";

const FormattedLink = ({ formatObj, currIndex }) => {
  const link = formatObj.secondary.startsWith("http")
    ? formatObj.secondary
    : "https://" + formatObj.secondary;
  return (
    <a href={link} target={"_blank"}>
      {formatObj.text}
      {formatObj.children &&
        formatObj.children.map((c, index) => (
          <FormattedText
            formatObj={c}
            key={currIndex + "-" + index}
            currIndex={currIndex + "-" + index}
          />
        ))}
    </a>
  );
};
export default FormattedLink;
