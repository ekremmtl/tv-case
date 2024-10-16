import { FocusNode } from '@please/lrud';
import ProfileItem from './profileItem';

const profiles = [
  {
    name: 'Ryane',
    image: "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg",
  },
  {
    name: 'Javi',
    image: "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg",
  },
  {
    name: 'Priya',
    image: "https://wallpapers.com/images/high/netflix-profile-pictures-5yup5hd2i60x7ew3.webp",
  }
];

export default function Profiles({ setSelectedProfile }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="text-5xl font-medium mb-16 text-center">Who's watching?</div>
      <FocusNode
        className="flex justify-center flex-wrap gap-10"
        orientation="horizontal"
      >
        {profiles.map((profile, index) => {
          return (
            <ProfileItem
              key={index}
              setSelectedProfile={setSelectedProfile}
              profile={profile}
            />
          );
        })}
      </FocusNode>
    </div>
  );
}