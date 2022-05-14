export function getPlugins(req, res) {
    console.log(this.plugins);
    res.send(this.plugins);
}
