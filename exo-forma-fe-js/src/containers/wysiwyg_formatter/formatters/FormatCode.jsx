import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/src/styles/prism";

const FormattedNormal = ({ formatObj, currIndex }) => {
  const splitted = formatObj.secondary.split("|");
  const language = splitted[0];
  const startingLine = splitted[1] || 1;
  return (
    <SyntaxHighlighter
      language={language}
      style={a11yDark}
      showLineNumbers={true}
      startingLineNumber={Number(startingLine)}
    >
      {formatObj.text}
    </SyntaxHighlighter>
  );
};
export default FormattedNormal;
