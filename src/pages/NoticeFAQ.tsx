import { useState } from 'react'
import {
  Search,
  ChevronDown,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import './NoticeFAQ.css'

const NoticeFAQ = () => {
  const [activeTab, setActiveTab] = useState<'notice' | 'faq'>('notice')
  const [statusFilter, setStatusFilter] = useState('전체 상태')

  const noticeSummary = {
    total: 7,
    posted: 5,
    draft: 2,
    pinned: 1
  }

  const faqSummary = {
    total: 4,
    posted: 3,
    draft: 1,
    totalViews: 7419
  }

  const notices = [
    {
      id: 1,
      title: '2025년 11월 정기 시스템 점검 안내',
      tags: ['게시됨', '시스템'],
      content: '안녕하세요. AI-DEU입니다. 서비스 품질 향상을 위한 정기 시스템 점검이 예정되어 있습니다....',
      author: '관리자',
      date: '2025-10-30 10:00',
      views: 1234,
      isHighlighted: true
    },
    {
      id: 2,
      title: '강의 업로드 가이드라인 변경 안내',
      tags: ['게시됨', '정책'],
      content: '강사님들께 알려드립니다. 더 나은 콘텐츠 품질을 위해 강의 업로드 가이드라인이 일부 변경....',
      author: '관리자',
      date: '2025-08-22 12:00',
      views: 3243,
      isHighlighted: false
    }
  ]

  const faqs = [
    {
      id: 1,
      question: '강의 결제는 어떻게 하나요?',
      tags: ['게시됨', '결제'],
      answer: '강의 상세 페이지에서 "수강 신청하기" 버튼을 클릭하시면 결제 페이지로 이동합니다. 간편결제를 이용하여 결제가 가능합니다.',
      author: '관리자',
      date: '2025-11-18 12:34',
      views: 1234
    },
    {
      id: 2,
      question: '환불은 어떻게 받을 수 있나요?',
      tags: ['게시됨', '환불'],
      answer: '마이페이지 > 수강 중인 강의에서 환불을 원하는 강의를 선택하고, "환불 요청" 버튼을 클릭하세요. 환불 정책에 따라 수강 진도율....',
      author: '관리자',
      date: '2025-11-12 14:33',
      views: 3243
    }
  ]

  const getTagClass = (tag: string) => {
    if (tag === '게시됨') {
      return 'tag-posted'
    }
    return 'tag-category'
  }

  return (
    <div className="notice-faq">
      <div className="notice-header">
        <div>
          <h1 className="notice-title">공지사항 · FAQ 관리</h1>
          <p className="notice-subtitle">공지사항 작성 및 FAQ 관리</p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="notice-tabs">
        <button
          className={`tab-button ${activeTab === 'notice' ? 'active' : ''}`}
          onClick={() => setActiveTab('notice')}
        >
          공지사항
        </button>
        <button
          className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          FAQ
        </button>
      </div>

      {activeTab === 'notice' && (
        <>
          {/* 요약 카드 */}
          <div className="notice-summary">
            <div className="summary-card">
              <h4 className="summary-label">전체공지</h4>
              <div className="summary-value">{noticeSummary.total}개</div>
            </div>
            <div className="summary-card">
              <h4 className="summary-label">게시됨</h4>
              <div className="summary-value posted">{noticeSummary.posted}개</div>
            </div>
            <div className="summary-card">
              <h4 className="summary-label">임시저장</h4>
              <div className="summary-value draft">{noticeSummary.draft}개</div>
            </div>
            <div className="summary-card">
              <h4 className="summary-label">고정됨</h4>
              <div className="summary-value pinned">{noticeSummary.pinned}개</div>
            </div>
          </div>

          {/* 공지사항 목록 */}
          <div className="notice-list-section">
            <div className="notice-list-header">
              <h2 className="notice-list-title">공지사항 목록</h2>
              <div className="notice-filters">
                <div className="search-box">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="제목, 내용 검색..."
                    className="search-input"
                  />
                </div>
                <button className="status-filter-button">
                  {statusFilter}
                  <ChevronDown size={16} />
                </button>
                <button className="new-notice-button">
                  <Plus size={18} />
                  새 공지 작성
                </button>
              </div>
            </div>
            <div className="notice-cards">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className={`notice-card ${notice.isHighlighted ? 'highlighted' : ''}`}
                >
                  <div className="notice-card-header">
                    <h3 className="notice-card-title">{notice.title}</h3>
                    <div className="notice-tags">
                      {notice.tags.map((tag, index) => (
                        <span key={index} className={`notice-tag ${getTagClass(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="notice-content-preview">{notice.content}</p>
                  <div className="notice-meta">
                    <span>작성자: {notice.author}</span>
                    <span className="meta-separator">·</span>
                    <span>{notice.date}</span>
                    <span className="meta-separator">·</span>
                    <span>조회 {notice.views}회</span>
                  </div>
                  <div className="notice-actions">
                    <button className="action-button view">
                      <Eye size={16} />
                      상세 보기
                    </button>
                    <button className="action-button edit">
                      <Edit size={16} />
                      수정
                    </button>
                    <button className="action-button delete">
                      <Trash2 size={16} />
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'faq' && (
        <>
          {/* 요약 카드 */}
          <div className="notice-summary">
            <div className="summary-card">
              <h4 className="summary-label">전체 FAQ</h4>
              <div className="summary-value">{faqSummary.total}개</div>
            </div>
            <div className="summary-card">
              <h4 className="summary-label">게시됨</h4>
              <div className="summary-value posted">{faqSummary.posted}개</div>
            </div>
            <div className="summary-card">
              <h4 className="summary-label">임시저장</h4>
              <div className="summary-value draft">{faqSummary.draft}개</div>
            </div>
            <div className="summary-card">
              <h4 className="summary-label">총 조회수</h4>
              <div className="summary-value views">{faqSummary.totalViews.toLocaleString()}회</div>
            </div>
          </div>

          {/* FAQ 목록 */}
          <div className="notice-list-section">
            <div className="notice-list-header">
              <h2 className="notice-list-title">FAQ 목록</h2>
              <div className="notice-filters">
                <div className="search-box">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="질문, 답변 검색..."
                    className="search-input"
                  />
                </div>
                <button className="status-filter-button">
                  {statusFilter}
                  <ChevronDown size={16} />
                </button>
                <button className="new-notice-button">
                  <Plus size={18} />
                  새 FAQ 작성
                </button>
              </div>
            </div>
            <div className="notice-cards">
              {faqs.map((faq) => (
                <div key={faq.id} className="notice-card">
                  <div className="notice-card-header">
                    <h3 className="notice-card-title">{faq.question}</h3>
                    <div className="notice-tags">
                      {faq.tags.map((tag, index) => (
                        <span key={index} className={`notice-tag ${getTagClass(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="notice-content-preview">{faq.answer}</p>
                  <div className="notice-meta">
                    <span>작성자: {faq.author}</span>
                    <span className="meta-separator">·</span>
                    <span>{faq.date}</span>
                    <span className="meta-separator">·</span>
                    <span>조회 {faq.views}회</span>
                  </div>
                  <div className="notice-actions">
                    <button className="action-button view">
                      <Eye size={16} />
                      상세 보기
                    </button>
                    <button className="action-button edit">
                      <Edit size={16} />
                      수정
                    </button>
                    <button className="action-button delete">
                      <Trash2 size={16} />
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default NoticeFAQ

