import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

// A component which encapsulates the withPageAuthRequired functionality
// provided by auth0 sdk to include the authConnectionType and returnTo.
const withClientPageAuth = (Component, returnRoute) => {
  const authOptions = returnRoute ? { returnTo: returnRoute } : {};

  return withPageAuthRequired(Component, authOptions);
};

export default withClientPageAuth;