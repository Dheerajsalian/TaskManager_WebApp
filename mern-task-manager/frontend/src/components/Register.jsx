import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register(){


  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [error, setError] = useState('');
  const nav = useNavigate();
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();

    try{
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      nav('/');
    }catch(err){ setError(err.response?.data?.msg || 'Registration failed'); }
  };

  return (

    <form onSubmit={onSubmit} className="card">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <input name="name" placeholder="Name" value={form.name} onChange={onChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
      <button type="submit">Register</button>
    </form>
  );
}
