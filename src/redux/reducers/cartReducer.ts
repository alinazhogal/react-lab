import {
  ActionsType,
  AddCartItem,
  BuyOrder,
  CartItem,
  ClearCart,
  DeleteCartItem,
  GetCart,
  UpdateCartItem,
} from "../types";

const initialState: CartItem[] = [];

const modalReducer = (
  // eslint-disable-next-line default-param-last
  state: CartItem[] = initialState,
  action: AddCartItem | GetCart | UpdateCartItem | DeleteCartItem | BuyOrder | ClearCart
) => {
  switch (action.type) {
    case ActionsType.GET_CART:
      return action.payload;
    case ActionsType.ADD_CART_ITEM:
      return [...state, action.payload];
    case ActionsType.CLEAR_CART:
      return [];
    case ActionsType.DELETE_CART_ITEM:
      return state.filter((item) => item.name !== action.payload);
    case ActionsType.UPDATE_CART_ITEM:
      return action.payload;
    case ActionsType.BUY_ORDER:
      return [];
    default:
      return state;
  }
};
export default modalReducer;
