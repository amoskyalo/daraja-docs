export type User = {
    active: boolean;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    phone_number: string;
};

export type UserAuthType = {
    user: User | undefined;
    isLoading: boolean;
};
