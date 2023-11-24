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


export { navLinks,settingsOptions ,accountOptions,};