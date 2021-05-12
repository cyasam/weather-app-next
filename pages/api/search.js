export default async function handler(req, res) {
  try {
    const query = req.query.q;
    const response = await fetch(
      `${process.env.WEATHER_API_URL}/search.json?${
        query ? `q=${req.query.q}` : ''
      }&key=${process.env.WEATHER_API_KEY}`
    );

    const { status } = response;

    const data = await response.json();

    return res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ error: { code: 500, message: err.message } });
  }
}
