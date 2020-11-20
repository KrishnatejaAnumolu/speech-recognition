import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import { Container, MyButton } from './subcomponents';
import axios from 'axios'
// import { useHistory } from 'react-router-dom';

const SpeechRecognition = () => {
  const lang = 'en-IN'
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  const [blocked, setBlocked] = useState(false);

  const onEnd = () => {
    // axios.post('example', {
    //   "value": { value }
    // })
    //   .then((response) => {
    //     console.log(response);
    //   }, (error) => {
    //     console.log(error);
    //   });
  };

  const onResult = (result) => {
    setValue(result);
  };

  useEffect(() => {
    axios
      .get('https://hackathome-api.app.dev.dal.pcf.syfbank.com/utterances')
      .then(res => {
        setData(res.data.utteranceList)
      })
  }, [])

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
              rows={4}
              disabled
            />
            <MyButton disabled={blocked} type="button" onClick={toggle} >
              {listening ? 'Stop' : 'Start'}
            </MyButton>
            {blocked && (
              <p style={{ color: 'red' }}>
                The microphone is blocked for this site in your browser.
              </p>
            )}
            <p style={{ fontWeight: "bold" }}>
              {" "}
              Or you can Pick one from below:{" "}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              {data.map((one) => (
                <button
                  key={one.id}
                  style={{
                    width: "45%",
                    height: "60px",
                    textAlign: "center",
                    fontSize: "12px",
                    marginBottom: "20px",
                    marginLeft: "0px",
                  }}
                >
                  {one.body}
                </button>
              ))}
            </div>
          </React.Fragment>
        )}
      </form>
    </Container>
  );
};

export default SpeechRecognition;