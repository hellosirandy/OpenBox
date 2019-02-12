export const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for (let i = 0; i < rules.length; i += 1) {
    const rule = rules[i];
    switch (rule) {
      case 'isEmail':
        isValid = isValid && emailValidator(val);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(val, connectedValue);
        break;
      case 'equalsTo':
        isValid = isValid && equalToValidator(val, connectedValue);
        break;
      case 'notEmpty':
        isValid = isValid && notEmptyValidator(val);
        break;
      case 'isPassword':
        isValid = isValid && passwordValidator(val);
        break;
      default:
        isValid = true;
    }
  }
  return isValid;
};

const emailValidator = (val) => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);
};

const passwordValidator = (val) => {
  const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})');
  return mediumRegex.test(val);
};

const minLengthValidator = (val, minLength) => {
  return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
  return val === checkValue;
};

const notEmptyValidator = (val) => {
  return val.trim() !== '';
};

export const validateForm = (controls, keys = []) => {
  let success = true;
  keys.forEach((key) => {
    if (!controls[key].valid) {
      success = false;
    }
  });
  return success;
};
