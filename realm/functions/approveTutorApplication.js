exports = async function(applicationId) {
  const { ObjectId } = BSON;
  const applications = context.services.get("mongodb-atlas").db("Tutoria").collection("tutor_applications");
  const users = context.services.get("mongodb-atlas").db("Tutoria").collection("users");

  // Find application
  const app = await applications.findOne({ _id: ObjectId(applicationId) });
  if (!app) throw new Error("Application not found");

  // Generate random password (for email only; real login uses Firebase)
  const password = Math.random().toString(36).slice(-10);

  // Create user in users collection (for reference)
  const user = {
    email: app.email,
    name: app.name,
    role: "tutor",
    password, // Store for email; do NOT use for real auth
    createdAt: new Date(),
    status: "active"
  };
  await users.insertOne(user);

  // Update application status
  await applications.updateOne(
    { _id: ObjectId(applicationId) },
    { $set: { status: "approved", approvedAt: new Date() } }
  );

  // Send approval email
  await context.functions.execute("sendApprovalEmail", app.email, password, app.name);

  return { success: true };
};