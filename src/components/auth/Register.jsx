"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import AlertError from "@/components/alert/AlertError";
import AlertSuccesfullAuth from "@/components/alert/AlertaSuccesfullAuth";
import InputIU from "@/components/IU/InputIU";
import LabelIU from "../IU/LabelIU";
import InputPasswordIU from "../IU/InputPasswordIU";
import ButtonIU from "../IU/ButtonIU";

const Register = () => {
  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [response, setResponse] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    register({
      ...formData,
      setErrors,
      setResponse,
    });
  };

  return (
    <div className="flex items-center h-screen justify-center  bg-slate-950 ">
      <div className="w-full xl:w-2/5 p-6 ">
        <div className="rounded-lg bg-slate-50 shadow-lg p-8  text-gray-800  ">
          <div className="block">
            <h3 className=" block font-bold text-center text-3xl text-gray-700">
              Crear Cuenta
            </h3>
            {response && <AlertSuccesfullAuth mensaje={response} />}
            <form onSubmit={submitForm}>
              {/* Name */}
              <div>
                <LabelIU htmlFor="name">Nombres</LabelIU>
                <InputIU
                  id="name"
                  type="text"
                  value={formData.name}
                  className="block w-full"
                  onChange={handleChange("name")}
                  placeholder="Nombres"
                  required
                  autoFocus
                />
                {errors.name ? <AlertError error={errors.name} /> : null}
              </div>

              {/* Email Address */}
              <div className="mt-4">
                <LabelIU htmlFor="email">Email</LabelIU>

                <InputIU
                  id="email"
                  type="email"
                  value={formData.email}
                  className="block w-full"
                  placeholder="Email"
                  onChange={handleChange("email")}
                  required
                />
                {errors.email ? <AlertError error={errors.email} /> : null}
              </div>

              {/* Password */}
              <div className="mt-4">
                <LabelIU htmlFor="password">Contraseña</LabelIU>

                <InputPasswordIU
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange("password")}
                  placeholder="Contraseña"
                  required
                  autoComplete="new-password"
                />
                {errors.password ? (
                  <AlertError error={errors.password} />
                ) : null}
              </div>

              {/* Confirm Password */}
              <div className="mt-4">
                <LabelIU htmlFor="password_confirmation">
                  Confirmar Contraseña
                </LabelIU>

                <InputPasswordIU
                  id="password_confirmation"
                  type="password"
                  value={formData.password_confirmation}
                  onChange={handleChange("password_confirmation")}
                  placeholder="Confirmar Contraseña"
                  required
                />
                {errors.password_confirmation ? (
                  <AlertError error={errors.password_confirmation} />
                ) : null}
              </div>

              <div className="flex items-center justify-end mt-4">
                <Link
                  href="/login"
                  className="underline text-sm text-gray-600 hover:text-gray-900"
                >
                  Ya estas registrado?
                </Link>
                <ButtonIU type="submit" className="ml-4" color="primary">
                  Registrarse
                </ButtonIU>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
