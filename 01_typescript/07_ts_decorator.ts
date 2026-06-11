// npm i reflect-metadata
import 'reflect-metadata';

// 데코레이터(Decorator)
//  : 클래스, 메서드, 속성, 매개변수 등에 추가 기능을 붙이는 문법
//  : 원래 코드에 손대지 않고, 부가 기능을 덧붙이는 장치


// function 함수명(constructor 생성자)
function MarkController(constructor: Function){
  console.log('등록된 클래스', constructor.name);
}

// @함수명
//  : 생성자를 넘겨준다
@MarkController
class ExampleClass{
  constructor(
    public name: string 
  ){}
}
// console.log == 등록된 클래스 ExampleClass

const example = new ExampleClass('홍길동');
console.log('example name ', example.name); // example name  홍길동



// 
const controllerUrls : Record<string, string> = {}; // 어떤 클래스가 어떤 url

function Controller(url: string){ // 데코레이터를 만들었어요
  console.log(` Controll(${url}) 호출됨`)
  return function registerController(constructor: Function){
    console.log(` class ${constructor.name} 등록`);  // constructor.name : 클래스네임
    controllerUrls[constructor.name] = url;
  }
}

@Controller('/poducts')
class ProductController {
  create() {
    return '상품 생성'
  }
}

@Controller('/orders')
class OrderController {
  create() {
    return '상품 주문'
  }
}

console.log('controllerurls', controllerUrls);
