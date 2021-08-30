import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import { Validation } from "../../hooks/authServices";

import "./styles.css";
const initialValues = {
  email: "",
  password: "",
};
const Login = ({ setUser }) => {
  const [credentials, setCredentials] = useState(initialValues);
  const { token, error } = Validation(credentials);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      setCredentials(values);
    },
  });

  useEffect(() => {
    if (token && !error) {
      setUser(token);
    }
  }, [token]);

  return (
    <div id="body">
      <form onSubmit={formik.handleSubmit}>
        <div id="loginform">
          <h2 id="headerTitle">Login</h2>
          {error && (
            <div
              className="d-flex justify-content-center"
              style={{ color: "red" }}
            >
              Credenciales Incorrectas
            </div>
          )}
          <div className="row">
            <label className="row-label" htmlFor="email">
              Correo
            </label>
            <input
              className="row-input form-control "
              id="email"
              name="email"
              type="text"
              required
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="row">
            <label className="row-label" htmlFor="password">
              Contraseña
            </label>
            <input
              className="row-input form-control "
              id="password"
              name="password"
              type="password"
              required
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div id="button" className="row">
            <Button className="rowbutton" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
