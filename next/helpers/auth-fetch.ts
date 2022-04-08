import { HOST_URL } from "../react-env";

type AuthFetch = (
  authType: "login" | "register",
  username: string,
  password: string
) => Promise<{ token: string; username: string; userId: number } | false>;

const authFetch: AuthFetch = async (authType, username, password) => {
  try {
    const result = await fetch(
      `${HOST_URL}/auth/${authType}`,
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await result.json();

    //extract response
    const token = data.token;
    const serverUsername = data.username;
    const userId = data.userId;

    if (token && serverUsername && userId) {
      if (typeof userId === "number") {
        return { token, username: serverUsername, userId };
      }
    } else {
      throw Error("Invalid response from server");
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export default authFetch;
