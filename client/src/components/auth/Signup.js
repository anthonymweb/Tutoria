import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Store role in Firestore or Realtime Database
      // You'll need to implement this part
      
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div>
        <label>
          <input 
            type="radio" 
            value="student" 
            checked={role === 'student'} 
            onChange={() => setRole('student')} 
          />
          Student
        </label>
        <label>
          <input 
            type="radio" 
            value="tutor" 
            checked={role === 'tutor'} 
            onChange={() => setRole('tutor')} 
          />
          Tutor
        </label>
      </div>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit" disabled={loading}>Sign Up</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}
