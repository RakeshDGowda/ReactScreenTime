import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./LoginPage.css";
import { authService, type AuthResponse } from "../../services/authService";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

type User = {
  name: string;
  pass: number;
};

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address." })
    .min(3),
  password: z
    .string({ message: "Password should be at least 8 characters." })
    .min(5),
});

const LoginPage = () => {
  const [formerror, setFormError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (formdata: any) => {
    try {
      authService.login(formdata);

      // const role = authService.getROle();
      // const url = role == "Child" ? "/dashboard" : "/";
      //navigate(url);
      // window.location.href = url;
      // window.location.assign(url);
      // <Navigate to="/" />;
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };

  // if (getUser()) {
  //   return <Navigate to="/" />;
  // }

  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form_text_input"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
            {/* {errors.email?.type == "minLength" && (
              <em className="form_error">email Length should be minimum 5</em>
            )} */}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {/* {errors.password?.type == "required" && (
              <em className="form_error">please neter your password</em>
            )} */}
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          {formerror && <em className="form_error">{formerror}</em>}
          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
