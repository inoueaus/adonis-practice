type RegisterFetch = (username: string, password: string) => { token: string };

const registerFetch: RegisterFetch = async (username, password) => {
  try {
    const result = await fetch("localhost:3333", { method: "POST", body: JSON.stringify({ username, password }) });
  } catch (error) {}
};

export default registerFetch;
