export const cartItemAdded = (item) => {
  return {
    type: "CART_ITEM_ADDED",
    payload: item,
  };
};

export const cartItemDeleted = (id) => {
  console.log(id)
  return {
    type: "CART_ITEM_DELETED",
    payload: id,
  };
};
