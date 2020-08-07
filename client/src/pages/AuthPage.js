import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContex";

export default function AuthPage() {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request(
        "http://localhost:5005/api/auth/register",
        "POST",
        { ...form },
      );
      message(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request(
        "http://localhost:5005/api/auth/login",
        "POST",
        { ...form },
      );
      auth.login(data.token, data.userId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Cut in the link</h1>
        <div className='card #ffab91 deep-orange lighten-3'>
          <div className='card-content black-text'>
            <span className='card-title'>Authorization</span>
            <form>
              <div className='input-field'>
                <input
                  placeholder='Email'
                  id='email'
                  type='text'
                  name='email'
                  className='yellow-input'
                  onChange={changeHandler}
                  value={form.email}
                />
                <label htmlFor='email'>Email</label>
              </div>

              <div className='input-field'>
                <input
                  placeholder='Password'
                  id='password'
                  type='password'
                  name='password'
                  className='yellow-input'
                  onChange={changeHandler}
                  value={form.password}
                />
                <label>Password</label>
              </div>
            </form>
          </div>

          <div className='card-action'>
            <button
              className='btn yeallow darken-4 btn-form'
              disabled={loading}
              onClick={loginHandler}
            >
              Login
            </button>
            <button
              className='btn #b39ddb deep-purple lighten-3'
              onClick={registerHandler}
              disabled={loading}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
