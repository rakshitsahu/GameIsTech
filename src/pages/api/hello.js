// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log('the headers are ', typeof req.headers)
  res.status(200).json({ 
    body : req.body,
    headers : req.headers,
  })
}
