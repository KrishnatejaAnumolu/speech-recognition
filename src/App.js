import React from 'react'
import SpeechRecognition from './useSpeechRecognition';
import { GlobalStyles, Row, Title, TitleWrapper } from './subcomponents';

const App = () => {

  return (
    <div>
      <GlobalStyles />
      <TitleWrapper><img src="Logo.png" alt="Logo" height='60'></img>
        <Title>Speech to Text</Title>
      </TitleWrapper>
      <Row>
        <SpeechRecognition />
      </Row>
    </div>
  )
}
export default App