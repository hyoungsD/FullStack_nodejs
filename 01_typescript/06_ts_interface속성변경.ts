
interface User{
  name: string;
  age: number;
  email?: string;
}


const user11: User = {
  name: '홍길동', age: 12,
}


// 인터페이스 속성을 전부 선택적으로 바꿔줍니다.
type PariaUser = Partial<User>;

const puser1: PariaUser = {
}


// 인터페이스 속성을 전부 필수로 바꿔줍니다.
type ReauireUser = Required<User>;
const ruser1: ReauireUser = {
  name: '', age: 0, email: ''
}

// 인터페이스 모든 필드를 읽기전용
type ReadOnlyUser = Readonly<User>;
