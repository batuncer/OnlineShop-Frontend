import React from "react";
import AppTextField from "../atoms/AppTextField";

export default function FormField({ register, name, label, type="text", errors }) {
  return (
    <AppTextField
      label={label}
      type={type}
      {...register(name)}
      errorText={errors?.[name]?.message}
    />
  );
}
