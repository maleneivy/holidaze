const ProfileHeader = ({ profile, handleEdit, handleCreateVenue }) => (
  <div className="flex flex-col items-center">
    <img
      src={profile.avatar?.url}
      alt={profile.avatar?.alt || 'Profile avatar'}
      className="sm:size-42 size-36 rounded-full object-cover md:size-48"
    />
    <div className="my-4 flex">
      <div>
        <a role="button" onClick={handleEdit} className="underline">
          Edit Profile
        </a>
      </div>
      {profile.venueManager && (
        <div className="ml-10">
          <a
            role="button"
            onClick={(e) => {
              e.preventDefault();
              handleCreateVenue();
            }}
            className="underline"
          >
            New venue (VM)
          </a>
        </div>
      )}
    </div>
  </div>
);

export default ProfileHeader;
