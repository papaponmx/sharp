const { Magic } = require('@magic-sdk/admin');

export const magic: typeof Magic = new Magic(process.env.MAGIC_SECRET_KEY);

magic.preload;
