import mongoClientPromise from '@lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  const database : any  = await mongoClientPromise;

  let databaseStatus : boolean;
  try {
    await database.db().collection('test').findOne({}, { projection: { _id: false } });
    databaseStatus = true;
  } catch {
    databaseStatus  = false;
  }

  
  res.status(200).json({
    message: 'Comcamp33 api, developed by CPE @ KMUTT',
    timestamp: new Date(),
    status: {
      database: databaseStatus
    }
  });
};