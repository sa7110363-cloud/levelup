import { useState, useEffect, useRef } from 'react'
import {
  Search,
  ChevronDown,
  Eye,
  Check,
  X
} from 'lucide-react'
import './RefundManagement.css'

const RefundManagement = () => {
  const [statusFilter, setStatusFilter] = useState('전체 상태')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const refunds = [
    {
      id: 'REF-2024-001',
      status: '대기중',
      customer: '홍길동',
      email: 'hong@example.com',
      item: '웹 개발 마스터 클래스',
      requestDate: '2024-01-15',
      orderId: 'ORD-2024-145',
      reason: '강의 내용이 설명과 다름',
      originalAmount: 90000,
      refundAmount: 90000,
      progress: null,
      approvalDate: null,
      approver: null,
      rejectionReason: null,
      rejectionDate: null,
      processor: null
    },
    {
      id: 'REF-2024-002',
      status: '부분 환불',
      customer: '김철수',
      email: 'kim@example.com',
      item: 'React 입문 과정',
      requestDate: '2024-01-15',
      orderId: 'ORD-2024-132',
      reason: '일부 강좌만 수강 후 환불 요청',
      originalAmount: 120000,
      refundAmount: 64500,
      progress: 50,
      approvalDate: null,
      approver: null,
      rejectionReason: null,
      rejectionDate: null,
      processor: null
    },
    {
      id: 'REF-2024-003',
      status: '승인',
      customer: '박영희',
      email: 'park@example.com',
      item: 'Python 데이터 분석',
      requestDate: '2024-01-14',
      orderId: 'ORD-2024-098',
      reason: '강좌 중복',
      originalAmount: 90000,
      refundAmount: 90000,
      progress: null,
      approvalDate: '2024-01-14',
      approver: '관리자 A',
      rejectionReason: null,
      rejectionDate: null,
      processor: null
    },
    {
      id: 'REF-2024-004',
      status: '반려',
      customer: '이민수',
      email: 'lee@example.com',
      item: 'AWS 클라우드 실전',
      requestDate: '2024-01-14',
      orderId: 'ORD-2024-087',
      reason: '단순 변심',
      originalAmount: 140000,
      refundAmount: 0,
      progress: 8,
      approvalDate: null,
      approver: null,
      rejectionReason: '환불 정책 위반 (5% 미만 수강 완료)',
      rejectionDate: '2024-01-14',
      processor: '관리자 B'
    }
  ]

  // 필터링된 환불 목록
  const filteredRefunds = refunds.filter((refund) => {
    if (statusFilter === '전체 상태') return true
    return refund.status === statusFilter
  })

  const summary = {
    pending: refunds.filter(r => r.status === '대기중').length,
    approved: refunds.filter(r => r.status === '승인').length,
    rejected: refunds.filter(r => r.status === '반려').length,
    totalAmount: refunds
      .filter(r => r.status === '승인' || r.status === '부분 환불')
      .reduce((sum, r) => sum + r.refundAmount, 0)
  }

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleFilterSelect = (status: string) => {
    setStatusFilter(status)
    setIsDropdownOpen(false)
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case '승인':
        return 'status-approved'
      case '반려':
        return 'status-rejected'
      case '부분 환불':
        return 'status-partial'
      case '대기중':
        return 'status-pending'
      default:
        return 'status-pending'
    }
  }

  return (
    <div className="refund-management">
      <div className="refund-header">
        <div>
          <h1 className="refund-title">환불 관리</h1>
          <p className="refund-subtitle">환불 요청 처리 및 관리</p>
        </div>
      </div>

      {/* 요약 섹션 */}
      <div className="refund-summary">
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">대기중</span>
            <span className="stat-value">{summary.pending}건</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">승인</span>
            <span className="stat-value approved">{summary.approved}건</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">반려</span>
            <span className="stat-value rejected">{summary.rejected}건</span>
          </div>
        </div>
        <div className="summary-total">
          <span className="total-label">총 환불액</span>
          <span className="total-amount">₩{summary.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="refund-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="검색어를 입력..."
            className="search-input"
          />
        </div>
        <div className="filter-dropdown-wrapper" ref={dropdownRef}>
          <button 
            className="status-filter-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {statusFilter}
            <ChevronDown size={16} />
          </button>
          {isDropdownOpen && (
            <div className="filter-dropdown">
              <button
                className={`filter-dropdown-item ${statusFilter === '전체 상태' ? 'active' : ''}`}
                onClick={() => handleFilterSelect('전체 상태')}
              >
                전체 상태
              </button>
              <button
                className={`filter-dropdown-item ${statusFilter === '승인' ? 'active' : ''}`}
                onClick={() => handleFilterSelect('승인')}
              >
                승인
              </button>
              <button
                className={`filter-dropdown-item ${statusFilter === '대기중' ? 'active' : ''}`}
                onClick={() => handleFilterSelect('대기중')}
              >
                대기중
              </button>
              <button
                className={`filter-dropdown-item ${statusFilter === '부분 환불' ? 'active' : ''}`}
                onClick={() => handleFilterSelect('부분 환불')}
              >
                부분 환불
              </button>
              <button
                className={`filter-dropdown-item ${statusFilter === '반려' ? 'active' : ''}`}
                onClick={() => handleFilterSelect('반려')}
              >
                반려
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 환불 요청 목록 */}
      <div className="refund-list">
        <h2 className="refund-list-title">환불 요청 목록</h2>
        <div className="refund-cards">
          {filteredRefunds.map((refund) => (
            <div key={refund.id} className="refund-card">
              <div className="refund-card-main">
                <div className="refund-card-left">
                  <div className="refund-header-info">
                    <span className="refund-id">{refund.id}</span>
                    <span className={`status-tag ${getStatusClass(refund.status)}`}>
                      {refund.status}
                    </span>
                  </div>
                  <div className="refund-customer-info">
                    <span className="customer-name">{refund.customer}</span>
                    <span className="customer-email">({refund.email})</span>
                  </div>
                  <div className="refund-item-info">
                    <span className="item-name">{refund.item}</span>
                  </div>
                  <div className="refund-meta-info">
                    <span>요청일: {refund.requestDate}</span>
                    <span className="meta-separator">·</span>
                    <span>주문번호: {refund.orderId}</span>
                  </div>
                  <div className="refund-reason">
                    환불 사유: {refund.reason}
                  </div>
                  {refund.progress !== null && (
                    <div className="refund-progress">
                      수강 진도: {refund.progress}%
                    </div>
                  )}
                  {refund.approvalDate && (
                    <div className="approval-info">
                      승인일: {refund.approvalDate} 관리자: {refund.approver}
                    </div>
                  )}
                  {refund.rejectionReason && (
                    <div className="rejection-banner">
                      반려 사유: {refund.rejectionReason}
                    </div>
                  )}
                  {refund.rejectionDate && (
                    <div className="rejection-info">
                      반려일: {refund.rejectionDate} 처리자: {refund.processor}
                    </div>
                  )}
                </div>
                <div className="refund-card-right">
                  <div className="refund-amounts">
                    <div className="amount-row">
                      <span className="amount-label">원 금액</span>
                      <span className="amount-value">₩{refund.originalAmount.toLocaleString()}</span>
                    </div>
                    <div className="amount-row">
                      <span className="amount-label">환불 요청액</span>
                      <span className="amount-value refund-amount">
                        ₩{refund.refundAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="refund-actions">
                <button className="action-button detail">
                  <Eye size={16} />
                  상세 보기
                </button>
                {(refund.status === '대기중' || refund.status === '부분 환불') && (
                  <>
                    <button className="action-button approve">
                      <Check size={16} />
                      환불 승인
                    </button>
                    <button className="action-button reject">
                      <X size={16} />
                      반려
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RefundManagement

