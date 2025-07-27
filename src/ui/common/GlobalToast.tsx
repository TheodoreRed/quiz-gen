"use client";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useToastStore } from "@/app/store/toastStore";

export default function GlobalToast() {
  const { open, message, severity, closeToast } = useToastStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={closeToast}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={closeToast} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
