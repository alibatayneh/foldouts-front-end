import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async function shows(req) {
  try {
    console.log("API Auth Successful!");
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['create:products', 'read:products']
    });
//    const { accessToken } = await getAccessToken(req, res);
    console.log(accessToken);

    const apiPort = process.env.API_PORT || 3001;
    const response = await fetch(`http://foldouts.com:${apiPort}/api/shows`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const shows = await response.json();

    return NextResponse.json(shows, res);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
});
