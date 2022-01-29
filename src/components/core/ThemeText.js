import React from "react";
import styled from "styled-components";

const StyledText = styled.span`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "18px")};
  color: #404040;
  display: block;
`;

const ThemeText = (props) => {
  const { children, ...otherProps } = props;
  return <StyledText {...otherProps}>{children}</StyledText>;
};

export default ThemeText;
