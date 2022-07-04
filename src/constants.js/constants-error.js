export const errorAlphanumeric = 'must contains only letters and numbers';
export const errorAlpha = 'must contains only letters';
export const errorUUID = 'must be Mongo id';

export const errorLength = (min, max) => `must be from ${min} to ${max} length`;
export const errorNotEmpty = (field) => `field ${field} cannot be empty`;
