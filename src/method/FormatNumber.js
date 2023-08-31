
export const formatToTwoDecimalPlace = (num) => {
    if(num !== "") {
        return parseFloat(num).toFixed(2)
    } 
    return num;
  };