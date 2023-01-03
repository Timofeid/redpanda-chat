import { useState, useRef, useEffect } from "react";
import EventSource from "react-native-sse";
import "./App.css";

// TODO: Set the event source object by using the event source URL as the parameter.
const sse = null;

const App = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const textArea = useRef();
  
  useEffect(() => {
    const area = textArea.current;
    area.scrollTop = area.scrollHeight;
  });

  sse.removeAllEventListeners();

  sse.addEventListener("open", (event) => {
    console.log("Open SSE connection.");
  });

//TODO: Add an event listener for "message" type

  sse.addEventListener("error", (event) => {
    if (event.type === "error") {
      console.error("Connection error:", event.message);
    } else if (event.type === "exception") {
      console.error("Error:", event.message, event.error);
    }
  });

  sse.addEventListener("close", (event) => {
    console.log("Close SSE connection.");
  });

  const enableCommentButton = () => {
    return text ? false : true;
  };
  const changeCommentButtonStyle = () => {
    return text ? "comments-button-enabled" : "comments-button-disabled";
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submit()
    }
  }

  const submit = async (event) => {
    try {
      //TODO: Implement the HTTP POST that is used to POST the message to the backend
      let res = null
      if (res.status === 200) {
        setText("");
      } else {
        console.log("Response code:" + res.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="main-div">
      <h2>RPChat</h2>
      <br/>
      <textarea className="text-area" ref={textArea} readOnly={true} rows="20" cols="70" value=
      {data.map((message) => (
        message.username + ": " + message.text
      )).join("\r\n")}/>

        <div className="info-box">
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            placeholder="Enter a nickname"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="comments-box">
          <input
            value={text}
            id="text"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Send a message..."
          />
          <button
            onClick={submit}
            className="comments-button"
            id={changeCommentButtonStyle()}
            disabled={enableCommentButton()}
          >
            Post
          </button>
        </div>
    </div>
  );
};

export default App;
