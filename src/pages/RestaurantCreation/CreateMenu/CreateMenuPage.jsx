import { useEffect, useState } from "react";
import {
  Grid,
  Link,
  TextField,
  Typography,
  Autocomplete,
  Divider,
  Button,
  LinearProgress
} from "@mui/material";
import MultipleValueTextField from "../../../components/MultipleValueTextField";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import { db, storage } from "../../../../firebase.config";

export default function CreateMenuPage() {
  const [sections, setSections] = useState([]);
  const [options, setOptions] = useState([]);
  const [itemData, setItemData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState("");
  const [currOption, setCurrOption] = useState("");
  const [imageProgress, setImageProgress] = useState(null);

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
    // Where the image is going to be stored
    const storageRef = ref(storage, `itemImages/${Date.now()}/menuItem`);
    // How much image is uploaded by %
    const uploadImage = uploadBytesResumable(storageRef, e.target.files[0]);
    // Snapshot will provide how much image is uploaded
    uploadImage.on("state_changed", (snapshot) => {
      const progressOfImageUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImageProgress(progressOfImageUpload);
    }, (error) => {
      console.log("There was an error uploading on image", error);
    }, () => {
      getDownloadURL(uploadImage.snapshot.ref).then((url) => {
        console.log('image uploaded at url', url);
        setImage(url);
      })
    })
  }
  
  const fetchSections = async () => {
    const menuCollection = collection(db, "menu");
    const restaurantRef = JSON.parse(localStorage.getItem("current-user"));
    const menu = query(menuCollection, where("restaurantRef", "==", `/users/${restaurantRef.id}`));
    try {
      const querySnapshot = await getDocs(menu);
      querySnapshot.forEach((doc) => {
        const sectionList = doc.data().sections;
        // Convert sections back to the array of strings
        const newSections = sectionList.map((sectionObj) => {
          return sectionObj.name;
        })
        setSections(newSections);
      })
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSections();
  }, [])
  return (
    <Grid container rowGap={3}>
      <Grid container justifyContent="center">
        <Typography variant="h3" color="secondary">
          Create Menu
        </Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Typography varitant="subtitle1">
          Pick a section to add items
        </Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Autocomplete
          required
          disablePortal
          fullWidth
          options={sections}
          renderInput={(params) => (
            <TextField {...params} label="Section" variant="filled" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider>
          <Typography>Item Info</Typography>
        </Divider>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          variant="filled"
          type="input"
          label="Item's Name"
          placeholder="Enter item's name..."
        />
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="subtitle1">Item's Option (Optional)</Typography>
        </Grid>
        <Grid item xs={12}>
          <MultipleValueTextField
            currValue={currOption}
            setCurrValue={setCurrOption}
            values={options}
            setValues={setOptions}
            labelName="Option's Name"
            variant="filled"
            width="100%"
            chipWidth={12}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          multiline
          variant="filled"
          rows={4}
          label="Item's Description (Must include ingredient of an item)"
          placeholder="Enter Item's Description..."
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="filled"
          label="Item's Image URL"
          placeholder="Enter Item's Image URL..."
        />
      </Grid>
      <Grid item xs={12}>
        <Divider>
          <Typography>Or</Typography>
        </Divider>
      </Grid>
      <Grid item xs={12}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="outlined-button-file"
          type="file"
          onChange={handleFileInputChange}
        />
        <label htmlFor="outlined-button-file">
          <Button fullWidth variant="outlined" component="span">
            Upload
          </Button>
        </label>
      </Grid>
      {imageProgress !== null && (
        <Grid item xs={12}>
          <LinearProgress variant="determinate" value={imageProgress} />
          <Typography fontWeight="bold" textAlign="left">URL: {image}</Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button fullWidth variant="contained">
          ADD ITEM
        </Button>
      </Grid>
    </Grid>
  );
}
