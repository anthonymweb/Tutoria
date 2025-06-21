exports = async function(email, password, name) {
  const apiKey = context.secrets.get("RESEND_API_KEY");
  const response = await context.http.post({
    url: "https://api.resend.com/emails",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "Tutoria <noreply@your-domain.com>", // Use your verified sender or Resend's default
      to: email,
      subject: "You have been approved as a Tutor!",
      text: `Dear ${name},\n\nCongratulations! You have been approved as a tutor.\n\nLogin Email: ${email}\nPassword: ${password}\n\nLogin at: https://your-app-url/login\n\nBest regards,\nTutoria Team`
    })
  });
  return response;
};