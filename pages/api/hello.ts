import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { name } = req.body;

    res.json(`Hello ${name}!`);
}