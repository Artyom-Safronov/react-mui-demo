import React, {
  createContext,
  useCallback,
  useState,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";

type DialogAction = {
  label: string;
  value: boolean;
  variant?: "text" | "outlined" | "contained";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "info"
    | "warning";
};

type DialogOptions = {
  title: string;
  description?: string;
  actions?: DialogAction[];
};

type DialogRequest = DialogOptions & {
  resolve: (value: boolean) => void;
};

type DialogContextType = {
  showDialog: (options: DialogOptions) => Promise<boolean>;
};

export const DialogContext = createContext<DialogContextType | undefined>(
  undefined
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const DialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [request, setRequest] = useState<DialogRequest | null>(null);

  const showDialog = useCallback((options: DialogOptions) => {
    return new Promise<boolean>((resolve) => {
      setRequest({ ...options, resolve });
    });
  }, []);

  const handleClose = useCallback(
    (value: boolean) => {
      if (request) {
        request.resolve(value);
        setRequest(null);
      }
    },
    [request]
  );

  const actions = request?.actions ?? [
    { label: "OK", value: true, color: "primary" },
    { label: "Cancel", value: false },
  ];

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      <Dialog
        open={!!request}
        onClose={() => handleClose(false)}
        slots={{ transition: Transition }}
      >
        <DialogTitle>{request?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{request?.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {actions.map((action, idx) => (
            <Button
              key={idx}
              onClick={() => handleClose(action.value)}
              color={action.color}
              variant={action.variant || "outlined"}
              size={"small"}
            >
              {action.label}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
};
