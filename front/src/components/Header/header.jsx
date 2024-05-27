import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./header.sass";
import Logo from "./logo_ave.png";
import axios from "axios";
import CryptoJS from "crypto-js";

export default function Header() {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [userSession, setUserSession] = useState(false);
  const [user, setUser] = React.useState([]);
  const [register, setRegister] = React.useState([]);
  const handleCloseLogin = () => setLogin(false);
  const handleShowLogin = () => setLogin(true);
  const handleCloseSignup = () => setSignup(false);
  const handleShowSignup = () => setSignup(true);
  let [username, setUsername] = useState("");

  useEffect(() => {
    checkSession();
  });

  async function makeSession(res) {
    const hash = CryptoJS.AES.encrypt(
      JSON.stringify(res.data.user),
      new Date().valueOf().toString()
    ).toString();
    sessionStorage.setItem("user", hash);
    await axios.post("http://localhost:8800/setSession", {
      name: user.login ? user.login : register.login,
      sessionID: hash,
    });
    window.location.reload();
  }

  const handleLoginChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  async function checkSession() {
    const session = sessionStorage.getItem("user");
    if (session) {
      await axios
        .post("http://localhost:8800/getSession", { sessionID: session })
        .then((res) => {
          if (res.data.user !== 0) {
            setUserSession(true);
            setUsername(res.data.user);
          } else {
            sessionStorage.removeItem("user");
            return;
          }
        })
        .catch((err) => console.log(err));
      return;
    }
  }

  async function handleLoginSubmit() {
    try {
      const hash = CryptoJS.SHA256(user.password).toString();
      const res = await axios.post("http://localhost:8800/login", {
        password: hash,
        login: user.login,
      });
      if (res.data.user === 0) {
        document.getElementById("loginloginWrong").hidden = false;
      } else {
        document.getElementById("loginloginWrong").hidden = true;
        if (res.data.password === 0) {
          document.getElementById("loginPasswordWrong").hidden = false;
        } else {
          document.getElementById("loginPasswordWrong").hidden = true;
          makeSession(res);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRegisterSubmit() {
    if (register.login) {
      document.getElementById("registerloginWrong").hidden = true;
      if (register.password) {
        document.getElementById("registerpassWrong").hidden = true;
        if (register.password2) {
          document.getElementById("registerpass2Wrong").hidden = true;
          if (register.password === register.password2) {
            document.getElementById("registerpass2WrongEqual").hidden = true;
          } else {
            document.getElementById("registerpass2WrongEqual").hidden = false;
            return;
          }
        } else {
          document.getElementById("registerpass2Wrong").hidden = false;
          return;
        }
      } else {
        document.getElementById("registerpassWrong").hidden = false;
        return;
      }
    } else {
      document.getElementById("registerloginWrong").hidden = false;
      return;
    }
    try {
      const hash = CryptoJS.SHA256(register.password).toString();
      axios.post("http://localhost:8800/register", {
        password: hash,
        login: register.login,
      });
      const res = await axios.post("http://localhost:8800/login", {
        password: hash,
        login: register.login,
      });
      makeSession(res);
    } catch (err) {
      console.log(err);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("user");
    window.location.reload();
  }

  function changeLogin() {
    setLogin(!login);
    setSignup(!signup);
  }

  function UserButtons({ username }) {
    return userSession ? (
      <div className="links">
        <p className="links_welcome">{"Sveiki, " + username + "!"}</p>
        <Button onClick={handleLogout} variant="secondary">
          Iziet
        </Button>
      </div>
    ) : (
      <div className="links">
        <Button
          className="header-connect"
          variant="danger"
          onClick={handleShowLogin}
        >
          Ieiet
        </Button>
        <Button
          className="header-connect"
          variant="danger"
          onClick={handleShowSignup}
        >
          Reģistrēties
        </Button>
      </div>
    );
  }

  return (
    <header>
      <Modal show={login} onHide={handleCloseLogin}>
        <Modal.Body>
          <Modal.Title>Autorizācija</Modal.Title>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                name="login"
                onChange={handleLoginChange}
                type="text"
                placeholder="Ievadiet lietotājvārdu"
                autoFocus
              />
              <div id="loginloginWrong" className="wrongField" hidden>
                Tāds lietotājs neeksistē!
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
              <Form.Control
                name="password"
                onChange={handleLoginChange}
                type="password"
                placeholder="Ievadiet paroli"
              />
              <div id="loginPasswordWrong" className="wrongField" hidden>
                Nepareiza parole!
              </div>
            </Form.Group>
          </Form>
          <Button
            variant="dark"
            className="modal-btn"
            onClick={handleLoginSubmit}
          >
            Autorizēties
          </Button>
          <Button
            variant="dark"
            className="modal-btn modal-btn-link"
            onClick={changeLogin}
          >
            Vēl nav reģistrēti?
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={signup} onHide={handleCloseSignup}>
        <Modal.Body>
          <Modal.Title>Reģistrācija</Modal.Title>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1111"
            >
              <Form.Control
                onChange={handleRegisterChange}
                name="login"
                type="text"
                placeholder="Ievadiet lietotājvārdu"
                autoFocus
              />
              <div id="registerloginWrong" className="wrongField" hidden>
                Nepareizs lietotājvārds
              </div>
              <div id="registerloginWrongExists" className="wrongField" hidden>
                Tāds lietotājs jau eksistē!
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput111"
            >
              <Form.Control
                onChange={handleRegisterChange}
                name="password"
                type="password"
                placeholder="Ievadiet paroli"
              />
              <div id="registerpassWrong" className="wrongField" hidden>
                Ievadiet paroli!
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
              <Form.Control
                onChange={handleRegisterChange}
                name="password2"
                type="password"
                placeholder="Atkārtortejiet"
              />
              <div id="registerpass2Wrong" className="wrongField" hidden>
                Atkārtojiet paroli!
              </div>
              <div id="registerpass2WrongEqual" className="wrongField" hidden>
                Paroles nesakrīt!
              </div>
            </Form.Group>
          </Form>
          <Button
            variant="dark"
            className="modal-btn"
            onClick={handleRegisterSubmit}
          >
            Reģistrēties
          </Button>
          <Button
            variant="dark"
            className="modal-btn modal-btn-link"
            onClick={changeLogin}
          >
            Jau reģistrēti?
          </Button>
        </Modal.Body>
      </Modal>

      <div className="header-wrap">
        <a href="/">
          <img src={Logo} className="main_logo" alt="main_logo" />
        </a>
        <a href="/">
          <h1>AVE</h1>
        </a>
      </div>
      <div className="header-links">
        <a href="/">Galvenā</a>
        <a href="/about">Par mums</a>

        <UserButtons username={username} />
      </div>
    </header>
  );
}
