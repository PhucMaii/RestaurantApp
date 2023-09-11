import React from 'react';
import PropTypes from 'prop-types';
import { 
    Modal, 
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText
} from "@mui/material";
import BadgeIcon from '@mui/icons-material/Badge';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EmailIcon from '@mui/icons-material/Email';
import { ListModal } from "./style";
import { memo } from "react";

function UserInfoModal({
  email,
  handleClose,
  name,
  phoneNumber,
  open
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <ListModal
        maxWidth="500px"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '500px',
        }}
      >
        <ListItem sx={{ backgroundColor: 'white' }}>
          <ListItemAvatar>
            <Avatar>
              <BadgeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} />
        </ListItem>
        <ListItem sx={{ backgroundColor: 'white' }}>
          <ListItemAvatar>
            <Avatar>
              <ContactPhoneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={phoneNumber} />
        </ListItem>
        <ListItem sx={{ backgroundColor: 'white' }}>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={email} />
        </ListItem>
      </ListModal>
    </Modal>
  );
}

UserInfoModal.propTypes = {
  email: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
}

export default memo(UserInfoModal)