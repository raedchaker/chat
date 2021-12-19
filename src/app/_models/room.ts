import { User } from './user';

export class Room {
    label: string;
    owner: string| User;
    members: string[]| User [] = [];
    active: boolean;
}
