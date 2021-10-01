export type Med = {
    name: string;
    owner: string;
    quantity: number;
    med_type: 'Syrup' | 'Tablet' | 'Lotion' | 'others';
    start: Date;
    end: Date;
    time_of_day: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
    meal: 'After' | 'Before';
    gap: number;
    taken: string[];
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
