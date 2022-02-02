import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginModal = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [purpose, setPurpose] = useState("LOGIN");
  const [modalText, setModalText] = useState({
    title: "",
    buttonText: "",
    changePurpose: "",
  });

  const handleLogin = (onhide) => {
    console.log(username, password);
    setUsername("");
    setPassword("");

    const data = {
      success: true,
      error: null,
      credentials: 1,
    };
    // const data = {
    //   success: false,
    //   error: "Username or password is incorrect",
    //   credentials: null,
    // }

    if (data.success) {
      localStorage.setItem("credentials", data.credentials);
      onhide();
    } else {
      alert(data.error);
    }
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
          title: "Login Modal",
          buttonText: "Login",
          changePurpose: "Don't have an account?",       
        })
        break;
      case "REGISTER":
        setModalText({
          title: "Register Modal",
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
