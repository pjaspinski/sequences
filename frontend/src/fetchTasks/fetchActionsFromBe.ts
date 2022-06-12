export default () => {
    return fetch("/plugins/actions").then((res) => res.json());
};
