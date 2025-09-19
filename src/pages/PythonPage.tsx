import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PythonPage: React.FC = () => {
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
          <h1 className="page-title">🐍 Python</h1>
          <p className="page-subtitle">간단하고 강력한 범용 프로그래밍 언어</p>
        </div>

        <div className="card">
          <h2 className="card-title">Python이란?</h2>
          <p>
            Python은 1991년 귀도 반 로섬이 개발한 고급 프로그래밍 언어입니다. 
            간단하고 읽기 쉬운 문법으로 유명하며, "배우기 쉽고 사용하기 강력한" 언어라는 철학을 가지고 있습니다.
          </p>
        </div>

        <div className="card">
          <h2 className="card-title">주요 특징</h2>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>간단한 문법:</strong> 들여쓰기로 코드 블록을 구분하여 가독성이 뛰어남</li>
            <li><strong>인터프리터 언어:</strong> 컴파일 과정 없이 바로 실행 가능</li>
            <li><strong>동적 타이핑:</strong> 변수의 타입을 런타임에 결정</li>
            <li><strong>풍부한 라이브러리:</strong> 표준 라이브러리와 서드파티 패키지가 매우 풍부</li>
            <li><strong>크로스 플랫폼:</strong> Windows, macOS, Linux 등 다양한 운영체제에서 실행</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="card-title">기본 문법</h2>
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>변수와 데이터 타입</h3>
          <div className="code-block">
{`# 변수 선언 (타입 명시 불필요)
name = "Python"
age = 32
is_popular = True
version = 3.11

# 리스트
languages = ["Python", "JavaScript", "Java", "C++"]

# 딕셔너리
person = {
    "name": "Alice",
    "age": 30,
    "city": "Seoul"
}`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>함수 정의</h3>
          <div className="code-block">
{`def greet(name, greeting="안녕하세요"):
    """인사말을 출력하는 함수"""
    return f"{greeting}, {name}님!"

# 함수 호출
message = greet("파이썬")
print(message)  # 안녕하세요, 파이썬님!

# 람다 함수
square = lambda x: x ** 2
print(square(5))  # 25`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>클래스와 객체</h3>
          <div className="code-block">
{`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"안녕하세요! 저는 {self.name}이고, {self.age}살입니다."
    
    def have_birthday(self):
        self.age += 1
        print(f"생일 축하합니다! 이제 {self.age}살이네요.")

# 객체 생성 및 사용
person = Person("김파이썬", 25)
print(person.introduce())
person.have_birthday()`}
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">고급 기능</h2>
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>리스트 컴프리헨션</h3>
          <div className="code-block">
{`# 기본 리스트 컴프리헨션
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 조건부 리스트 컴프리헨션
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)  # [0, 4, 16, 36, 64]

# 딕셔너리 컴프리헨션
word_lengths = {word: len(word) for word in ["python", "java", "rust"]}
print(word_lengths)  # {'python': 6, 'java': 4, 'rust': 4}`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>데코레이터</h3>
          <div className="code-block">
{`import time
from functools import wraps

def timing_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} 실행 시간: {end - start:.4f}초")
        return result
    return wrapper

@timing_decorator
def slow_function():
    time.sleep(1)
    return "완료!"

# 사용
result = slow_function()  # slow_function 실행 시간: 1.0012초`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>제너레이터</h3>
          <div className="code-block">
{`def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# 제너레이터 사용
fib = fibonacci()
for _ in range(10):
    print(next(fib), end=" ")
# 출력: 0 1 1 2 3 5 8 13 21 34

# 제너레이터 표현식
squares_gen = (x**2 for x in range(1000000))  # 메모리 효율적`}
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">주요 활용 분야</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>웹 개발</h4>
              <p>Django, Flask를 이용한 백엔드 개발</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>데이터 과학</h4>
              <p>NumPy, Pandas, Matplotlib를 이용한 데이터 분석</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>머신러닝/AI</h4>
              <p>scikit-learn, TensorFlow, PyTorch를 이용한 AI 개발</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>자동화</h4>
              <p>스크립팅과 업무 자동화 도구 개발</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">시작하기</h2>
          <p>Python을 배우고 싶다면 다음 단계를 따라해보세요:</p>
          <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8', marginTop: '1rem' }}>
            <li>Python 공식 웹사이트에서 최신 버전 다운로드</li>
            <li>기본 문법과 데이터 타입 학습</li>
            <li>함수와 클래스 개념 이해</li>
            <li>표준 라이브러리 탐색</li>
            <li>실제 프로젝트를 통한 실습</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PythonPage;