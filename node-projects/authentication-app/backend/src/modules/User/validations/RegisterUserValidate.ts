import Validator from 'fastest-validator';

const validate = new Validator();

const schema = {
  name: { type: 'string', min: 3, max: 255 },
  email: { type: 'email' },
  password: { type: 'string', min: 3, max: 255 },
  avatar: { type: 'string', optional: true },
  bio: { type: 'string', min: 1, max: 500, optional: true },
  phone: { type: 'string', optional: true },
  $$strict: true,
};

export default validate.compile(schema);
