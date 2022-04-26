import api from "@/api";
import { Platforms } from "@/components/home/games/games.types";
import { store } from "..";
import { ActionsType, CartItem } from "../types";

export function getCart(login: string) {
  return async (dispatch: (arg0: { type: ActionsType; payload: CartItem[] }) => void) => {
    const response = await api.get<CartItem[]>(`/api/getCart/${login}`);
    const { data } = response;
    dispatch({ type: ActionsType.GET_CART, payload: data });
  };
}

export function addCartItem(values: { id: number; name: string; price: number; platforms: Platforms[] }) {
  return async (dispatch: (arg0: { type: ActionsType; payload: CartItem }) => void) => {
    const response = await api.post("/api/addCartItem", { ...values, login: store.getState().auth.username });
    const cartItem = response.data;
    dispatch({ type: ActionsType.ADD_CART_ITEM, payload: cartItem });
  };
}

export function clearCart(login: string) {
  return async (dispatch: (arg0: { type: ActionsType }) => void) => {
    await api.delete(`/api/clearCart/${login}`);
    dispatch({ type: ActionsType.CLEAR_CART });
  };
}

export function deleteCartItem(name: string) {
  return async (dispatch: (arg0: { type: ActionsType; payload: string }) => void) => {
    await api.delete("/api/deleteCartItem", { params: { name, login: store.getState().auth.username } });
    dispatch({ type: ActionsType.DELETE_CART_ITEM, payload: name });
  };
}

export function updateCartItem(values: { name: string; amount: number; platform: Platforms }) {
  return async (dispatch: (arg0: { type: ActionsType; payload: CartItem }) => void) => {
    const response = await api.post("/api/updateCartItem", { ...values, login: store.getState().auth.username });
    const cart = response.data;
    dispatch({ type: ActionsType.UPDATE_CART_ITEM, payload: cart });
  };
}

export function buyCart(orderedItems: CartItem[]) {
  return async (dispatch: (arg0: { type: ActionsType }) => void) => {
    await api.post("/api/buy", { orderedItems, login: store.getState().auth.username });
    dispatch({ type: ActionsType.BUY_ORDER });
  };
}
