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
    id: "explore",
    title: "Explore",
    icon: Search,
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
  {
    id: "privacy_and_safety",
    title: "Privacy and safety",
  }
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
    id: 48418786,

    imageUrl: 'https://github.com/shadcn.png',
    username: 'user1',
    name: 'John Doe',
    isVerified: true,
    lastMessage: 'Hey there!',
    lastMessageTime: "5h",
  },
  {
    id: 48418787,
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user2',
    name: 'Jane Smith',
    isVerified: false,
    lastMessage: 'How are you doing?',
    lastMessageTime: "9h"
  },
  {
    id: 48418686,
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user3',
    name: 'Bob Johnson',
    isVerified: true,
    lastMessage: 'Nice to meet you!',
    lastMessageTime: "yesterday"
  },
  {
    id: 4878786,
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user4',
    name: 'Alice Williams',
    isVerified: false,
    lastMessage: "What's up?",
    lastMessageTime: "yesterday"

  },
  {
    id: 28418786,
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user5',
    name: 'Charlie Brown',
    isVerified: true,
    lastMessage: 'Greetings!',
    lastMessageTime: "a week ago"

  },
  {
    id: 18418786,
    imageUrl: 'https://github.com/shadcn.png',
    username: 'marwanSamy',
    name: 'Eva Davis',
    isVerified: false,
    lastMessage: 'Hello world!',
    lastMessageTime: "a month ago"

  },
  {
    id: 68418786,
    imageUrl: 'https://github.com/shadcn.png',
    username: 'ahmedCR7',
    name: 'Frank White',
    isVerified: true,
    lastMessage: "How's it going?",
    lastMessageTime: "yesterday"

  },
  {
    id: 46418786,
    imageUrl: 'https://github.com/shadcn.png',
    username: 'KillYou',
    name: 'Grace Miller',
    isVerified: false,
    lastMessage: "Nice day, isn't it?",
    lastMessageTime: "19h"

  },
  {
    id: 48818786,
    imageUrl: 'https://github.com/shadcn.png',
    username: 'yarab',
    name: 'Harry Wilson',
    isVerified: true,
    lastMessage: "What's on your mind?",
    lastMessageTime: "10h"

  },
  {
    id: 48416786,
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user10',
    name: 'Ivy Taylor',
    isVerified: false,
    lastMessage: 'Howdy!',
    lastMessageTime: "15h"

  },
  {
    id: 48410786,
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user11',
    name: 'Kevin Brown',
    isVerified: true,
    lastMessage: 'Greetings from Kevin!',
    lastMessageTime: "last year"

  },
  {
    id: 48418586,
    imageUrl: 'https://github.com/shadcn.png',
    username: 'user12',
    name: 'Laura Harris',
    isVerified: false,
    lastMessage: 'Hi there!',
    lastMessageTime: "two months ago"

  },
  {
    id: 48418776,
    imageUrl: 'https://github.com/shadcn.png',
    username: 'chatGPT',
    name: 'ChatGPT',
    isVerified: true,
    lastMessage: 'Hello from ChatGPT! 😊',
    lastMessageTime: "yesterday"

  },
];
const pinnedConversations = [{
  userPhoto: 'https://github.com/shadcn.png',
  userName: 'user12',
  name: 'Laura Harris',
  isVerified: false,
  lastMessage: 'Hi there!',
  lastMessageTime: "two months ago"

},
{
  userPhoto: 'https://github.com/shadcn.png',
  userName: 'chatGPT',
  name: 'ChatGPT',
  isVerified: true,
  lastMessage: 'Hello from ChatGPT! 😊',
  lastMessageTime: "yesterday"

},
];
const AllowMessagesOptions = [
  "No one", "Verified Users", "Everyone"
]
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
const searchHeaderOptions = [
  "ALL", "People", "Groups", "Messages"
]
const tempMessagesSearch =
{
  conversations: [{
    userPhoto: 'https://github.com/shadcn.png',
    userName: 'user12',
    name: 'Laura Harris',
    isVerified: false,
    lastMessage: 'Hi there!',
    lastMessageTime: "two months ago"
  }],
  users: [{
    userPhoto: 'https://github.com/shadcn.png',
    userName: 'chatGPT',
    name: 'ChatGPT',
    isVerified: true,
    lastMessage: 'Hello from ChatGPT! 😊',
    lastMessageTime: "yesterday"
  }]
}
const tempInfo =[
{
  id:0,
  mode: "group",
  imageUrl: "https://i.ibb.co/S7XN04r/01eab91ff04ea5832a33040f7ebdb3d0.jpg",
  groupName: "Awesome Team",
  users: [
    {
      userName: "JohnDoe",
      name:"DoeJohn",
      userPhoto: "https://i.ibb.co/S7XN04r/01eab91ff04ea5832a33040f7ebdb3d0.jpg",
      isFollowing: true,
    },
    {
      userName: "JaneSmith",
      name:"Smith",
      userPhoto: "https://i.ibb.co/S7XN04r/01eab91ff04ea5832a33040f7ebdb3d0.jpg",
      isFollowing: false,
    },
    {
      userName: "BobJohnson",
      name:"Bob",
      userPhoto: "https://i.ibb.co/S7XN04r/01eab91ff04ea5832a33040f7ebdb3d0.jpg",
      isFollowing: true,
    },
  ],
},
{
  id:1,
  mode: "direct",
  imageUrl: "https://i.ibb.co/S7XN04r/01eab91ff04ea5832a33040f7ebdb3d0.jpg",
  users: [
    {
      userName: "JohnDoe",
      name:"DoeJohn",
      userPhoto: "https://i.ibb.co/S7XN04r/01eab91ff04ea5832a33040f7ebdb3d0.jpg",
      isFollowing: true,
    },
  ],
}
]
const chat = [
  {
    "status": "unseen",
    "id": "chat123",
    "date": "2023-12-01T15:45:00Z",
    "text": "Hello User2! How's your day going?",
    "userName": "marwanSamy99",
    "userPhoto": "https://example.com/user1.jpg",
    "isReply": "",
    "media": {
      "url": "",
      "type": "Photo"
    }
  },
  {
    "status": "seen",
    "id": "chat124",
    "date": "2023-11-30T15:45:00Z",
    "isReply": "",
    "text": "Hi User1! My day is good, thank you. Yours?",
    "userName": "User2",
    "userPhoto": "https://example.com/user2.jpg",
    "media": {
      "url": "https://i.ibb.co/DRXmdvR/sunset-anime-girl-hd-wallpaper-1080x608.jpg%22%20alt=%22sunset-anime-girl-hd-wallpaper-1080x608",
      "type": "Photo"
    }
  },
  {
    "status": "seen",
    "id": "chat125",
    "isReply": "",
    "date": "2023-11-25T17:15:00Z",
    "text": "I'm doing well too! Any exciting plans for the evening?",
    "userName": "marwanSamy99",
    "userPhoto": "https://example.com/user1.jpg",
    "media": {
      "url": "",
      "type": "video"
    }
  },
  {
    "status": "seen",
    "id": "chat126",
    "isReply": "123456",
    "date": "2023-10-01T18:00:00Z",
    "text": "Not much, just relaxing. How about you?",
    "userName": "User2",
    "userPhoto": "https://example.com/user2.jpg",
    "media": {
      "url": "",
      "type": "image"
    }
  },
  {
    "status": "unseen",
    "id": "chat127",
    "date": "2023-09-01T19:30:00Z",
    "isReply": "123456",
    "text": "I'm planning to catch up on some reading. Any book recommendations?",
    "userName": "marwanSamy99",
    "userPhoto": "https://example.com/user1.jpg",
    "media": {
      "url": "https://i.ibb.co/DRXmdvR/sunset-anime-girl-hd-wallpaper-1080x608.jpg%22%20alt=%22sunset-anime-girl-hd-wallpaper-1080x608",
      "type": "Photo"
    }
  }
]
export { navLinks, tempInfo, tempMessagesSearch, chat, settingsOptions, accountOptions, searchHeaderOptions, userArray, pinnedConversations, whoToReply, tags, AllowMessagesOptions };