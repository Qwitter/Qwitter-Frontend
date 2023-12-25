export const EVENTS = {
    connection: 'connection',
    CLIENT: {
        SEND_ROOM_MESSAGE: 'SEND_ROOM_MESSAGE', // Used for sending a message
        JOIN_ROOM: 'JOIN_ROOM', // Joiniing a room. It can be used by joining  a conversation room or a userName room for notifications.
    },
    SERVER: {
        ROOMS: 'ROOMS',
        JOINED_ROOM: 'JOINED_ROOM', // Sending a message that a user joined a room
        ROOM_MESSAGE: 'ROOM_MESSAGE', // Sending a message to the conversation room socket only
        NOTIFICATION: 'NOTIFICATION', // Sending a message to the room of the username
        MESSAGE: 'MESSAGE', // Sending a general message to the user on the room of the username
        CONVERSATION: 'CONVERSATION', //Socket for
        NOTIFICATION_COUNT:'NOTIFICATION_COUNT',
        UNREAD_CONVERSATIONS:'UNREAD_CONVERSATION'
    },
};