export const GET_USER_BY_EMAIL_QUERY = `query getUserByEmail($email: String!) {
  userByEmail(email: $email){
    email
    _id
    name
    healthData{
      weight
      height
    }
  }
}`;

export const CREATE_USER_MUTATION = `mutation CreateUser($userInput: UserInput!) {
  createUser(data: $userInput) {
    _id
    email
    name
    healthData{
      weight
      height
    }
  }
}`
