export const users = [{ id: 1, email: "test@email.com", password: "test" }];

export const signIn = data => {
  console.log("signIn");
  const userData = JSON.stringify(data);
  localStorage.setItem("userData", userData);
};

export const signOut = () => {
  console.log("signOut");
  localStorage.removeItem("userData");
};
