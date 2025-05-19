import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:3001';

function App() {
  const [consumers, setConsumers] = useState([]);
  const [formData, setFormData] = useState({ name: '', address: '' });
  const [editId, setEditId] = useState(null);
  const [units, setUnits] = useState('');
  const [selectedConsumerId, setSelectedConsumerId] = useState(null);
  const [billResult, setBillResult] = useState(null);
  const [billHistory, setBillHistory] = useState({});

  const fetchConsumers = async () => {
    const res = await axios.get(`${API_URL}/consumers`);
    setConsumers(res.data);
  };

  const fetchBills = async (consumerId) => {
    const res = await axios.get(`${API_URL}/bills/${consumerId}`);
    setBillHistory(prev => ({ ...prev, [consumerId]: res.data }));
  };


  useEffect(() => {
    fetchConsumers();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/consumer/${editId}`, formData);
    } else {
      await axios.post(`${API_URL}/consumer`, formData);
    }
    setFormData({ name: '', address: '' });
    setEditId(null);
    fetchConsumers();
  };

  const handleEdit = (consumer) => {
    setFormData({ name: consumer.name, address: consumer.address });
    setEditId(consumer.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this consumer?")) {
      await axios.delete(`${API_URL}/consumer/${id}`);
      fetchConsumers();
    }
  };

  const handleBillSubmit = async (e) => {
    e.preventDefault();
    if (!selectedConsumerId || units === '') return;

    const res = await axios.post(`${API_URL}/billing`, {
      consumer_id: selectedConsumerId,
      units: Number(units),
    });
    setBillResult(res.data);
    setUnits('');
    setSelectedConsumerId(null);
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Electricity Billing System</h2>

      {/* Add/Edit Consumer */}
      <div className="card mb-4">
        <div className="card-header">{editId ? "Edit Consumer" : "Add Consumer"}</div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-5">
              <input
                className="form-control"
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-5">
              <input
                className="form-control"
                type="text"
                name="address"
                value={formData.address}
                placeholder="Address"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-primary" type="submit">
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Consumers List */}
      <div className="card mb-4">
        <div className="card-header">Consumers</div>
        <ul className="list-group list-group-flush">
          {consumers.map(consumer => (
            <li key={consumer.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <strong>{consumer.name}</strong><br />
                  <small className="text-muted">{consumer.address}</small>
                </div>
                <div>
                  <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(consumer)}>Edit</button>
                  <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(consumer.id)}>Delete</button>
                  <button className="btn btn-sm btn-secondary" onClick={() => fetchBills(consumer.id)}>View Bills</button>
                </div>
              </div>

              {billHistory[consumer.id] && (
                <div className="mt-3">
                  <h6>Bills:</h6>
                  <ul className="list-group">
                    {billHistory[consumer.id].map((bill, idx) => (
                      <li key={idx} className="list-group-item">
                        <strong>Units:</strong> {bill.units} | <strong>Amount:</strong> ₹{bill.amount}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>


      {/* Generate Bill */}
      <div className="card">
        <div className="card-header">Generate Bill</div>
        <div className="card-body">
          <form onSubmit={handleBillSubmit} className="row g-3 align-items-end">
            <div className="col-md-5">
              <select
                className="form-select"
                value={selectedConsumerId || ''}
                onChange={(e) => setSelectedConsumerId(e.target.value)}
                required
              >
                <option value="" disabled>Select Consumer</option>
                {consumers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.address})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-5">
              <input
                className="form-control"
                type="number"
                min="0"
                placeholder="Units consumed"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                required
              />
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-success" type="submit">Generate</button>
            </div>
          </form>

          {billResult && (
            <div className="alert alert-info mt-3">
              ₹ {billResult.amount} bill generated for selected consumer.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
