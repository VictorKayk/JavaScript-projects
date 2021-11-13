import Validator from 'fastest-validator';

const validate = new Validator();

const schema = {
  avatar: [{ type: 'url', optional: true }, { type: 'string', optional: true, trim: true }],
  $$strict: true,
};

export default validate.compile(schema);
