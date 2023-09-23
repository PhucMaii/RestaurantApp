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
