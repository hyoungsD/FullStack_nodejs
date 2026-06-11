
export interface User {
  name: string;
  age: number;
}

export class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUsers(): User[] {
    return this.users;
  }
}


// import
import {UserService as US2, User as U2} from './05_ts_module';

const us1 = new US2(); // userService
const u1: U2 = {  // User
  name: '홍길동',
  age: 25
};
us1.addUser(u1);
console.log('users', us1.getUsers());
