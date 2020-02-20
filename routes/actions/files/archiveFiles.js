const archiver = require("archiver");
const fse = require("fs-extra");
// *
const archiveFiles = async (filesPath, archivePath, archiveName) => {
  console.log("Archiver started...");
  const output = fse.createWriteStream(`${archivePath}${archiveName}`);
  const archive = archiver("zip");

  output.on("close", () => {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "Archiver has been finalized and the output file descriptor has closed."
    );
  });
  output.on("end", function() {
    console.log("Data has been drained");
  });

  archive.on("warning", function(err) {
    if (err.code === "ENOENT") {
      console.log(err);
    } else {
      // throw error
      throw err;
    }
  });
  archive.on("error", function(err) {
    throw err;
  });

  archive.pipe(output);
  archive.directory(filesPath, false);

  archive.finalize();
  return output;
};

module.exports = archiveFiles;
