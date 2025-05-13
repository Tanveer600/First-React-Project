import React, { useEffect, useState } from 'react';
import {
  getAccounts,
  addAccount,
  updateAccount,
  deleteAccount,
} from '../Services/AccountService';

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ id: 0, name: '', accountType: '' });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    const res = await getAccounts();
    setAccounts(res.data);
  };

  const openModal = (account = null) => {
    if (account) {
      setFormData(account);
      setEditing(true);
    } else {
      setFormData({ id: 0, name: '', accountType: '' });
      setEditing(false);
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    editing ? await updateAccount(formData) : await addAccount(formData);
    setShowModal(false);
    loadAccounts();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteAccount(id);
      loadAccounts();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Accounts</h2>
      <button className="btn btn-success mb-3" onClick={() => openModal()}>Add Account</button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Account Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.accountType}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => openModal(a)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{editing ? 'Edit Account' : 'Add Account'}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Account Type</label>
                    <input
                      type="text"
                      name="accountType"
                      value={formData.accountType}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    {editing ? 'Update' : 'Add'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
