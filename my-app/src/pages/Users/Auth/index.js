import React, { useState } from "react";

import Input from "../../../common/Input";
import Button from "../../../common/Button";
import Card from "../../../common/Card";
import Title from "../../../common/Title";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../../utils/validators";
import { useForm } from "../../../hooks/form-hook";
import "./style.css";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchAuthHandler = () => {
    if (isSignup) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsSignup(!isSignup);
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    console.log("====================================");
    console.log(formState.inputs, formState.isFormValid);
    console.log("====================================");
  };
  return (
    <>
      <Title label="Login to your account" />
      <Card className="authentication">
        <h2 className="authentication__header">{`${
          isSignup ? "Signup for new account" : "Login Required"
        }`}</h2>
        <hr />
        <form className="center" onSubmit={loginSubmitHandler}>
          {isSignup && (
            <Input
              type="text"
              element="input"
              id="name"
              validators={[VALIDATOR_REQUIRE()]}
              label="Enter your name"
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            type="email"
            element="input"
            id="email"
            label="Enter your email"
            errorText="Please enter a valid email."
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          <Input
            type="password"
            element="input"
            id="password"
            label="Enter your password"
            errorText="Please enter a valid password (at least 6 characters)."
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isFormValid}>
            {isSignup ? "SIGNUP" : "LOGIN"}
          </Button>
        </form>
        <Button inverse onClick={switchAuthHandler}>
          Switch to {`${isSignup ? "login" : "signup"}`}
        </Button>
      </Card>
    </>
  );
};

export default Login;