export async function getRecords(url) {
    try {
        const result = await fetch(url);
    
        return result.json();
    } catch (err) {

    }

    return [];
}

export async function createRecord(url, record) {
    try {
        const result = await fetch(url, {
            method: "POST",
            body: JSON.stringify(record)
        })    

        return result.json();
    } catch (err) {

    }

    return {};
}