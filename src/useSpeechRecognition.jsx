import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import { Container, MyButton } from './subcomponents';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_HOST } from './const'

const SpeechRecognition = () => {
  const lang = 'en-IN'
  const [value, setValue] = useState('');
  const [utteranceData, setutteranceData] = useState([]);
  const [paymentData, setpaymentData] = useState([]);
  const [paymentHistory, setpaymentHistory] = useState([]);
  const [blocked, setBlocked] = useState(false);

  const onEnd = () => {
    axios.post(`${API_HOST}/payment`, {
      "utterance": `${value}`
    })
      .then((response) => {
        console.log(response);
        toast.success(`Success! Payment Id : ${response.data.paymentId}`);
        setTimeout(() => {
          window.location.reload()
        }, 5000);
      }, (error) => {
        console.log(error);
      });
  };

  const onResult = (result) => {
    setValue(result);
  };

  useEffect(() => {
    axios
      .get(`${API_HOST}/utterances`)
      .then(res => {
        setutteranceData(res.data.utteranceList)
      })

    axios
      .get(`${API_HOST}/funding-methods`)
      .then(res => {
        setpaymentData(res.data.paymentMethods)
      })

    axios
      .get(`${API_HOST}/payment-history`)
      .then(res => {
        setpaymentHistory(res.data.walletPayments)
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

  const onclick = (utterance) => {
    console.log(utterance)
    axios.post(`${API_HOST}/payment`, {
      utterance
    })
      .then((response) => {
        toast.success(`Success! Payment Id : ${response.data.paymentId}`);
        setTimeout(() => {
          window.location.reload()
        }, 5000);
      }, (error) => {
        console.log(error);
      });
  };

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
            <label htmlFor="transcript">Transcript: </label>
            <textarea
              id="transcript"
              name="transcript"
              placeholder="Click start and say something..."
              value={value}
              rows={4}
              disabled
            />
            <MyButton disabled={blocked} type="button" onClick={toggle} >
              {listening ? '🛑 Stop' : '▶ Start'}
            </MyButton>
            {blocked && (
              <p style={{ color: 'red', fontWeight: "bold" }}>
                The microphone is blocked for this site in your browser.
              </p>
            )}
            {(utteranceData.length > 0) && (<div> <p style={{ fontWeight: "bold", color: "black" }}>
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
                {utteranceData.map((one) => (
                  <button
                    type="button"
                    key={one.id}
                    style={{
                      width: "45%",
                      height: "60px",
                      textAlign: "center",
                      fontSize: "14px",
                      marginBottom: "20px",
                      marginLeft: "0px",
                      padding: "2px",
                      // backgroundColor: "#28a745"
                    }}
                    onClick={() => onclick(one.body)}
                  >
                    {one.body}
                  </button>
                ))}
              </div> </div>)}

            {(paymentData.length > 0) && <div> <p style={{ fontWeight: "bold", color: "black" }}>Your payment Methods: </p><table cellspacing="0" cellpadding="0" style={{ width: "100%", fontSize: "14px" }}><tr><th>Account Number</th><th>Bank Routing Number</th><th>Nickname</th><th>Bank Name</th></tr>{paymentData.map((one) => (
              <tr style={{ color: "black", fontSize: "12px" }}>
                <th>{one.bankAccountNumber}</th>
                <th>{one.bankRoutingNumber}</th>
                <th>{one.nickname}</th>
                <th>{one.name}</th>
              </tr>
            ))}</table>
            </div>}

            {(paymentHistory.length > 0) && <div> <p style={{ fontWeight: "bold", color: "black" }}>Your payment History: </p><table cellspacing="0" cellpadding="0" style={{ width: "100%", fontSize: "14px" }}><tr><th>Date</th><th>Payment ID</th><th>ID</th><th>Last 4 digits</th><th>Sub type</th></tr>{paymentHistory.map((one) => (
              <tr style={{ color: "black", fontSize: "10px" }}>
                <th>{one.scheduledDate}</th>
                <th>{one.paymentId}</th>
                <th>{one.fundingInstruments[0]["id"]}</th>
                <th>{one.fundingInstruments[0]["last4"]}</th>
                <th>{one.fundingInstruments[0]["subType"]}</th>
              </tr>
            ))}</table>
            </div>}
            <ToastContainer position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover />
          </React.Fragment>
        )}
      </form>
    </Container >
  );
};

export default SpeechRecognition;