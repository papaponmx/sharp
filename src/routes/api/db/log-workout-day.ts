import { getUserByEmail } from "$lib/adapters";

import { magic } from "../auth/_magic";

interface RequestBody {
  issuer: string;
}

export const post = async(req: { body: string; }, res: any) => {
  		const requestBody: RequestBody = JSON.parse(req.body);

	const metaData = await magic.users.getMetadataByIssuer(requestBody.issuer);
  const userByEmail = await getUserByEmail(metaData.email)

  console.log('workoutDAte');


  const body = JSON.stringify({
    workout_day_id: '1234',
  })

  return {
    status: 200,
    Headers: {},
    body,
  }
}