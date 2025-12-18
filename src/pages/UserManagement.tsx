import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Eye,
  History,
  Ban,
  CheckCircle,
  Calendar,
  Plus,
  Check,
  Edit,
  ChevronDown,
  Save
} from 'lucide-react'
import './UserManagement.css'

const UserManagement = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'list' | 'sanctions' | 'account' | 'permission'>('list')
  const [userFilter] = useState('전체 사용자')
  const [openDropdowns, setOpenDropdowns] = useState<Record<number, boolean>>({})
  const [adminCategories, setAdminCategories] = useState<Record<number, string>>({
    1: '총관리자',
    2: '총관리자',
    3: '운영관리자',
    4: '운영관리자',
    5: '정산관리자'
  })
  const [permissions, setPermissions] = useState<Record<number, Record<string, boolean>>>({
    1: {
      content: true,
      order: true,
      refund: true,
      settlement: true,
      user: true,
      ai: true
    },
    2: {
      content: true,
      order: true,
      refund: true,
      settlement: true,
      user: true,
      ai: true
    },
    3: {
      content: false,
      order: false,
      refund: false,
      settlement: false,
      user: false,
      ai: false
    },
    4: {
      content: false,
      order: false,
      refund: false,
      settlement: false,
      user: false,
      ai: false
    },
    5: {
      content: false,
      order: false,
      refund: false,
      settlement: false,
      user: false,
      ai: false
    }
  })

  const instructors = [
    {
      id: 1,
      name: '김강사',
      email: 'kim@example.com',
      bankName: '국민은행',
      accountNumber: '123-456-******78',
      accountHolder: '김강사'
    },
    {
      id: 2,
      name: '이강사',
      email: 'lee@example.com',
      bankName: '신한은행',
      accountNumber: '456-789-******12',
      accountHolder: '이강사'
    },
    {
      id: 3,
      name: '박강사',
      email: 'park@example.com',
      bankName: '우리은행',
      accountNumber: '789-012-******34',
      accountHolder: '박강사'
    }
  ]

  const adminCategoryOptions = ['운영관리자', '정산관리자']

  const administrators = [
    {
      id: 1,
      name: '관리자 A',
      email: 'admin1@example.com'
    },
    {
      id: 2,
      name: '관리자 B',
      email: 'admin2@example.com'
    },
    {
      id: 3,
      name: '관리자 C',
      email: 'admin3@example.com'
    },
    {
      id: 4,
      name: '관리자 D',
      email: 'admin4@example.com'
    },
    {
      id: 5,
      name: '관리자 E',
      email: 'admin5@example.com'
    }
  ]

  const toggleDropdown = (adminId: number) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [adminId]: !prev[adminId]
    }))
  }

  const handleCategoryChange = (adminId: number, newCategory: string) => {
    setAdminCategories(prev => ({
      ...prev,
      [adminId]: newCategory
    }))
    setOpenDropdowns(prev => ({
      ...prev,
      [adminId]: false
    }))
  }

  const permissionCategories = [
    { key: 'content', label: '콘텐츠 관리' },
    { key: 'order', label: '주문/결제' },
    { key: 'refund', label: '환불' },
    { key: 'settlement', label: '정산' },
    { key: 'user', label: '사용자 관리' },
    { key: 'ai', label: 'AI 관리' }
  ]

  const handlePermissionChange = (adminId: number, permissionKey: string) => {
    setPermissions(prev => ({
      ...prev,
      [adminId]: {
        ...prev[adminId],
        [permissionKey]: !prev[adminId][permissionKey]
      }
    }))
  }

  const handleSavePermissions = () => {
    // 권한 저장 로직
    console.log('권한 설정 저장:', permissions)
    alert('권한 설정이 저장되었습니다.')
  }

  const users = [
    {
      id: 1,
      name: '홍길동',
      role: '수강생',
      status: '활성',
      email: 'hong@example.com',
      phone: '010-1234-5678',
      joinDate: '2024-01-01',
      lastLogin: '2024-01-15 14:30',
      suspensionReason: null,
      suspensionReleaseDate: null,
      stats: {
        totalOrders: 12,
        totalAmount: 1245000,
        coursesInProgress: 8
      }
    },
    {
      id: 2,
      name: '김강사',
      role: '강사',
      status: '활성',
      email: 'instructor@example.com',
      phone: '010-2345-6789',
      joinDate: '2023-11-15',
      lastLogin: '2024-01-15 15:20',
      suspensionReason: null,
      suspensionReleaseDate: null,
      stats: {
        lectures: 5,
        totalAmount: 2450000,
        students: 234
      }
    },
    {
      id: 3,
      name: '이영희',
      role: '수강생',
      status: '정지',
      email: 'lee@example.com',
      phone: '010-3456-7890',
      joinDate: '2023-12-20',
      lastLogin: '2024-01-10 10:15',
      suspensionReason: '부적절한 댓글 작성',
      suspensionReleaseDate: '2024-01-25',
      stats: {
        totalOrders: 3,
        totalAmount: 450000,
        coursesInProgress: 3
      }
    }
  ]

  // 개인정보 마스킹 함수
  const maskName = (name: string) => {
    if (name.length <= 1) return name
    return name[0] + '*'.repeat(name.length - 1)
  }

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@')
    if (!domain) return email
    if (localPart.length <= 2) {
      return '*'.repeat(localPart.length) + '@' + domain
    }
    const visibleLength = Math.floor(localPart.length / 3)
    return localPart.substring(0, visibleLength) + '*'.repeat(localPart.length - visibleLength) + '@' + domain
  }

  const maskPhone = (phone: string) => {
    // 010-1234-5678 형식
    const parts = phone.split('-')
    if (parts.length === 3) {
      return `${parts[0]}-****-${parts[2]}`
    }
    // 다른 형식도 처리
    if (phone.length >= 8) {
      return phone.substring(0, 3) + '-****-' + phone.substring(phone.length - 4)
    }
    return phone
  }

  const getRoleClass = (role: string) => {
    return role === '강사' ? 'role-instructor' : 'role-student'
  }

  const getStatusClass = (status: string) => {
    return status === '활성' ? 'status-active' : 'status-suspended'
  }

  return (
    <div className="user-management">
      <div className="user-header">
        <div>
          <h1 className="user-title">사용자 관리</h1>
          <p className="user-subtitle">사용자 정보 및 활동 관리</p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="user-tabs">
        <button
          className={`tab-button ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          사용자 목록
        </button>
        <button
          className={`tab-button ${activeTab === 'sanctions' ? 'active' : ''}`}
          onClick={() => setActiveTab('sanctions')}
        >
          계정 제재
        </button>
        <button
          className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          정산 계좌
        </button>
        <button
          className={`tab-button ${activeTab === 'permission' ? 'active' : ''}`}
          onClick={() => setActiveTab('permission')}
        >
          권한 관리
        </button>
      </div>

      {activeTab === 'list' && (
        <>
          {/* 검색 및 필터 */}
          <div className="user-filters">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="이름, 이메일 검색..."
                className="search-input"
              />
            </div>
            <button className="user-filter-button">
              {userFilter}
            </button>
          </div>

          {/* 사용자 목록 */}
          <div className="user-list">
            <h2 className="user-list-title">전체 사용자</h2>
            <div className="user-cards">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="user-card-main">
                    <div className="user-card-left">
                      <div className="user-header-info">
                        <span className="user-name">{maskName(user.name)}</span>
                        <span className={`role-tag ${getRoleClass(user.role)}`}>
                          {user.role}
                        </span>
                        <span className={`status-tag ${getStatusClass(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                      <div className="user-contact-info">
                        <span className="contact-item">이메일: {maskEmail(user.email)}</span>
                        <span className="contact-separator">·</span>
                        <span className="contact-item">전화번호: {maskPhone(user.phone)}</span>
                      </div>
                      <div className="user-meta-info">
                        <span>가입일: {user.joinDate}</span>
                        <span className="meta-separator">·</span>
                        <span>마지막 로그인: {user.lastLogin}</span>
                      </div>
                      {user.suspensionReason && (
                        <div className="suspension-banner">
                          <div className="suspension-reason">
                            정지 사유: {user.suspensionReason}
                          </div>
                          <div className="suspension-release">
                            정지 해제일: {user.suspensionReleaseDate}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="user-card-right">
                      <div className="user-stats">
                        {user.role === '수강생' ? (
                          <>
                            <div className="stat-row">
                              <span className="stat-label">총 주문:</span>
                              <span className="stat-value">{user.stats.totalOrders}건</span>
                            </div>
                            <div className="stat-row">
                              <span className="stat-label">금액:</span>
                              <span className="stat-value">₩{user.stats.totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="stat-row">
                              <span className="stat-label">수강 중:</span>
                              <span className="stat-value">{user.stats.coursesInProgress}개</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="stat-row">
                              <span className="stat-label">강의:</span>
                              <span className="stat-value">{user.stats.lectures}개</span>
                            </div>
                            <div className="stat-row">
                              <span className="stat-label">금액:</span>
                              <span className="stat-value">₩{user.stats.totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="stat-row">
                              <span className="stat-label">수강생:</span>
                              <span className="stat-value">{user.stats.students}명</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="user-actions">
                    <button className="action-button detail">
                      <Eye size={16} />
                      상세 보기
                    </button>
                    <button 
                      className="action-button history"
                      onClick={() => navigate(`/users/${user.id}/activity`)}
                    >
                      <History size={16} />
                      활동 이력
                    </button>
                    {user.status === '활성' ? (
                      <button className="action-button suspend">
                        <Ban size={16} />
                        계정 정지
                      </button>
                    ) : (
                      <button className="action-button release">
                        <CheckCircle size={16} />
                        정지 해제
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'sanctions' && (
        <div className="sanctions-management">
          <div className="sanctions-card">
            <h2 className="sanctions-title">계정 제재 관리</h2>
            <div className="suspended-users-list">
              {users
                .filter(user => user.status === '정지')
                .map((user) => (
                  <div key={user.id} className="suspended-user-card">
                    <div className="suspended-user-header">
                      <div className="suspended-user-info">
                        <div className="suspended-user-name-row">
                          <span className="suspended-user-name">{maskName(user.name)}</span>
                          <span className="suspended-status-tag">정지</span>
                        </div>
                        <div className="suspended-user-email">{maskEmail(user.email)}</div>
                        <div className="suspended-reason">
                          정지 사유: {user.suspensionReason}
                        </div>
                        <div className="suspended-release-date">
                          정지 해제일: {user.suspensionReleaseDate}
                        </div>
                      </div>
                    </div>
                    <div className="suspended-user-actions">
                      <button className="action-button detail">
                        <Eye size={16} />
                        상세 보기
                      </button>
                      <button className="action-button release">
                        <CheckCircle size={16} />
                        정지 해제
                      </button>
                      <button className="action-button extend">
                        <Calendar size={16} />
                        정지 기간 연장
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <button className="add-sanction-button">
              <Plus size={20} />
              새 제재 추가
            </button>
          </div>
        </div>
      )}

      {activeTab === 'account' && (
        <div className="settlement-account-management">
          <div className="account-filters">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="강사명 검색..."
                className="search-input"
              />
            </div>
          </div>
          <div className="account-cards">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="account-card">
                <h2 className="account-card-title">정산 계좌 정보</h2>
                <div className="account-instructor-info">
                  <span className="instructor-name">{instructor.name}</span>
                  <span className="instructor-email">{instructor.email}</span>
                </div>
                <div className="account-details-grid">
                  <div className="account-detail-item">
                    <span className="account-detail-label">은행명</span>
                    <span className="account-detail-value">{instructor.bankName}</span>
                  </div>
                  <div className="account-detail-item">
                    <span className="account-detail-label">계좌번호</span>
                    <span className="account-detail-value">{instructor.accountNumber}</span>
                  </div>
                  <div className="account-detail-item">
                    <span className="account-detail-label">예금주</span>
                    <span className="account-detail-value">{instructor.accountHolder}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'permission' && (
        <div className="permission-management">
          <div className="permission-header">
            <h2 className="permission-title">권한 관리</h2>
          </div>
          <div className="permission-table-container">
            <table className="permission-table">
              <thead>
                <tr>
                  <th>분류</th>
                  <th>이름</th>
                  <th>이메일</th>
                  {permissionCategories.map((category) => (
                    <th key={category.key}>{category.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {administrators.map((admin) => (
                  <tr key={admin.id}>
                    <td>
                      <div className="category-dropdown-wrapper">
                        <button 
                          className="category-dropdown"
                          onClick={() => toggleDropdown(admin.id)}
                          disabled={adminCategories[admin.id] === '총관리자'}
                        >
                          {adminCategories[admin.id]}
                          {adminCategories[admin.id] !== '총관리자' && (
                            <ChevronDown size={14} />
                          )}
                        </button>
                        {openDropdowns[admin.id] && adminCategories[admin.id] !== '총관리자' && (
                          <div className="category-dropdown-menu">
                            {adminCategoryOptions.map((category) => (
                              <button
                                key={category}
                                className={`category-dropdown-item ${
                                  adminCategories[admin.id] === category ? 'active' : ''
                                }`}
                                onClick={() => handleCategoryChange(admin.id, category)}
                              >
                                {category}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    {permissionCategories.map((category) => (
                      <td key={category.key}>
                        <label className="permission-checkbox">
                          <input
                            type="checkbox"
                            checked={permissions[admin.id]?.[category.key] || false}
                            onChange={() => handlePermissionChange(admin.id, category.key)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="permission-actions">
            <button className="save-permissions-button" onClick={handleSavePermissions}>
              <Save size={18} />
              권한 설정 저장
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement

