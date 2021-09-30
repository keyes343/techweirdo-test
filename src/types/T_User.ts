import { Url_storage } from './index';

export type ID_Type = 'Drivers License' | 'Adhaar Card';
export type User = {
    email: string | null;
    uid: string;
};

export interface UserDocument extends User {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}
