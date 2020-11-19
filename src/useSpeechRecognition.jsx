import React, { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import { Container,MyButton,ButtonContainer } from './subcomponents';


const SpeechRecognition = () => {
  const lang = 'en-IN'
  const [value, setValue] = useState('');
  // const [lastValue, setlastValue] = useState('');

  const [blocked, setBlocked] = useState(false);

  const onEnd = () => {
    // console.log('Last value - ', lastValue)
  };

  const onResult = (result) => {
    setValue(value + result+ '\n');
    // setlastValue(result)
  };

  const onError = (event) => {
    if (event.error === 'not-allowed') {
      setBlocked(true);
    }
  };

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult,
    onEnd,
    onError,
  });

  const toggle = listening
    ? stop
    : () => {
        setBlocked(false);
        listen({ lang });
      };

  return (
    <Container>
      <form id="speech-recognition-form">
        {!supported && (
          <p>
            Oh no, it looks like your browser doesn&#39;t support Speech
            Recognition.
          </p>
        )}
        {supported && (
          <React.Fragment>
            <label htmlFor="language">Default language: English</label>
            <label htmlFor="transcript">Transcript: </label>
            <textarea
              id="transcript"
              name="transcript"
              placeholder="Click Listen and start talking..."
              value={value}
              rows={10}
              disabled
            />
            <MyButton disabled={blocked} type="button" onClick={toggle}>
              {listening ? 'Stop' : 'Listen'}
            </MyButton>
            {blocked && (
              <p style={{ color: 'red' }}>
                The microphone is blocked for this site in your browser.
              </p>
            )}
            <label> Or you can Pick one from below: </label>
            <MyButton type="button">Make a payment for last statement balance with savings account</MyButton>
            <MyButton type="button">Make a payment for current statement balance with checking account</MyButton>
            <MyButton>Make a payment for min amount due  with salary account</MyButton>
            <MyButton>Make a payment for 10$ with chase account</MyButton>
          </React.Fragment>
        )}
      </form>
    </Container>
  );
};

export default SpeechRecognition;