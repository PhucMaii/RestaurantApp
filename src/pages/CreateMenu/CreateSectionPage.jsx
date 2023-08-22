import React, { useState } from "react";
import {
  Grid,
  Link,
  Typography,
  Button
} from "@mui/material";
import { 
    MenuImage, 
    HelperTextStyled, 
    StackStyled, 
    HalfInputStyled, 
    ChipStyled, 
    ButtonContainerGrid 
} from "./styles";
import MultipleValueTextField from "../../components/MultipleValueTextField";

export default function CreateSectionPage() {
  const [currSection, setCurrSection] = useState("");
  const [sections, setSections] = useState([]);
  return (
    <Grid container justifyContent="center" rowGap={5}>
      <StackStyled
        direction="row"
        justifyContent="space-between"
      >
        <Link>Back</Link>
        <Link>Skip</Link>
      </StackStyled>
      <Grid container justifyContent="center">
        <MenuImage src="https://www.pngitem.com/pimgs/m/133-1331604_menu-text-menu-text-png-transparent-png.png" />
      </Grid>
      <Grid container justifyContent="center">
        <Typography textAlign="center" variant="h3" color="secondary">
          Let's get started with your menu
        </Typography>
      </Grid>
      <Grid container justifyContent="center">
        <HelperTextStyled variant="h6" textAlign="center">
          Create a section. It will help you to divide separate sections in your
          restaurants. Therefore, it provides to you the convenience whenever
          you need to manage it.
        </HelperTextStyled>
      </Grid>
      <MultipleValueTextField 
        currValue={currSection}
        setCurrValue={setCurrSection}
        values={sections}
        setValues={setSections}
        labelName="Section's Name"
        variant="filled"
        width="50%"
        chipWidth={6}
        
      />
      <ButtonContainerGrid item xs={12} textAlign='right'>
          <Button variant="contained" color="success">GO TO NEXT STEP</Button>
      </ButtonContainerGrid>
    </Grid>
  );
}
