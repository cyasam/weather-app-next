export default async function handler(req, res) {
  const defaultDays = 5;
  const defaultQ = 'london';

  try {
    const response = await fetch(
      `${process.env.WEATHER_API_URL}/forecast.json?q=${
        req.query.q || defaultQ
      }&days=${req.query.days || defaultDays}&key=${
        process.env.WEATHER_API_KEY
      }`
    );

    const { status, statusText } = response;

    if (status >= 400) {
      return res
        .status(status)
        .json({ code: status, errorMessage: statusText });
    }

    const data = await response.json();

    res.status(status).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, errorMessage: 'Something went wrong...' });
  }
}
