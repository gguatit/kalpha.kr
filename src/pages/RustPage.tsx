import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const RustPage: React.FC = () => {
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
          <h1 className="page-title">🦀 Rust</h1>
          <p className="page-subtitle">메모리 안전성과 성능을 모두 만족하는 시스템 프로그래밍 언어</p>
        </div>

        <div className="card">
          <h2 className="card-title">Rust란?</h2>
          <p>
            Rust는 Mozilla에서 2010년에 개발을 시작하여 2015년에 안정화된 시스템 프로그래밍 언어입니다. 
            메모리 안전성을 보장하면서도 C/C++와 같은 수준의 성능을 제공하는 것이 주요 목표입니다. 
            "안전하고, 빠르고, 병렬성을 지원하는" 언어라는 모토를 가지고 있으며, 
            가비지 컬렉터 없이도 메모리 안전성을 보장하는 독특한 소유권 시스템이 특징입니다.
          </p>
        </div>

        <div className="card">
          <h2 className="card-title">주요 특징</h2>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>메모리 안전성:</strong> 컴파일 타임에 메모리 오류를 방지</li>
            <li><strong>제로 코스트 추상화:</strong> 고수준 기능을 사용해도 성능 저하 없음</li>
            <li><strong>소유권 시스템:</strong> 가비지 컬렉터 없이 메모리 관리</li>
            <li><strong>병렬성 지원:</strong> 안전한 동시성 프로그래밍</li>
            <li><strong>크로스 플랫폼:</strong> 다양한 플랫폼에서 실행 가능</li>
            <li><strong>강력한 타입 시스템:</strong> 컴파일 타임에 많은 오류를 잡아냄</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="card-title">기본 문법</h2>
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>변수와 타입</h3>
          <div className="code-block">
{`// 변수 선언
let x = 5;                    // 불변 변수 (기본)
let mut y = 10;               // 가변 변수

// 타입 명시
let number: i32 = 42;
let float: f64 = 3.14;
let character: char = 'R';
let boolean: bool = true;
let text: &str = "Rust";

// 정수 타입
let small_int: i8 = 127;      // 8비트 signed
let big_int: i64 = 9223372036854775807;
let unsigned: u32 = 4294967295;

// 배열과 벡터
let array: [i32; 5] = [1, 2, 3, 4, 5];
let vector: Vec<i32> = vec![1, 2, 3, 4, 5];

// 튜플
let tuple: (i32, f64, char) = (42, 3.14, 'R');
let (x, y, z) = tuple;        // 구조 분해

// 문자열
let string_slice: &str = "Hello";
let owned_string: String = String::from("World");`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>함수와 제어 구조</h3>
          <div className="code-block">
{`// 함수 정의
fn greet(name: &str) -> String {
    format!("안녕하세요, {}님!", name)
}

// 표현식과 문
fn add_one(x: i32) -> i32 {
    x + 1  // 세미콜론이 없으면 표현식 (반환값)
}

// 조건문
fn check_number(x: i32) -> &'static str {
    if x > 0 {
        "양수"
    } else if x < 0 {
        "음수"
    } else {
        "영"
    }
}

// 반복문
fn print_numbers() {
    // for 루프
    for i in 1..=5 {
        println!("{}", i);
    }
    
    // while 루프
    let mut count = 0;
    while count < 3 {
        println!("count: {}", count);
        count += 1;
    }
    
    // loop (무한 루프)
    let mut x = 0;
    let result = loop {
        x += 1;
        if x == 10 {
            break x * 2;  // 값과 함께 break
        }
    };
}

// 패턴 매칭
fn describe_number(x: i32) -> &'static str {
    match x {
        1 => "하나",
        2 | 3 => "둘 또는 셋",
        4..=10 => "4부터 10까지",
        _ => "그 외"
    }
}`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>구조체와 열거형</h3>
          <div className="code-block">
{`// 구조체 정의
struct Person {
    name: String,
    age: u32,
    email: String,
}

// 구조체 메서드
impl Person {
    // 연관 함수 (생성자)
    fn new(name: String, age: u32, email: String) -> Person {
        Person { name, age, email }
    }
    
    // 메서드
    fn introduce(&self) -> String {
        format!("안녕하세요! 저는 {}이고, {}살입니다.", self.name, self.age)
    }
    
    // 가변 메서드
    fn have_birthday(&mut self) {
        self.age += 1;
    }
}

// 구조체 사용
let mut person = Person::new(
    String::from("김러스트"),
    25,
    String::from("rust@example.com")
);

println!("{}", person.introduce());
person.have_birthday();

// 열거형 (Enum)
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

// 열거형 메서드
impl Message {
    fn process(&self) {
        match self {
            Message::Quit => println!("종료합니다"),
            Message::Move { x, y } => println!("({}, {})로 이동", x, y),
            Message::Write(text) => println!("메시지: {}", text),
            Message::ChangeColor(r, g, b) => println!("색상 변경: RGB({}, {}, {})", r, g, b),
        }
    }
}`}
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">소유권 시스템</h2>
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>소유권 규칙</h3>
          <div className="code-block">
{`// 소유권 이동 (Move)
let s1 = String::from("hello");
let s2 = s1;  // s1의 소유권이 s2로 이동
// println!("{}", s1);  // 컴파일 에러! s1은 더 이상 유효하지 않음

// 복제 (Clone)
let s1 = String::from("hello");
let s2 = s1.clone();  // 명시적 복제
println!("{} {}", s1, s2);  // 둘 다 유효

// 참조 (Borrowing)
fn calculate_length(s: &String) -> usize {
    s.len()  // 소유권을 가져오지 않고 참조만 함
}

let s1 = String::from("hello");
let len = calculate_length(&s1);  // 참조 전달
println!("'{}' 길이는 {}입니다.", s1, len);  // s1은 여전히 유효

// 가변 참조
fn change(s: &mut String) {
    s.push_str(", world");
}

let mut s = String::from("hello");
change(&mut s);  // 가변 참조 전달
println!("{}", s);  // "hello, world"

// 슬라이스
fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();
    
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    
    &s[..]
}

let sentence = String::from("hello world");
let word = first_word(&sentence);
println!("첫 번째 단어: {}", word);`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>라이프타임</h3>
          <div className="code-block">
{`// 라이프타임 어노테이션
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

// 구조체의 라이프타임
struct ImportantExcerpt<'a> {
    part: &'a str,
}

impl<'a> ImportantExcerpt<'a> {
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("주목하세요: {}", announcement);
        self.part
    }
}

// 정적 라이프타임
let s: &'static str = "이 문자열은 프로그램 전체 수명을 가집니다.";`}
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">고급 기능</h2>
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>제네릭과 트레이트</h3>
          <div className="code-block">
{`// 제네릭 구조체
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn new(x: T, y: T) -> Point<T> {
        Point { x, y }
    }
}

// 트레이트 정의
trait Summary {
    fn summarize(&self) -> String;
    
    // 기본 구현
    fn read_more(&self) -> String {
        format!("{}에 대해 더 읽어보세요...", self.summarize())
    }
}

// 트레이트 구현
struct Article {
    title: String,
    content: String,
    author: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{} by {}", self.title, self.author)
    }
}

// 트레이트 바운드
fn notify<T: Summary>(item: &T) {
    println!("뉴스: {}", item.summarize());
}

// 여러 트레이트 바운드
fn compare_and_display<T: Summary + std::fmt::Display>(item1: &T, item2: &T) {
    // 구현...
}

// where 절 사용
fn some_function<T, U>(t: &T, u: &U) -> String
where
    T: Summary + Clone,
    U: Summary + std::fmt::Debug,
{
    // 구현...
    String::new()
}`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>에러 처리</h3>
          <div className="code-block">
{`// Result 타입
fn divide(x: f64, y: f64) -> Result<f64, String> {
    if y == 0.0 {
        Err(String::from("0으로 나눌 수 없습니다"))
    } else {
        Ok(x / y)
    }
}

// Result 사용
match divide(10.0, 2.0) {
    Ok(result) => println!("결과: {}", result),
    Err(error) => println!("에러: {}", error),
}

// ? 연산자를 이용한 에러 전파
use std::fs::File;
use std::io::{self, Read};

fn read_file_contents(filename: &str) -> Result<String, io::Error> {
    let mut file = File::open(filename)?;  // 에러가 발생하면 바로 반환
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

// Option 타입
fn find_word(text: &str, word: &str) -> Option<usize> {
    text.find(word)
}

match find_word("hello world", "world") {
    Some(index) => println!("위치: {}", index),
    None => println!("찾을 수 없습니다"),
}

// unwrap_or_else 사용
let result = find_word("hello", "world")
    .unwrap_or_else(|| {
        println!("단어를 찾을 수 없어 기본값을 사용합니다");
        0
    });`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>동시성</h3>
          <div className="code-block">
{`use std::thread;
use std::time::Duration;
use std::sync::{Arc, Mutex, mpsc};

// 기본 스레드
fn basic_threading() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("스레드에서: {}", i);
            thread::sleep(Duration::from_millis(1));
        }
    });
    
    for i in 1..5 {
        println!("메인에서: {}", i);
        thread::sleep(Duration::from_millis(1));
    }
    
    handle.join().unwrap();
}

// 공유 상태
fn shared_state() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    
    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }
    
    for handle in handles {
        handle.join().unwrap();
    }
    
    println!("결과: {}", *counter.lock().unwrap());
}

// 메시지 패싱
fn message_passing() {
    let (tx, rx) = mpsc::channel();
    
    thread::spawn(move || {
        let values = vec![
            String::from("안녕"),
            String::from("하세요"),
            String::from("러스트"),
        ];
        
        for val in values {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });
    
    for received in rx {
        println!("받음: {}", received);
    }
}`}
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">주요 활용 분야</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>시스템 프로그래밍</h4>
              <p>운영체제, 드라이버, 임베디드 시스템 개발</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>웹 백엔드</h4>
              <p>고성능 웹 서버와 API 개발</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>블록체인</h4>
              <p>암호화폐와 블록체인 플랫폼 개발</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>CLI 도구</h4>
              <p>빠르고 안전한 명령줄 도구</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Rust 시작하기</h2>
          <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8', marginTop: '1rem' }}>
            <li>Rust 공식 웹사이트에서 rustup 설치</li>
            <li>The Rust Programming Language 책 읽기</li>
            <li>소유권 시스템 이해하기</li>
            <li>에러 처리 패턴 학습</li>
            <li>Cargo를 이용한 프로젝트 관리</li>
            <li>crates.io에서 라이브러리 활용</li>
            <li>실제 프로젝트를 통한 실습</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RustPage;