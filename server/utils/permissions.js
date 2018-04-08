import { createResolver } from 'apollo-resolvers';

export const baseResolver = createResolver(
  null,
  (root, args, context, error) => error
);

export const isAuthenticatedResolver = baseResolver.createResolver(
  (root, args, context) => {
    if (!context.user) throw new Error('Usuario no autenticado');
  }
);
