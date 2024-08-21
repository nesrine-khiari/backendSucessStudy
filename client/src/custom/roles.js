export const isUser = (user) => {
  return user.role === "user";
};

export const isResp = (user) => {
  return user.role === "responsable";
};
