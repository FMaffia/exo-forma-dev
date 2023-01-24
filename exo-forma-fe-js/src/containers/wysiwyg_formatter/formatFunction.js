export const parseText = (str) => {
  console.log("START");
  let result = {
    type: "normal",
    text: "",
    children: [],
  };

  parseTextRecursive(result, str);
  return result;
};

const parseTextRecursive = (result, str) => {
  let currentText = str;
  let match;
  while (
    (match = currentText.match(
      /\[(h1|h2|h3|h4|h5|h6|b|i|color|link|code)=?(.*?)\]([\s\S]*?)\[\/\1\]/
    ))
  ) {
    let [fullMatch, type, secondary, innerText] = match;

    let beforeMatch = currentText.slice(0, match.index);
    let afterMatch = currentText.slice(match.index + fullMatch.length);
    if (beforeMatch.length > 0) {
      result.children.push({
        type: "normal",
        text: beforeMatch,
      });
    }
    let formattedResult = {
      type: type,
      text: innerText,
      secondary: secondary,
      children: [],
    };
    if (formattedResult.type !== "code") {
      parseTextRecursive(formattedResult, innerText);
      if (
        formattedResult.children.length === 1 &&
        formattedResult.children[0].type === formattedResult.type
      ) {
        formattedResult.text = formattedResult.children[0].text;
        formattedResult.children = undefined;
      } else {
        formattedResult.text = "";
      }
    }
    //ricorsione

    result.children.push(formattedResult);

    currentText = afterMatch;
  }
  if (currentText.length > 0) {
    result.children.push({
      type: "normal",
      text: currentText,
    });
  }
};
