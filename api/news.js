export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { q = 'ALL', language = 'hi', page = '1', pageSize = '24' } = req.query || {};
  const apiKey = '6ebd28bfe2cf43818b8d10da03af90a3';
  const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&pageSize=${pageSize}&page=${page}&language=${language}&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message, status: "error" });
  }
}
