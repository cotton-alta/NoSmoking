const DBLoadAction = (state, action) => {
  switch(action.type) {
    case "checkLoad":
      return action.payload;
    default:
      return state;
  }
};

export {
  DBLoadAction
}
