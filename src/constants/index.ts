import { Home, Globe2, Search, UserCheck, Bell, Mail, AlignJustify, Bookmark, Users, User, Settings, KeyRound, BadgeCheck, AtSign } from 'lucide-react';

const navLinks = [
  {
    id: "home",
    title: "Home",
    icon: Home,
    clicked: { strokeWidth: 3 },
    notificationCount: 1

  },
  {
    id: "search",
    title: "Search",
    icon: Search,
    clicked: { strokeWidth: 3 },
    notificationCount: 5

  },
  {
    id: "notification",
    title: "Notification",
    icon: Bell,
    clicked: { fill: 'white' },
    notificationCount: 0
  },
  {
    id: "messages",
    title: "Messages",
    icon: Mail,
    clicked: { strokeWidth: 4 },
    notificationCount: 0
  },
  {
    id: "lists",
    title: "Lists",
    icon: AlignJustify,
    clicked: { strokeWidth: 4 }
    ,
    notificationCount: 0
  },
  {
    id: "bookmarks",
    title: "Bookmarks",
    icon: Bookmark,
    clicked: { fill: 'white' }
    ,
    notificationCount: 0

  },
  {
    id: "community",
    title: "Community",
    icon: Users,
    clicked: { fill: 'white' },
    notificationCount: 0

  },
  {
    id: "profile",
    title: "Profile",
    icon: User,
    clicked: { fill: 'white' },
    notificationCount: 0

  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    clicked: { strokeWidth: 3 },
    notificationCount: 100
  }
];
const settingsOptions = [
  {
    id: "account",
    title: "Your account",
  },
  // {
  //   id: "privacy_and_safety",
  //   title: "Privacy and safety",
  // }
]
const accountOptions = [
  {
    id: "/your_twitter_data/account",
    title: "Account information",
    description: "See your account information like your phone number and email address.",
    icon: User
  },
  {
    id: "/password",
    title: "Change your password",
    description: "Change your password at any time.",
    icon: KeyRound
  },

]
const tags = [
  'JoyfulmemoriesinDublin!',
  'UnityforabetterfutureinGaza',
  'Thoughts on the current situation in Gaza.',
  'Exploring the streets of Dublin.',
  'Fun times in Dublin!',
  'Discovering hidden gems in Dublin.',
  'Memorable moments in Dublin.',
  'A call for peace in Gaza.',


]
const userArray = [
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user1',
    name: 'John Doe',
    isVerified: true,
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user2',
    name: 'Jane Smith',
    isVerified: false,
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user3',
    name: 'Bob Johnson',
    isVerified: true,
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user4',
    name: 'Alice Williams',
    isVerified: false,
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user5',
    name: 'Charlie Brown',
    isVerified: true,
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'marwanSamy',
    name: 'Eva Davis',
    isVerified: false,
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'ahmedCR7',
    name: 'Frank White',
    isVerified: true,
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'KillYou',
    name: 'Grace Miller',
    isVerified: false,
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'yarab',
    name: 'Harry Wilson',
    isVerified: true,
  },
  {
    imageUrl: 'https://github.com/shadcn.pngg',
    username: 'user10',
    name: 'Ivy Taylor',
    isVerified: false,
  },
  {
    imageUrl: 'https://github.com/shadcn.pngg',
    username: 'user11',
    name: 'Kevin Brown',
    isVerified: true,
  },
  {
    imageUrl: 'https://github.com/shadcn.pngg',
    username: 'user12',
    name: 'Laura Harris',
    isVerified: false,
  },
];
const whoToReply = [
  {
    text: "Everyone",
    icon: Globe2
  },
  {
    text: "Accounts you follow",
    icon: UserCheck
  },
  {
    text: "Verified accounts",
    icon: BadgeCheck
  },
  {
    text: "Only accounts you mention",
    icon: AtSign
  }

]

export { navLinks, settingsOptions, accountOptions, userArray, whoToReply,tags };