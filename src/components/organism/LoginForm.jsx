import { useForm } from "react-hook-form";

// Resolver to integrate Zod with React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";

// Molecules
import FormField from "../molecules/FormField";

// Atoms
import AppButton from "../atoms/AppButton";
import AlertMessage from "../atoms/Alertmessage";

// Validation schema for login form
import { loginSchema } from "../../validation/loginSchema";

export default function LoginForm({ onSubmit, loading, error }) {

  // React Hook Form setup with Zod validation
  const { register, handleSubmit, formState:{ errors } } =
    useForm({ resolver: zodResolver(loginSchema) });

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
