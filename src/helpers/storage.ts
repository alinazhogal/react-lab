export const enum SavableKeys {
  User = "user",
}

export const getItemFromStorage = (key: SavableKeys) =>
  typeof window !== "undefined" ? localStorage.getItem(key) : null;

export const saveItemToStorage = (key: SavableKeys, value: string) =>
  typeof window !== "undefined" ? localStorage.setItem(key, value) : null;

export const removeItemFromStorage = (key: SavableKeys) =>
  typeof window !== "undefined" ? localStorage.removeItem(key) : null;
