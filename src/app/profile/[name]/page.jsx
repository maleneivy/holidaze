import ProfileDisplay from '@/components/Profile/Profile';

export const metadata = {
  title: 'Profile Page',
  description: 'User profile on Holidaze',
};

export default function ProfilePage({ params }) {
  return <ProfileDisplay params={params} />;
}
