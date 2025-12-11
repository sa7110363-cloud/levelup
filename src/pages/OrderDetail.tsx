import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Download, CheckCircle2, Circle, Calendar, ChevronLeft } from 'lucide-react'
import './OrderDetail.css'

type PaymentLog = {
  id: number
  status: string
  payer: string
  transactionId: string | null
  timestamp: string
  pgCompany: string | null
  type: string
}

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const dateInputRef = useRef<HTMLInputElement>(null)
  const [selectedDate, setSelectedDate] = useState('')

  // 주문 데이터 매핑
  const ordersMap: Record<string, any> = {
    'ORD-2024-001': {
      orderId: 'ORD-2024-001',
      orderDate: '2024-01-15',
      customer: {
        name: '홍길동',
        email: 'hong@example.com',
        phone: '010-1234-5678'
      },
      orderItem: {
        name: '웹 개발 마스터 클래스',
        price: 89000
      },
      payment: {
        method: '신용카드',
        cardNumber: '**** **** **** 1234',
        installment: '일시불',
        status: '결제완료',
        transactionId: 'TXN-20240115-001234',
        approvalDate: '2024-01-15 14:35:28',
        totalAmount: 89000
      },
      paymentLogs: [
        {
          id: 1,
          status: '결제승인',
          payer: '홍길동',
          transactionId: 'TXN-20240115-001234',
          timestamp: '2024-01-15 14:35:28',
          pgCompany: null,
          type: 'approved'
        },
        {
          id: 2,
          status: '카드사 승인 요청',
          payer: '홍길동',
          transactionId: null,
          timestamp: '2024-01-15 14:35:25',
          pgCompany: 'Toss Payments',
          type: 'request'
        }
      ]
    },
    'ORD-2024-002': {
      orderId: 'ORD-2024-002',
      orderDate: '2024-01-15',
      customer: {
        name: '김영희',
        email: 'kim@example.com',
        phone: '010-2345-6789'
      },
      orderItem: {
        name: 'React 심화 과정',
        price: 129000
      },
      payment: {
        method: '카카오페이',
        cardNumber: null,
        installment: null,
        status: '결제완료',
        transactionId: 'TXN-20240115-002345',
        approvalDate: '2024-01-15 14:28:15',
        totalAmount: 129000
      },
      paymentLogs: [
        {
          id: 1,
          status: '결제승인',
          payer: '김영희',
          transactionId: 'TXN-20240115-002345',
          timestamp: '2024-01-15 14:28:15',
          pgCompany: null,
          type: 'approved'
        }
      ]
    },
    'ORD-2024-003': {
      orderId: 'ORD-2024-003',
      orderDate: '2024-01-15',
      customer: {
        name: '이정수',
        email: 'lee@example.com',
        phone: '010-3456-7890'
      },
      orderItem: {
        name: 'Node.js 백엔드 개발',
        price: 79000
      },
      payment: {
        method: '체크카드',
        cardNumber: '**** **** **** 5678',
        installment: '일시불',
        status: '실패',
        transactionId: null,
        approvalDate: null,
        totalAmount: 79000,
        failureReason: '카드 잔액부족'
      },
      paymentLogs: [
        {
          id: 1,
          status: '결제 실패',
          payer: '이정수',
          transactionId: null,
          timestamp: '2024-01-15 14:15:33',
          pgCompany: 'Toss Payments',
          type: 'failed'
        },
        {
          id: 2,
          status: '카드사 승인 요청',
          payer: '이정수',
          transactionId: null,
          timestamp: '2024-01-15 14:15:30',
          pgCompany: 'Toss Payments',
          type: 'request'
        }
      ]
    },
    'ORD-2024-004': {
      orderId: 'ORD-2024-004',
      orderDate: '2024-01-15',
      customer: {
        name: '박민수',
        email: 'park@example.com',
        phone: '010-4567-8901'
      },
      orderItem: {
        name: 'AWS 클라우드 실전 가이드',
        price: 149000
      },
      payment: {
        method: '토스페이',
        cardNumber: null,
        installment: null,
        status: '대기중',
        transactionId: null,
        approvalDate: null,
        totalAmount: 149000
      },
      paymentLogs: [
        {
          id: 1,
          status: '결제 대기중',
          payer: '박민수',
          transactionId: null,
          timestamp: '2024-01-15 13:42:11',
          pgCompany: 'Toss Payments',
          type: 'pending'
        }
      ]
    }
  }

  // orderId에 해당하는 데이터 가져오기
  const orderData = ordersMap[orderId || 'ORD-2024-001'] || ordersMap['ORD-2024-001']

  const getLogIcon = (type: string) => {
    if (type === 'approved') {
      return <CheckCircle2 size={20} className="log-icon approved" />
    }
    if (type === 'failed') {
      return <Circle size={20} className="log-icon failed" />
    }
    return <Circle size={20} className="log-icon request" />
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case '결제완료':
        return 'status-completed'
      case '실패':
        return 'status-failed'
      case '대기중':
        return 'status-pending'
      default:
        return ''
    }
  }

  return (
    <div className="order-detail">
      <div className="detail-header">
        <button className="back-button" onClick={() => navigate('/order-payment')}>
          <ChevronLeft size={20} />
          목록으로
        </button>
        <div>
          <h1 className="detail-title">{orderId ? `${orderId} 주문상세` : '주문 상세보기'}</h1>
          <p className="detail-subtitle">주문 내역 및 결제 상태 확인</p>
        </div>
      </div>

      {/* 주문 정보 및 결제 정보 */}
      <div className="detail-content-grid">
        {/* 주문 정보 */}
        <div className="info-card order-info-card">
          <h2 className="info-card-title">주문 정보</h2>
          <div className="info-section">
            <div className="info-item">
              <span className="info-label">주문번호</span>
              <span className="info-value">{orderId || orderData.orderId}</span>
            </div>
            <div className="info-item">
              <span className="info-label">주문일</span>
              <span className="info-value">{orderData.orderDate}</span>
            </div>
            {orderData.payment.failureReason && (
              <div className="info-item">
                <span className="info-label">실패 사유</span>
                <span className="info-value status-failed">{orderData.payment.failureReason}</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">고객</span>
              <div className="info-value-group">
                <span className="info-value">{orderData.customer.name}</span>
                <span className="info-value-secondary">{orderData.customer.email}</span>
                <span className="info-value-secondary">{orderData.customer.phone}</span>
              </div>
            </div>
            <div className="info-item">
              <span className="info-label">주문 항목</span>
              <div className="info-value-group">
                <span className="info-value">{orderData.orderItem.name}</span>
                <span className="info-value price">₩{orderData.orderItem.price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 결제 정보 */}
        <div className="info-card payment-info-card">
          <h2 className="info-card-title">결제 정보</h2>
          <div className="info-section">
            <div className="info-item">
              <span className="info-label">결제 수단</span>
              <span className="info-value">{orderData.payment.method}</span>
            </div>
            <div className="info-item">
              <span className="info-label">결제 상태</span>
              <span className={`info-value ${getStatusClass(orderData.payment.status)}`}>
                {orderData.payment.status}
              </span>
            </div>
            {orderData.payment.transactionId && (
              <div className="info-item">
                <span className="info-label">거래 ID</span>
                <span className="info-value">{orderData.payment.transactionId}</span>
              </div>
            )}
            {orderData.payment.approvalDate && (
              <div className="info-item">
                <span className="info-label">승인일시</span>
                <span className="info-value">{orderData.payment.approvalDate}</span>
              </div>
            )}
            {orderData.payment.cardNumber && (
              <div className="info-item">
                <span className="info-label">카드번호</span>
                <span className="info-value">{orderData.payment.cardNumber}</span>
              </div>
            )}
            {orderData.payment.installment && (
              <div className="info-item">
                <span className="info-label">할부</span>
                <span className="info-value">{orderData.payment.installment}</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">총 결제금액</span>
              <span className="info-value price large">₩{orderData.payment.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 결제 로그 */}
      <div className="payment-log-section">
        <div className="log-header">
          <h2 className="log-title">결제 로그</h2>
          <div className="log-header-actions">
            <div className="date-search">
              <input
                ref={dateInputRef}
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
              />
              <button
                className="date-calendar-button"
                onClick={() => dateInputRef.current?.showPicker()}
                type="button"
              >
                <Calendar size={16} />
              </button>
            </div>
            <button className="excel-download-button">
              <Download size={16} />
              Excel 다운로드
            </button>
          </div>
        </div>
        <p className="log-count">총 {orderData.paymentLogs.length}개의 로그가 표시됩니다.</p>
        <div className="log-list">
          {orderData.paymentLogs.map((log: PaymentLog) => (
            <div key={log.id} className="log-item">
              <div className="log-icon-wrapper">
                {getLogIcon(log.type)}
              </div>
              <div className="log-content">
                <div className="log-main-info">
                  <span className="log-status">{log.status}</span>
                  <span className="log-payer">{log.payer}</span>
                </div>
                {log.transactionId && (
                  <div className="log-secondary-info">
                    <span className="log-transaction-id">{log.transactionId}</span>
                  </div>
                )}
                {log.pgCompany && (
                  <div className="log-secondary-info">
                    <span className="log-pg-company">{log.pgCompany}</span>
                  </div>
                )}
                <div className="log-timestamp">{log.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderDetail

