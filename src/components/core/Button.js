import React from "react";
import styled from "styled-components";

const CoreButton = styled.button`
  /* Default Properties
    bgcolor : #387ED1;
    color   : white
    fontsize: 18px
    padding : 11px, 38px */

  /* Props
    background
    color 
    fontSize 
    paddingTopBottom
    paddingLeftRight */

  background-color: ${(props) =>
    props.background ? props.background : "#387ED1"};
  color: ${(props) => (props.color ? props.color : "white")};
  font-family: "Inter";
  font-weight: 400;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "18px")};
  padding: ${(props) =>
      props.paddingTopBottom ? props.paddingTopBottom : "11px"}
    ${(props) => (props.paddingLeftRight ? props.paddingLeftRight : "38px")};
  border: none;
  outline: none;
  border-radius: 5px;

  &:hover {
    filter: ${(props) => (props.disabled ? "none" : "brightness(97%)")};
  }
`;

const Button = (props) => {
  const { children, ...otherProps } = props;

  return <CoreButton {...otherProps}>{children}</CoreButton>;
};

export default Button;
