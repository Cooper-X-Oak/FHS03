import type { Access } from 'payload';

export const authenticated: Access = ({ req }) => Boolean(req.user);
export const administrator: Access = ({ req }) => Boolean(req.user && req.user.role === 'admin');
export const staffOnly = { read: authenticated, create: authenticated, update: authenticated, delete: administrator };
