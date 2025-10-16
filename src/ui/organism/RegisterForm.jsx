import { useForm } from "react-hook-form";
import { Box } from "@mui/material";

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
  const { register, handleSubmit, formState: { errors } } =
    useForm({ resolver: zodResolver(registerSchema) });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        {/* Username Field */}
        <FormField 
          label="Username" 
          name="username" 
          register={register} 
          errors={errors} 
        />
        
        {/* Email Field */}
        <FormField 
          label="Email" 
          name="email" 
          register={register} 
          errors={errors} 
        />
        
        {/* Password Field */}
        <FormField 
          label="Password" 
          name="password" 
          type="password" 
          register={register} 
          errors={errors} 
        />
        
        {/* Error Message */}
        {error && <AlertMessage>{error}</AlertMessage>}
        
        {/* Submit Button - Centered */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <AppButton 
            type="submit" 
            disabled={loading} 
            size="large"
            sx={{ 
              minWidth: 200,
              py: 1.5,
            }}
          >
            {loading ? "Registering..." : "Register"}
          </AppButton>
        </Box>
        
      </Box>
    </Box>
  );
}
