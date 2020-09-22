export interface SnackbarProps {
  text: string;
  action?: {
    text: string;
    callback: () => void;
  };
}
