import React, {transactions, useEffect, useState } from 'react';
import Modal from 'react-modal';
import TransactionFormModal from './TransactionFormModal.jsx';
import TransactionTable from './TransactionTable.jsx';
import { getAccounts } from '../Services/AccountService.js';
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from '../Services/TransactionService.js';

Modal.setAppElement('#root');

export default function Transaction() {
const [transactions, setTransactions] = useState([]);

  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    transactionDate: '',
    accountID: '',
    description: '',
    debitAmount: 0,
    creditAmount: 0,
  });
  const [editing, setEditing] = useState(false);

  const fetchData = async () => {
    const txRes = await getTransactions();
    setTransactions(txRes.data);
    const accRes = await getAccounts();
    setAccounts(accRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (tx = null) => {
    if (tx) {
      setFormData({
        id: tx.id,
        transactionDate: tx.transactionDate.slice(0, 10),
        accountID: tx.accountID,
        description: tx.description || '',
        debitAmount: tx.debitAmount,
        creditAmount: tx.creditAmount,
      });
      setEditing(true);
    } else {
      setFormData({
        id: 0, transactionDate: '', accountID: '', description: '',
        debitAmount: 0, creditAmount: 0,
      });
      setEditing(false);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);
const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fd => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (editing) {
      await updateTransaction(formData);
    } else {
      await addTransaction(formData);
    }
    fetchData();
    closeModal();
  };

  const handleDelete = async id => {
    if (window.confirm('Delete this transaction?')) {
      await deleteTransaction(id);
      fetchData();
    }
  };
const filteredTransactions = transactions.filter((t) =>
  t.description.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
 <div className="container mt-5 pt-4">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h2>Transactions</h2>
    <button className="btn btn-success btn-sm" onClick={() => openModal()}>
      + Add New
    </button>
  </div>

  {/* Search Bar */}
  <div className="mb-3">
    <input
      type="text"
      className="form-control"
      placeholder="Search transactions..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  </div>

  <TransactionTable
    transactions={filteredTransactions}
    accounts={accounts}
    onEdit={openModal}
    onDelete={handleDelete}
  />

  <TransactionFormModal
    isOpen={modalIsOpen}
    onClose={closeModal}
    onSubmit={handleSubmit}
    formData={formData}
    onChange={handleChange}
    editing={editing}
    accounts={accounts}
  />
</div>


  );
}
