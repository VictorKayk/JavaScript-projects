import Validator from 'fastest-validator';

const validate = new Validator();

const phoneRegex = /^(\+[0-9]{2}[\s]?)?([\(]?[0-9]{2}[\)]?)[\s]?([0-9]{4,5})[\s\-]?([0-9]{4})$/g;

const schema = {
  name: {
    type: 'string', min: 3, max: 255, trim: true,
  },
  email: { type: 'email' },
  password: {
    type: 'string', min: 3, max: 255, trim: true,
  },
  bio: {
    type: 'string', min: 1, max: 500, optional: true, trim: true,
  },
  phone: {
    type: 'string',
    optional: true,
    trim: true,
    pattern: phoneRegex,
    messages: {
      stringPattern: "The 'phone' field don\'t follow the phone pattern, please follow the pattern: +00 (00) 0000-0000.",
    },
  },
  $$strict: true,
};

export default validate.compile(schema);
