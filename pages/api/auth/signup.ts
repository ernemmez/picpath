import type { NextApiRequest, NextApiResponse } from "next";
import { addUser } from "services/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  try {
    const user = await addUser({ email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(401).json({ message: "Error - 401", error: err });
  }
}
