import React from 'react';
import styled from 'styled-components';

const defaultTheme = {
  name: "DEFAULT",
  backgroundColor: 'azure',
  textColor: "dimgrey",
  borderRadius: "30px",
};

const darkTheme = {
  name: "DARK",
  backgroundColor: "black",
  textColor: "seashell",
  borderRadius: "100px",
};

export const getAllThemes = () => {
  return [defaultTheme, darkTheme];
};

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