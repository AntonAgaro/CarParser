console.log(Math.floor(Math.random() * 10));
const arr = Array.from({ length: 100 }, (_, idx) => idx + 1);
console.log(arr);

while (arr.length) {
  const randomPage = Math.floor(Math.random() * 101);
  const idx = arr.indexOf(randomPage);

  if (idx === -1) {
    continue;
  }

  arr.splice(idx, 1);
  console.log(randomPage);
  console.log(arr);
}
// console.log(arr);
