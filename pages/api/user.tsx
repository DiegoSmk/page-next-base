import { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../utils/database'

interface ErrorResponseType {
  error: string
}

interface SuccessResponseType {
  _id: string
  name: string
  email: string
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const { name, email } = req.body

    if (!name || !email) {
      res.status(400).json({ error: 'Missing parameter' })
      return
    }

    const { db } = await connect()

    const response = await db.collection('users').insertOne({
      name,
      email
    })

    res.status(200).json(response.ops[0])
  } else {
    res.status(400).json({ error: 'error' })
  }
}
