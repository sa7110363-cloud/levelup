import { useState } from 'react'
import {
  DollarSign,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import './Dashboard.css'

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'month' | 'year'>('month')

  // 하루 차트 데이터 (24시간)
  const dayChartData = [
    { time: '00시', value: 120000 },
    { time: '03시', value: 85000 },
    { time: '06시', value: 150000 },
    { time: '09시', value: 320000 },
    { time: '12시', value: 580000 },
    { time: '15시', value: 720000 },
    { time: '18시', value: 890000 },
    { time: '21시', value: 650000 },
  ]

  // 한달 차트 데이터
  const monthChartData = [
    { month: '1월', value: 8000000 },
    { month: '3월', value: 12000000 },
    { month: '5월', value: 15000000 },
    { month: '8월', value: 18000000 },
    { month: '10월', value: 22000000 },
    { month: '12월', value: 16000000 },
  ]

  // 1년 차트 데이터
  const yearChartData = [
    { year: '2021', value: 120000000 },
    { year: '2022', value: 150000000 },
    { year: '2023', value: 180000000 },
    { year: '2024', value: 220000000 },
    { year: '2025', value: 250000000 },
  ]

  // 선택된 기간에 따른 차트 데이터
  const getChartData = () => {
    switch (timeRange) {
      case 'day':
        return dayChartData
      case 'month':
        return monthChartData
      case 'year':
        return yearChartData
      default:
        return monthChartData
    }
  }

  // 선택된 기간에 따른 X축 데이터 키
  const getDataKey = () => {
    switch (timeRange) {
      case 'day':
        return 'time'
      case 'month':
        return 'month'
      case 'year':
        return 'year'
      default:
        return 'month'
    }
  }

  const chartData = getChartData()
  const dataKey = getDataKey()

  // 검수 대기 강의
  const pendingLectures = [
    {
      title: 'Python 데이터 분석 A to Z',
      author: '김철수',
      date: '2024-01-10',
      urgent: true
    },
    {
      title: 'AWS 클라우드 실전 가이드',
      author: '이영희',
      date: '2024-01-15',
      urgent: false
    },
    {
      title: 'Flutter 모바일 앱 개발',
      author: '박민수',
      date: '2024-01-14',
      urgent: false
    }
  ]

  // 시스템 알림
  const alerts = [
    {
      type: 'warning',
      icon: AlertTriangle,
      message: '결제 게이트웨이 응답 시간이 평균보다 느립니다',
      time: '10분 전'
    },
    {
      type: 'info',
      icon: AlertCircle,
      message: '정기 점검이 오늘 23:00에 예정되어 있습니다',
      time: '1시간 전'
    },
    {
      type: 'success',
      icon: CheckCircle2,
      message: '환불 배치 작업이 정상적으로 완료되었습니다',
      time: '2시간 전'
    }
  ]

  const currentDate = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\./g, '-').replace(/\s/g, '').slice(0, -1)

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            대시보드
            <span className="dashboard-date">{currentDate}</span>
          </h1>
          <p className="dashboard-subtitle">강의 판매 시스템 현황</p>
        </div>
      </div>

      {/* 메트릭 카드 */}
      <div className="metrics-grid">
        <MetricCard
          icon={DollarSign}
          title="오늘 결제액"
          value="₩12,450,000"
          change="+15.2%"
          changeType="increase"
        />
        <MetricCard
          icon={FileText}
          title="오늘 주문수"
          value="247건"
          change="+8.5%"
          changeType="increase"
        />
        <MetricCard
          icon={Clock}
          title="검수 대기"
          value="18건"
          change="-2건"
          changeType="decrease"
        />
        <MetricCard
          icon={AlertCircle}
          title="환불/정산 대기"
          value="5건"
          urgent={1}
        />
      </div>

      {/* 그래프와 검수 대기 목록 */}
      <div className="dashboard-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>결제 현황 그래프</h3>
            <div className="time-range-buttons">
              <button
                className={timeRange === 'day' ? 'active' : ''}
                onClick={() => setTimeRange('day')}
              >
                하루
              </button>
              <button
                className={timeRange === 'month' ? 'active' : ''}
                onClick={() => setTimeRange('month')}
              >
                한달
              </button>
              <button
                className={timeRange === 'year' ? 'active' : ''}
                onClick={() => setTimeRange('year')}
              >
                1년
              </button>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart 
                data={chartData}
                margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={dataKey} />
                <YAxis 
                  width={60}
                  tickFormatter={(value) => {
                    if (value >= 100000000) {
                      return `${(value / 100000000).toFixed(1)}억`
                    } else if (value >= 10000000) {
                      return `${(value / 10000000).toFixed(1)}천만`
                    } else if (value >= 10000) {
                      return `${(value / 10000).toFixed(0)}만`
                    }
                    return value.toLocaleString()
                  }}
                />
                <Tooltip
                  formatter={(value: number) => `₩${value.toLocaleString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="pending-lectures-card">
          <h3>검수 대기 강의</h3>
          <div className="pending-list">
            {pendingLectures.map((lecture, index) => (
              <div key={index} className="pending-item">
                <div className="pending-content">
                  <div className="pending-title-row">
                    <span className="pending-title">{lecture.title}</span>
                    {lecture.urgent && (
                      <span className="urgent-badge">긴급</span>
                    )}
                  </div>
                  <div className="pending-meta">
                    <span>{lecture.author}</span>
                    <span className="pending-date">{lecture.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 시스템 알림 */}
      <div className="alerts-section">
        <h3>시스템 알림</h3>
        <div className="alerts-grid">
          {alerts.map((alert, index) => {
            const Icon = alert.icon
            return (
              <div key={index} className={`alert-card alert-${alert.type}`}>
                <div className="alert-icon">
                  <Icon size={24} />
                </div>
                <div className="alert-content">
                  <p>{alert.message}</p>
                  <span className="alert-time">{alert.time}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

interface MetricCardProps {
  icon: React.ComponentType<any>
  title: string
  value: string
  change?: string
  changeType?: 'increase' | 'decrease'
  urgent?: number
}

const MetricCard = ({
  icon: Icon,
  title,
  value,
  change,
  changeType,
  urgent
}: MetricCardProps) => {
  return (
    <div className="metric-card">
      {urgent !== undefined && urgent > 0 && (
        <span className="urgent-tag">긴급 {urgent}건</span>
      )}
      {change && (
        <span className={`metric-change ${changeType}`}>{change}</span>
      )}
      <div className="metric-icon">
        <Icon size={24} />
      </div>
      <div className="metric-content">
        <h4>{title}</h4>
        <div className="metric-value-row">
          <span className="metric-value">{value}</span>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

