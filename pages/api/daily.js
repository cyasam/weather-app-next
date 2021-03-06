export default async function handler(req, res) {
  const defaultDays = 5;

  try {
    const query = req.query.q;
    const response = await fetch(
      `${process.env.WEATHER_API_URL}/forecast.json?${
        query ? `q=${req.query.q}` : ''
      }&days=${req.query.days || defaultDays}&key=${
        process.env.WEATHER_API_KEY
      }`
    );

    const { status } = response;

    const data = await response.json();

    return res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ error: { code: 500, message: err.message } });
  }
}
