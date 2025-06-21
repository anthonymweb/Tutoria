exports = async function(applicationId) {
  const { ObjectId } = BSON;
  const applications = context.services.get("mongodb-atlas").db("Tutoria").collection("tutor_applications");
  const app = await applications.findOne({ _id: ObjectId(applicationId) });
  if (!app) throw new Error("Application not found");

  await applications.updateOne(
    { _id: ObjectId(applicationId) },
    { $set: { status: "rejected", rejectedAt: new Date() } }
  );

  await context.functions.execute("sendRejectionEmail", app.email, app.name);

  return { success: true };
};