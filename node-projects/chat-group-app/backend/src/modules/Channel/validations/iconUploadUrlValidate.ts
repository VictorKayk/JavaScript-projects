import Validator from 'fastest-validator';

const validate = new Validator();

const schema = {
  url: [{ type: 'url', optional: true }],
  $$strict: true,
};

export default validate.compile(schema);
