interface User{
  name: string;
  age: number;
}

const user1 : User = {
  name: '홍길동,',
  age: 40
}
console.log('user1', user1);  // { name: '홍길동,', age: 40 }


// 문제1 : Product 인터페이스 정의
// title 문자열, price 숫자
// product1 이름으로 객체 정의
interface Product {
  title : string;
  price : number;
}
const product1 : Product = {
  title: '사과',
  price: 3000,
}
console.log('product1', product1);  // { title: '사과', price: 3000 }


// 선택적 property
interface ColorConfig {
  color?: string;
  width? : number;
}
const config1 : ColorConfig = {
  color : 'red'
}
console.log('config1', config1);  // { color: 'red' }


// 문제2 : 선택적 프로퍼티
// UpdateProfileDTO 인터페이스를 만들고
// 속성은 nickname, phone, marketingAgreed
// 필수값은 nickname, 나머지는 선택적이다
// nickname, phone : 문자열, marketingAgreed : boolean
interface UpdateProfileDTO {
  nickname : string;
  phone?: string;
  marketingAgreed?: boolean;
}

const udot1 : UpdateProfileDTO = {
  nickname: '홍길동'
}


// 상속
interface Admin extends User{
  role: string
}
const admin1 : Admin ={
  name: '김말자',
  age: 40,
  role: '관리자'
}



// type
// 보통 Interface를 주로 쓰고, Type은 Status나 Type을 합칠 때 많이 사용
type User2 = {
  name: string;
  age: string;
}
type Status = 'pending' | 'paid' | 'shipped';

interface Order {
  id: number;
  status: Status;
}
const order1 : Order = {
  id: 1,
  status: 'pending'
}


// 문제3 : 인터페이스 확장
// Shape 인터페이스 정의하고 color 속성(문자열)
// Shape 인터페이스를 확장한 Square 인터페이스 정의
// Shape의 추가속성 sideLength 숫자타입으로
// 정의하고
// 사각형 객체를 하나 만들어보세요
interface Shape {
  color: string;
}
interface Squre extends Shape{
  sideLength : number;
}
const sq1 : Squre = {
  color: 'blue',
  sideLength: 10,
}
console.log('sq1', sq1);  // { color: 'blue', sideLength: 10 }
