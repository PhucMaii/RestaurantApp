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

export const convertToDay = (timestamp) => {
    const formattedDate = convertTimestampToDate(timestamp);
    const date = formattedDate.split(' at ')[0];
    return date;
};

export const convertToHours = (timestamp) => {
    const formattedDate = convertTimestampToDate(timestamp);
    const date = formattedDate.split(' at ')[1];
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
