export interface CustomModalProps {
  open: boolean;
  onClose?: () => void;
  title: string;
  body: JSX.Element;
  footerActions: JSX.Element;
}
