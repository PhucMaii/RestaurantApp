export const convertTimestampToDate = (timestamp) => {
    if(!timestamp) {
        return "N/A";
    }
  const date = timestamp.toDate();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return formattedDate;
};

export const convertToDay = (timestamp) => {
    const formattedDate = convertTimestampToDate(timestamp);
    const date = formattedDate.split(" at ")[0];
    return date;
}

export const formatToTwoDecimalPlace = (num) => {
  if (typeof num === "number") {
    return num.toFixed(2);
  }
  return "N/A";
};
export const reduceNameLength = (fullName) => {
  const names = fullName.split(" ");
  // Check if there are at least first name and last name
  if (names.length < 2) {
    return fullName;
  }

  const firstInitial = names[0][0].toUpperCase() + ".";
  const lastName = names[names.length - 1];
  const reducedName = firstInitial + lastName;

  return reducedName;
};
