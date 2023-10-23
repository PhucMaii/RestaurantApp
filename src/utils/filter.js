export const filterByRating = (list, setList) => {
  const newList = [...list];
  newList.sort((a, b) => {
    if (!a.rating) {
      a.rating = 0;
    }
    if (!b.rating) {
      b.rating = 0;
    }
    return b.rating - a.rating;
  });
  setList(newList);
};

export const calculatePopularity = (docList) => {
  let numberOfOrders = 0;
  docList.forEach(() => {
    numberOfOrders++;
  });
  return numberOfOrders;
};
