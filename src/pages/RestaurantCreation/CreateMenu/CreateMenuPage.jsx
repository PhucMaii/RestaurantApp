import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Divider,
  Button,
  LinearProgress,
  Alert,
} from "@mui/material";
import MultipleValueTextField from "../../../components/MultipleValueTextField";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../../firebase.config";

export default function CreateMenuPage() {
  const [sections, setSections] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    open: false,
    type: "error",
  });
  const [selectedSection, setSelectedSection] = useState("");
  const [options, setOptions] = useState([]);
  const [itemData, setItemData] = useState({
    availability: true,
    itemName: "",
    options: [],
    itemDescription: "",
    itemImageURL: "",
    itemPrice: 0,
  });
  const [_imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  // Allow user to enter image URL if true
  const [allowImageURL, setAllowImageURL] = useState(true);
  // Allow user to upload file if true
  const [allowUploadImage, setAllowUploadImage] = useState(true);
  const [currOption, setCurrOption] = useState("");
  const [imageProgress, setImageProgress] = useState(null);
  const menuCollection = collection(db, "menu");
  const restaurantRef = JSON.parse(localStorage.getItem("current-user")).docId;
  const menu = query(
    menuCollection,
    where("restaurantRef", "==", `/users/${restaurantRef}`)
  );
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
    // Where the image is going to be stored
    const storageRef = ref(storage, `itemImages/${Date.now()}/menuItem`);
    // How much image is uploaded by %
    const uploadImage = uploadBytesResumable(storageRef, e.target.files[0]);
    // Snapshot will provide how much image is uploaded
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressOfImageUpload =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageProgress(progressOfImageUpload);
      },
      (error) => {
        console.log("There was error with uploading image", error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          setImage(url);
          setItemData((prevData) => ({
            ...prevData,
            itemImageURL: url,
          }));
        });
      }
    );
  };

  const isItemDataValid = () => {
    return (
      itemData.itemName.trim() !== "" &&
      itemData.itemDescription.trim() !== "" &&
      itemData.itemPrice > 0
    );
  };

  const formatOption = () => {
    const newOptions = options.map((option) => ({
      availability: true,
      name: option,
      price: 0,
    }));
    return newOptions;
  };

  const fetchSections = async () => {
    try {
      const querySnapshot = await getDocs(menu);
      const newSectionNames = [];
      querySnapshot.forEach((doc) => {
        const sectionList = doc.data().sections;
        // Convert sections back to the array of strings
        sectionList.forEach((section) => {
          newSectionNames.push(section.name);
        });
      });
      setSections(newSectionNames);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async () => {
    const isValid = isItemDataValid();
    console.log(isValid);
    if (!isValid) {
      setNotification({
        message: "Please Fill Out All Requiresd Fields",
        on: true,
        type: "error",
      });
      return;
    }
    try {
      const querySnapshot = await getDocs(menu);
      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;
        const menuData = doc.data();
        const targetSection = menuData.sections.find(
          (section) => section.name === selectedSection
        );
        if (!targetSection.items) {
          targetSection.items = [];
        }
        targetSection.items.push(itemData);
        await updateDoc(docRef, { sections: menuData.sections });
        setNotification({
          message: `${itemData.itemName} is added successfully into your menu. Press Finish when you are done.`,
          on: true,
          type: "success",
        });
        // Reset all the fields
        setImageURL("");
        setImage("");
        setOptions([]);
        setItemData({
          itemName: "",
          options,
          itemDescription: "",
          itemImageURL: "",
          itemPrice: 0,
        });
      });
    } catch (error) {
      setNotification({
        message: error.code,
        on: true,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // update options field in itemData
  useEffect(() => {
    setItemData((prevData) => ({
      ...prevData,
      options: formatOption(),
    }));
  }, [options]);

  // only allow user to either enter image url or upload image file
  useEffect(() => {
    if (imageURL !== "" && image === "") {
      setAllowUploadImage(false);
    } else if (image !== "" && imageURL === "") {
      setAllowImageURL(false);
    } else {
      setAllowUploadImage(true);
      setAllowImageURL(true);
    }
  }, [image, imageURL]);

  return (
    <Grid container rowGap={3} p={4}>
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
          value={selectedSection}
          onChange={(event, newValue) => setSelectedSection(newValue)}
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
      <Grid container columnSpacing={2}>
        <Grid item xs={9}>
          <TextField
            required
            fullWidth
            type="input"
            variant="filled"
            value={itemData.itemName}
            onChange={(e) => {
              setItemData((prevData) => {
                return { ...prevData, itemName: e.target.value };
              });
            }}
            label="Item's Name"
            placeholder="Enter item's name..."
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            type="number"
            variant="filled"
            value={itemData.itemPrice}
            onChange={(e) => {
              setItemData((prevData) => {
                return { ...prevData, itemPrice: e.target.value };
              });
            }}
            label="Item's Price"
            placeholder="Enter item's name..."
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Item's Option (Optional). Press Enter To Add Each Option
          </Typography>
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
          value={itemData.itemDescription}
          onChange={(e) => {
            setItemData((prevData) => {
              return { ...prevData, itemDescription: e.target.value };
            });
          }}
          rows={4}
          label="Item's Description (Must include ingredient of an item)"
          placeholder="Enter Item's Description..."
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          disabled={!allowImageURL}
          fullWidth
          variant="filled"
          value={imageURL}
          onChange={(e) => {
            setImageURL(e.target.value);
            setItemData((prevData) => ({
              ...prevData,
              itemImageURL: e.target.value,
            }));
          }}
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
          disabled={!allowUploadImage}
          accept="image/*"
          style={{ display: "none" }}
          id="outlined-button-file"
          type="file"
          onChange={handleFileInputChange}
        />
        <label htmlFor="outlined-button-file">
          <Button
            disabled={!allowUploadImage}
            fullWidth
            variant="outlined"
            component="span"
          >
            Upload
          </Button>
        </label>
      </Grid>
      {imageProgress !== null && (
        <Grid item xs={12}>
          <LinearProgress variant="determinate" value={imageProgress} />
          <Typography fontWeight="bold" textAlign="left">
            URL: {image}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button onClick={addItem} fullWidth variant="contained">
          ADD ITEM
        </Button>
      </Grid>
      {notification.on && (
        <Grid item xs={12}>
          <Alert severity={notification.type}>{notification.message}</Alert>
        </Grid>
      )}
    </Grid>
  );
}
