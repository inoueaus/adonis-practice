const logoutFetch = async (token: string) => {
  const results = await fetch("http://localhost:3333/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  
  const data = await results.json();

  console.log(data);
};

export default logoutFetch;
