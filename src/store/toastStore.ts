import { create } from "zustand";

type ToastState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  showToast: (opts: {
    message: string;
    severity?: ToastState["severity"];
  }) => void;
  closeToast: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  open: false,
  message: "",
  severity: "info",
  showToast: ({ message, severity = "info" }) =>
    set({ open: true, message, severity }),
  closeToast: () => set({ open: false }),
}));
