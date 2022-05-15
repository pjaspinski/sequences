export default () => {
    return fetch("/plugins").then((res) => res.json());
};
