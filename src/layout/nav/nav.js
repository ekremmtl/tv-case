import { FocusNode, useSetFocus } from '@please/lrud';
import { Heart, Home2, Setting2 } from 'iconsax-react';

const navItems = [
  {
    label: 'Home',
    icon: <Home2 size={32} />,
  },
  {
    label: 'Favorites',
    icon: <Heart size={32} />,
  },
  {
    label: 'Settings',
    icon: <Setting2 size={32} />,
  },
];

export default function Nav() {
  const setFocus = useSetFocus();

  return (
    <FocusNode
      isTrap
      orientation="vertical"
      className="nav transition-all h-full bg-black/95 flex flex-col justify-center items-center absolute top-0 left-0 z-10"
      focusId="nav"
      onRight={(e) => {
        e.preventDefault();
        setFocus('home');
      }}>
      {navItems.map((navItem, index) => {
        return (
          <FocusNode
            className={'nav_link p-2 my-2'}
            key={index}
            focusId={`nav-${navItem.label}`}>
            {navItem.icon}
          </FocusNode>
        );
      })}
    </FocusNode>
  );
}
