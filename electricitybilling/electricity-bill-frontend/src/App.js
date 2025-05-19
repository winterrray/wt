import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [consumers, setConsumers] = useState([]);
  const [newConsumer, setNewConsumer] = useState({ name: "", address: "" });
  const [editingConsumer, setEditingConsumer] = useState(null);
  const [consumerId, setConsumerId] = useState("");
  const [units, setUnits] = useState("");
  const [bill, setBill] = useState(null);

  const API = "http://localhost:8080/api";

  useEffect(() => {
    fetchConsumers();
  }, []);

  const fetchConsumers = async () => {
    const res = await axios.get(`${API}/consumers`);
    setConsumers(res.data);
  };

  const handleAddConsumer = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/consumers`, newConsumer);
    setNewConsumer({ name: "", address: "" });
    fetchConsumers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/consumers/${id}`);
    fetchConsumers();
  };

  const handleEdit = (consumer) => {
    setEditingConsumer(consumer);
  };

  const handleUpdateConsumer = async (e) => {
    e.preventDefault();
    await axios.put(`${API}/consumers/${editingConsumer.id}`, editingConsumer);
    setEditingConsumer(null);
    fetchConsumers();
  };

  const handleGenerateBill = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${API}/billing/generate?consumerId=${consumerId}&units=${units}`
    );
    setBill(res.data);
  };

  return (
    <div className="container mt-4">
      <h2>⚡ Electricity Bill Calculator & Consumer Management</h2>

      {/* ➕ Add Consumer */}
      <form className="mt-4" onSubmit={handleAddConsumer}>
        <h4>Add Consumer</h4>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Name"
          value={newConsumer.name}
          onChange={(e) => setNewConsumer({ ...newConsumer, name: e.target.value })}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Address"
          value={newConsumer.address}
          onChange={(e) => setNewConsumer({ ...newConsumer, address: e.target.value })}
          required
        />
        <button className="btn btn-success">Add Consumer</button>
      </form>

      {/* ✏️ Edit Consumer */}
      {editingConsumer && (
        <form className="mt-4" onSubmit={handleUpdateConsumer}>
          <h4>Edit Consumer</h4>
          <input
            type="text"
            className="form-control mb-2"
            value={editingConsumer.name}
            onChange={(e) =>
              setEditingConsumer({ ...editingConsumer, name: e.target.value })
            }
            required
          />
          <input
            type="text"
            className="form-control mb-2"
            value={editingConsumer.address}
            onChange={(e) =>
              setEditingConsumer({ ...editingConsumer, address: e.target.value })
            }
            required
          />
          <button className="btn btn-primary">Update</button>
        </form>
      )}

      {/* 📋 List Consumers */}
      <div className="mt-5">
        <h4>All Consumers</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {consumers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.address}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(c)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔌 Bill Generator */}
      <form className="mt-4" onSubmit={handleGenerateBill}>
        <h4>Generate Bill</h4>
        <select
          className="form-control mb-2"
          value={consumerId}
          onChange={(e) => setConsumerId(e.target.value)}
          required
        >
          <option value="">Select Consumer</option>
          {consumers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} (ID: {c.id})
            </option>
          ))}
        </select>
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Units Consumed"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          required
        />
        <button className="btn btn-info">Generate Bill</button>
      </form>

      {/* 📄 Bill Result */}
      {bill && (
        <div className="mt-4 border p-3 bg-light">
          <h5>Bill Details</h5>
          <p><strong>Bill ID:</strong> {bill.id}</p>
          <p><strong>Units:</strong> {bill.unitsConsumed}</p>
          <p><strong>Amount:</strong> ₹{bill.billAmount.toFixed(2)}</p>
          <p><strong>Date:</strong> {bill.billingDate}</p>
        </div>
      )}
    </div>
  );
}

export default App;


// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [consumerId, setConsumerId] = useState('');
//   const [units, setUnits] = useState('');
//   const [bill, setBill] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await axios.post(`http://localhost:8080/api/billing/generate?consumerId=${consumerId}&units=${units}`);
//     setBill(response.data);
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Electricity Bill Calculator</h2>
//       <form onSubmit={handleSubmit} className="mt-3">
//         <div className="form-group">
//           <label>Consumer ID:</label>
//           <input type="number" className="form-control" value={consumerId} onChange={(e) => setConsumerId(e.target.value)} required />
//         </div>
//         <div className="form-group">
//           <label>Units Consumed:</label>
//           <input type="number" className="form-control" value={units} onChange={(e) => setUnits(e.target.value)} required />
//         </div>
//         <button type="submit" className="btn btn-primary mt-3">Generate Bill</button>
//       </form>

//       {bill && (
//         <div className="mt-4">
//           <h4>Bill Details</h4>
//           <p><strong>Bill ID:</strong> {bill.id}</p>
//           <p><strong>Units Consumed:</strong> {bill.unitsConsumed}</p>
//           <p><strong>Bill Amount:</strong> ₹{bill.billAmount.toFixed(2)}</p>
//           <p><strong>Date:</strong> {bill.billingDate}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;