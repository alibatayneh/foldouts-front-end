import { withPageAuthRequired } from '@auth0/nextjs-auth0';

// A component which encapsulates the withPageAuthRequired functionality
// provided by auth0 sdk to include the authConnectionType and returnTo.
const withPageAuth = (Component, returnRoute) => {
  const authOptions = returnRoute ? { returnTo: returnRoute } : {};

  return withPageAuthRequired(Component, authOptions);
};

export default withPageAuth;