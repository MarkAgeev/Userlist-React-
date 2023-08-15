import React, { useState, useRef, Fragment } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./CreateUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const CreateUser = (props) => {
  // name value
  const nameInputRef = useRef();

  // age value
  const ageInputRef = useRef();

  // error status
  const [error, setError] = useState();

  const createUserHandler = (event) => {
    event.preventDefault();
    const inputUserName = nameInputRef.current.value;
    const inputUserAge = ageInputRef.current.value;

    // if inputs are not correct
    if (inputUserName.trim().length === 0 || inputUserAge.trim().length === 0) {
      setError({
        title: "Некорректный ввод",
        message: "Эти поля не могут быть пустыми",
      });
      return;
    }
    // if age is not correct
    if (+inputUserAge < 1) {
      setError({
        title: "Некорректный возраст",
        message: "Возраст должен быть больше 0",
      });
      return;
    }
    
    // send to create userList
    props.onCreateUser(inputUserName, inputUserAge);

    // clear name && age value
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  // update error status
  const errorHandler = () => {
    setError(false);
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          onCloseModal={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={createUserHandler}>
          <label htmlFor="name">Имя</label>
          <input id="name" type="text" ref={nameInputRef} />
          <label htmlFor="age">Возраст</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Добавить Пользователя</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default CreateUser;
