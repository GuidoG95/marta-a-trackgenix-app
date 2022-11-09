import styles from './admins.module.css';
import React, { useState, useEffect } from 'react';
import Modal from '../Shared/Modal';
import Table from '../Shared/Table';
import Button from '../Shared/Button';

const Admins = () => {
  const [admins, saveAdmins] = useState([]);
  const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);
  const [successModalDisplay, setSuccessModalDisplay] = useState(false);
  const [errorModalDisplay, setErrorModalDisplay] = useState(false);
  const headers = ['name', 'lastName', 'email'];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        saveAdmins(response.data);
      });
  }, []);
  const deleteAdmin = (adminId) => {
    fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
      method: 'DELETE'
    });
    const updatedAdminList = admins.filter((admin) => admin._id !== adminId);
    saveAdmins(updatedAdminList);
  };

  const showDeleteModal = () => {
    setDeleteModalDisplay(true);
  };

  const showSuccessModal = () => {
    setSuccessModalDisplay(true);
  };

  const showErrorModal = () => {
    setErrorModalDisplay(true);
  };

  const addEditAdmin = () => {
    alert('holis, vengo a editar o crear admin');
  };

  return (
    <section className={styles.container}>
      <h2>Admin list</h2>
      <Button
        label={'Add admin'}
        theme={'primary'}
        onClick={() => {
          addEditAdmin();
        }}
      />
      <Button
        label={'Success modal'}
        theme={'primary'}
        onClick={() => {
          showSuccessModal();
        }}
      />
      <Button
        label={'Error modal'}
        theme={'primary'}
        onClick={() => {
          showErrorModal();
        }}
      />
      <Table data={admins} headers={headers} editItem={addEditAdmin} deleteItem={showDeleteModal} />
      {deleteModalDisplay ? (
        <Modal
          heading={`Do you want to delete admin ${admins.name} ${admins.lastName}?`}
          setModalDisplay={setDeleteModalDisplay}
          theme={'confirm'}
        >
          <p>This change can not be undone!</p>
          <div className={styles.buttons}>
            <Button
              label={'Cancel'}
              theme={'primary'}
              onClick={() => {
                setDeleteModalDisplay();
              }}
            />
            <Button
              label={'Delete'}
              theme={'tertiary'}
              onClick={() => {
                deleteAdmin(admins._id);
              }}
            />
          </div>
        </Modal>
      ) : null}
      {successModalDisplay ? (
        <Modal
          heading={`Admin ${admins.name} ${admins.lastName} deleted successfully!`}
          setModalDisplay={setSuccessModalDisplay}
          theme={'success'}
        />
      ) : null}
      {errorModalDisplay ? (
        <Modal
          heading={`Could not delete admin ${admins.name} ${admins.lastName}!`}
          setModalDisplay={setErrorModalDisplay}
          theme={'error'}
        />
      ) : null}
    </section>
  );
};

export default Admins;
