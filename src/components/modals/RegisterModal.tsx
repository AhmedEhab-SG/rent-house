"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useState } from "react";
import Modal from "./Modal";
import Heading from "../shared/Heading";
import Input from "../input/Input";
import { toast } from "react-hot-toast";
import Button from "../shared/Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";
import { useCallback } from "react";
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSbumit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
        loginModal.onOpen();
        toast.success("Registered");
      })
      .catch((error) => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" center />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        vaild="email"
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        vaild="name"
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        vaild="password"
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Register with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Register with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div
        className="
      text-neutral-500
      text-center
      mt-4
      font-light"
      >
        <div className="flex flew-row justify-center items-center gap-2">
          <div> Already have an account?</div>
          <div
            onClick={toggle}
            className="
          text-neutral-800
          cursor-pointer
          hover:underline
          "
          >
            {" "}
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disable={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Contiune"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSbumit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
