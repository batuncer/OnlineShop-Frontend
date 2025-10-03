import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../molecules/FormField";
import AppButton from "../atoms/AppButton";
import AlertMessage from "../atoms/Alertmessage";


const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginForm({ onSubmit, loading, error }) {
  const { register, handleSubmit, formState:{ errors } } =
    useForm({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Username" name="username" register={register} errors={errors} />
      <FormField label="Password" name="password" type="password" register={register} errors={errors} />
      <AlertMessage>{error}</AlertMessage>
      <AppButton type="submit" disabled={loading} sx={{ mt: 2 }}>
        {loading ? "Logging in..." : "Login"}
      </AppButton>
    </form>
  );
}
