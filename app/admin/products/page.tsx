import React from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import Highlight from '@/components/Highlight';
import withPageAuth from '@/components/withPageAuth';
import { setAuthConnectionType, authConnectionTypes } from '@/utils/authConnectionTypeState'
import CreateProduct from '@/components/CreateProduct';


const AdminDashboardPage = async () => {
  const { user } = await getSession();
  return (
    <>
      <div className="mb-5">
        {user.user_roles.includes("ADMIN") ? (
          <div> PRODUCTS!!!!! </div>
        ) : (
          // If user doesn't have ADMIN role, render a "Not Authorized" message
          <p>You are not authorized to view this page.</p>
        )}
      </div>
    </>
  );
};

export default withPageAuth(AdminDashboardPage, "/admin/products");


