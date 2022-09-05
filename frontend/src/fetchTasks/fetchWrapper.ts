export default (url: string, options?: RequestInit) => {
    return fetch(url, options).then(async (response) => {
        if (response.ok) {
            return await response.json();
        }
        throw await response.text();
    });
};
