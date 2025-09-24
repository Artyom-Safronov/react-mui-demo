import { useContext } from "react";
import { DialogContext } from "../DialogProvider";

export function useShowDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error("useShowDialog must be used within a DialogProvider");
  }
  return ctx.showDialog;
}