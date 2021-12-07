import Validator from 'fastest-validator';

const validate = new Validator();

const schema = {
  userID: { type: 'number', positive: true, integer: true },
  $$strict: true,
};

export default validate.compile(schema);
