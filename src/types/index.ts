/**
 * Object including user metadata returned
 * by `magic.users.getMetadataByToken`
 */
export type Session = {
  createdAt: number;
  email: string;
  issuer: string;
  maxAge: number;
  publicAddress: string;
};

export type HealthData = {
  height: number;
  weight: number;
};

export type UserByEmailResponse = {
  _id: string;
  email: string;
  healthData: HealthData;
  name: string;
};
