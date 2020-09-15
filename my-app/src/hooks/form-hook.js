import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isFormValid: formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isFormValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      isValid: isValid,
      value: value,
    });
  }, []);

  return [formState, inputHandler];
};
