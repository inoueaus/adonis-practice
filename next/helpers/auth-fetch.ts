import { HOST_PORT, HOST_URL } from "../react-env";

type AuthFetch = (
  authType: "login" | "register",
  username: string,
  password: string
) => Promise<{ token: string; username: string; userId: number } | void>;

const authFetch: AuthFetch = async (authType, username, password) => {
  try {
    const result = await fetch(
      `http://${HOST_URL}:${HOST_PORT}/auth/${authType}`,
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      }
    );
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
};

export default authFetch;
