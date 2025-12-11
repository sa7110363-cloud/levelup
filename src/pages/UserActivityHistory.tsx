import { useParams, useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  FileText,
  LogIn,
  Star,
  CheckCircle2
} from 'lucide-react'
import './UserActivityHistory.css'

const UserActivityHistory = () => {
  const { userId: _userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()

  // 실제로는 userId로 데이터를 가져와야 하지만, 예시 데이터 사용
  const userData = {
    id: 1,
    name: '김승환',
    email: 'sa71103@naver.com'
  }

  const activities = [
    {
      id: 1,
      type: 'purchase',
      title: '수학 강의 템플릿 마스터 클래스 구매',
      details: '₩89,000',
      timestamp: '2025-11-17 15:51:23',
      icon: FileText,
      iconColor: '#3b82f6'
    },
    {
      id: 2,
      type: 'login',
      title: '로그인',
      details: 'IP: 123.456.789.012',
      timestamp: '2025-11-17 15:30:11',
      icon: LogIn,
      iconColor: '#10b981'
    },
    {
      id: 3,
      type: 'review',
      title: 'ChatGPT 심화 과정에 리뷰 작성',
      details: '내용: 너무 쉽고 재밌어요',
      rating: '평점: 5/5',
      timestamp: '2025-11-16 16:31:34',
      icon: Star,
      iconColor: '#f59e0b'
    },
    {
      id: 4,
      type: 'completion',
      title: '미리캔버스 활용 방법 강의 완료',
      details: '진도율: 100%',
      timestamp: '2025-11-16 11:23:43',
      icon: CheckCircle2,
      iconColor: '#10b981'
    }
  ]

  return (
    <div className="activity-history">
      <div className="activity-header">
        <button className="back-button" onClick={() => navigate('/users')}>
          ← 목록으로
        </button>
        <div>
          <h1 className="activity-title">사용자 관리</h1>
          <p className="activity-subtitle">사용자 정보 및 활동 관리</p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="activity-tabs">
        <button className="tab-button active">사용자 목록</button>
        <button className="tab-button">계정 제재</button>
        <button className="tab-button">정산 계좌</button>
        <button className="tab-button">권한 관리</button>
      </div>

      {/* 활동 이력 섹션 */}
      <div className="activity-history-section">
        <div className="activity-section-header">
          <h2 className="activity-section-title">사용자 활동 이력</h2>
          <div className="activity-filters">
            <button className="user-select-button">
              {userData.name}({userData.email})
              <ChevronDown size={16} />
            </button>
            <button className="activity-type-button">
              전체 활동
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <div className="activity-list">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon-wrapper">
                  <div
                    className="activity-icon"
                    style={{ backgroundColor: `${activity.iconColor}20`, color: activity.iconColor }}
                  >
                    <Icon size={20} />
                  </div>
                </div>
                <div className="activity-content">
                  <div className="activity-title-row">
                    <span className="activity-item-title">{activity.title}</span>
                  </div>
                  <div className="activity-details">
                    <span className="activity-detail-text">{activity.details}</span>
                    {activity.rating && (
                      <>
                        <span className="detail-separator">·</span>
                        <span className="activity-rating">{activity.rating}</span>
                      </>
                    )}
                  </div>
                  <div className="activity-timestamp">{activity.timestamp}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default UserActivityHistory



