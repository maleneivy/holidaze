const ProfileInfo = ({ profile }) => (
  <div className="mx-4 my-6">
    <p>{profile.name}</p>
    <p>{profile.email}</p>
    <h3 className="mb-2 mt-4">Bio</h3>
    <p className="whitesp break-words">
      {profile.bio ? profile.bio : 'No bio provided'}
    </p>
  </div>
);

export default ProfileInfo;
