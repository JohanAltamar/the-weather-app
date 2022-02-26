// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  try {
    const { name } = req.query;
    if (!name) {
      throw new Error("City is required");
    }
    const { data } = await axios.get(
      `${process.env.OPEN_WEATHER_MAP_GEO_API_URL}?q=${name}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
    );
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
}
