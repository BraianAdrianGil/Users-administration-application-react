import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import UsersList from "./components/UsersList/UsersList";
import UserForm from "./components/UserForm/UserForm";
import { getAllUsers } from "./services/getAllUsers";
import { createUser } from "./services/createUser";
import { updateUser } from "./services/updateUser";
import { deleteUserById } from "./services/deleteUserById";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [editingUserData, setEditingUserData] = useState(null);

  const loadUsers = async () => {
    const usersData = await getAllUsers();
    setUsers(usersData);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUserModal = () => {
    setIsVisibleModal(true);
    setEditingUserData(null);
  };

  const handleCloseModal = () => {
    setIsVisibleModal(false);
    setEditingUserData(null);
  };

  const handleEditUser = (userData) => {
    setIsVisibleModal(true);
    setEditingUserData(userData);
  };

  const handleSend = async (data) => {
    if (editingUserData && editingUserData.id) {
      await updateUser(editingUserData.id, data);
    } else {
      await createUser(data);
    }
    await loadUsers();
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    await deleteUserById(id);
    await loadUsers();
  };

  return (
    <div className="App">
      <Header handleCreateUserModal={handleCreateUserModal} />
      <UsersList
        users={users}
        handleEditUser={handleEditUser}
        handleDelete={handleDelete}
      />

      <UserForm
        handleCloseModal={handleCloseModal}
        isVisibleModal={isVisibleModal}
        handleSend={handleSend}
        editingUserData={editingUserData}
      />
    </div>
  );
}

export default App;
