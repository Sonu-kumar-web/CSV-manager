const FileSchema = require("../models/csvFile");
const parse = require("csv-parser");
const fs = require("fs");

module.exports.ViewUploadForm = function (req, res) {
   res.render("upload", {
      title: "CSV Manager | Upload CSV",
   });
};

module.exports.upload = function (req, res, next) {
   const file = req.file;
   if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
   }
   FileSchema.create(file, function (err, file) {
      if (err) {
         console.log(err);
      }
      console.log(file);
   });
   res.send(file);
};

module.exports.getList = function (req, res) {
   const list = FileSchema.find({}, function (err, csv_list) {
      if (err) {
         console.log("error");
         return;
      }
      res.render("uploadList", {
         title: "CSV Manager | Upload List",
         csv_list: csv_list,
      });
   });
};

module.exports.csvDisplay = function (req, res) {
   FileSchema.findById(req.params.id, function (err, file) {
      if (err) {
         console.log(err);
         return;
      }
      let file_path = file.path;
      const data = [];
      fs.createReadStream(file_path)
         .pipe(parse({ delimiter: "," }))
         .on("data", (r) => {
            // console.log(r);
            data.push(r);
         })
         .on("end", () => {
            res.render("csvDisplay", {
               title: "CSV Manager | Display CSV",
               data: data,
            });
         });
   });
};
