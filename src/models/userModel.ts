import user from "../routes/user";
import { query } from "../utils/db";

export async function createUser(payload: {
  username: string;
  email: string;
  password: string;
}) {
  const { username, email, password } = payload;

  const res = await query(
    `INSERT INTO users (username, email, password) 
     VALUES ($1, $2, $3, 'USER')
     RETURNING`,
    [username, email, password]
  );

  return res.rows[0];
}

export async function getUserById(userId: string) {
  const res = await query("SELECT * FROM users WHERE id = $1", [userId]);

  return res.rows[0] || null;
}

export async function getUserByEmail(email: string) {
  const res = await query("SELECT * FROM users WHERE email = $1", [email]);

  return res.rows[0] || null;
}

export async function updateUserById(id: string, payload: any) {
  const { username, image } = payload;

  const res = await query(
    `UPDATE users SET 
     username = COALESCE($1, username)
     image = COALESCE($2, image)
     WHERE id = $3
     RETURNING id, username, email, image`,
    [username, image, id]
  );

  return res.rows[0];
}
