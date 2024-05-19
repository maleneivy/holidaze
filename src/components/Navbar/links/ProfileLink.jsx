'use client';

import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/utils/icons';
import { AuthContext } from '@/app/lib/authProvider';

const ProfileLink = () => {
  const { auth } = useContext(AuthContext);
  const [href, setHref] = useState('/login');

  useEffect(() => {
    if (auth.apiKey && auth.userName) {
      setHref(`/profile/${auth.userName}`);
    } else {
      setHref('/login');
    }
  }, [auth.apiKey, auth.userName]);

  return (
    <Link href={href}>
      <Icon name="user" className="mr-4 size-9 text-primary hover:text-blue" />
    </Link>
  );
};

export default ProfileLink;
