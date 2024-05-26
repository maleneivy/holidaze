import ProfileDisplay from '@/components/Profile/Profile';

const ProfilePage = ({ params }) => {
  return (
    <>
      <ProfileDisplay params={params} />
    </>
  );
};

export default ProfilePage;
