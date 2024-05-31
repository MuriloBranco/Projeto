import { Timestamp } from 'typeorm';
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    created_at: Timestamp;
    updated_at: Timestamp;
}
