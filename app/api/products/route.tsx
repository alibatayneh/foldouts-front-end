import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export const POST = withApiAuthRequired(async function shows(req) {
  try {
    const res = new NextResponse();

    // Scopes for creating products
//     const { accessToken } = await getAccessToken(req, res, {
//       scopes: ['create:products']
//     });

    // Figure out how to handle in prod vs dev
    const apiPort = process.env.API_PORT || 3001;

    // Reach out to backend products endpoint.
    const response = await fetch(`http://foldouts.com:${apiPort}/api/shows`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
    });

    const shows = await response.json();

    return NextResponse.json(shows, res);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
});
