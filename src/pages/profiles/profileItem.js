import { FocusNode } from '@please/lrud';

export default function ProfileItem({ profile, setSelectedProfile }) {
  return (
    <FocusNode
      className="profile-item text-center"
      onSelected={() => setSelectedProfile(profile)}
    >
      <div
        className="profile-item-image min-w-52 h-52 rounded-2xl"
        style={{
          backgroundImage: 'url(' + profile.image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <span className="profile-item-text block mt-3 text-2xl">{profile.name}</span>
    </FocusNode>
  );
}
