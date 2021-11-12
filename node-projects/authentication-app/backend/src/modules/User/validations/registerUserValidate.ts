import Validator from 'fastest-validator';

const validate = new Validator();

const schema = {
  name: { type: 'string', min: 3, max: 255, trim: true },
  email: { type: 'email' },
  password: { type: 'string', min: 3, max: 255, trim: true },
  avatar: { type: 'string', optional: true, trim: true },
  bio: { type: 'string', min: 1, max: 500, optional: true, trim: true },
  phone: { type: 'string', optional: true, trim: true },
  $$strict: true,
};

export default validate.compile(schema);
