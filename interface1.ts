interface SearchFunc {
  (source: string, subString: string) : boolean;
}

let mySearch: SearchFunc;
// mySearch = function(source: string, subString: string) {
//   let result = source.search(SubString);
//   return result > -1;
// }
// 函数的参数名不需要与接口里定义的名字相匹配
// mySearch = function(src: string, sub: string): boolean {
//   let result = src.search(sub);
//   return result > -1;
// }
// 函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。如果不想指定类型。系统会推断出参数类型，因为函数直接赋值给了 SearchFunc 类型变量。函数的返回值类型是通过其返回值推断出来的。如果让这个函数返回数字或字符串，类型检查器会警告返回值类型不匹配
mySearch = function(src, sub) {
  let result = src.search(sub);
  return result > -1;
}
// 可索引类型
// 我们可以描述那些能够通过索引得到的类型，
// 可索引类型居于一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型

interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ['bob', 'fred'];

let myStr: string = myArray[0];

// ts支持两种索引签名： 字符串和数字。可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。这是因为当使用 number 来索引时，js会将它转换成 string 然后再去索引对象。因此两者需要保持一致。

// 类类型
// 实现接口

// interface ClockInterface{
//   currentTime: Date;
// }

// class Clock implements ClockInterface {
//   currentTime: Date = new Date();
//   constructor(h: number, m: number);
// }

// 也可以再接口种描述一个方法，再类里实现它，如同下面的 setTime 方法一样

// interface ClockInterface {
//   currentTime: Date;
//   setTime(d: Date): void;
// }

// class Clock implements ClockInterface {
//   currentTime: Date = new Date();
//   setTime(d: Date) {
//     this.currentTime = d;
//   }
//   constructor(h: number, m: number){}
// }
// 类静态部分与实例部分的区别
// 当操作类和接口的时候，要知道类时具有两个类型的
// 静态部分的类型和示例的类型
// 当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误
// 因为当一个类实现了一个接口时，只对其实例部分进行类型检查。constructor 存在于类得静态部分，所以不在检查得范围内。因此我们应该直接操作类的静态部分
interface ClockConstructor{
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number) : ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number){}
  tick() {
    console.log('beep beep');
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number){}
  tick() {
    console.log('tick tock');
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 因为createClock 的第一个参数是 ClockConstructor 类型，在 createClock(AnalogClock, 7, 32) 里，会检查 AnalogClock 是否符合构造函数签名
// 另一种简单方式是使用类表达式
interface ClockConstructor {
  new (hour: number, minute: number);
}

interface ClockInterface {
  tick();
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number){}
  tick() {}
}
// 继承接口
// 和类一样，接口也可以相互继承。
interface Shape{
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = <Square>{};
square.color = 'blue';
square.sideLength = 10;