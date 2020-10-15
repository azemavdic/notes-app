const { inverse } = require("chalk");
const chalk = require("chalk");
const fs = require("fs");

//----------Dodaj bilješku---------------
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const saveNotes = (notes) => {
  const dataJSon = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSon = dataBuffer.toString();
    return JSON.parse(dataJSon);
  } catch (error) {
    return [];
  }
};

//----------Izbriši bilješku-------------
const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length === notesToKeep.length) {
    console.log(chalk.red.inverse("No note find!"));
  } else {
    saveNotes(notesToKeep);
    console.log(chalk.inverse.green("Note is removed!"));
  }
};

//----------Lista bilješki-----------------
const listNotes = () => {
  console.log(chalk.blue("Your notes"));
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(chalk.inverse(note.title));
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const searchNotes = notes.find((note) => note.title === title);
  if (searchNotes) {
    console.log(chalk.inverse(searchNotes.title));
    console.log(searchNotes.body);
  } else {
    console.log(chalk.red.inverse('No note is find!'));
  }
};
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
