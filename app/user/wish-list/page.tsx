import React from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import Highlight from '@/components/Highlight';
import withPageAuth from '@/components/withPageAuth';

const UserWishListPage = async () => {
  const { user } = await getSession();
  return (
    <>
      <div className="mb-5">
        Welcome to user wish list!
      </div>
    </>
  );
};

export default withPageAuth(UserWishListPage, "/user/wish-list");


