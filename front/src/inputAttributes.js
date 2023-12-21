const inputAttributes = {
  regex: {
    username: /^(?![- ])[a-zA-ZÀ-ÿ0-9 -]*[^- ]$/,
    email: /^\w[\w.-_]*@\w[\w.-_]*(?:\.\w[\w-]*)+$/,
    password:
      /^(?=.*[a-zà-ÿ])(?=.*[A-ZÀ-Ÿ])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-zÀ-ÿ\d@$!%*?&.]{8,}$/,
  },

  title: {
    username: `Le champ doit contenir uniquement des lettres et/ou chiffres.`,
    email: `Le champ doit être une adresse email valide, example@email.com`,
    password: `Le champ doit contenir au minimum 8 caractères dont :
            \n- Une ou plusieurs lettres majuscules
            \n- Une ou plusieurs lettres minuscules
            \n- Un ou plusieurs chiffres
            \n- Un ou plusieurs caractères spécifiques parmi les suivants ( @ $ ! % * ? & . )`,
  },
};

const validateUsername = (value) => {
  if (!inputAttributes.regex.username.test(value)) {
    return inputAttributes.title.username;
  }
};

const validateEmail = (value) => {
  if (!inputAttributes.regex.email.test(value)) {
    return inputAttributes.title.email;
  }
};

const validatePassword = (value) => {
  if (!inputAttributes.regex.password.test(value)) {
    return inputAttributes.title.password;
  }
};

export { inputAttributes, validateUsername, validateEmail, validatePassword };
