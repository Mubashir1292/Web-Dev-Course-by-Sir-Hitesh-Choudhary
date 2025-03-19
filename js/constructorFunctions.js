function person(name, currentProfession, nextProfession) {
  this.name = name;
  this.currentProfession = currentProfession;
  this.nextProfession = nextProfession;
}
const someOne = new person("Mubashir", "Learning", "Software Engineer");
console.log(
  `${someOne.name} is doing ${someOne.currentProfession} and after this he will become ${someOne.nextProfession}`
);
function Tea(teaType) {
  this.teaType = teaType;
  this.describe = function () {
    return `this is a cup of ${teaType}`;
  };
}
const tea1 = new Tea("Simple-Tea");
console.log(tea1.describe());
