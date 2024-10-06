import React from "react";
import parse from "html-react-parser";
interface HtmlContentRendererProps {
  htmlString: string; // Declare the prop type as a string
}
const HtmlContentRenderer: React.FC<HtmlContentRendererProps> = ({
  htmlString,
}) => {
  // Unescape characters
  const unescapedString = htmlString
    .replace(/^\s*['"]|['"]\s*$/g, "")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/<html.*?>|<\/html>/g, "");
  // Parse the HTML string into React elements
  return <div className="html-content">{parse(unescapedString)}</div>;
};

export default HtmlContentRenderer;
