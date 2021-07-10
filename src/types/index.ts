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
  _id: string;
  height: number;
  weight: number;
};

export type UserByEmailResponse = {
  _id: string;
  email: string;
  healthData: HealthData;
  name: string;
};

export type CreateUserInput = {
  _id?: string;
  name?: string;
  email: string;
  healthData?: {
    create?: HealthData;
  };
};

export type UpdateHealthDataInput = {
  _id: string,
  healthData: HealthData
}
