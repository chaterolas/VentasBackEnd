
var mustache = require("mustache");

var result = mustache.render("Hello {{name}} {{lastname}}", {
  name: "Alain",
  lastname: "Chevanier"
});

console.log(result);