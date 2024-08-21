export const isFree = (user) => {
  return (
    user.plan === "free" || user.plan === "starter" || user.plan === "premium"
  );
};

export const isStandar = (user) => {
  return user.plan === "premium" || user.plan === "starter";
};

export const isPremium = (user) => {
  return user.plan === "premium";
};
