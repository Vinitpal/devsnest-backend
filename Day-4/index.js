const fs = require("fs");
const program = require("commander");

// CREATE DIRECTORY
program.command("mkdir <dirname>").action((dirname) => {
  fs.mkdir(dirname, (err) => {
    console.log(err);
  });
});

// CREATE FILE WITH TEXT
program.command("mkfile <path> <text>").action((path, text) => {
  fs.writeFile(path, text, (err) => {
    console.log(err);
  });
});

// READ FILE
program.command("readfile <path>").action((path) => {
  fs.readFile(path, "utf-8", (err, text) => {
    console.log(text);
  });
});

// UPDATE FILE
program.command("update <path> <text>").action((path, text) => {
  fs.writeFile(path, text, (err) => {
    console.log(err);
  });
});

// DELETE DIRECTORY
program.command("rmdir <dirname>").action((dirname) => {
  fs.rmdir(dirname, (err) => {
    console.log(err);
  });
});

// DELETE A FILE
program.command("rmdir <dirname>").action((dirname) => {
  fs.unlink(path, (err) => {
    console.log(err);
  });
});

// ------- MISC ------- //

// RENAME FILE
program.command("rename <oldpath> <newpath>").action((oldpath, newpath) => {
  fs.rename(oldpath, newpath, (err) => {
    console.log(err);
  });
});

// APPEND TO FILE
program.command("append <path> <text>").action((path, text) => {
  fs.appendFile(path, content, (err) => {
    console.log(err);
  });
});

program.parse(process.argv);

// NORMIE METHOD
// const cmd = process.argv[2];
// if (cmd === "mkdir") {
//   fs.mkdir(process.argv[3], (err) => {
//     console.log(err);
//   });
// }
