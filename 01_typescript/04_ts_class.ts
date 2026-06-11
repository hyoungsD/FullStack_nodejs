
// extends = 부모의 기능을 물려받음
// implements = 인터페이스의 규칙을 구현함


class Animal {
  protected name: string;
  protected age: number;

  // 생성자
  constructor(name: string, age: number){
    this.name = name;
    this.age = age;
  }

  // 객체
  public move(distance: number = 0):void {
    console.log(`${this.name} moved ${distance}`);
  }
  public getInfo(): string{
    return `이름: ${this.name}, 나이: ${this.age}`;
  }
}

const ani1 = new Animal('기린', 3);
console.log('ani1의 정보 - ', ani1.getInfo());


// 상속
class Dog extends Animal {
  private breed: string;
  
  // 생성자
  constructor(name: string, age: number, breed: string){
    super(name, age);
    this.breed = breed;
  }

  // 객체
  public bark():void {
    console.log('멍멍');
  }

  // overload(재설정, 재정의)
  public getInfo():string{
    return `${super.getInfo()}, 품종: ${this.breed}`;
  }
}
const golden = new Dog('금동이', 2, '골든리트리버');
console.log('dog info - ', golden.getInfo()); // 이름: 금동이, 나이: 2, 품종: 골든리트리버
golden.bark() // 멍멍
golden.move(20);  // 금동이 moved 20


// implements : 클래스가 특정 인터페이스(Interface)의 규칙을 반드시 구현하도록 강제
interface Flyable{
  fly(): void;
}
class Bird extends Animal implements Flyable{
  private wingspan: number;

  constructor(name: string, age: number, wingspan: number){
    // 문제2: 생성자 안의 내용을 구현해보세요
    super(name, age);
    this.wingspan = wingspan;
  }

  fly(): void{
    console.log(`${this.name} is flying with wingspan ${this.wingspan}`);     
  }
}

const bird = new Bird('참새', 2, 0.1);
console.log(bird.getInfo());  // 이름: 참새, 나이: 2
bird.fly(); // 참새 is flying with wingspan 0.1

