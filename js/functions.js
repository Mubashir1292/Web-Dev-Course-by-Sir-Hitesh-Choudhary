//! here sample functions are written
let total = 0,
  i = 1;
do {
  total += i;
  i++;
} while (i <= 3);
// console.log(total);

const arr1 = [2, 3, 4, 5, 6];
let resultArray = [];
for (let i in arr1) {
  resultArray.push(arr1[i] * 2);
}
//console.log(resultArray);

const differentTypesOfTeas = [
  "chai",
  "green tea",
  "black tea",
  "herbal tea",
  "white tea",
];
let preferredTeas = [];
for (let tea of differentTypesOfTeas) {
  if (tea === "herbal tea") {
    continue;
  }
  //   preferredTeas = [...preferredTeas, tea];
  preferredTeas.push(tea);
}
console.log(preferredTeas);
