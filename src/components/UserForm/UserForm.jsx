import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import "./UserForm.css";
import { useEffect } from "react";

const UserForm = ({
  handleCloseModal,
  isVisibleModal,
  handleSend,
  editingUserData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const modalClassName = `modal ${isVisibleModal ? "visible" : ""}`;

  const isEditing = !!editingUserData;

  const editAndCreateHandle = (data) => {
    if (isEditing) {
      handleSend({ id: editingUserData.id, ...data });
    } else {
      handleSend(data);
    }
    handleCloseModal();
    reset();
  };

  useEffect(() => {
    if (editingUserData) {
      Object.keys(editingUserData).forEach((key) =>
        setValue(key, editingUserData[key])
      );
    } else {
      reset();
    }
  }, [editingUserData, reset, setValue]);

  return (
    <div className={modalClassName}>
      <form
        className="user__form__container"
        onSubmit={handleSubmit(editAndCreateHandle)}
      >
        <h2>{isEditing ? "Editar Usuario" : "Nuevo Usuario"}</h2>
        <button
          className="user__form__close__btn"
          type="button"
          onClick={() => {
            handleCloseModal();
            reset();
          }}
        >
          X
        </button>

        <div className="user__form__input__container">
          <label htmlFor="nameId">
            <b>Nombres: </b>
          </label>
          <input
            type="text"
            placeholder="Mi nombre"
            id="nameId"
            {...register("first_name", { required: true })}
          />
          {errors.first_name && (
            <span className="error-message">Campo obligatorio</span>
          )}
        </div>

        <div className="user__form__input__container">
          <label htmlFor="lastNameId">
            <b>Apellido: </b>
          </label>
          <input
            type="text"
            placeholder="Mi Apellido"
            id="lastNameId"
            {...register("last_name", { required: true })}
          />
          {errors.last_name && (
            <span className="error-message">Campo obligatorio</span>
          )}
        </div>

        <div className="user__form__input__container">
          <label htmlFor="emailId">
            <b>Correo: </b>
          </label>
          <input
            autoComplete="on"
            type="email"
            placeholder="Ejemplo@gmail.com"
            id="emailId"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.email?.type === "required" && (
            <span className="error-message">Campo obligatorio</span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="error-message">Formato de correo inválido</span>
          )}
        </div>

        <div className="user__form__input__container">
          <label htmlFor="passwordId">
            <b>Password: </b>
          </label>
          <input
            type="password"
            placeholder="xxx-xxx-xxx"
            id="passwordId"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="error-message">Campo obligatorio</span>
          )}
        </div>

        <div className="user__form__input__container">
          <label htmlFor="birthdayId">
            <b>Cumpleaños: </b>
          </label>
          <input
            className="input__date"
            type="date"
            placeholder="30/12/1995"
            id="birthdayId"
            {...register("birthday", { required: true })}
          />
          {errors.birthday && (
            <span className="error-message">Campo obligatorio</span>
          )}
        </div>

        <button className="input__btn__submit" type="submit">
          <span>{isEditing ? "Guardar Cambios" : "Agregar nuevo usuario"}</span>
        </button>
      </form>
    </div>
  );
};

UserForm.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  isVisibleModal: PropTypes.bool.isRequired,
  handleSend: PropTypes.func.isRequired,
  editingUserData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
};

export default UserForm;
