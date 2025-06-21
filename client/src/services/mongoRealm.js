// If you see a 'Module not found: Error: Can’t resolve "realm-web"', run:
// npm install realm-web
// Using Atlas Data API instead of realm-web

export const submitTutorApplication = async (formData) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
  console.log('🐛 submitTutorApplication SERVER_URL:', SERVER_URL);
  console.log('🐛 payload:', formData);
  const application = { ...formData, status: 'pending', createdAt: new Date().toISOString() };
  if (formData.cv instanceof File) {
    application.cvName = formData.cv.name;
    application.cvData = await fileToBase64(formData.cv);
  }
  // Process ID Proof
  if (formData.idDocument instanceof File) {
    application.idProofName = formData.idDocument.name;
    application.idProofData = await fileToBase64(formData.idDocument);
  }
  // Process Certifications
  if (Array.isArray(formData.certificates) && formData.certificates.length) {
    application.certifications = formData.certificates.map(file => file.name);
    application.certificationsData = await Promise.all(
      formData.certificates.map(file => fileToBase64(file))
    );
  }
  const endpoint = `${SERVER_URL}/api/applications`;
  console.log('🐛 fetch endpoint:', endpoint);
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(application)
  });
  const text = await res.text();
  console.log('🐛 response text:', text);
  let json;
  try {
    json = JSON.parse(text);
  } catch (err) {
    console.error('🐛 JSON parse error:', err);
    throw err;
  }
  if (!res.ok) throw new Error(json.error || text);
  return json;
};

export const getPendingApplications = async () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
  console.log('🐛 getPendingApplications SERVER_URL:', SERVER_URL);
  const endpoint = `${SERVER_URL}/api/applications/pending`;
  console.log('🐛 fetching pending from:', endpoint);
  const res = await fetch(endpoint);
  console.log('🐛 pending status:', res.status);
  const text = await res.text();
  console.log('🐛 pending response text:', text);
  let json;
  try {
    json = JSON.parse(text);
  } catch (err) {
    console.error('🐛 JSON parse error pending:', err);
    throw err;
  }
  if (!res.ok) throw new Error(json.error || text);
  return json;
};

export const approveTutorApplication = async (id) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
  const endpoint = `${SERVER_URL}/api/applications/${id}/approve`;
  console.log('🐛 approving tutor at:', endpoint);
  const res = await fetch(endpoint, { method: 'PATCH' });
  console.log('🐛 approving tutor at:', endpoint);
  console.log('🐛 approve status:', res.status);
  let json = {};
  try {
    json = await res.json();
  } catch (err) {
    console.error('🐛 JSON parse error approve:', err);
  }
  if (!res.ok) {
    const errorMsg = json.error || json.message || 'Approval failed';
    throw new Error(errorMsg);
  }
  return json;
};

export const rejectTutorApplication = async (id) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
  const endpoint = `${SERVER_URL}/api/applications/${id}/reject`;
  console.log('🐛 rejecting tutor at:', endpoint);
  const res = await fetch(endpoint, { method: 'PATCH' });
  console.log('🐛 reject status:', res.status);
  const text = await res.text();
  console.log('🐛 reject response text:', text);
  let json;
  try {
    json = JSON.parse(text);
  } catch (err) {
    console.error('🐛 JSON parse error reject:', err);
    throw err;
  }
  if (!res.ok) throw new Error(json.error || text);
  return json;
};

export const fileToBase64 = (file) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
});

export const getAllTutors = async () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
  const endpoint = `${SERVER_URL}/api/tutors`;
  console.log('🐛 fetching all tutors from:', endpoint);
  const res = await fetch(endpoint);
  console.log('🐛 all tutors status:', res.status);
  const text = await res.text();
  console.log('🐛 all tutors response text:', text);
  let json;
  try {
    json = JSON.parse(text);
  } catch (err) {
    console.error('🐛 JSON parse error all tutors:', err);
    throw err;
  }
  if (!res.ok) throw new Error(json.error || text);
  return json;
};

export const getTutorById = async (id) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
  const endpoint = `${SERVER_URL}/api/tutors/${id}`;
  console.log('🐛 fetching tutor by id from:', endpoint);
  const res = await fetch(endpoint);
  console.log('🐛 tutor by id status:', res.status);
  const text = await res.text();
  console.log('🐛 tutor by id response text:', text);
  let json;
  try {
    json = JSON.parse(text);
  } catch (err) {
    console.error('🐛 JSON parse error tutor by id:', err);
    throw err;
  }
  if (!res.ok) throw new Error(json.error || text);
  return json;
};
