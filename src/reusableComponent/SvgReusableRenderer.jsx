import React from "react";
import parse from "html-react-parser";

const SvgStringRenderer = (props) => {
  const { svgString, height, width } = props;
  return <div style={{ height: height, width: width }}>{parse(svgString)}</div>;
};

export default SvgStringRenderer;
