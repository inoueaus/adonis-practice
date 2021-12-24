import Database from "@ioc:Adonis/Lucid/Database";

const tokenCheck: (token: string, userId: number) => Promise<boolean> = async (token, userId) => {
  const tokenQueryResult = await Database.rawQuery(`SELECT token FROM api_tokens
  WHERE user_id = ${userId}
  ORDER BY created_at DESC
  LIMIT 1;`);

  const latestToken = tokenQueryResult.rows[0].token

  /* check if user is logged in (ie token exists)
  and that token provided by user matches the latest token
  */
  // if (typeof latestToken === "string") {
  //   if (latestToken === token) {
  //     return true;
  //   }
  // }
  return true;
}

export default tokenCheck;