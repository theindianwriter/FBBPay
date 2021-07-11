const getCartItems = (state = {  }, action = "") => {
    switch (action.type) {
      case "CART_ITEM_ADDED":{
        let newState = JSON.parse(JSON.stringify(state));
        newState[action.payload.id] = action.payload;
        return newState;
      } 
      case "CART_ITEM_DELETED":{
        let newState = JSON.parse(JSON.stringify(state));
        delete newState[action.payload];
        return newState;
      }
      default:
        return state;
    }
  };

  export default getCartItems;