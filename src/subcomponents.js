import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato');
  html {
    background-color: rgb(0, 104, 154);
    font-family: 'SyfSans', sans-serif;
    color: white
  }
`;


export const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  text-align: center;
  font-size:30px;
`;

export const TitleWrapper = styled.div`
  align-items: center;
  display: flex;
  // background-color: rgb(1, 104, 153);
  justify-content: center;
  // padding:10px;
  margin-right:10px
`

export const MyButton = styled.button`
  width:10px;
  font-weight: bold;
  background-color: #ffc107
`

export const Container = styled.div`
  border-radius: 12px;
  background-color: white;
  color: black;
  justify-content: center;
  padding: 20px;
  margin: 0 20px 20px 20px;
  max-width: 500px;
  button {
    border-style: solid;
    border-color: white;
    border-radius: 6px;
    border-width: 2px;
    font-size: 14px;
    padding: 0 16px;
    text-align: center;
    width: 100px;
    height: 40px;
    margin-left: 40%;
    background-color:  rgb(1, 104, 153);
    color: white;
    cursor: pointer;
  }
  table {
    border: none;
  }
  th {
    border: 1px solid #EEE;
  }
  h2 {
    margin-top: 0;
  }
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 4px;
  }
  select,
  textarea {
    font-size: 16px;
    margin-bottom: 12px;
    width: 90%;
  }
  textarea {
    border: 1px solid darkgrey;
    border-radius: 12px;
    padding: 6px;
    resize: none;
  }
`;
