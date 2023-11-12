export const isAuthenticated = () => {
    const isAuthenticated = JSON.parse(localStorage.getItem('current-user'));
    // isAuthenticated returns an empty object if user signed out => errors, need to check size of that object as well
    return isAuthenticated && Object.keys(isAuthenticated).length > 0
        ? true
        : false;
};

export const hasRestaurant = () => {
    const userCredential = JSON.parse(localStorage.getItem('current-user'));
    if (!userCredential) {
        return false;
    }
    if (userCredential.hasRestaurant) {
        return true;
    }
    return false;
};
