export enum SavableKeys {
  User = "user",
}

export const getItemFromStorage = (key: SavableKeys) => localStorage.getItem(key);

export const saveItemToStorage = (key: SavableKeys, value: string) => {
  localStorage.setItem(key, value);
};

export const removeItemFromStorage = (key: SavableKeys) => localStorage.removeItem(key);
