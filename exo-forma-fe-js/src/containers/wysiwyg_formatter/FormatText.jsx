import React from "react";
import FormattedH6 from "./formatters/FormatH6";
import FormattedH1 from "./formatters/FormatH1";
import FormattedH2 from "./formatters/FormatH2";
import FormattedH3 from "./formatters/FormatH3";
import FormattedH4 from "./formatters/FormatH4";
import FormattedH5 from "./formatters/FormatH5";
import FormattedNormal from "./formatters/FormatNormal";
import FormattedLink from "./formatters/FormatLink";
import FormattedItalic from "./formatters/FormatItalic";
import FormattedBold from "./formatters/FormatBold";
import FormatColor from "./formatters/FormatColor";
import FormatCode from "./formatters/FormatCode";

const FormattedText = ({ formatObj, currIndex }) => {
  return (
    <>
      {formatObj.type === "h1" && (
        <FormattedH1 formatObj={formatObj} currIndex={currIndex} />
      )}
      {formatObj.type === "h2" && (
        <FormattedH2 formatObj={formatObj} currIndex={currIndex} />
      )}
      {formatObj.type === "h3" && (
        <FormattedH3 formatObj={formatObj} currIndex={currIndex} />
      )}
      {formatObj.type === "h4" && (
        <FormattedH4 formatObj={formatObj} currIndex={currIndex} />
      )}
      {formatObj.type === "h5" && (
        <FormattedH5 formatObj={formatObj} currIndex={currIndex} />
      )}
      {formatObj.type === "h6" && (
        <FormattedH6 formatObj={formatObj} currIndex={currIndex} />
      )}
      {formatObj.type === "b" && (
        <FormattedBold formatObj={formatObj} currIndex={currIndex} />
      )}
      {formatObj.type === "i" && (
        <FormattedItalic formatObj={formatObj} currIndex={currIndex} />
      )}
      {formatObj.type === "link" && (
        <FormattedLink formatObj={formatObj} currIndex={currIndex} />
      )}
      {formatObj.type === "color" && (
        <FormatColor formatObj={formatObj} currIndex={currIndex} />
      )}
      {formatObj.type === "normal" && (
        <FormattedNormal formatObj={formatObj} currIndex={currIndex} />
      )}

      {formatObj.type === "code" && (
        <FormatCode formatObj={formatObj} currIndex={currIndex} />
      )}
    </>
  );
};

export default FormattedText;
