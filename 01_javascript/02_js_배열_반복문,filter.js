let arr = [5, 23, 'hello', true, 'world', -9];

// 1. for 또는 while로 출력 console.log
for(let i=0; i<arr.length; i++){
  console.log(arr[i]);
}

console.log('=================');

let i = 0;
while(i<arr.length){
  console.log(arr[i]);
  i++;
}

console.log('=================');

// 2. forEach 함수 이용해서 출력 해보세요 console.log
arr.forEach((item) => {
  console.log(item);
})

console.log('=================');

// 3. filter: arr에서 문자만 출력 hello, world
const arrString = arr.filter((item) => typeof(item) === 'string');
console.log(arrString);

arr.filter((aa) => {
  const chk = typeof aa === 'string';
  if(chk) console.log(chk, aa);
})

