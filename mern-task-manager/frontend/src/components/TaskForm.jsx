import React, { useState, useEffect } from 'react';
import API from '../api';

export default function TaskForm({ onSaved, editing=null }){

  const [task, setTask] = useState({ title:'', description:'', status:'Pending' });
  useEffect(()=>{ if(editing) setTask(editing); else setTask({ title:'', description:'', status:'Pending' }); },[editing]);
  const onChange = e => setTask({ ...task, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    try{
      if (editing && editing._id) {
        await API.put(`/tasks/${editing._id}`, task);
      } else {
        await API.post('/tasks', task);
      }
      setTask({ title:'', description:'', status:'Pending' });
      onSaved();
    }
catch(err){ console.error(err); }
  };

  return (
    <form onSubmit={onSubmit} className="card">
      <input name="title" placeholder="Title" value={task.title} onChange={onChange} required />
      <textarea name="description" placeholder="Description" value={task.description} onChange={onChange} />
      <select name="status" value={task.status} onChange={onChange}>
        <option>Pending</option>
        <option>Completed</option>
      </select>
      <button type="submit">{editing? 'Update':'Add'} Task</button>
    </form>
  );
}
