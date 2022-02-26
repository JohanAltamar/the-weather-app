// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  try {
    const { lat, lon, units = "metric" } = req.query;
    if (!lat || !lon) {
      throw new Error("City coordinates are required");
    }
    const { data } = await axios.get(
      `${process.env.OPEN_WEATHER_MAP_AIR_POLLUTION_API_URL}?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
    );
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
}
