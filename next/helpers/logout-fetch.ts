import { HOST_URL } from "../react-env";

const logoutFetch = async (token: string) => {
  try {
    const results = await fetch(`${HOST_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await results.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export default logoutFetch;
