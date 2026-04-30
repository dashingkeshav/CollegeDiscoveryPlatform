const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const MOCK_USER_ID = 'mock-user-123';

function getHeaders() {
  return { 'Content-Type': 'application/json' };
}

export async function fetchColleges(search = '', location = '', maxFees = '') {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (location) params.append('location', location);
  if (maxFees) params.append('maxFees', maxFees);

  const res = await fetch(`${API_URL}/colleges?${params.toString()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch colleges');
  return res.json();
}

export async function fetchCollegeById(id: string) {
  const res = await fetch(`${API_URL}/colleges/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch college');
  return res.json();
}

export async function predictColleges(exam: string, rank: string) {
  const res = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ exam, rank }),
  });
  if (!res.ok) throw new Error('Failed to predict colleges');
  return res.json();
}

export async function getSavedColleges(userId = MOCK_USER_ID) {
  const res = await fetch(`${API_URL}/users/${userId}/saved`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function toggleSavedCollege(userId = MOCK_USER_ID, collegeId: string, isSaved: boolean) {
  if (isSaved) {
    const res = await fetch(`${API_URL}/users/${userId}/saved/${collegeId}`, { 
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.ok;
  } else {
    const res = await fetch(`${API_URL}/users/${userId}/saved`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ collegeId }),
    });
    return res.ok;
  }
}

export async function fetchQuestions() {
  const res = await fetch(`${API_URL}/questions`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
}

export async function createQuestion(title: string, content: string) {
  const res = await fetch(`${API_URL}/questions`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error('Failed to create question');
  return res.json();
}

export async function createAnswer(questionId: string, content: string) {
  const res = await fetch(`${API_URL}/questions/${questionId}/answers`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error('Failed to create answer');
  return res.json();
}
