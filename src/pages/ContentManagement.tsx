import { useState } from 'react'
import {
  Search,
  ChevronDown,
  Eye,
  Check,
  X,
  MoreVertical,
  EyeOff,
  FileText,
  Download
} from 'lucide-react'
import './ContentManagement.css'

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState<'review' | 'data'>('review')
  const [statusFilter] = useState('전체 상태')

  const files = [
    {
      id: 1,
      fileName: 'aws practice.zip',
      instructor: '김승환',
      category: '클라우드',
      lectureTitle: 'AWS 클라우드 실전 가이드',
      size: '15.8 MB',
      date: '2025.11.14',
      isVisible: true
    },
    {
      id: 2,
      fileName: 'react-source-code.zip',
      instructor: '유인호',
      category: '프로그래밍 언어',
      lectureTitle: 'React 마스터 클래스',
      size: '8.2 MB',
      date: '2025.11.10',
      isVisible: false
    }
  ]

  const lectures = [
    {
      id: 1,
      title: 'Python 데이터 분석 A to Z',
      status: ['대기', '기획안 검수'],
      instructor: '김철수',
      category: '개발',
      price: 89000,
      videos: 45,
      totalTime: '12시간 30분',
      submissionDate: '2024-01-15',
      rejectionReason: null
    },
    {
      id: 2,
      title: 'AWS 클라우드 실전 가이드',
      status: ['대기', '최종 검수'],
      instructor: '이영희',
      category: '인프라',
      price: 129000,
      videos: 67,
      totalTime: '18시간 20분',
      submissionDate: '2024-01-15',
      rejectionReason: null
    },
    {
      id: 3,
      title: 'React 마스터 클래스',
      status: ['승인'],
      instructor: '박인수',
      category: '개발',
      price: 99000,
      videos: 52,
      totalTime: '15시간 45분',
      submissionDate: '2024-01-12',
      rejectionReason: null
    },
    {
      id: 4,
      title: 'UI/UX 디자인 입문',
      status: ['반려'],
      instructor: '정수현',
      category: '디자인',
      price: 79000,
      videos: 38,
      totalTime: '10시간 15분',
      submissionDate: '2024-01-10',
      rejectionReason: '콘텐츠 품질 기준 미달'
    }
  ]

  const getStatusClass = (status: string) => {
    switch (status) {
      case '승인':
        return 'status-approved'
      case '반려':
        return 'status-rejected'
      default:
        return 'status-pending'
    }
  }

  return (
    <div className="content-management">
      <div className="content-header">
        <div>
          <h1 className="content-title">콘텐츠 관리</h1>
          <p className="content-subtitle">강의 검수 및 자료 관리</p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="content-tabs">
        <button
          className={`tab-button ${activeTab === 'review' ? 'active' : ''}`}
          onClick={() => setActiveTab('review')}
        >
          강의 검수/관리
        </button>
        <button
          className={`tab-button ${activeTab === 'data' ? 'active' : ''}`}
          onClick={() => setActiveTab('data')}
        >
          자료 관리
        </button>
      </div>

      {activeTab === 'review' && (
        <>
          {/* 검색 및 필터 */}
          <div className="content-filters">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="강의 검색..."
                className="search-input"
              />
            </div>
            <button className="status-filter-button">
              {statusFilter}
              <ChevronDown size={16} />
            </button>
          </div>

          {/* 강의 목록 */}
          <div className="lecture-list">
            <h2 className="lecture-list-title">강의 목록</h2>
            <div className="lecture-cards">
              {lectures.map((lecture) => (
                <div key={lecture.id} className="lecture-card">
                  <div className="lecture-card-header">
                    <div className="lecture-title-wrapper">
                      <h3 className="lecture-title">{lecture.title}</h3>
                      <div className="lecture-status-tags">
                        {lecture.status.map((status, index) => (
                          <span
                            key={index}
                            className={`status-tag ${getStatusClass(status)}`}
                          >
                            {status}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="more-options">
                      <MoreVertical size={20} />
                    </button>
                  </div>

                  <div className="lecture-details">
                    <div className="detail-row">
                      <span className="detail-label">강사:</span>
                      <span className="detail-value">{lecture.instructor}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">카테고리:</span>
                      <span className="detail-value">{lecture.category}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">가격:</span>
                      <span className="detail-value">
                        ₩{lecture.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="lecture-info">
                    <span>{lecture.videos}개 영상</span>
                    <span className="info-separator">·</span>
                    <span>총 {lecture.totalTime}</span>
                    <span className="info-separator">·</span>
                    <span>제출일: {lecture.submissionDate}</span>
                  </div>

                  {lecture.rejectionReason && (
                    <div className="rejection-banner">
                      반려 사유: {lecture.rejectionReason}
                    </div>
                  )}

                  <div className="lecture-actions">
                    <button className="action-button preview">
                      <Eye size={16} />
                      미리보기
                    </button>
                    {lecture.status.includes('대기') && (
                      <>
                        <button className="action-button approve">
                          <Check size={16} />
                          승인
                        </button>
                        <button className="action-button reject">
                          <X size={16} />
                          반려
                        </button>
                      </>
                    )}
                    {lecture.status.includes('승인') && (
                      <button className="action-button hide">
                        <EyeOff size={16} />
                        노출 숨김
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'data' && (
        <>
          {/* 검색 */}
          <div className="data-filters">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="자료 검색..."
                className="search-input"
              />
            </div>
          </div>

          {/* 자료 목록 */}
          <div className="data-list">
            <h2 className="data-list-title">자료 목록</h2>
            <div className="file-cards">
              {files.map((file) => (
                <div key={file.id} className="file-card">
                  <div className="file-card-content">
                    <div className="file-icon">
                      <FileText size={24} />
                    </div>
                    <div className="file-info">
                      <h3 className="file-name">{file.fileName}</h3>
                      <p className="file-description">
                        {file.instructor} • {file.category} • {file.lectureTitle}
                      </p>
                      <div className="file-meta">
                        <span>{file.size}</span>
                        <span className="meta-separator">•</span>
                        <span>{file.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="file-actions">
                    <button
                      className={`visibility-status ${file.isVisible ? 'visible' : 'hidden'}`}
                    >
                      {file.isVisible ? '노출' : '숨김'}
                    </button>
                    <button className="file-action-button download">
                      <Download size={16} />
                      다운로드
                    </button>
                    <button className="file-action-button hide">
                      <EyeOff size={16} />
                      숨김
                    </button>
                    <button className="file-more-options">
                      <MoreVertical size={20} />
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

export default ContentManagement

