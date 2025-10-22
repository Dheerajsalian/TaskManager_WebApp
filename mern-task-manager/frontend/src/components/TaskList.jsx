import React, { useEffect, useState } from 'react';
import API from '../api';
import TaskForm from './TaskForm';

export default function TaskList(){
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const fetchTasks = async () => {
    try{ const res = await API.get('/tasks'); setTasks(res.data); setLoading(false);}catch(err){ console.error(err); }
  };

  useEffect(()=>{ fetchTasks(); },[]);

  const remove = async id => { if (!confirm('Delete task?')) return; await API.delete(`/tasks/${id}`); fetchTasks(); };
  const toggleStatus = async t => { await API.put(`/tasks/${t._id}`, { status: t.status==='Pending' ? 'Completed':'Pending' }); fetchTasks(); };

  return (
    <div>
      <TaskForm onSaved={fetchTasks} editing={editing} />
      {loading ? <p>Loading...</p> : (
        <div className="task-grid">
          {tasks.map(t=> (
            <div key={t._id} className="task-card">
              <h3>{t.title}</h3>
              <p>{t.description}</p>
              <p>Status: {t.status}</p>

              <div className="task-actions">
                <button onClick={()=>{ setEditing(t); }}>Edit</button>
                <button onClick={()=>toggleStatus(t)}>{t.status==='Pending' ? 'Mark Completed':'Mark Pending'}</button>
                <button onClick={()=>remove(t._id)}>Delete</button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
