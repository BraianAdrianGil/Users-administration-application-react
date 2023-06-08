import PropTypes from "prop-types";
import "./Header.css";
import "@fortawesome/fontawesome-free/css/all.css";

const Header = ({ handleCreateUserModal }) => {
  return (
    <header className="header__general__container">
      <h1>Usuarios</h1>
      <button type="button" onClick={() => handleCreateUserModal()}>
        <span>
          <i
            className="fa-solid fa-user-plus fa-bounce"
            style={{ color: "#f2f2f2" }}
          ></i>
        </span>
        Crear nuevo usuario
      </button>
    </header>
  );
};

Header.propTypes = {
  handleCreateUserModal: PropTypes.func.isRequired,
};

export default Header;
