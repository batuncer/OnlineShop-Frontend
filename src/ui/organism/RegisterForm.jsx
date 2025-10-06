import { useForm } from "react-hook-form";

// Validation
import { zodResolver } from "@hookform/resolvers/zod";

// Molecules
import FormField from "../molecules/FormField";

// Atoms
import AlertMessage from "../atoms/Alertmessage";
import AppButton from "../atoms/AppButton";

// Schema
import { registerSchema } from "../../validation/registerSchema";

// Register form component
export default function RegisterForm({ onSubmit, loading, error }) {

  // React Hook Form setup with Zod validation
  const { register, handleSubmit, formState:{ errors } } =
    useForm({ resolver: zodResolver(registerSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Username" name="username" register={register} errors={errors} />
      <FormField label="Email" name="email" register={register} errors={errors} />
      <FormField label="Password" name="password" type="password" register={register} errors={errors} />
      <AlertMessage>{error}</AlertMessage>
      <AppButton type="submit" disabled={loading} sx={{ mt: 2 }}>
        {loading ? "Registering..." : "Register"}
      </AppButton>
    </form>
  );
}
