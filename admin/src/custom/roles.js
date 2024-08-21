export const isUser = (user) => {
  return user?.role === "user";
};

export const isResp = (user) => {
  return user?.role === "responsable";
};

export const isSousAdmin = (user) => {
  return user?.role === "sousadmin";
};

export const isSuperAdmin = (user) => {
  return user?.role === "superadmin";
};
