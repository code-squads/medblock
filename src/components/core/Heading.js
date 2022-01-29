import React from "react";
import styled from "styled-components";

const StyledHeading = styled.span`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "29px")};
  color: #404040;
  display: block;
`;

const Heading = (props) => {
  const { children, ...otherProps } = props;
  return <StyledHeading {...otherProps}>{children}</StyledHeading>;
};

export default Heading;
