function removeDuplicates(arr) {
  let removedDuplicates = arr;
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr.length; j > i; j--) {
      if (arr[i] === arr[j]) {
          removedDuplicates.
      }
    }
  }
  console.log(removedDuplicates);
}
removeDuplicates([1, 2, 3, 4, 1, 5, 3]);
