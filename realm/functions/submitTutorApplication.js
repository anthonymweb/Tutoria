/**
 * submitTutorApplication (Atlas Function)
 * Run As: System
 */
exports = async function(application) {
  const mongodb = context.services.get("mongodb-atlas");
  const db      = mongodb.db("tutoria");

  // Ensure the correct collection exists
  const existing = await db.listCollections({ name: "tutor_applications" }).toArray();
  if (existing.length === 0) {
    await db.createCollection("tutor_applications");
  }

  // Add timestamp
  application.createdAt = new Date();

  // Insert into tutor_applications
  const res = await db.collection("tutor_applications").insertOne(application);
  return { insertedId: res.insertedId };
};