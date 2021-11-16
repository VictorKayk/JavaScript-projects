import Validator from 'fastest-validator';

const validate = new Validator();

const schema = {
  email: { type: 'email' },
  password: { type: 'string', min: 3, max: 255, trim: true },
  $$strict: true,
};

export default validate.compile(schema);
