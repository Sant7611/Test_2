import { User } from "../types";
import { api } from "./client";

export async function fetchUsers(){
    const {data} = await api.get<User[]>("/users");
    return data;
}