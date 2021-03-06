import { rule, shield as Shield } from 'graphql-shield';

import { Context } from '../context';

const isAuthenticated = rule({ cache: 'contextual' })(
  (parent, args, ctx: Context) => {
    return ctx.user !== null;
  },
);

const permissions = {
  Query: {
    me: isAuthenticated,
  },
  Mutation: {
    '*': isAuthenticated,
  },
};

export const shield = Shield(permissions, { allowExternalErrors: true });
