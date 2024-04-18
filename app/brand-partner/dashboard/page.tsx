import React from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import Highlight from '@/components/Highlight';
import withPageAuth from '@/components/withPageAuth';

const PartnerDashboardPage = async () => {
  const { user } = await getSession();
  return (
    <>
      <div className="mb-5">
        Welcome to brand-partner dashboard!
      </div>
    </>
  );
};

export default withPageAuth(PartnerDashboardPage, "/brand-partner/dashboard");


