// console.log("Início");

// const travarThread = () => {
//   console.log("Travou thread Principal");
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("Resolvida");
//     }, 5000);
//   });

// };

// await travarThread();

// console.log("Fim");

var lengthOfLongestSubstring = function (s) {
  if (typeof s !== "string") return;
  if (!s) return;

  let test = [];

  s.split("").forEach((letter, i) => {
    test.includes(letter)
      ? test = [letter]
      : test.push(letter);
  });

  return test.length;
};

// lengthOfLongestSubstring('abcabcabc')
console.log(lengthOfLongestSubstring("abcabcabb"));
// lengthOfLongestSubstring('bbbbb')
console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));

// lengthOfLongestSubstring('pwwkew')

// console.log([1,2,3].includes(3))
