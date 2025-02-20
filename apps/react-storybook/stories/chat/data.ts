import { SchedulerTypes } from 'devextreme-react/scheduler';
import { ChatTypes } from 'devextreme-react/chat';

export const firstAuthor: ChatTypes.User = {
    id: "c94c0e76-fb49-4b9b-8f07-9f93ed93b4f3",
    name: "John Doe",
    avatarUrl: "https://devexpress.github.io/DevExtreme/images/icons/bot.png",
};

export const secondAuthor: ChatTypes.User = {
    id: "d16d1a4c-5c67-4e20-b70e-2991c22747c3",
    name: "Jane Smith"
};

export const thirdAuthor: ChatTypes.User = {
    id: "b02d90c5-ca37-4cc6-9b62-56e2ce573893",
    name: "Gordon Freeman"
};

export const fourthAuthor: ChatTypes.User = {
    id: "8adef6b1-ff40-42df-8456-f7c080e132b8",
    name: "Crash Bandicoot"
};

const todayDate = new Date();

const date = new Date();
const yesterdayDate = date.setDate(date.getDate() - 1);

export const initialMessages: ChatTypes.Message[] = [
    {
        timestamp: "2024-10-01T10:15:30Z",
        author: firstAuthor,
        text: "Hey! How are you?"
    },
    {
        timestamp: "2024-10-01T10:16:00Z",
        author: secondAuthor,
        text: "Hi! I'm good, thanks. How about you?"
    },
    {
        timestamp: "2024-10-01T10:16:30Z",
        author: firstAuthor,
        text: "I'm doing great too. What are your plans for the weekend?"
    },
    {
        timestamp: "2024-10-01T10:17:00Z",
        author: secondAuthor,
        text: "I'm thinking of going to the countryside. I want to relax in nature."
    },
    {
        timestamp: "2024-10-01T10:18:01Z",
        author: secondAuthor,
        text: "I want to relax in nature."
    },
    {
        timestamp: "2024-10-01T10:25:15Z",
        author: secondAuthor,
        text: "Maybe I'll stay in a cabin by the lake."
    },
    {
        timestamp: "2024-10-01T10:33:30Z",
        author: firstAuthor,
        text: "Sounds awesome!"
    },
    {
        timestamp: "2024-10-01T10:33:32Z",
        author: firstAuthor,
        text: "I also want to get out into nature. Want to join me?"
    },
    {
        timestamp: yesterdayDate,
        author: secondAuthor,
        text: "I'd love to! Just let me know when you're ready."
    },
    {
        timestamp: todayDate,
        author: firstAuthor,
        text: "Great!"
    },
    {
        timestamp: todayDate,
        author: firstAuthor,
        text: "Great! Looking forward to it!"
    }
];

export const longError = { id: '1234', message: 'Error Message. An unexpected issue occurred while processing your request. Please check your internet connection or contact support for further assistance.' };
