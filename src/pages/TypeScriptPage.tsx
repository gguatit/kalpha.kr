import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TypeScriptPage: React.FC = () => {
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
          <h1 className="page-title">🔷 TypeScript</h1>
          <p className="page-subtitle">타입 안전성을 갖춘 JavaScript의 상위 집합</p>
        </div>

        <div className="card">
          <h2 className="card-title">TypeScript란?</h2>
          <p>
            TypeScript는 Microsoft에서 2012년에 개발한 프로그래밍 언어로, 
            JavaScript에 정적 타입 시스템을 추가한 언어입니다. 
            JavaScript의 모든 기능을 포함하면서 컴파일 타임에 타입 검사를 수행하여 
            더 안전하고 유지보수하기 쉬운 코드를 작성할 수 있게 해줍니다.
          </p>
        </div>

        <div className="card">
          <h2 className="card-title">주요 특징</h2>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>정적 타입 시스템:</strong> 컴파일 타임에 타입 오류를 발견</li>
            <li><strong>JavaScript 호환성:</strong> 기존 JavaScript 코드를 그대로 사용 가능</li>
            <li><strong>강력한 IDE 지원:</strong> 자동완성, 리팩토링, 에러 검출 등</li>
            <li><strong>최신 ECMAScript 지원:</strong> 최신 JavaScript 기능을 미리 사용 가능</li>
            <li><strong>점진적 도입:</strong> 기존 프로젝트에 단계적으로 적용 가능</li>
          </ul>
        </div>

        <div className="card">
          <h2 className="card-title">기본 타입 시스템</h2>
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>기본 타입</h3>
          <div className="code-block">
{`// 기본 타입 선언
let isDone: boolean = false;
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let color: string = "blue";
let fullName: string = \`Bob Bobbington\`;

// 배열
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// 튜플
let x: [string, number];
x = ["hello", 10]; // 정상
// x = [10, "hello"]; // 오류

// 열거형 (Enum)
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>함수와 타입</h3>
          <div className="code-block">
{`// 함수 타입 선언
function add(x: number, y: number): number {
    return x + y;
}

// 화살표 함수
const multiply = (a: number, b: number): number => a * b;

// 선택적 매개변수
function greet(firstName: string, lastName?: string): string {
    if (lastName) {
        return \`Hello, \${firstName} \${lastName}\`;
    }
    return \`Hello, \${firstName}\`;
}

// 기본값 매개변수
function power(base: number, exponent: number = 2): number {
    return Math.pow(base, exponent);
}

// 나머지 매개변수
function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

// 함수 오버로드
function parseValue(x: string): string[];
function parseValue(x: number): number;
function parseValue(x: string | number): string[] | number {
    if (typeof x === 'string') {
        return x.split(',');
    }
    return x;
}`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>인터페이스와 타입</h3>
          <div className="code-block">
{`// 인터페이스 정의
interface User {
    readonly id: number;
    name: string;
    email?: string;  // 선택적 속성
    age: number;
    greet(): string;
}

// 인터페이스 구현
class Student implements User {
    constructor(
        public readonly id: number,
        public name: string,
        public age: number,
        public grade: number
    ) {}
    
    greet(): string {
        return \`안녕하세요, 저는 \${this.name}입니다.\`;
    }
}

// 타입 별칭
type Point = {
    x: number;
    y: number;
};

type UserAction = 'create' | 'read' | 'update' | 'delete';

// 제네릭 인터페이스
interface Repository<T> {
    findById(id: number): T | null;
    save(entity: T): T;
    delete(id: number): void;
}`}
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">고급 타입 시스템</h2>
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>제네릭</h3>
          <div className="code-block">
{`// 제네릭 함수
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString");
let output2 = identity("myString"); // 타입 추론

// 제네릭 클래스
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
    
    constructor(zero: T, addFn: (x: T, y: T) => T) {
        this.zeroValue = zero;
        this.add = addFn;
    }
}

let myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);

// 제네릭 제약 조건
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // 이제 .length 속성이 있다는 것을 알 수 있음
    return arg;
}`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>유니온과 교차 타입</h3>
          <div className="code-block">
{`// 유니온 타입
type StringOrNumber = string | number;

function format(value: StringOrNumber): string {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    return value.toString();
}

// 교차 타입
interface Person {
    name: string;
}

interface Employee {
    employeeId: number;
}

type PersonEmployee = Person & Employee;

const worker: PersonEmployee = {
    name: "John",
    employeeId: 123
};

// 조건부 타입
type ApiResponse<T> = T extends string 
    ? { message: T } 
    : { data: T };

type MessageResponse = ApiResponse<string>;  // { message: string }
type DataResponse = ApiResponse<number[]>;   // { data: number[] }`}
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>유틸리티 타입</h3>
          <div className="code-block">
{`interface Todo {
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}

// Partial - 모든 속성을 선택적으로 만듦
type PartialTodo = Partial<Todo>;

// Required - 모든 속성을 필수로 만듦
type RequiredTodo = Required<Todo>;

// Pick - 특정 속성만 선택
type TodoPreview = Pick<Todo, "title" | "completed">;

// Omit - 특정 속성 제외
type TodoInfo = Omit<Todo, "completed" | "createdAt">;

// Record - 키-값 쌍의 타입 생성
type TodoStatus = "pending" | "completed" | "cancelled";
type TodoStatusRecord = Record<TodoStatus, number>;

const statusCount: TodoStatusRecord = {
    pending: 5,
    completed: 10,
    cancelled: 2
};`}
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">실제 사용 예제</h2>
          <div className="code-block">
{`// API 응답 타입 정의
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

// API 서비스 클래스
class UserService {
    async getUser(id: number): Promise<ApiResponse<User>> {
        try {
            const response = await fetch(\`/api/users/\${id}\`);
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return { 
                success: false, 
                error: error instanceof Error ? error.message : "Unknown error" 
            };
        }
    }
    
    async createUser(userData: Omit<User, 'id'>): Promise<ApiResponse<User>> {
        // 구현...
        return { success: true, data: { id: 1, ...userData } };
    }
}

// React 컴포넌트에서 사용
interface UserProfileProps {
    userId: number;
    onUserUpdate?: (user: User) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, onUserUpdate }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const loadUser = async () => {
            const userService = new UserService();
            const response = await userService.getUser(userId);
            
            if (response.success && response.data) {
                setUser(response.data);
            }
            setLoading(false);
        };
        
        loadUser();
    }, [userId]);
    
    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;
    
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
};`}
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">주요 활용 분야</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>대규모 웹 애플리케이션</h4>
              <p>복잡한 프론트엔드 프로젝트의 타입 안전성 확보</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>Node.js 백엔드</h4>
              <p>서버 사이드 개발에서의 타입 안전성</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>라이브러리 개발</h4>
              <p>타입 정의가 포함된 재사용 가능한 라이브러리</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>팀 협업</h4>
              <p>팀 개발에서 코드 품질과 생산성 향상</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">TypeScript 시작하기</h2>
          <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8', marginTop: '1rem' }}>
            <li>TypeScript 컴파일러 설치: <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>npm install -g typescript</code></li>
            <li>tsconfig.json 설정 파일 생성</li>
            <li>기본 타입 시스템 학습</li>
            <li>인터페이스와 클래스 활용</li>
            <li>제네릭과 고급 타입 이해</li>
            <li>기존 JavaScript 프로젝트에 점진적 적용</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TypeScriptPage;