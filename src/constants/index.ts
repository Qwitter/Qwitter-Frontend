import {
  Home,
  Globe2,
  Search,
  UserCheck,
  Bell,
  Mail,
  AlignJustify,
  Bookmark,
  Users,
  User,
  Settings,
  KeyRound,
  BadgeCheck,
  AtSign,
} from "lucide-react";

const navLinks = [
  {
    id: "home",
    title: "Home",
    icon: Home,
    clicked: { strokeWidth: 3 },
    notificationCount: 1,
  },
  {
    id: "search",
    title: "Search",
    icon: Search,
    clicked: { strokeWidth: 3 },
    notificationCount: 5,
  },
  {
    id: "notification",
    title: "Notification",
    icon: Bell,
    clicked: { fill: "white" },
    notificationCount: 0,
  },
  {
    id: "messages",
    title: "Messages",
    icon: Mail,
    clicked: { strokeWidth: 4 },
    notificationCount: 0,
  },
  {
    id: "lists",
    title: "Lists",
    icon: AlignJustify,
    clicked: { strokeWidth: 4 },
    notificationCount: 0,
  },
  {
    id: "bookmarks",
    title: "Bookmarks",
    icon: Bookmark,
    clicked: { fill: "white" },
    notificationCount: 0,
  },
  {
    id: "community",
    title: "Community",
    icon: Users,
    clicked: { fill: "white" },
    notificationCount: 0,
  },
  {
    id: "profile",
    title: "Profile",
    icon: User,
    clicked: { fill: "white" },
    notificationCount: 0,
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    clicked: { strokeWidth: 3 },
    notificationCount: 100,
  },
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
];
const accountOptions = [
  {
    id: "/your_twitter_data/account",
    title: "Account information",
    description:
      "See your account information like your phone number and email address.",
    icon: User,
  },
  {
    id: "/password",
    title: "Change your password",
    description: "Change your password at any time.",
    icon: KeyRound,
  },
];
const tags = [
  "JoyfulmemoriesinDublin!",
  "UnityforabetterfutureinGaza",
  "Thoughts on the current situation in Gaza.",
  "Exploring the streets of Dublin.",
  "Fun times in Dublin!",
  "Discovering hidden gems in Dublin.",
  "Memorable moments in Dublin.",
  "A call for peace in Gaza.",
];
const userArray = [
  {
    imageUrl: "https://github.com/shadcn.png",
    username: "user1",
    name: "John Doe",
    isVerified: true,
    lastMessage: "Hey there!",
    lastMessageTime: "5h",
  },
  {
    imageUrl: "https://github.com/shadcn.png",
    username: "user2",
    name: "Jane Smith",
    isVerified: false,
    lastMessage: "How are you doing?",
    lastMessageTime: "9h",
  },
  {
    imageUrl: "https://github.com/shadcn.png",
    username: "user3",
    name: "Bob Johnson",
    isVerified: true,
    lastMessage: "Nice to meet you!",
    lastMessageTime: "yesterday",
  },
  {
    imageUrl: "https://github.com/shadcn.png",
    username: "user4",
    name: "Alice Williams",
    isVerified: false,
    lastMessage: "What's up?",
    lastMessageTime: "yesterday",
  },
  {
    imageUrl: "https://github.com/shadcn.png",
    username: "user5",
    name: "Charlie Brown",
    isVerified: true,
    lastMessage: "Greetings!",
    lastMessageTime: "a week ago",
  },
  {
    imageUrl: "https://github.com/shadcn.png",
    username: "marwanSamy",
    name: "Eva Davis",
    isVerified: false,
    lastMessage: "Hello world!",
    lastMessageTime: "a month ago",
  },
  {
    imageUrl: "https://github.com/shadcn.png",
    username: "ahmedCR7",
    name: "Frank White",
    isVerified: true,
    lastMessage: "How's it going?",
    lastMessageTime: "yesterday",
  },
  {
    imageUrl: "https://github.com/shadcn.png",
    username: "KillYou",
    name: "Grace Miller",
    isVerified: false,
    lastMessage: "Nice day, isn't it?",
    lastMessageTime: "19h",
  },
  {
    imageUrl: "https://github.com/shadcn.png",
    username: "yarab",
    name: "Harry Wilson",
    isVerified: true,
    lastMessage: "What's on your mind?",
    lastMessageTime: "10h",
  },
  {
    imageUrl: "https://github.com/shadcn.png",
    username: "user10",
    name: "Ivy Taylor",
    isVerified: false,
    lastMessage: "Howdy!",
    lastMessageTime: "15h",
  },
  {
    imageUrl: "https://github.com/shadcn.png",
    username: "user11",
    name: "Kevin Brown",
    isVerified: true,
    lastMessage: "Greetings from Kevin!",
    lastMessageTime: "last year",
  },
  {
    imageUrl: "https://github.com/shadcn.png",
    username: "user12",
    name: "Laura Harris",
    isVerified: false,
    lastMessage: "Hi there!",
    lastMessageTime: "two months ago",
  },
  {
    imageUrl: "https://github.com/shadcn.png",
    username: "chatGPT",
    name: "ChatGPT",
    isVerified: true,
    lastMessage: "Hello from ChatGPT! 😊",
    lastMessageTime: "yesterday",
  },
];
const pinnedConversations = [
  {
    imageUrl: "https://github.com/shadcn.png",
    username: "user12",
    name: "Laura Harris",
    isVerified: false,
    lastMessage: "Hi there!",
    lastMessageTime: "two months ago",
  },
  {
    imageUrl: "https://github.com/shadcn.png",
    username: "chatGPT",
    name: "ChatGPT",
    isVerified: true,
    lastMessage: "Hello from ChatGPT! 😊",
    lastMessageTime: "yesterday",
  },
];
const AllowMessagesOptions = ["No one", "Verified Users", "Everyone"];
const whoToReply = [
  {
    text: "Everyone",
    icon: Globe2,
  },
  {
    text: "Accounts you follow",
    icon: UserCheck,
  },
  {
    text: "Verified accounts",
    icon: BadgeCheck,
  },
  {
    text: "Only accounts you mention",
    icon: AtSign,
  },
];

const profileSections = [
  { title: "Posts", dataLink: "" },
  { title: "Replies", dataLink: "/with_replies" },
  { title: "Media", dataLink: "/media" },
  { title: "Likes", dataLink: "/likes" },
];

export {
  navLinks,
  settingsOptions,
  accountOptions,
  userArray,
  pinnedConversations,
  whoToReply,
  tags,
  AllowMessagesOptions,
  profileSections,
};
