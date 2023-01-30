// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { addUser } from "services/auth";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dbResponse: any = await addUser({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  });

  if (dbResponse?.code || dbResponse?.err) {
    res.status(400).json({ ...dbResponse });
  }

  res.status(200).json(dbResponse);
}
