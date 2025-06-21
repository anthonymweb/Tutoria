require('dotenv').config();
const { MongoClient } = require('mongodb');

async function dropPhoneIndex() {
  const uri = process.env.MONGO_URI;
  
  if (!uri) {
    console.error('MONGO_URI environment variable is not set');
    process.exit(1);
  }

  console.log('Connecting to MongoDB...');
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected successfully to server');
    
    const db = client.db('Tutoria');
    const users = db.collection('users');
    
    // Check if index exists before dropping
    const indexes = await users.indexes();
    const phoneIndex = indexes.find(index => index.name === 'phone_1');
    
    if (phoneIndex) {
      console.log('Dropping phone_1 index...');
      await users.dropIndex('phone_1');
      console.log('Successfully dropped phone_1 index');
    } else {
      console.log('phone_1 index does not exist');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

dropPhoneIndex();
