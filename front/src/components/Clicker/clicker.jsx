import React, { useState, useEffect } from "react";
import axios from "axios";
import "./clicker.sass";
import IMG from "../../krusts.png";

export default function Clicker() {
  const [progress, setProgress] = useState(0);
  let [username, setUsername] = useState("");

  useEffect(() => {
    checkSession();
  });

  async function checkSession() {
    const session = sessionStorage.getItem("user");
    if (session) {
      await axios
        .post("http://localhost:8800/getSession", {
          sessionID: session,
        })
        .then((res) => {
          if (res.data.user !== 0) {
            setUsername(res.data.user);
            setProgress(res.data.progress);
          } else {
            sessionStorage.removeItem("user");
            return;
          }
        })
        .catch((err) => console.log(err));
      return;
    }
  }

  function changeProgress() {
    setProgress(progress + 1);
    axios
      .post("http://localhost:8800/changeProgress", {
        progress: progress + 1,
        name: username,
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="box clicker">
      {username ? (
        <>
          <div className="balance">
            <img src={IMG} alt="balance" />
            <span>{progress}</span>
          </div>
          <button onClick={() => changeProgress()} className="clicker_wrap b">
            <div className="clicker_wrap r">
              <div className="clicker_wrap b">
                <div className="clicker_wrap r">
                  <img src={IMG} alt="clicker" />
                </div>
              </div>
            </div>
          </button>
        </>
      ) : (
        <h2>You need to log in</h2>
      )}
    </div>
  );
}
