export default async function handler(req: any, res: any) {
  const response = await fetch("https://resume-product-backend.azurewebsites.net/match-resume-v2", {
    method: 'POST',
    body: req.body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  res.status(200).json(data);  
}
