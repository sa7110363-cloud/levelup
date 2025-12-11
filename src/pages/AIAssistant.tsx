import { useState } from 'react'
import {
  Search,
  Clock,
  AlertCircle,
  Eye,
  Sparkles,
  MessageCircle,
  Zap,
  Smile,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  ChevronDown,
  Plus,
  Trash2,
  Save,
  ThumbsUp,
  ThumbsDown,
  CheckCircle
} from 'lucide-react'
import './AIAssistant.css'

const AIAssistant = () => {
  const [activeTab, setActiveTab] = useState<'log' | 'stats' | 'keywords' | 'learning' | 'policy' | 'feedback'>('log')
  const [responseTone, setResponseTone] = useState('전문적')
  const [answerLength, setAnswerLength] = useState('짧게')
  const [systemMessage, setSystemMessage] = useState('당신은 강의 플랫폼의 AI어시스턴트입니다. 학습자들의 질문에 친절하고 정확하게 답변해주세요.')

  const stats = {
    todayQuestions: 245,
    avgResponseTime: '1.2초',
    satisfaction: 92,
    totalConversations: 12345
  }

  const activityHistory = [
    {
      date: '2025-11-18',
      questions: 245,
      avgResponse: '1.2초',
      satisfaction: 92
    },
    {
      date: '2025-11-16',
      questions: 198,
      avgResponse: '1.3초',
      satisfaction: 89
    },
    {
      date: '2025-11-11',
      questions: 223,
      avgResponse: '1.1초',
      satisfaction: 94
    },
    {
      date: '2025-11-10',
      questions: 149,
      avgResponse: '1.4초',
      satisfaction: 92
    }
  ]

  const keywords = [
    {
      id: 1,
      keyword: '프롬프트',
      count: 145,
      trend: 'increase'
    },
    {
      id: 2,
      keyword: '자동화',
      count: 122,
      trend: 'maintain'
    },
    {
      id: 3,
      keyword: 'LLM',
      count: 99,
      trend: 'increase'
    },
    {
      id: 4,
      keyword: 'API',
      count: 42,
      trend: 'decrease'
    },
    {
      id: 5,
      keyword: 'DB',
      count: 27,
      trend: 'maintain'
    }
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increase':
        return <TrendingUp size={14} />
      case 'decrease':
        return <TrendingDown size={14} />
      case 'maintain':
        return <Minus size={14} />
      default:
        return null
    }
  }

  const getTrendClass = (trend: string) => {
    switch (trend) {
      case 'increase':
        return 'trend-increase'
      case 'decrease':
        return 'trend-decrease'
      case 'maintain':
        return 'trend-maintain'
      default:
        return ''
    }
  }

  const getTrendText = (trend: string) => {
    switch (trend) {
      case 'increase':
        return '증가'
      case 'decrease':
        return '감소'
      case 'maintain':
        return '유지'
      default:
        return ''
    }
  }

  const learningData = [
    {
      id: 1,
      title: '노션 마스터 클래스',
      status: '완료',
      lastUpdated: '2025-11-18',
      completed: 45,
      total: 45,
      percentage: 100
    },
    {
      id: 2,
      title: '미리캔버스로 표지 만들기',
      status: '완료',
      lastUpdated: '2025-11-18',
      completed: 67,
      total: 67,
      percentage: 100
    },
    {
      id: 3,
      title: '엑셀 마스터 클래스',
      status: '학습 중',
      lastUpdated: '2025-11-18',
      completed: 28,
      total: 52,
      percentage: 54
    }
  ]

  const [forbiddenWords, setForbiddenWords] = useState([
    {
      id: 1,
      word: '욕설1',
      type: '금지어',
      date: '2025-11-18'
    },
    {
      id: 2,
      word: '욕설1',
      type: '금지어',
      date: null
    },
    {
      id: 3,
      word: '욕설1',
      type: '금지어',
      date: null
    },
    {
      id: 4,
      word: '욕설1',
      type: '금지어',
      date: null
    }
  ])

  const handleDeleteWord = (id: number) => {
    setForbiddenWords(prev => prev.filter(word => word.id !== id))
  }

  const handleSaveSettings = () => {
    console.log('설정 저장:', {
      responseTone,
      answerLength,
      systemMessage
    })
    alert('설정이 저장되었습니다.')
  }

  const feedbackStats = {
    positive: {
      count: 224,
      percentage: 92
    },
    negative: {
      count: 21,
      percentage: 8
    },
    errors: {
      count: 3
    }
  }

  const feedbackReports = [
    {
      id: 1,
      type: 'negative',
      user: '이영희',
      timestamp: '2025-11-18 12:42:22',
      question: '리스트와 튜플의 차이는?',
      reason: '답변이 너무 짧음',
      additionalReason: '더 구체적인 예시가 필요합니다.'
    }
  ]

  const conversations = [
    {
      id: 1,
      user: '홍길동',
      timestamp: '2024-01-15 14:35:22',
      course: '강의: 웹개발 마스터 클레스',
      question: 'React에서 useEffect는 언제 사용하나요?',
      answer: 'useEffect는 컴포넌트가 렌더링될 때 특정 작업을 실행하고 싶을 때 사용합니다...',
      responseTime: '1.2초',
      status: 'positive',
      feedback: null
    },
    {
      id: 2,
      user: '김영희',
      timestamp: '2024-01-15 14:28:15',
      course: '강의: AWS 클라우드 실전 가이드',
      question: 'AWS EC2 인스턴스 타입 선택 기준이 뭔가요?',
      answer: 'EC2 인스턴스 타입은 애플리케이션의 요구사항에 따라 선택해야 합니다...',
      responseTime: '1.5초',
      status: 'positive',
      feedback: null
    },
    {
      id: 3,
      user: '이철수',
      timestamp: '2024-01-15 14:15:33',
      course: '강의: Python 데이터 분석',
      question: 'Python 리스트와 튜플의 차이는?',
      answer: '리스트는 변경 가능(mutable) 자료형이고, 튜플은 변경 불가능(immutable) 자료형입니다...',
      responseTime: '0.9초',
      status: 'negative',
      feedback: '부정 피드백: 답변이 너무 짧음'
    }
  ]

  return (
    <div className="ai-assistant">
      <div className="ai-header">
        <div>
          <h1 className="ai-title">AI 어시스턴트 관리</h1>
          <p className="ai-subtitle">AI 로그, 학습 데이터 및 응답 정책 관리</p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="ai-tabs">
        <button
          className={`tab-button ${activeTab === 'log' ? 'active' : ''}`}
          onClick={() => setActiveTab('log')}
        >
          대화 로그
        </button>
        <button
          className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          사용 통계
        </button>
        <button
          className={`tab-button ${activeTab === 'keywords' ? 'active' : ''}`}
          onClick={() => setActiveTab('keywords')}
        >
          질문 키워드
        </button>
        <button
          className={`tab-button ${activeTab === 'learning' ? 'active' : ''}`}
          onClick={() => setActiveTab('learning')}
        >
          학습 데이터
        </button>
        <button
          className={`tab-button ${activeTab === 'policy' ? 'active' : ''}`}
          onClick={() => setActiveTab('policy')}
        >
          응답 정책
        </button>
        <button
          className={`tab-button ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          피드백/품질
        </button>
      </div>

      {activeTab === 'log' && (
        <>
          {/* 대화 로그 섹션 */}
          <div className="conversation-log-section">
            <h2 className="section-title">AI 대화 로그</h2>
            <div className="log-filters">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="질문 검색..."
                  className="search-input"
                />
              </div>
            </div>
            <div className="conversation-list">
              {conversations.map((conversation) => (
                <div key={conversation.id} className="conversation-card">
                  <div className="conversation-header">
                    <div className="conversation-user-info">
                      <span className="user-name">{conversation.user}</span>
                      <div className="timestamp-info">
                        {conversation.status === 'positive' ? (
                          <Clock size={14} className="status-icon positive" />
                        ) : (
                          <AlertCircle size={14} className="status-icon negative" />
                        )}
                        <span className="timestamp">{conversation.timestamp}</span>
                      </div>
                      <span className="course-name">{conversation.course}</span>
                    </div>
                  </div>
                  <div className="conversation-content">
                    <div className="question-section">
                      <span className="question-label">질문</span>
                      <p className="question-text">{conversation.question}</p>
                    </div>
                    <div className="answer-section">
                      <span className="answer-label">답변</span>
                      <p className="answer-text">{conversation.answer}</p>
                    </div>
                    {conversation.feedback && (
                      <div className="feedback-banner negative">
                        {conversation.feedback}
                      </div>
                    )}
                    <div className="conversation-meta">
                      <span className="response-time">
                        응답 시간: {conversation.responseTime}
                      </span>
                    </div>
                  </div>
                  <div className="conversation-actions">
                    <button className="action-button view-all">
                      <Eye size={16} />
                      전체보기
                    </button>
                    <button className="action-button improve">
                      <Sparkles size={16} />
                      답변 개선
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'stats' && (
        <div className="usage-statistics">
          {/* 통계 카드 */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <MessageCircle size={24} />
              </div>
              <div className="stat-content">
                <h4 className="stat-label">오늘의 질문 수</h4>
                <div className="stat-value">{stats.todayQuestions} 개</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Zap size={24} />
              </div>
              <div className="stat-content">
                <h4 className="stat-label">평균 응답 시간</h4>
                <div className="stat-value">{stats.avgResponseTime}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Smile size={24} />
              </div>
              <div className="stat-content">
                <h4 className="stat-label">만족도</h4>
                <div className="stat-value">{stats.satisfaction}%</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <h4 className="stat-label">총 대화</h4>
                <div className="stat-value">{stats.totalConversations.toLocaleString()} 개</div>
              </div>
            </div>
          </div>

          {/* 사용자 활동 이력 */}
          <div className="activity-history-section">
            <h2 className="section-title">사용자 활동 이력</h2>
            <div className="activity-history-list">
              {activityHistory.map((activity, index) => (
                <div key={index} className="activity-history-item">
                  <div className="activity-date">{activity.date}</div>
                  <div className="activity-stats">
                    <span className="activity-stat">질문 {activity.questions}개</span>
                    <span className="activity-stat">평균 응답 {activity.avgResponse}</span>
                    <span className="activity-stat satisfaction">만족도 {activity.satisfaction}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'keywords' && (
        <div className="question-keywords">
          <h2 className="section-title">인기 질문 키워드</h2>
          <div className="keywords-list">
            {keywords.map((item) => (
              <div key={item.id} className="keyword-card">
                <div className="keyword-rank">{item.id}</div>
                <div className="keyword-content">
                  <div className="keyword-name">{item.keyword}</div>
                  <div className="keyword-stats">
                    <span className="keyword-count">{item.count}회 질문</span>
                    <span className={`keyword-trend ${getTrendClass(item.trend)}`}>
                      {getTrendIcon(item.trend)}
                      {getTrendText(item.trend)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'learning' && (
        <div className="learning-data">
          <div className="learning-header">
            <h2 className="section-title">콘텐츠 학습 데이터</h2>
            <button className="retrain-all-button">
              <RefreshCw size={18} />
              전체 재학습
            </button>
          </div>
          <div className="learning-items-list">
            {learningData.map((item) => (
              <div key={item.id} className="learning-item-card">
                <div className="learning-item-header">
                  <div className="learning-item-title-row">
                    <h3 className="learning-item-title">{item.title}</h3>
                    <span className={`learning-status-tag ${item.status === '완료' ? 'completed' : 'in-progress'}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="learning-item-meta">
                    마지막 업데이트: {item.lastUpdated}
                  </div>
                </div>
                <div className="learning-progress-section">
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="progress-info">
                    <span className="progress-numbers">
                      {item.completed}/{item.total}
                    </span>
                    <span className="progress-percentage">{item.percentage}%</span>
                  </div>
                </div>
                <div className="learning-item-actions">
                  <button className="action-button view-details">
                    <Eye size={16} />
                    상세 보기
                  </button>
                  <button className="action-button retrain">
                    <RefreshCw size={16} />
                    재학습
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'policy' && (
        <div className="response-policy">
          <div className="policy-grid">
            {/* 금지어/민감어 리스트 */}
            <div className="policy-card forbidden-words-card">
              <h2 className="policy-card-title">금지어/민감어 리스트</h2>
              <div className="forbidden-words-list">
                {forbiddenWords.map((word) => (
                  <div key={word.id} className="forbidden-word-item">
                    <div className="word-info">
                      <span className="word-text">{word.word}</span>
                      <span className="word-type">{word.type}</span>
                      {word.date && (
                        <span className="word-date">{word.date}</span>
                      )}
                    </div>
                    <button
                      className="delete-word-button"
                      onClick={() => handleDeleteWord(word.id)}
                    >
                      <Trash2 size={16} />
                      삭제
                    </button>
                  </div>
                ))}
              </div>
              <button className="add-word-button">
                <Plus size={18} />
                단어 추가
              </button>
            </div>

            {/* 응답 톤/가이드 설정 */}
            <div className="policy-card response-settings-card">
              <h2 className="policy-card-title">응답 톤/가이드 설정</h2>
              <div className="settings-form">
                <div className="setting-item">
                  <label className="setting-label">응답톤</label>
                  <button className="setting-dropdown">
                    {responseTone}
                    <ChevronDown size={16} />
                  </button>
                </div>
                <div className="setting-item">
                  <label className="setting-label">답변 길이</label>
                  <button className="setting-dropdown">
                    {answerLength}
                    <ChevronDown size={16} />
                  </button>
                </div>
                <div className="setting-item">
                  <label className="setting-label">시스템 메시지</label>
                  <textarea
                    className="system-message-textarea"
                    value={systemMessage}
                    onChange={(e) => setSystemMessage(e.target.value)}
                    rows={6}
                    placeholder="시스템 메시지를 입력하세요..."
                  />
                </div>
              </div>
              <button className="save-settings-button" onClick={handleSaveSettings}>
                <Save size={18} />
                설정 저장
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="feedback-quality">
          {/* 피드백 통계 */}
          <div className="feedback-stats-grid">
            <div className="feedback-stat-card positive">
              <div className="stat-icon-wrapper">
                <ThumbsUp size={24} className="stat-icon" />
              </div>
              <div className="stat-content">
                <h4 className="stat-label">긍정 피드백</h4>
                <div className="stat-value">
                  {feedbackStats.positive.count}개 ({feedbackStats.positive.percentage}%)
                </div>
              </div>
            </div>
            <div className="feedback-stat-card negative">
              <div className="stat-icon-wrapper">
                <ThumbsDown size={24} className="stat-icon" />
              </div>
              <div className="stat-content">
                <h4 className="stat-label">부정 피드백</h4>
                <div className="stat-value">
                  {feedbackStats.negative.count}개 ({feedbackStats.negative.percentage}%)
                </div>
              </div>
            </div>
            <div className="feedback-stat-card error">
              <div className="stat-icon-wrapper">
                <AlertCircle size={24} className="stat-icon" />
              </div>
              <div className="stat-content">
                <h4 className="stat-label">오류 리포트</h4>
                <div className="stat-value">{feedbackStats.errors.count}개</div>
              </div>
            </div>
          </div>

          {/* 부정 피드백 및 오류 리포트 */}
          <div className="feedback-reports-section">
            <h2 className="section-title">부정 피드백 및 오류 리포트</h2>
            <div className="feedback-reports-list">
              {feedbackReports.map((report) => (
                <div key={report.id} className="feedback-report-card">
                  <div className="report-header">
                    <div className="report-icon-wrapper">
                      <ThumbsDown size={20} className="report-icon negative" />
                    </div>
                    <div className="report-user-info">
                      <span className="report-user">{report.user}</span>
                      <span className="report-timestamp">{report.timestamp}</span>
                    </div>
                  </div>
                  <div className="report-content">
                    <div className="report-question-section">
                      <span className="question-label">질문</span>
                      <p className="question-text">{report.question}</p>
                    </div>
                    <div className="report-reason-section">
                      <span className="reason-label">사유</span>
                      <p className="reason-text">{report.reason}</p>
                      {report.additionalReason && (
                        <p className="reason-text additional">{report.additionalReason}</p>
                      )}
                    </div>
                  </div>
                  <div className="report-actions">
                    <button className="action-button view-details">
                      <Eye size={16} />
                      상세 보기
                    </button>
                    <button className="action-button improve">
                      <Sparkles size={16} />
                      답변 개선
                    </button>
                    <button className="action-button resolve">
                      <CheckCircle size={16} />
                      해결됨으로 표시
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AIAssistant

