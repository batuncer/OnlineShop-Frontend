import React from "react";
import { Alert } from "@mui/material";
export default function AlertMessage({ severity="error", children }) {
  if (!children) return null;
  return <Alert severity={severity} sx={{ mt: 1 }}>{children}</Alert>;
}
