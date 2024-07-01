import { getRecords } from "./services/mongo";

export const main = async (params) => {    
    const url = `${globalThis.fleek.env.BASE_URL}/getusers`;

    return await getRecords(url);
}