import {ViewTableFieldDetailDialogPropType} from "@/app/types/proptypes/ViewTableFieldDetailDialogPropType";
import BootstrapDialog from "@/app/components/common/BootstrapDialog";
import {DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";


const ViewTableFieldDetailDialog = (prop: ViewTableFieldDetailDialogPropType) => {
  return (
    <BootstrapDialog
      open={prop.openViewDetails}
      onClose={prop.closeDialog}>
      <DialogTitle>{prop.title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => prop.closeDialog()}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon/>
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla.
        </Typography>
      </DialogContent>
    </BootstrapDialog>
  );
}

export default ViewTableFieldDetailDialog;