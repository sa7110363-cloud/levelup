import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  RefreshCw,
  Users,
  Bot,
  MessageCircle,
  User,
  LogOut
} from 'lucide-react'
import './Sidebar.css'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', label: '대시보드', icon: LayoutDashboard },
    { path: '/content', label: '콘텐츠 관리', icon: FileText },
    { path: '/order-payment', label: '주문-결제', icon: ShoppingCart },
    { path: '/refund', label: '환불 관리', icon: RefreshCw },
    { path: '/users', label: '사용자 관리', icon: Users },
    { path: '/ai-assistant', label: 'AI 어시스턴트', icon: Bot },
    { path: '/notice', label: '공지사항-FAQ 관리', icon: MessageCircle },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">
          <img 
            src="/logo.png" 
            alt="LEVEL-UP" 
            className="logo-image"
            onError={(e) => {
              // 이미지 로드 실패 시 기존 CSS 로고로 폴백
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const fallback = target.nextElementSibling as HTMLElement
              if (fallback) fallback.style.display = 'flex'
            }}
          />
          <span className="logo-fallback" style={{ display: 'none' }}>
            L
            <span className="logo-gradient-bars">
              <span className="logo-bar logo-bar-1"></span>
              <span className="logo-bar logo-bar-2"></span>
              <span className="logo-bar logo-bar-3"></span>
            </span>
            VEL-UP
          </span>
        </h1>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon
          let isActive = false
          
          if (item.path === '/dashboard') {
            isActive = location.pathname === '/' || location.pathname === '/dashboard'
          } else if (item.path === '/order-payment') {
            // 주문-결제 메뉴는 /order-payment로 시작하는 모든 경로에서 활성화
            isActive = location.pathname === item.path || location.pathname.startsWith('/order-payment/')
          } else if (item.path === '/users') {
            // 사용자 관리 메뉴는 /users로 시작하는 모든 경로에서 활성화
            isActive = location.pathname === item.path || location.pathname.startsWith('/users/')
          } else {
            isActive = location.pathname === item.path
          }
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="admin-info">
          <User size={20} />
          <div>
            <div className="admin-label">관리자</div>
            <div className="admin-email">admin@example.com</div>
          </div>
        </div>
        <button className="logout-button" onClick={() => {
          // 로그아웃 로직 추가 가능
          if (confirm('로그아웃 하시겠습니까?')) {
            // 로그아웃 처리
            console.log('로그아웃')
          }
        }}>
          <LogOut size={18} />
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

