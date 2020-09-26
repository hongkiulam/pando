export interface Toast {
  props?: {
    variant?: "stacked";
  };
  label: string;
  actions?: [
    {
      onClick: () => void;
      text: string;
    },
    {
      onClick: () => void;
      text: string;
    }
  ];
  dismissButton?: boolean;
  onDismiss?: () => void;
  onClose?: (e: { detail: { reason: "action" | "dismiss" } }) => void;
}
