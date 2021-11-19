import Validator from 'fastest-validator';

const validate = new Validator();

const schema = {
  message: { type: 'string', min: 1, max: 500, trim: true },
  $$strict: true,
};

export default validate.compile(schema);
