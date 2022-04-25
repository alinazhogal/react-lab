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
    // могу ли просто делать гет?
    dispatch({ type: ActionsType.ADD_CART_ITEM });
  };
}

export function deleteCartItem(name: string) {
  return async (dispatch: (arg0: { type: ActionsType; payload: string }) => void) => {
    await api.delete("/api/deleteCartItem", { params: { name, login: store.getState().auth.username } });
    dispatch({ type: ActionsType.DELETE_CART_ITEM, payload: name });
  };
}
