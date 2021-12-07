import Validator from 'fastest-validator';
import { Permissions } from '.prisma/client';

const validate = new Validator();

const schema = {
  permissions: { type: 'array', items: { type: 'enum', values: Object.values(Permissions) } },
  $$strict: true,
};

export default validate.compile(schema);
