import React from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import Highlight from '@/components/Highlight';
import withPageAuth from '@/components/withPageAuth';
import { setAuthConnectionType, authConnectionTypes } from '@/utils/authConnectionTypeState'

const UserWishListPage = async () => {
  const { user } = await getSession();
  return (
    <>
      <div className="mb-5">
        Welcome to user wish list!
        {console.log(user)}
      </div>
    </>
  );
};

export default withPageAuth(UserWishListPage, "/user/wish-list");


