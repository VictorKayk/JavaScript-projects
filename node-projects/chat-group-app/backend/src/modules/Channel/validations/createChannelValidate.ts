import Validator from 'fastest-validator';

const validate = new Validator();

const schema = {
  name: { type: 'string', min: 1, max: 25, trim: true },
  description: { type: 'string', min: 1, max: 255, trim: true, optional: true },
  $$strict: true,
};

export default validate.compile(schema);
