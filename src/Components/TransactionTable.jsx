import React from 'react';

export default function TransactionTable({ transactions, accounts, onEdit, onDelete }) {
  return (
    <table className="table table-bordered table-striped table-hover">
      <thead className="table-dark">
        <tr>
          <th>Date</th>
          <th>Account</th>
          <th>Description</th>
          <th>Debit</th>
          <th>Credit</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(tx => (
          <tr key={tx.id}>
            <td>{tx.transactionDate.slice(0, 10)}</td>
            <td>{accounts.find(a => a.id === tx.accountID)?.name || tx.accountID}</td>
            <td>{tx.description}</td>
            <td>{tx.debitAmount}</td>
            <td>{tx.creditAmount}</td>
            <td>
              <button className="btn btn-primary btn-sm me-2" onClick={() => onEdit(tx)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(tx.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
