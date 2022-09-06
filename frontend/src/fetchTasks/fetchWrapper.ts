export default (url: string, options?: RequestInit) => {
    return fetch(url, options).then(async (response) => {
        if (response.ok) {
            try {
                return await response.json();
            } catch (e) {
                return ":)";
            }
        }
        throw await response.text();
    });
};
