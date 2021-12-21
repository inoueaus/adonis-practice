import { HOST_PORT, HOST_URL } from "../react-env";

const joinChatroomFetch = async (
  token: string,
  chatroomName: string,
  userId: number
) => {
  try {
    const results = await fetch(`http://${HOST_URL}:${HOST_PORT}/join-chatroom`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ chatroomName, userId }),
    });

    const data = await results.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default joinChatroomFetch;
