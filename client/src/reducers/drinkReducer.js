import data from "../data/drinkData.json";

export default function drinkReducer(state = data, action) {
  switch (action.type) {
    case "ADD_DRINK":
      return [...state, action.payload];
    case "DELETE_DRINK":
      return state.filter((drink) => drink.id !== action.payload);
    case "UPDATE_DRINK":
      return state.map((drink) => {
        if (drink.id === action.payload.id) {
          return action.payload;
        }
        return drink;
      });
    default:
      return state;
  }
}
