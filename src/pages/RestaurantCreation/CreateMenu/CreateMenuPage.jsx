import { useState } from "react";
import {
  Grid,
  Link,
  TextField,
  Typography,
  Autocomplete,
  Divider,
  Button,
} from "@mui/material";
import { StackStyled } from "./styles";
import MultipleValueTextField from "../../../components/MultipleValueTextField";

export default function CreateMenuPage() {
  const sections = [
    "Soup Section",
    "Grilled Section",
    "Apeteizer",
    "Drinks",
    "Dessert",
  ];
  const [options, setOptions] = useState([]);
  const [currOption, setCurrOption] = useState("");

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
        <Button fullWidth variant="outlined" component="label">
          Upload File
          <input type="file" hidden />
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth variant="contained">
          ADD ITEM
        </Button>
      </Grid>
    </Grid>
  );
}
