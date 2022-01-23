import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface CustomModalProps {
  open: boolean;
  onClose?: () => void;
  title: string;
  body: JSX.Element;
  footerActions: JSX.Element;
}

export const CustomModal = ({
  open,
  onClose,
  title,
  body,
  footerActions,
}: CustomModalProps): JSX.Element => {
  return (
    <Dialog open={open} aria-label={`${title}`}>
      <DialogTitle className="flex bg-yellow">
        {title}
        {onClose && (
          <IconButton
            sx={{ marginLeft: 4 }}
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent className="bg-yellow">{body}</DialogContent>
      <DialogActions className="bg-yellow">{footerActions}</DialogActions>
    </Dialog>
  );
};
