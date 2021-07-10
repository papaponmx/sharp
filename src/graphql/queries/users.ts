export const GET_USER_BY_EMAIL_QUERY = `
query getUserByEmail($email: String!) {
  userByEmail(email: $email){
    email
    _id
    name
    healthData{
      _id
      weight
      height
    }
  }
}`;

export const CREATE_USER_MUTATION = `
mutation CreateUser($userInput: UserInput!) {
  createUser(data: $userInput) {
    _id
    email
    name
    healthData {
      _id
      weight
      height
    }
  }
}`;

export const UPDATE_USER_HEALTH_DATA_MUTATION = `
mutation UpdateHealthData($_id: ID!, $data: HealthDataInput!){
  updateHealthData(id: $_id, data: $data) {
    _id
    weight
    height
  }

}
`;
