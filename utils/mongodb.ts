import {MongoClient} from 'mongodb';

const user : string | undefined = process.env.MONGODB_USER;
const password : string | undefined = process.env.MONGODB_PASSWORD;
const host : string | undefined = process.env.MONGODB_HOST;
const database : string | undefined = process.env.MONGODB_DATABASE;

if (!user){
  throw new Error('MONGODB_USER is not set');
}

if (!password){
  throw new Error('MONGODB_PASSWORD is not set');
}

if (!host){
  throw new Error('MONGODB_HOST is not set');
}

if (!database){
  throw new Error('MONGODB_DATABASE is not set');
}

const uri: string = `mongodb+srv://${user}:${password}@${host}/${database}?authSource=admin`

export const connectToDatabase = async () => {
  const client = await MongoClient.connect(uri as string);
  return client.db(database);
}