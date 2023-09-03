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

export default function UserInfoModal(props) {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <ListModal
        maxWidth="500px"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "500px",
        }}
      >
        <ListItem sx={{ backgroundColor: "white" }}>
          <ListItemAvatar>
            <Avatar>
              <BadgeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={props.name} />
        </ListItem>
        <ListItem sx={{ backgroundColor: "white" }}>
          <ListItemAvatar>
            <Avatar>
              <ContactPhoneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={props.phoneNumber} />
        </ListItem>
        <ListItem sx={{ backgroundColor: "white" }}>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={props.email} />
        </ListItem>
      </ListModal>
    </Modal>
  );
}
