import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

const LoginModal = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [purpose, setPurpose] = useState("LOGIN");
  const [modalText, setModalText] = useState({
    title: "",
    buttonText: "",
    changePurpose: "",
  });

  const handleLogin = async (onhide) => {
    console.log(username, password);
    try {
      const res = await axios.post(`http://localhost:5000/${purpose === "LOGIN" ? 'login' : 'register'}`, {
        method: 'HEAD',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'same-origin',
        crossdomain: true,
        data: {
          username,
          password,
        }
      })
      console.log(res);
      const { data } = res;
      localStorage.setItem("credentials", data[0].id);
      onhide();
    } catch (err) {
      console.log(err);
      alert(err);
    }
    setUsername("");
    setPassword("");
  };

  const handleChangePurpose = () => {
    switch (purpose) {
      case "LOGIN":
        setPurpose("REGISTER");
        break;
      case "REGISTER":
        setPurpose("LOGIN");
        break;
    }
  };

  useEffect(() => {
    switch (purpose) {
      case "LOGIN":
        setModalText({
          title: "Login",
          buttonText: "Login",
          changePurpose: "Don't have an account?",       
        })
        break;
      case "REGISTER":
        setModalText({
          title: "Register",
          buttonText: "Register",
          changePurpose: "Already have an account?",      
        })
        break;
    }
  }, [purpose]);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalText.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group my-2">
            <label className="d-block h5" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group my-1">
            <label className="d-block h5" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="change-purpose mt-3 text-primary text-decoration-underline">
            <a
              className="cursor-pointer"
              role="button"
              onClick={() => handleChangePurpose()}
            >
              {modalText.changePurpose}
            </a>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleLogin(props.onHide)}>
          {modalText.buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
