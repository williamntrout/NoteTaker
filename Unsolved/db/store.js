const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    constructor() {
        this.lastId = 0;
    }

    read() {
        return readFileAsync("db/db.json", "utf8");
    }

    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    getNotes = async () => {
        return JSON.parse(await this.read())
    }

    addNote = async (note) => {
        const notes = JSON.parse(await this.read())
        note.id = notes.length + 1
        const new_notes = [note, ...notes]
        await this.write(new_notes)
        return JSON.parse(await this.read())
    }

    deleteNote = async (note_id) => {
        const notes = await this.read();
        const new_notes = notes.filter(note => note.id !== note_id)
        return await this.write(new_notes)
    }

}


module.exports = new Store();