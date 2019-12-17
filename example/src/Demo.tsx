import * as React from "react";
import styled from "styled-components";

const Content = styled.div`
  width: 200px;
  line-height: 200px;
  text-align: center;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  border: 1px solid dimgrey;
  border-radius: ${(props) => props.theme.borderRadius};
`;

export const Demo = () => (
  <Content>Demo</Content>
);
