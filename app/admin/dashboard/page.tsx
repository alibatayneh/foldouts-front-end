import React from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import Highlight from '@/components/Highlight';
import withPageAuth from '@/components/withPageAuth';
import CreateProduct from '@/components/CreateProduct';


const AdminDashboardPage = async () => {
  const { user } = await getSession();
  return (
    <>
      <div className="">
        {user.user_roles.includes("ADMIN") ? (
                  // If user has ADMIN role, render the admin dashboard content
                  <CreateProduct />
        ) : (
          // If user doesn't have ADMIN role, render a "Not Authorized" message
          <p>You are not authorized to view this page.</p>
        )}
      </div>
    </>
  );
};

export default withPageAuth(AdminDashboardPage, "/admin/dashboard");


