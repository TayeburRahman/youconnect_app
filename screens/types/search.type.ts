export type UserItem = {
    id: number;
    username: string;
    avatarUri: string;
};

export type HashtagItem = {
    id: number;
    hashtag: string;
};

export type PostItem = {
    id: number;
    username: string;
    caption: string;
    imageUri: string;
};

export type EventItem = {
    id: number;
    eventName: string;
    date: string;
    location: string;
};

export type SearchItem =
    | UserItem
    | HashtagItem
    | PostItem
    | EventItem;
