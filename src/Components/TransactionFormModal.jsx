import React from 'react';
import Modal from 'react-modal';

export default function TransactionFormModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  editing,
  accounts,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Transaction Form"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        },
        content: {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          maxHeight: '90vh',
          overflowY: 'auto',
        },
      }}
    >
      <div className="container p-4 bg-white rounded shadow-sm">
        <h5>{editing ? 'Edit' : 'Add'} Transaction</h5>
        <form onSubmit={onSubmit}>
          <div className="row g-3 my-3">
            <div className="col-md-4">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="transactionDate"
                value={formData.transactionDate}
                onChange={onChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Account</label>
              <select
                name="accountID"
                value={formData.accountID}
                onChange={onChange}
                className="form-select"
                required
              >
                <option value="">-- Select --</option>
                {accounts.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={onChange}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Debit</label>
              <input
                type="number"
                name="debitAmount"
                step="0.01"
                value={formData.debitAmount}
                onChange={onChange}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Credit</label>
              <input
                type="number"
                name="creditAmount"
                step="0.01"
                value={formData.creditAmount}
                onChange={onChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              {editing ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
