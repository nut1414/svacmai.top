import { connectToDatabase } from '@utils/mongodb'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  interface Post {
    _id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
  }

  const db = await connectToDatabase()
  const posts = await db.collection('posts')

  posts.find({}).toArray((err, docs) => {
    if (err) {
      res.status(500).json({ message: err.message })
    } else {
      res.status(200).json(docs)
    }
  })
}
