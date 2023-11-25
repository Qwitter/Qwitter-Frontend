import { Home, Search, Bell, Mail, AlignJustify, Bookmark, Users, User, Settings ,KeyRound } from 'lucide-react';

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
    notificationCount:5

  },
  {
    id: "notification",
    title: "Notification",
    icon: Bell,
    clicked: { fill: 'white' },
    notificationCount:0
  },
  {
    id: "messages",
    title: "Messages",
    icon: Mail,
    clicked: { strokeWidth: 4 },
    notificationCount:0
  },
  {
    id: "lists",
    title: "Lists",
    icon: AlignJustify,
    clicked: { strokeWidth: 4 }
    ,
    notificationCount:0
  },
  {
    id: "bookmarks",
    title: "Bookmarks",
    icon: Bookmark,
    clicked: { fill: 'white' }
    ,
    notificationCount:0

  },
  {
    id: "community",
    title: "Community",
    icon: Users,
    clicked: { fill: 'white' },
    notificationCount:0

  },
  {
    id: "profile",
    title: "Profile",
    icon: User,
    clicked: { fill: 'white' },
    notificationCount:0

  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    clicked: { strokeWidth: 3 },
    notificationCount:100
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
    description :"See your account information like your phone number and email address.",
    icon:User
  },
  {
    id: "/password",
    title: "Change your password",
    description :"Change your password at any time.",
    icon:KeyRound
  },

]
const userArray = [
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user1',
    name: 'John Doe',
    isVerified: true,
    tag: 'Joyful memories in Dublin!', // Example random sentence
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user2',
    name: 'Jane Smith',
    isVerified: false,
    tag: 'Unity for a better future in Gaza.', // Example random sentence
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user3',
    name: 'Bob Johnson',
    isVerified: true,
    tag: 'Thoughts on the current situation in Gaza.', // Example random sentence
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user4',
    name: 'Alice Williams',
    isVerified: false,
    tag: 'Exploring the streets of Dublin.', // Example random sentence
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user5',
    name: 'Charlie Brown',
    isVerified: true,
    tag: 'Fun times in Dublin!', // Example random sentence
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user6',
    name: 'Eva Davis',
    isVerified: false,
    tag: 'Discovering hidden gems in Dublin.', // Example random sentence
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user7',
    name: 'Frank White',
    isVerified: true,
    tag: 'Memorable moments in Dublin.', // Example random sentence
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user8',
    name: 'Grace Miller',
    isVerified: false,
    tag: 'Voices for change in Gaza.', // Example random sentence
  },
  {
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user9',
    name: 'Harry Wilson',
    isVerified: true,
    tag: 'A call for peace in Gaza.', // Example random sentence
  },
  {
    imageUrl: 'https://github.com/shadcn.pngg',
    username: 'user10',
    name: 'Ivy Taylor',
    isVerified: false,
    tag: 'Hopes and dreams for Gaza.', // Example random sentence
  },
  {
    imageUrl: 'https://github.com/shadcn.pngg',
    username: 'user11',
    name: 'Kevin Brown',
    isVerified: true,
    tag: 'Exciting adventure in Dublin!', // Example random sentence
  },
  {
    imageUrl: 'https://github.com/shadcn.pngg',
    username: 'user12',
    name: 'Laura Harris',
    isVerified: false,
    tag: 'Reflecting on the challenges in Gaza.', // Example random sentence
  },
];

export { navLinks,settingsOptions ,accountOptions,userArray,};