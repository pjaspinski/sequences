export default () => {
    return fetch("/sequences").then((res) => res.json());
};
