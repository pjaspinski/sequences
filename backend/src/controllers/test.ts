export function getItem(req, res) {
    const { key } = req.query;
    res.send(this.localDbs.data[key]);
}

export async function setItem(req, res) {
    const { key, value } = req.body;
    this.localDbs.data[key] = value;
    await this.localDbs.write();
    res.send("done!");
}
