import { Formik, Field, Form } from "formik";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
const Login = () => {
    const validation = {
        email: /^[a-zA-Z0-9\.-_]{3,30}@+[a-zA-Z0-9\.-_]{3,15}\.+[a-zA-Z]+$/,
        password: /^[a-zA-Z0-9\.-_]{4,12}$/
    }
    const [login, setLogin] = useState(localStorage.getItem("login"))
    const [msjError, setMsjError] = useState(false);
    return (
        <div>
            {login ? (localStorage.setItem("login", login), <Redirect to="/" />)
                :
                <Formik initialValues={{ email: "", password: "" }}
                    onSubmit={values => {
                        { (validation.email.test(values.email) && values.email === "challenge@alkemy.org") && (validation.password.test(values.password) && values.password === "react") ? setLogin(4178223422261863) : setMsjError(true) }
                    }}
                >
                    <Form className="container--form">
                        <h1 className="login--title">Login</h1>
                        <div className="form-group">
                            <label id="email-label">Email: </label>
                            <Field className="form-control" id="email-label" name="email" type="email" placeholder="Email"></Field>
                        </div>
                        <div className="form-group">
                            <label id="password-label">Password: </label>
                            <Field name="password" id="password-label" className="form-control" type="password" placeholder="Password"></Field>
                        </div>
                        <p className={msjError ? "show--msj-error" : "no--show"}><FontAwesomeIcon icon={faExclamationTriangle} />Error, email and/or password incorrect</p>
                        <button className="btn btn-primary container-fluid" type="submit">Login</button>
                    </Form>
                </Formik>
            }

        </div>

    )
}

export default Login;