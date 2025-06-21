exports = async function(email, name) {
  const apiKey = context.secrets.get("RESEND_API_KEY");
  const response = await context.http.post({
    url: "https://api.resend.com/emails",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "Tutoria <noreply@your-domain.com>",
      to: email,
      subject: "Your Tutor Application Status",
      text: `Dear ${name},\n\nWe regret to inform you that your tutor application was not successful at this time.\n\nBest regards,\nTutoria Team`
    })
  });
  return response;
};