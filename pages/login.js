



import axios from 'axios';
import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Toast, Container } from "react-bootstrap";
import Cookies from 'universal-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function checkLogin() {
    const cookies = new Cookies();
    const key = cookies.get('key')
    if (key) {
        return window.location.replace("/")
    }
  }

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post("https://api.ricky.cat/api/users/login", {
        username: username,
        password: password
    }).then(res => {
        const data = res.data
        if (data.error) {
            return toast.error(data.message, { position: "top-right", autoClose: 2500 })
        }
        const cookies = new Cookies();
        cookies.set('key', res.data.id, { path: '/' });
        toast.success("Successfully logged in! Redirecting...", { position: "top-right", autoClose: 2500 })
        setTimeout(window.location.replace("/"), 2500)
    })
  }

  checkLogin()

  return (
      <Container>
        <div className="Login">
        <ToastContainer />
        <form onSubmit={handleSubmit}>
            <FormGroup controlId="email">
            <FormLabel>Username</FormLabel>
            <FormControl
                autoFocus
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            </FormGroup>
            <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
            />
            </FormGroup>
            <Button block bsSize="large" disabled={!validateForm()} type="submit" style={{ marginBottom: "25px" }}>
            Login
            </Button>
        </form>
        <h6>Don't have an account? <a href="/register">Register now!</a></h6>
        </div>
      </Container>
  );
}