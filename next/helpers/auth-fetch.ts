type AuthFetch = (
  authType: "login" | "register",
  username: string,
  password: string
) => Promise<{ token: string; username: string; userId: number } | void>;

const authFetch: AuthFetch = async (authType, username, password) => {
  try {
    const result = await fetch(`http://localhost:3333/auth/${authType}`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await result.json();

    //extract response
    const token = data.token;
    const serverUsername = data.username;
    const userId = data.userId;

    console.log(token, serverUsername, userId);

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
