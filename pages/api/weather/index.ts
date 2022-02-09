// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  try {
    const { city, units = "metric" } = req.query;
    if (!city) {
      throw new Error("city is required");
    }
    const { data } = await axios.get(
      `${process.env.OPEN_WEATHER_MAP_BASE_URL}?q=${city}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=${units}`
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
