import React from 'react'
import SpeechRecognition from './useSpeechRecognition';
import { GlobalStyles, Row, Title, TitleWrapper } from './subcomponents';

const App = () => {

  return (
    <div>
      <GlobalStyles />
      <TitleWrapper><img src="Logo.svg" alt="Logo" height='40' style={{ marginRight: "40px" }}></img>
        <Title>Intelligent UI</Title>
      </TitleWrapper>
      <Row>
        <SpeechRecognition />
      </Row>
    </div>
  )
}
export default App