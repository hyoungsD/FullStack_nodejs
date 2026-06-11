
let isDone : boolean = false;
console.log('boolean', isDone); // false

let decimal: number = 6;
console.log('number', decimal); // 6

let color: string = 'blue';
console.log('string', color); // blue

let list: number[] = [1,2,3];
console.log('number[]', list);  // [1,2,3]

let tuple: [string, number] = ['hello', 3];
console.log('tuple', tuple);  // [ 'hello', 3 ]

// 열거형 타입
enum Color {
  Red, Green, Blue
}
let fColor : Color = Color.Blue;
console.log('Color', fColor); // 2

let notSure: any = 4;
notSure = 'string';
console.log('notSure', notSure);  // string

// union
let unionType: string | number = 'hello';
unionType = 42;
console.log('unionType', unionType);  // 42
