import axios from "./axios";
import { API } from "../constants";

export async function login({ username }: { username: string }) {
    const { data } = await axios.get(`${API}/users/${username}`);

    return data;
}

export async function signup({
    username,
    name,
}: {
    username: string;
    name: string;
}) {
    const { data } = await axios.post(`${API}/users/`, { name, username });

    return data;
}
