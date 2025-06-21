exports = async function() {
  const collection = context.services.get("mongodb-atlas").db("Tutoria").collection("tutor_applications");
  return await collection.find({ status: "approved" }).toArray();
};