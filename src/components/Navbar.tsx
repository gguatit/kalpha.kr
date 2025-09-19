import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, User, Code } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={navStyles}>
      <div style={containerStyles}>
        <Link to="/" style={logoStyles}>
          <Code size={24} />
          <span>kalpha.kr</span>
        </Link>
        
        {user && (
          <div style={navLinksStyles}>
            <Link to="/python" style={linkStyles}>Python</Link>
            <Link to="/javascript" style={linkStyles}>JavaScript</Link>
            <Link to="/typescript" style={linkStyles}>TypeScript</Link>
            <Link to="/kotlin" style={linkStyles}>Kotlin</Link>
            <Link to="/rust" style={linkStyles}>Rust</Link>
          </div>
        )}
        
        <div style={userSectionStyles}>
          {user ? (
            <>
              <span style={userNameStyles}>
                <User size={16} />
                {user.name}
              </span>
              <button onClick={logout} style={logoutButtonStyles}>
                <LogOut size={16} />
                로그아웃
              </button>
            </>
          ) : (
            <div>
              <Link to="/login" style={authLinkStyles}>로그인</Link>
              <Link to="/signup" style={authLinkStyles}>회원가입</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const navStyles: React.CSSProperties = {
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  height: '60px',
};

const containerStyles: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
};

const logoStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#007bff',
  textDecoration: 'none',
};

const navLinksStyles: React.CSSProperties = {
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',
};

const linkStyles: React.CSSProperties = {
  color: '#333',
  textDecoration: 'none',
  fontWeight: '500',
  padding: '8px 16px',
  borderRadius: '6px',
  transition: 'background-color 0.2s ease',
};

const userSectionStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const userNameStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: '#666',
  fontSize: '0.9rem',
};

const logoutButtonStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  background: 'none',
  border: 'none',
  color: '#666',
  cursor: 'pointer',
  fontSize: '0.9rem',
  padding: '8px 12px',
  borderRadius: '6px',
  transition: 'background-color 0.2s ease',
};

const authLinkStyles: React.CSSProperties = {
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: '500',
  padding: '8px 16px',
  margin: '0 4px',
  borderRadius: '6px',
  transition: 'background-color 0.2s ease',
};

export default Navbar;