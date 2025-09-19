import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Code2, BookOpen } from 'lucide-react';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  const languages = [
    {
      name: 'Python',
      path: '/python',
      icon: '🐍',
      description: '간단하고 강력한 프로그래밍 언어로 데이터 과학, 웹 개발, AI에 널리 사용됩니다.'
    },
    {
      name: 'JavaScript',
      path: '/javascript',
      icon: '⚡',
      description: '웹 개발의 핵심 언어로 프론트엔드와 백엔드 모두에서 사용됩니다.'
    },
    {
      name: 'TypeScript',
      path: '/typescript',
      icon: '🔷',
      description: 'JavaScript에 타입 안정성을 추가한 언어로 대규모 애플리케이션 개발에 적합합니다.'
    },
    {
      name: 'Kotlin',
      path: '/kotlin',
      icon: '🟣',
      description: 'JVM에서 실행되는 현대적인 언어로 Android 개발과 서버 사이드 개발에 사용됩니다.'
    },
    {
      name: 'Rust',
      path: '/rust',
      icon: '🦀',
      description: '메모리 안전성과 성능을 모두 만족하는 시스템 프로그래밍 언어입니다.'
    }
  ];

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">
            <Code2 size={40} style={{ marginRight: '12px' }} />
            안녕하세요, {user?.name}님!
          </h1>
          <p className="page-subtitle">
            <BookOpen size={20} style={{ marginRight: '8px' }} />
            프로그래밍 언어를 학습하고 고급 기능들을 탐험해보세요
          </p>
        </div>

        <div className="language-grid">
          {languages.map((language) => (
            <Link 
              key={language.name} 
              to={language.path} 
              className="language-card"
            >
              <div className="language-icon">{language.icon}</div>
              <h3 className="language-name">{language.name}</h3>
              <p className="language-description">{language.description}</p>
            </Link>
          ))}
        </div>

        <div className="card" style={{ marginTop: '3rem' }}>
          <h2 className="card-title">학습 가이드</h2>
          <p style={{ marginBottom: '1rem' }}>
            각 프로그래밍 언어 페이지에서는 다음과 같은 내용을 학습할 수 있습니다:
          </p>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>언어의 특징과 역사</li>
            <li>기본 문법과 핵심 개념</li>
            <li>고급 기능과 패턴</li>
            <li>실제 코드 예제</li>
            <li>실무에서의 활용 방법</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;