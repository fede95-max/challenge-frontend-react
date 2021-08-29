export const SaveStorage = async (key, data) => {
  await localStorage.setItem(key, data);
};

export const ReadStorage = async (key) => {
  return await localStorage.getItem(key);
};
export const DeleteStorage = async (key) => {
  return await localStorage.removeItem(key);
};
