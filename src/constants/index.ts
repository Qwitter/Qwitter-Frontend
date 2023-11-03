import { Home, Search, Bell, Mail, AlignJustify, Bookmark, Users, User, Settings } from 'lucide-react';

const navLinks = [
  {
    id: "home",
    title: "Home",
    icon: Home,
    clicked: { strokeWidth: 3 }
  },
  {
    id: "search",
    title: "Search",
    icon: Search,
    clicked: { strokeWidth: 3 }
  },
  {
    id: "notification",
    title: "Notification",
    icon: Bell,
    clicked: { fill: 'white' }
  },
  {
    id: "messages",
    title: "Messages",
    icon: Mail,
    clicked: { strokeWidth: 4 }
  },
  {
    id: "lists",
    title: "Lists",
    icon: AlignJustify,
    clicked: { strokeWidth: 4 }
  },
  {
    id: "bookmarks",
    title: "Bookmarks",
    icon: Bookmark,
    clicked: { fill: 'white' }

  },
  {
    id: "community",
    title: "Community",
    icon: Users,
    clicked: { fill: 'white' }

  },
  {
    id: "profile",
    title: "Profile",
    icon: User,
    clicked: { fill: 'white' }

  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    clicked: { strokeWidth: 3 }
  }
];


export { navLinks };