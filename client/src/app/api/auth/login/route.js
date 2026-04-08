import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_HASH = process.env.ADMIN_HASH; 
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const { email, password } = await req.json();

  if (email !== ADMIN_EMAIL) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // TEMPORARY BYPASS: comment out bcrypt check
  // const valid = await bcrypt.compare(password, ADMIN_HASH);
  // if (!valid) {
  //   return Response.json({ error: "Invalid credentials" }, { status: 401 });
  // }

  // Instead, just accept the password directly for now
  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1h" });

  return Response.json({ token });
}
