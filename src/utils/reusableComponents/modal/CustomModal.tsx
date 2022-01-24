import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { CustomModalProps } from './customModalInterface';

export const CustomModal = ({
  open,
  onClose,
  title,
  body,
  footerActions,
}: CustomModalProps): JSX.Element => {
  return (
    <Dialog open={open} aria-label={`${title}`} onClose={onClose}>
      <DialogTitle className="flex bg-secondary">
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
      <DialogContent dividers className="bg-secondary">
        {body}
      </DialogContent>
      <DialogActions className="bg-secondary">{footerActions}</DialogActions>
    </Dialog>
  );
};
