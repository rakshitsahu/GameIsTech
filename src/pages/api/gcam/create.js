import axios from "axios"
export default async function create(req, res) {
    console.log(req.headers)
    res.status(200).json({status : "connected"})
  }