import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const JavaScriptPage: React.FC = () => {
  return (
    <div className="page">
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ color: '#007bff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={16} />
            홈으로 돌아가기
          </Link>
        </div>

        <div className="page-header">
          <h1 className="page-title">⚡ JavaScript</h1>
          <p className="page-subtitle">웹의 언어, 동적이고 유연한 프로그래밍 언어</p>
        </div>

        <div className="card">
          <h2 className="card-title">JavaScript란?</h2>
          <p>
            JavaScript는 1995년 브렌던 아이크가 개발한 동적 프로그래밍 언어입니다. 
            원래 웹 브라우저에서 동적인 웹페이지를 만들기 위해 개발되었지만, 
            현재는 서버사이드, 모바일 앱, 데스크톱 애플리케이션 개발까지 확장되었습니다.
          </p>
        </div>

        <div className="card">
          <h2 className="card-title">주요 특징</h2>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>동적 타이핑:</strong> 변수의 타입을 런타임에 결정</li>
            <li><strong>프로토타입 기반:</strong> 클래스 없이도 객체 지향 프로그래밍 가능</li>
            <li><strong>일급 함수:</strong> 함수를 값처럼 다룰 수 있음</li>
            <li><strong>이벤트 기반:</strong> 사용자 상호작용에 반응하는 프로그래밍</li>
            <li><strong>비동기 처리:</strong> Promise, async/await를 통한 비동기 프로그래밍</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="card-title">기본 문법</h2>
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>변수와 데이터 타입</h3>
          <div className="code-block">
{`// 변수 선언
let name = "JavaScript";
const age = 28;
var isPopular = true;

// 데이터 타입
let number = 42;
let string = "Hello World";
let boolean = true;
let array = [1, 2, 3, 4, 5];
let object = {
    name: "John",
    age: 30,
    city: "Seoul"
};
let nullValue = null;
let undefinedValue = undefined;

// 템플릿 리터럴
let greeting = \`안녕하세요, \${name}님! 나이는 \${age}세입니다.\`;`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>함수</h3>
          <div className="code-block">
{`// 함수 선언
function greet(name) {
    return \`안녕하세요, \${name}님!\`;
}

// 함수 표현식
const add = function(a, b) {
    return a + b;
};

// 화살표 함수
const multiply = (a, b) => a * b;

// 고차 함수
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
const evens = numbers.filter(x => x % 2 === 0);
const sum = numbers.reduce((acc, x) => acc + x, 0);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(evens);   // [2, 4]
console.log(sum);     // 15`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>객체와 클래스</h3>
          <div className="code-block">
{`// 객체 리터럴
const person = {
    name: "김자바",
    age: 25,
    greet() {
        return \`안녕하세요! 저는 \${this.name}입니다.\`;
    }
};

// ES6 클래스
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    
    speak() {
        return \`\${this.name}이(가) 소리를 냅니다.\`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name, "개");
        this.breed = breed;
    }
    
    speak() {
        return \`\${this.name}이(가) 멍멍 짖습니다.\`;
    }
}

const dog = new Dog("바둑이", "진돗개");
console.log(dog.speak()); // 바둑이이(가) 멍멍 짖습니다.`}
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">고급 기능</h2>
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>비동기 프로그래밍</h3>
          <div className="code-block">
{`// Promise
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("데이터를 가져왔습니다!");
        }, 1000);
    });
}

// async/await
async function loadData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error("에러 발생:", error);
    }
}

// Promise 체이닝
fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));

// 여러 Promise 처리
Promise.all([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
]).then(responses => {
    console.log("모든 데이터 로딩 완료");
});`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>구조 분해 할당</h3>
          <div className="code-block">
{`// 배열 구조 분해
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// 객체 구조 분해
const user = { name: "Alice", age: 30, city: "Seoul" };
const { name, age, city = "Unknown" } = user;

// 함수 매개변수에서 구조 분해
function greetUser({ name, age }) {
    return \`안녕하세요, \${name}님! \${age}세이시군요.\`;
}

greetUser(user); // 안녕하세요, Alice님! 30세이시군요.`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>모듈 시스템</h3>
          <div className="code-block">
{`// math.js
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export default function multiply(a, b) {
    return a * b;
}

// main.js
import multiply, { PI, add } from './math.js';
import * as MathUtils from './math.js';

console.log(PI);                    // 3.14159
console.log(add(2, 3));            // 5
console.log(multiply(4, 5));       // 20
console.log(MathUtils.add(1, 2));  // 3`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>클로저와 스코프</h3>
          <div className="code-block">
{`// 클로저 예제
function createCounter() {
    let count = 0;
    
    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getCount() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2

// 즉시 실행 함수 (IIFE)
(function() {
    const privateVar = "외부에서 접근 불가";
    
    window.myModule = {
        publicMethod() {
            return "공개 메서드";
        }
    };
})();`}
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">주요 활용 분야</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>프론트엔드 개발</h4>
              <p>React, Vue, Angular를 이용한 웹 애플리케이션</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>백엔드 개발</h4>
              <p>Node.js를 이용한 서버 사이드 개발</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>모바일 앱</h4>
              <p>React Native를 이용한 크로스 플랫폼 앱</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>데스크톱 앱</h4>
              <p>Electron을 이용한 데스크톱 애플리케이션</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">학습 로드맵</h2>
          <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8', marginTop: '1rem' }}>
            <li>기본 문법과 데이터 타입 이해</li>
            <li>함수와 스코프 개념 학습</li>
            <li>객체와 배열 조작 마스터</li>
            <li>DOM 조작과 이벤트 처리</li>
            <li>비동기 프로그래밍 (Promise, async/await)</li>
            <li>ES6+ 최신 문법 학습</li>
            <li>프레임워크/라이브러리 선택 및 학습</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default JavaScriptPage;