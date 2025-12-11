import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ContentManagement from './pages/ContentManagement'
import OrderPayment from './pages/OrderPayment'
import OrderDetail from './pages/OrderDetail'
import RefundManagement from './pages/RefundManagement'
import UserManagement from './pages/UserManagement'
import UserActivityHistory from './pages/UserActivityHistory'
import AIAssistant from './pages/AIAssistant'
import NoticeFAQ from './pages/NoticeFAQ'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/content" element={<ContentManagement />} />
          <Route path="/order-payment" element={<OrderPayment />} />
          <Route path="/order-payment/:orderId" element={<OrderDetail />} />
          <Route path="/refund" element={<RefundManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/users/:userId/activity" element={<UserActivityHistory />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/notice" element={<NoticeFAQ />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

