import PropTypes from "prop-types";
import "./UsersList.css";
import { useState } from "react";
const UsersList = ({ users, handleEditUser, handleDelete }) => {
  // Esto podría ir dentro de una carpeta utils, para este caso no se hizo porque no era necesario usarlo en ningún otro lado y la complejidad de la lógica era minima.
  // const formatDate = (dateString) => {
  //   const parts = dateString.split("-");
  //   // Reordenar los componentes de la fecha en el formato esperado "DD/MM/YYYY"
  //   const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  //   return formattedDate;
  // };
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  if (!users.length) {
    return (
      <div className="empty__users__general__container">
        <h3>
          <span>⚠</span> No hay usuarios!
        </h3>
        <div className="empty__users__p__container">
          <hr></hr>
          <p>Crea algunos nuevos usuarios!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid__users__list">
      {users.map((user) => (
        <div key={user.id}>
          <div className="user__card__general__container">
            <h3>
              <b>{`${user.first_name} ${user.last_name}`}</b>
            </h3>
            <ul>
              <li>
                Correo: <span>{user.email}</span>
              </li>
              <li>
                Cumpleaños:
                <span>
                  <i className="bx bx-gift gift"></i>
                  {user.birthday}
                </span>
              </li>
              {/* formatDate(user.birthday) */}
              <li>
                Contraseña: <span>{user.password}</span>
              </li>
            </ul>
            <div className="user__card__btns__general__container">
              <button
                className="delete__btn"
                type="button"
                onClick={() => {
                  setShowConfirmation(true);
                  setUserIdToDelete(user.id);
                }}
              >
                <i className="bx bx-trash"></i>
              </button>
              <button
                className="edit__btn"
                type="button"
                onClick={() => handleEditUser(user.id ? user : null)}
              >
                <i className="bx bx-edit-alt"></i>
              </button>
            </div>
          </div>

          {userIdToDelete === user.id && showConfirmation && (
            <div
              className={
                showConfirmation ? "confirmation__delete__modal" : "modal"
              }
            >
              <div className="confirmation__card">
                <button
                  className="close__confirmation__modal__btn"
                  onClick={() => setShowConfirmation(false)}
                >
                  X
                </button>
                <h3>Alto!</h3>
                <p>
                  Estas seguro de eliminar a el usuario
                  <b>{` ${user.first_name} ${user.last_name}`}</b>
                </p>

                <div>
                  <i className="bx bx-question-mark bx-tada bx__interrogation"></i>
                </div>
                <div className="confirmation__btns">
                  <button
                    className="not__sure__btn"
                    onClick={() => setShowConfirmation(false)}
                  >
                    <span>No</span>
                  </button>
                  <button
                    className="sure__btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    <span>Si</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleEditUser: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default UsersList;
