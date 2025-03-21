function Institute(type) {
  this.type = type;
}
Institute.prototype.agreement = function () {
  return `Completed the Agreement with ${this.type}`;
};
let school = new Institute("School");
console.log(school.agreement());
