function add(x: number, y: number): number{
  return x + y;
}
console.log('add', add(3, 4));  // 7


// 문제1: multiply 곱하기 함수 x, y, z 각각의 number
// 반환값도 Number
function multiply(x:number, y:number, z:number):number{
  return x * y * z;
}
console.log('multiply', multiply(1,2,3)); // 6


function buildName(firstName: string, lastName?: string): string{
  return lastName ? `${firstName} ${lastName}` : `${firstName}`;
}
console.log('buildName', buildName('길동'));  // 길동
console.log('buildName', buildName('철수', '김'));  // 철수 김


// 매개변수에 기본값
function greet(name: string, greeting: string = '안녕하세요'): string {
  return `${greeting} ${name}`;
}
console.log('greet', greet('홍길동'));  // 안녕하세요 홍길동
console.log('greet', greet('홍길동', '반갑습니다'));  // 반갑습니다 홍길동


// 제네릭
function identity<T>(arg: T): T{
  return arg;
}
console.log('identity - number', identity<number>(42)); //42
console.log('identity - string', identity<string>('hello'));  // hello

function identity2(arg: any): any{
  return arg;
}


// 특정 제네릭 타입만
function logValue<T extends string | number>(value: T): void{
  console.log(value);
}
logValue('hello');
logValue(42);
// logValue(false);


// 문제2
// buildSearchUrl('이어폰');
// products?keyword=이어폰
// buildSearchUrl('이어폰', '전자기기');
// products?keyword=이어폰&category=전자기기
// buildSearchUrl('이어폰', undefined, 50000);
// products?keyword=이어폰&minPrice=50000
// buildSearchUrl('이어폰', '전자기기', 50000);
// products?keyword=이어폰&category=전자기기&minPrice=50000
function buildSearchUrl (
  keyword: string,
  category?: string,
  minPrice?: number
): string{
  // 여기에 로직을 구현해보세요. 결과는 위의 주석 참고
  // url += ''
  let url = `products?keyword=${keyword}`;
  if(category !== undefined){
     url += `&category=${category}`;
  }
  if(minPrice !== undefined){
     url += `&minPrice=${minPrice}`;
  }
  return url;
}
console.log('buildSearchUrl -', buildSearchUrl('이어폰'));  // products?keyword=이어폰
console.log('buildSearchUrl -', buildSearchUrl('이어폰', '전자기기'));  // products?keyword=이어폰&category=전자기기
console.log('buildSearchUrl -', buildSearchUrl('이어폰', undefined, 50000));  // products?keyword=이어폰&minPrice=50000
console.log('buildSearchUrl -', buildSearchUrl('이어폰', '전자기기', 50000)); // products?keyword=이어폰&category=전자기기&minPrice=50000



// TEST
function buildSearchUrl2(
  keyword: string,
  options?: {
    category?: string;
    minPrice?: number;
  }
): string {
  let url = `products?keyword=${keyword}`;
  if (options?.category) {
    url += `&category=${options.category}`;
  }
  if (options?.minPrice !== undefined) {
    url += `&minPrice=${options.minPrice}`;
  }
  return url;
}
console.log(buildSearchUrl2('이어폰'));
console.log(buildSearchUrl2('이어폰', { category: '전자기기' }));
console.log(buildSearchUrl2('이어폰', { minPrice: 50000 }));
console.log(buildSearchUrl2('이어폰', {
  category: '전자기기',
  minPrice: 50000,
}));