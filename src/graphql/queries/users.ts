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
