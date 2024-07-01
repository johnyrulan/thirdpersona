import { createRecord } from "./services/mongo";

export const main = async (params) => {
    const url = `${globalThis.fleek.env.BASE_URL}/event`;

    const { method, path, query, body } = params;

    if (body) {
        return await createRecord(url, body)
    }

    return {};    
}