import { TextField, Grid, Chip } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function MultipleValueTextField({
  chipWidth,
  currValue,
  labelName,
  setCurrValue,
  setValues,
  values,
  variant,
  width,
}) {
  const handleEnterKeyDown = (e) => {
    if (e.keyCode === 13) {
      // Enter Key
      setValues((oldState) => [...oldState, e.target.value]);
      setCurrValue('');
    }
  };

  const handleChange = (e) => {
    setCurrValue(e.target.value);
  };

  const handleDelete = (item, index) => {
    let arr = [...values];
    arr.splice(index, 1);
    setValues(arr);
  };

  return (
    <Grid container justifyContent="center" rowGap={2}>
      <Grid item xs={12} textAlign="center">
        <TextField
          style={{ width }}
          variant={variant}
          type="input"
          label={labelName}
          onKeyDown={handleEnterKeyDown}
          onChange={handleChange}
          value={currValue}
        />
      </Grid>
      <Grid item xs={chipWidth} textAlign="left">
        {values.map((item, index) => {
          return (
            <Chip
              key={index}
              size="medium"
              onDelete={() => handleDelete(item, index)}
              label={item}
              style={{ marginRight: '10px', marginBottom: '10px' }}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}

MultipleValueTextField.propTypes = {
  chipWidth: PropTypes.number.isRequired,
  currValue: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  setCurrValue: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  values: PropTypes.array.isRequired,
  variant: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired
}