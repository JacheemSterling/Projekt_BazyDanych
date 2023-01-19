import React from "react";
import { useFormik } from "formik";
import users from "../../data/users.json";
import "../../style.css";
export default function LoginForm({ isLogged, setIsLogged, user, setUser }) {
  const validate = (values) => {
    const errors = {};
    if (!values.username) errors.username = "Enter your username";
    if (!values.password) errors.password = "Enter your password";
    return errors;
  };

  const reset = () => {
    setUser({});
    setIsLogged(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      if (
        users.find(
          (user) =>
            user.username === values.username &&
            user.password === values.password
        ) !== undefined
      ) {
        setIsLogged(true);
        setUser(
          users.find(
            (user) =>
              user.username === values.username &&
              user.password === values.password
          )
        );
      } else alert("Wrong username or password");
    },
  });

  if (isLogged === false)
    return (
      <div className="min-h-full items-center sm:px-6 lg:px-8 p-3 pl-5 mt-1 flex">
        <form onSubmit={formik.handleSubmit}>
          <input
            className="px-2 py-0.5 rounded-md mr-2"
            id="username"
            name="username"
            placeholder="Nazwa użytkownika"
            type="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <input
            className="px-2 py-0.5 rounded-md mr-2"
            id="password"
            name="password"
            type="password"
            placeholder="Hasło"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <button
            type="submit"
            className="bg-gray-900 text-white px-2 py-2 rounded-md text-sm font-medium "
          >
            Login
          </button>
        </form>
      </div>
    );
  else
    return (
      <div className="min-h-full items-center sm:px-6 lg:px-8 p-3 pl-5 flex flex-nowrap">
        <div>
          <h3 className="text-white px-3 py-2 rounded-md nowrap">
            Logged as {formik.values.username}
          </h3>
        </div>
        <div>
          <button
            type="submit"
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            onClick={reset}
          >
            Logout
          </button>
        </div>
      </div>
    );
}
