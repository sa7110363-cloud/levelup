import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  ChevronDown,
  Download,
  FileText,
  RefreshCw,
  AlertCircle,
  Eye,
  X
} from 'lucide-react'
import './OrderPayment.css'

const OrderPayment = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'orders' | 'logs'>('orders')
  const [statusFilter] = useState('전체 상태')

  const orders = [
    {
      id: 'ORD-2024-001',
      status: '결제완료',
      date: '2024-01-15 14:35:22',
      customer: '홍길동',
      email: 'hong@example.com',
      product: '웹 개발 마스터 클래스',
      price: 89000,
      paymentMethod: '신용카드',
      failureReason: null,
      retryCount: null
    },
    {
      id: 'ORD-2024-002',
      status: '결제완료',
      date: '2024-01-15 14:28:15',
      customer: '김영희',
      email: 'kim@example.com',
      product: 'React 심화 과정',
      price: 129000,
      paymentMethod: '카카오페이',
      failureReason: null,
      retryCount: null
    },
    {
      id: 'ORD-2024-003',
      status: '실패',
      date: '2024-01-15 14:15:33',
      customer: '이정수',
      email: 'lee@example.com',
      product: 'Node.js 백엔드 개발',
      price: 79000,
      paymentMethod: '체크카드',
      failureReason: '카드 잔액부족',
      retryCount: 2
    },
    {
      id: 'ORD-2024-004',
      status: '대기중',
      date: '2024-01-15 13:42:11',
      customer: '박민수',
      email: 'park@example.com',
      product: 'AWS 클라우드 실전 가이드',
      price: 149000,
      paymentMethod: '토스페이',
      failureReason: null,
      retryCount: null
    }
  ]

  const failedOrders = [
    {
      id: 'ORD-2025-003',
      customer: '홍길동',
      price: 89000,
      failureReason: '카드 한도초과',
      retryCount: 2,
      lastRetryDate: '2025-11-14 17:24:39'
    },
    {
      id: 'ORD-2025-007',
      customer: '김승환',
      price: 79000,
      failureReason: '카드 한도초과',
      retryCount: 1,
      lastRetryDate: '2025-11-12 12:11:42'
    }
  ]

  const getStatusClass = (status: string) => {
    switch (status) {
      case '결제완료':
        return 'status-completed'
      case '실패':
        return 'status-failed'
      case '대기중':
        return 'status-pending'
      default:
        return 'status-pending'
    }
  }

  return (
    <div className="order-payment">
      <div className="order-header">
        <div>
          <h1 className="order-title">주문·결제 관리</h1>
          <p className="order-subtitle">주문 내역 및 결제 상태 확인</p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="order-tabs">
        <button
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          주문 목록
        </button>
        <button
          className={`tab-button ${activeTab === 'logs' ? 'active' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          실패/재시도 로그
        </button>
      </div>

      {activeTab === 'orders' && (
        <>
          {/* 검색 및 필터 */}
          <div className="order-filters">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="주문번호, 사용자 검색..."
                className="search-input"
              />
            </div>
            <button className="status-filter-button">
              {statusFilter}
              <ChevronDown size={16} />
            </button>
            <button className="export-button">
              <Download size={16} />
              내보내기
            </button>
          </div>

          {/* 주문 목록 */}
          <div className="order-list">
            <div className="order-cards">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-card-header">
                    <div className="order-id-section">
                      <span className="order-id">{order.id}</span>
                      <span className={`status-tag ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="order-info">
                    <div className="info-row">
                      <span className="info-label">날짜/시간:</span>
                      <span className="info-value">{order.date}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">고객:</span>
                      <span className="info-value">
                        {order.customer} ({order.email})
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">상품:</span>
                      <span className="info-value">{order.product}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">가격:</span>
                      <span className="info-value price">
                        ₩{order.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">결제 수단:</span>
                      <span className="info-value">{order.paymentMethod}</span>
                    </div>
                  </div>

                  {order.failureReason && (
                    <div className="failure-banner">
                      <AlertCircle size={16} />
                      <div className="failure-content">
                        <span className="failure-reason">
                          실패 사유: {order.failureReason}
                        </span>
                        {order.retryCount !== null && (
                          <span className="retry-count">재시도 {order.retryCount}회</span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="order-actions">
                    <button 
                      className="action-button detail"
                      onClick={() => navigate(`/order-payment/${order.id}`)}
                    >
                      <FileText size={16} />
                      상세 보기
                    </button>
                    {order.status === '결제완료' && (
                      <button className="action-button receipt">
                        <FileText size={16} />
                        영수증
                      </button>
                    )}
                    {order.status === '실패' && (
                      <button className="action-button retry">
                        <RefreshCw size={16} />
                        재시도
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'logs' && (
        <div className="logs-management">
          <h2 className="logs-title">실패 및 재시도 로그</h2>
          <div className="failed-order-cards">
            {failedOrders.map((order) => (
              <div key={order.id} className="failed-order-card">
                <div className="failed-order-header">
                  <div className="failed-order-left">
                    <div className="failed-icon-wrapper">
                      <X size={20} className="failed-icon" />
                    </div>
                    <div className="failed-order-info">
                      <div className="failed-order-id-section">
                        <span className="failed-order-id">{order.id}</span>
                        <span className="failed-status-tag">결제 실패</span>
                      </div>
                      <div className="failed-customer-info">
                        <span className="failed-customer-name">{order.customer}</span>
                        <span className="failed-order-price">₩{order.price.toLocaleString()}</span>
                      </div>
                      <div className="failed-reason-text">
                        실패사유: {order.failureReason}
                      </div>
                    </div>
                  </div>
                  <div className="failed-order-right">
                    <div className="retry-info">
                      <span className="retry-count-text">재시도 {order.retryCount}회</span>
                      <span className="last-retry-text">마지막: {order.lastRetryDate}</span>
                    </div>
                  </div>
                </div>
                <div className="failed-order-actions">
                  <button className="log-detail-button">
                    <Eye size={16} />
                    상세 로그
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderPayment

