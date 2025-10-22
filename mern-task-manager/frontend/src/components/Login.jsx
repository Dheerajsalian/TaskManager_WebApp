import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const [error, setError] = useState('');
  const nav = useNavigate();
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    try{
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      nav('/');
    }catch(err){ setError(err.response?.data?.msg || 'Login failed'); }
  };


  return (
    <form onSubmit={onSubmit} className="card">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
      <button type="submit">Login</button>
    </form>
  );
}
