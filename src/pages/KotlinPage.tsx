import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const KotlinPage: React.FC = () => {
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
          <h1 className="page-title">🟣 Kotlin</h1>
          <p className="page-subtitle">간결하고 안전한 현대적 프로그래밍 언어</p>
        </div>

        <div className="card">
          <h2 className="card-title">Kotlin이란?</h2>
          <p>
            Kotlin은 JetBrains에서 2011년에 개발을 시작하여 2016년에 정식 출시한 프로그래밍 언어입니다. 
            JVM에서 실행되며 Java와 100% 호환되면서도 더 간결하고 안전한 코드를 작성할 수 있게 해줍니다. 
            2017년 Google이 Android 개발의 공식 언어로 채택하면서 널리 알려지게 되었습니다.
          </p>
        </div>

        <div className="card">
          <h2 className="card-title">주요 특징</h2>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>간결한 문법:</strong> Java보다 적은 코드로 같은 기능 구현</li>
            <li><strong>Null 안전성:</strong> NullPointerException을 컴파일 타임에 방지</li>
            <li><strong>Java 호환성:</strong> 기존 Java 코드와 라이브러리를 그대로 사용</li>
            <li><strong>함수형 프로그래밍:</strong> 고차 함수, 람다식 등 함수형 기능 지원</li>
            <li><strong>멀티플랫폼:</strong> JVM, Android, JavaScript, Native 등 다양한 플랫폼 지원</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="card-title">기본 문법</h2>
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>변수와 타입</h3>
          <div className="code-block">
{`// 변수 선언
val readOnly = "읽기 전용"        // 불변 (immutable)
var mutable = "변경 가능"         // 가변 (mutable)

// 타입 추론
val number = 42                   // Int
val decimal = 3.14               // Double
val text = "Kotlin"              // String
val isTrue = true                // Boolean

// 명시적 타입 선언
val explicitInt: Int = 100
val explicitString: String = "Hello"

// Null 안전성
val nonNull: String = "절대 null이 될 수 없음"
val nullable: String? = null     // null이 될 수 있음

// 안전한 호출
val length = nullable?.length    // nullable이 null이면 null 반환

// Elvis 연산자
val lengthOrZero = nullable?.length ?: 0

// 스마트 캐스팅
if (nullable != null) {
    println(nullable.length)     // 자동으로 String으로 캐스팅됨
}`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>함수</h3>
          <div className="code-block">
{`// 기본 함수
fun greet(name: String): String {
    return "안녕하세요, \$name님!"
}

// 표현식 함수
fun add(a: Int, b: Int) = a + b

// 기본값 매개변수
fun power(base: Int, exponent: Int = 2) = Math.pow(base.toDouble(), exponent.toDouble()).toInt()

// 가변 인자
fun sum(vararg numbers: Int): Int {
    return numbers.sum()
}

// 고차 함수
fun calculate(x: Int, y: Int, operation: (Int, Int) -> Int): Int {
    return operation(x, y)
}

// 람다 표현식
val multiply = { a: Int, b: Int -> a * b }
val result = calculate(4, 5, multiply)

// 확장 함수
fun String.removeSpaces(): String {
    return this.replace(" ", "")
}

val text = "Hello World"
println(text.removeSpaces()) // "HelloWorld"

// 중위 함수
infix fun Int.times(str: String) = str.repeat(this)
val result2 = 3 times "Hello" // "HelloHelloHello"`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>클래스와 객체</h3>
          <div className="code-block">
{`// 기본 클래스
class Person(val name: String, var age: Int) {
    fun introduce() = "안녕하세요, 저는 \$name이고 \$age살입니다."
    
    fun haveBirthday() {
        age++
    }
}

// 데이터 클래스
data class User(val id: Int, val name: String, val email: String)

val user1 = User(1, "김코틀린", "kotlin@example.com")
val user2 = user1.copy(name = "박코틀린")  // copy 함수 자동 생성

// 열거형 클래스
enum class Color(val rgb: Int) {
    RED(0xFF0000),
    GREEN(0x00FF00),
    BLUE(0x0000FF)
}

// 봉인 클래스 (sealed class)
sealed class Result
data class Success(val data: String) : Result()
data class Error(val exception: Throwable) : Result()

fun handleResult(result: Result) = when (result) {
    is Success -> "데이터: \${result.data}"
    is Error -> "에러: \${result.exception.message}"
}

// 객체 선언 (싱글톤)
object DatabaseManager {
    fun connect() = "데이터베이스에 연결됨"
}

// 컴패니언 객체
class MathUtils {
    companion object {
        fun square(x: Int) = x * x
        const val PI = 3.14159
    }
}`}
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">고급 기능</h2>
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>컬렉션과 고차 함수</h3>
          <div className="code-block">
{`// 리스트
val numbers = listOf(1, 2, 3, 4, 5)
val mutableNumbers = mutableListOf(1, 2, 3)

// 맵
val userMap = mapOf(
    "alice" to "Alice Johnson",
    "bob" to "Bob Smith"
)

// 컬렉션 고차 함수
val doubled = numbers.map { it * 2 }
val evens = numbers.filter { it % 2 == 0 }
val sum = numbers.reduce { acc, n -> acc + n }
val total = numbers.fold(100) { acc, n -> acc + n }

// 체이닝
val result = numbers
    .filter { it % 2 == 0 }
    .map { it * it }
    .sum()

// 그룹화
data class Person(val name: String, val age: Int)
val people = listOf(
    Person("Alice", 25),
    Person("Bob", 30),
    Person("Charlie", 25)
)

val groupedByAge = people.groupBy { it.age }
// {25=[Person(name=Alice, age=25), Person(name=Charlie, age=25)], 30=[Person(name=Bob, age=30)]}`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>코루틴 (Coroutines)</h3>
          <div className="code-block">
{`import kotlinx.coroutines.*

// 기본 코루틴
fun main() = runBlocking {
    launch {
        delay(1000L)
        println("World!")
    }
    println("Hello,")
}

// 비동기 함수
suspend fun fetchUserData(userId: Int): String {
    delay(1000) // 네트워크 요청 시뮬레이션
    return "User data for \$userId"
}

// async를 이용한 병렬 처리
suspend fun loadUserProfile(userId: Int) = coroutineScope {
    val userData = async { fetchUserData(userId) }
    val userPosts = async { fetchUserPosts(userId) }
    
    UserProfile(
        data = userData.await(),
        posts = userPosts.await()
    )
}

// Flow를 이용한 비동기 스트림
fun numbers(): Flow<Int> = flow {
    for (i in 1..5) {
        delay(1000)
        emit(i)
    }
}

// Flow 사용
fun main() = runBlocking {
    numbers()
        .map { it * it }
        .filter { it % 2 == 0 }
        .collect { println(it) }
}`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>DSL (Domain Specific Language)</h3>
          <div className="code-block">
{`// HTML DSL 예제
class HTML {
    fun body(init: Body.() -> Unit): Body {
        val body = Body()
        body.init()
        return body
    }
}

class Body {
    fun h1(text: String) = println("<h1>\$text</h1>")
    fun p(text: String) = println("<p>\$text</p>")
}

fun html(init: HTML.() -> Unit): HTML {
    val html = HTML()
    html.init()
    return html
}

// 사용
html {
    body {
        h1("Kotlin DSL")
        p("DSL을 이용하면 읽기 쉬운 코드를 작성할 수 있습니다.")
    }
}

// 빌더 패턴 DSL
class Person {
    var name: String = ""
    var age: Int = 0
    var email: String = ""
}

fun person(init: Person.() -> Unit): Person {
    val person = Person()
    person.init()
    return person
}

val person = person {
    name = "김코틀린"
    age = 30
    email = "kotlin@example.com"
}`}
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">주요 활용 분야</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>Android 개발</h4>
              <p>구글 공식 Android 개발 언어</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>서버 사이드</h4>
              <p>Spring Framework를 이용한 백엔드 개발</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>멀티플랫폼</h4>
              <p>Kotlin Multiplatform을 이용한 크로스 플랫폼 개발</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>데스크톱 앱</h4>
              <p>Compose Desktop을 이용한 데스크톱 애플리케이션</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Kotlin 시작하기</h2>
          <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8', marginTop: '1rem' }}>
            <li>IntelliJ IDEA 또는 Android Studio 설치</li>
            <li>Kotlin 기본 문법 학습</li>
            <li>Java와의 상호 운용성 이해</li>
            <li>Null 안전성과 스마트 캐스팅 활용</li>
            <li>컬렉션과 고차 함수 마스터</li>
            <li>코루틴을 이용한 비동기 프로그래밍</li>
            <li>플랫폼별 특화 기능 학습 (Android, 서버 등)</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default KotlinPage;