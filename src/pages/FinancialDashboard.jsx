import { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Plus,
  Receipt,
  CreditCard,
  PiggyBank,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '../components/ui';

const FinancialDashboard = () => {
  const [timeRange, setTimeRange] = useState('month'); // week, month, quarter, year
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);

  // Financial Overview
  const financials = {
    totalIncome: 18450,
    totalExpenses: 4320,
    netProfit: 14130,
    profitMargin: 76.6,
    pendingPayments: 2850,
    taxEstimate: 4239, // 30% of net profit for self-employed
    averageBookingValue: 439,
    incomeGrowth: 28,
    expenseGrowth: 12
  };

  // Income breakdown
  const incomeStreams = [
    { category: 'Event Bookings', amount: 15200, percentage: 82, count: 38 },
    { category: 'Tips & Gratuities', amount: 1850, percentage: 10, count: 24 },
    { category: 'Add-ons & Extras', amount: 1400, percentage: 8, count: 12 }
  ];

  // Expense breakdown
  const expenseCategories = [
    { category: 'Equipment & Gear', amount: 1850, percentage: 43, color: 'purple' },
    { category: 'Travel & Transport', amount: 980, percentage: 23, color: 'blue' },
    { category: 'Marketing & Ads', amount: 750, percentage: 17, color: 'green' },
    { category: 'Software & Subscriptions', amount: 490, percentage: 11, color: 'yellow' },
    { category: 'Insurance', amount: 250, percentage: 6, color: 'pink' }
  ];

  // Recent transactions
  const recentIncome = [
    { id: 1, date: '2025-11-15', client: 'Sarah & John Wedding', amount: 850, status: 'paid', type: 'booking' },
    { id: 2, date: '2025-11-12', client: 'TechCorp Event', amount: 650, status: 'pending', type: 'booking' },
    { id: 3, date: '2025-11-10', client: 'Birthday Party Tip', amount: 75, status: 'paid', type: 'tip' },
    { id: 4, date: '2025-11-08', client: 'Mike Thompson Party', amount: 450, status: 'paid', type: 'booking' },
    { id: 5, date: '2025-11-05', client: 'Photo Booth Add-on', amount: 200, status: 'paid', type: 'addon' }
  ];

  const recentExpenses = [
    { id: 1, date: '2025-11-14', description: 'New PA Speaker', amount: 450, category: 'Equipment', receipt: true },
    { id: 2, date: '2025-11-12', description: 'Petrol - London Event', amount: 65, category: 'Travel', receipt: true },
    { id: 3, date: '2025-11-10', description: 'Facebook Ads', amount: 120, category: 'Marketing', receipt: false },
    { id: 4, date: '2025-11-08', description: 'Spotify Premium', amount: 9.99, category: 'Software', receipt: true },
    { id: 5, date: '2025-11-01', description: 'Public Liability Insurance', amount: 250, category: 'Insurance', receipt: true }
  ];

  // Tax schedule
  const taxPayments = [
    { quarter: 'Q1 2026', dueDate: '31 Jan 2026', estimated: 1060, paid: false },
    { quarter: 'Q2 2026', dueDate: '30 Apr 2026', estimated: 1060, paid: false },
    { quarter: 'Q3 2026', dueDate: '31 Jul 2026', estimated: 1060, paid: false },
    { quarter: 'Q4 2026', dueDate: '31 Oct 2026', estimated: 1059, paid: false }
  ];

  // Monthly trend data (last 6 months)
  const monthlyTrends = [
    { month: 'Jun', income: 12400, expenses: 3200, profit: 9200 },
    { month: 'Jul', income: 14200, expenses: 3800, profit: 10400 },
    { month: 'Aug', income: 16800, expenses: 4100, profit: 12700 },
    { month: 'Sep', income: 15600, expenses: 3900, profit: 11700 },
    { month: 'Oct', income: 17200, expenses: 4500, profit: 12700 },
    { month: 'Nov', income: 18450, expenses: 4320, profit: 14130 }
  ];

  const maxValue = Math.max(...monthlyTrends.map(m => m.income));

  const getStatusColor = (status) => {
    return status === 'paid'
      ? 'bg-green-100 text-green-700 border-green-300'
      : 'bg-yellow-100 text-yellow-700 border-yellow-300';
  };

  const formatCurrency = (amount) => {
    return `£${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Financial Dashboard</h1>
              <p className="text-gray-300">Track income, expenses, and tax obligations</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary">
                <Download className="w-5 h-5 mr-2" />
                Export to CSV
              </Button>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg font-medium"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="text-gray-600 text-sm mb-1">Total Income</div>
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(financials.totalIncome)}
                </div>
                <div className="flex items-center text-sm text-green-600 font-semibold mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {financials.incomeGrowth}% vs last month
                </div>
              </div>
              <ArrowUpRight className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="text-gray-600 text-sm mb-1">Total Expenses</div>
                <div className="text-3xl font-bold text-red-600">
                  {formatCurrency(financials.totalExpenses)}
                </div>
                <div className="flex items-center text-sm text-red-600 font-semibold mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {financials.expenseGrowth}% vs last month
                </div>
              </div>
              <ArrowDownRight className="w-10 h-10 text-red-600" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="text-purple-100 text-sm mb-1">Net Profit</div>
                <div className="text-3xl font-bold">
                  {formatCurrency(financials.netProfit)}
                </div>
                <div className="text-sm text-purple-100 mt-1">
                  {financials.profitMargin}% profit margin
                </div>
              </div>
              <PiggyBank className="w-10 h-10 opacity-80" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-yellow-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="text-gray-600 text-sm mb-1">Tax Estimate (30%)</div>
                <div className="text-3xl font-bold text-yellow-600">
                  {formatCurrency(financials.taxEstimate)}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Self-employed quarterly
                </div>
              </div>
              <FileText className="w-10 h-10 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Income & Expense Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Income Breakdown */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Income Breakdown</h2>
              <Button size="sm" onClick={() => setShowAddIncome(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Income
              </Button>
            </div>

            <div className="space-y-4">
              {incomeStreams.map((stream, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold text-gray-900">{stream.category}</div>
                      <div className="text-sm text-gray-500">{stream.count} transactions</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{formatCurrency(stream.amount)}</div>
                      <div className="text-sm text-gray-500">{stream.percentage}%</div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600"
                      style={{ width: `${stream.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t-2 border-gray-200">
              <div className="flex items-center justify-between">
                <div className="font-bold text-gray-900">Total Income</div>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(financials.totalIncome)}
                </div>
              </div>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Expense Breakdown</h2>
              <Button size="sm" onClick={() => setShowAddExpense(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </div>

            <div className="space-y-4">
              {expenseCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-900">{category.category}</div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{formatCurrency(category.amount)}</div>
                      <div className="text-sm text-gray-500">{category.percentage}%</div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t-2 border-gray-200">
              <div className="flex items-center justify-between">
                <div className="font-bold text-gray-900">Total Expenses</div>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(financials.totalExpenses)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trends Chart */}
        <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">6-Month Trend</h2>

          <div className="space-y-6">
            {/* Income bars */}
            <div>
              <div className="text-sm font-semibold text-gray-700 mb-3">Income</div>
              <div className="flex items-end gap-2 h-32">
                {monthlyTrends.map((month, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gray-100 rounded-t relative" style={{ height: '100%' }}>
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t transition-all"
                        style={{ height: `${(month.income / maxValue) * 100}%` }}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 whitespace-nowrap">
                          {formatCurrency(month.income)}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-gray-600 mt-2">{month.month}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expense bars */}
            <div>
              <div className="text-sm font-semibold text-gray-700 mb-3">Expenses</div>
              <div className="flex items-end gap-2 h-24">
                {monthlyTrends.map((month, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gray-100 rounded-t relative" style={{ height: '100%' }}>
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t transition-all"
                        style={{ height: `${(month.expenses / maxValue) * 100}%` }}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 whitespace-nowrap">
                          {formatCurrency(month.expenses)}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-gray-600 mt-2">{month.month}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profit bars */}
            <div>
              <div className="text-sm font-semibold text-gray-700 mb-3">Net Profit</div>
              <div className="flex items-end gap-2 h-32">
                {monthlyTrends.map((month, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gray-100 rounded-t relative" style={{ height: '100%' }}>
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t transition-all"
                        style={{ height: `${(month.profit / maxValue) * 100}%` }}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 whitespace-nowrap">
                          {formatCurrency(month.profit)}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-gray-600 mt-2">{month.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Income */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Income</h2>
            <div className="space-y-3">
              {recentIncome.map((income) => (
                <div
                  key={income.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{income.client}</div>
                    <div className="text-sm text-gray-500">{income.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">+{formatCurrency(income.amount)}</div>
                    <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${getStatusColor(income.status)}`}>
                      {income.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Expenses */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Expenses</h2>
            <div className="space-y-3">
              {recentExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-gray-900">{expense.description}</div>
                      {expense.receipt && (
                        <Receipt className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{expense.date} • {expense.category}</div>
                  </div>
                  <div className="font-bold text-red-600">-{formatCurrency(expense.amount)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tax Payment Schedule */}
        <div className="bg-white rounded-lg p-6 border-2 border-yellow-300 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
            <h2 className="text-xl font-bold text-gray-900">Quarterly Tax Payment Schedule</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {taxPayments.map((payment, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  payment.paid
                    ? 'bg-green-50 border-green-300'
                    : 'bg-yellow-50 border-yellow-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-gray-900">{payment.quarter}</div>
                  {payment.paid ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatCurrency(payment.estimated)}
                </div>
                <div className="text-sm text-gray-600">Due: {payment.dueDate}</div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <strong>Tax Tips:</strong> Set aside 30% of your net profit for self-employment tax.
                Keep all receipts for expenses. Consider hiring an accountant if you earn £50k+/year.
                HMRC requires quarterly payments for self-employed individuals earning over £1,000/year.
              </div>
            </div>
          </div>
        </div>

        {/* Financial Tips */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">💰 Financial Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>✓ Track everything:</strong> Log every income and expense immediately
            </div>
            <div>
              <strong>✓ Separate accounts:</strong> Use a business bank account for tax purposes
            </div>
            <div>
              <strong>✓ Save receipts:</strong> Digital copies are fine (photo on phone)
            </div>
            <div>
              <strong>✓ Plan for tax:</strong> 30% of profit should go to tax savings account
            </div>
            <div>
              <strong>✓ Review monthly:</strong> Check your profit margin and adjust pricing
            </div>
            <div>
              <strong>✓ Invest in growth:</strong> Equipment and marketing are tax-deductible
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;
