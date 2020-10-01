import React, { useState, useContext } from "react";
import axios from "axios";

import Input from "../../../common/Input";
import Button from "../../../common/Button";
import Card from "../../../common/Card";
import Title from "../../../common/Title";
import ImageUpload from "../../../common/ImageUpload";
import LoadingSpinner from "../../../common/LoadingSpinner";
import ErrorModal from "../../../common/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../../utils/validators";
import { useForm } from "../../../hooks/form-hook";
import { useHttpClient } from "../../../hooks/http-hook";
import { AuthContext } from "../../../context/auth-context";
import "./style.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const { login } = auth;
  const [isSignup, setIsSignup] = useState(false);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
          image: undefined,
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
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsSignup(!isSignup);
  };

  const authSubmitHandler = async (e) => {
    e.preventDefault();

    if (isSignup) {
      const formData = new FormData();

      formData.append("name", formState.inputs.name.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("password", formState.inputs.password.value);
      formData.append("image", formState.inputs.image.value);

      try {
        const res = await sendRequest("api/users/signup", "post", formData);
        login(res.data.user._id);
      } catch (err) {
        console.warn(err.message);
      }
    } else {
      try {
        const data = {
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        };

        const res = await sendRequest("api/users/login", "post", data);

        login(res.data.user._id);
      } catch (err) {
        console.warn(err.message);
      }
    }
  };

  const handleError = () => {
    clearError();
  };

  return (
    <>
      <Title label="Login to your account" />
      <Card className="authentication">
        {isLoading ? (
          <LoadingSpinner asOverlay />
        ) : error ? (
          <ErrorModal error={error} onClear={handleError} />
        ) : (
          <>
            <h2 className="authentication__header">{`${
              isSignup ? "Signup for new account" : "Login Required"
            }`}</h2>
            <hr />
            <form className="center" onSubmit={authSubmitHandler}>
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
              {isSignup && (
                <ImageUpload id="image" center onInput={inputHandler} />
              )}
              <Button type="submit" disabled={!formState.isFormValid}>
                {isSignup ? "SIGNUP" : "LOGIN"}
              </Button>
            </form>
            <p>
              {isSignup
                ? "Already have an account?"
                : "Don't have account yet?"}
            </p>
            <Button inverse onClick={switchAuthHandler}>
              Switch to {`${isSignup ? "login" : "signup"}`}
            </Button>
          </>
        )}
      </Card>
    </>
  );
};

export default Auth;
