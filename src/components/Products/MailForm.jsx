import React, { useState } from 'react';

const AuthForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      // Перевірити, чи користувач уже існує
      if (userExists) {
        console.log('Користувач уже існує');
        return;
      }

      // Виконати логіку для реєстрації користувача
      console.log('Реєстрація:', firstName, lastName, email, password);

      // Скидання значень полів після реєстрації
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');

      // Встановлення флагу авторизації
      setIsLoggedIn(true);
    } else {
      // Виконати логіку для авторизації користувача
      console.log('Авторизація:', email, password);

      // Скидання значень полів після авторизації
      setEmail('');
      setPassword('');

      // Встановлення флагу авторизації
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    return (
      <div>
        <h2>Привіт, {firstName} {lastName}!</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>{isRegistering ? 'Реєстрація' : 'Авторизація'}</h2>
      {userExists && <p>Користувач уже існує</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Ім'я:
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </label>
        <label>
          Прізвище:
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </label>
        <label>
          Електронна пошта:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <label>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        <button type="submit">{isRegistering ? 'Зареєструватися' : 'Увійти'}</button>
      </form>
      <p>
        {isRegistering ? "Маєте обліковий запис?" : "Не маєте облікового запису?"}{' '}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Увійти' : 'Зареєструватися'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
