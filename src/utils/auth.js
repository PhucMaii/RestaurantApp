export const isAuthenticated = () => {
  const isAuthenticated = localStorage.getItem('current-user');
  return isAuthenticated ? true : false;
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
