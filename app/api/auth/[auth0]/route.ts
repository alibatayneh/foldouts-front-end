import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';
import { authConnectionTypes } from '@/utils/authConnectionTypeState';
import { NextRequest } from 'next/server';
require('dotenv').config({ path: '@/.env.local' });

function getAuthConnectionState(route) {
  const regex = /^\/([^\/]+)/;
  let match = regex.exec(route);
  const matchString = match ? match[1] : null;

  switch (matchString) {
    case "admin":
      return authConnectionTypes.email;
    case "brand-user":
      return authConnectionTypes.email;
    case "user":
        return authConnectionTypes.sms;
    default:
      return authConnectionTypes.email;
  }
}


const audience = process.env.AUTH0_AUDIENCE;
const scope = process.env.AUTH0_SCOPE;

export const GET = handleAuth({
  login: handleLogin((req) => {
      const state = getAuthConnectionState((req as NextRequest).nextUrl.searchParams.get('returnTo'));
      let authBody = {
        authorizationParams: {
         connection: state,
         audience: audience,
         scope: scope,
         userType: null
        }
      };

      // Any user that logs in with the sms connection should have a 'user' userType
      //  which will be read by a postlogin action and assign the basic "USER" role
      //  to the user if not already assigned.
      // TO-DO: Determine if we need to replicate this flow for
      //  brands or different tiered users in the future.
      if (state === authConnectionTypes.sms) {
        authBody.authorizationParams.userType = "user";
      }

      return authBody;
  }),
  logout: handleLogout({ returnTo: 'https://foldouts.store' })
});

