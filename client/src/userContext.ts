import { createContext } from "react";

export interface userType {
    name: string,
    email: string,
    password: string,
    _id: string
}

interface contextType {
    user: userType | null,
    setUser: (user: userType)=> void
}

export const UserContext = createContext<contextType | null>(null);
