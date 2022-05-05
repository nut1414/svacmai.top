import { MongoClient , Db } from 'mongodb'

const globalAny:any = global;

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DATABASE } =
  process.env

if (!MONGODB_USER) {
  throw new Error('MONGODB_USER is not set')
}

if (!MONGODB_PASSWORD) {
  throw new Error('MONGODB_PASSWORD is not set')
}

if (!MONGODB_HOST) {
  throw new Error('MONGODB_HOST is not set')
}

if (!MONGODB_DATABASE) {
  throw new Error('MONGODB_DATABASE is not set')
}

const uri: string = `mongodb+srv://${MONGODB_USER as string | undefined}:${
  MONGODB_PASSWORD as string | undefined
}@${MONGODB_HOST as string | undefined}/${
  MONGODB_DATABASE as string | undefined
}?authSource=admin`

console.log(uri)

let client : any, mongoClientPromise : MongoClient | undefined;

if ((!process.env.NODE_ENV as any) === 'development') {
  if (globalAny._mongoClientPromise) {
    client = new MongoClient(uri);
    globalAny._mongoClientPromise = client.connect();
    console.log('Connection to MongoDB established!');
  }

  mongoClientPromise =globalAny._mongoClientPromise;
  console.log('Initialized MongoDB successfully!');
} else {
  client = new MongoClient(uri);
  mongoClientPromise = client.connect();
  console.log('Connection to MongoDB established!');
}

export default mongoClientPromise;