import axios from "./axios";
import { API } from "../constants";

export async function createRoom(name: string) {
    const { data } = await axios.post(`${API}/room`, { name });

    return data;
}

export async function joinRoom(room_id: string, user_id: string) {
    const { data } = await axios.post(`${API}/room/${room_id}/join`, {
        user_id,
    });

    return data;
}

export async function loadRoom(room_id: string) {
    const { data } = await axios.get(`${API}/room/${room_id}`);

    return data;
}

export async function loadRooms() {
    const { data } = await axios.get(`${API}/room`);

    return data;
}

export async function loadUserRooms(user_id: String) {
    const { data } = await axios.get(`${API}/room/mine/${user_id}`);

    return data;
}

export async function sendMessage({
    room_id,
    message,
    language,
    user_id,
}: {
    room_id: String;
    message: String;
    language: String;
    user_id: String;
}) {
    const { data } = await axios.post(`${API}/room/${room_id}/message`, {
        lang: language,
        message: message.trim(),
        user_id,
    });
    return data;
}
