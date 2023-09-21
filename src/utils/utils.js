export const calculateETA = (timestamp, preparingTime) => {
  if (!timestamp) {
    return 'N/A';
  }
  const timestampToMiliSeconds = timestamp.getTime();
  const etaTimeInMiliSeconds = timestampToMiliSeconds + preparingTime * 1000;
  const etaTime = new Date(etaTimeInMiliSeconds);
  return convertTimestampToDate(etaTime);
};

export const convertTimestampToDate = (timestamp) => {
  if (!timestamp) {
    return 'N/A';
  }
  const formattedDate = timestamp.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  return formattedDate;
};

export const calculateDifferenceTime = (startTime, endTime) => {
  const start = startTime.toDate();
  const end = endTime.toDate();
  return Math.floor(end - start) / 1000;
};

export const convertToDay = (timestamp) => {
  const formattedDate = convertTimestampToDate(timestamp);
  const date = formattedDate.split(' at ')[0];
  return date;
};

export const formatTime = (time) => {
  const minutes =
    Math.floor(time / 60) < 10
      ? `0${Math.floor(time / 60)}`
      : Math.floor(time / 60);
  const seconds = time % 60 < 10 ? `0${time % 60}` : time % 60;
  return `${minutes}:${seconds}`;
};

export const formatToTwoDecimalPlace = (num) => {
  if (typeof num === 'number') {
    return num.toFixed(2);
  }
  return 'N/A';
};

export const reduceNameLength = (fullName) => {
  const names = fullName.split(' ');
  // Check if there are at least first name and last name
  if (names.length < 2) {
    return fullName;
  }

  const firstInitial = names[0][0].toUpperCase() + '.';
  const lastName = names[names.length - 1];
  const reducedName = firstInitial + lastName;

  return reducedName;
};
