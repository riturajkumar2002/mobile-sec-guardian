import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  Download, 
  Calendar,
  Filter,
  Eye,
  FileText,
  Activity,
  Target,
  Zap
} from 'lucide-react';

interface SecurityMetric {
  date: string;
  securityScore: number;
  vulnerabilities: number;
  criticalIssues: number;
  complianceScore: number;
  apiSecurityScore: number;
}

interface VulnerabilityTrend {
  category: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

interface ComplianceStatus {
  framework: string;
  score: number;
  status: 'compliant' | 'non-compliant' | 'partial';
  lastAssessment: string;
  nextAssessment: string;
}

const SecurityAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedApp, setSelectedApp] = useState('all');

  // Mock data for analytics
  const securityMetrics: SecurityMetric[] = [
    { date: '2024-01-01', securityScore: 75, vulnerabilities: 12, criticalIssues: 3, complianceScore: 82, apiSecurityScore: 78 },
    { date: '2024-01-08', securityScore: 78, vulnerabilities: 10, criticalIssues: 2, complianceScore: 85, apiSecurityScore: 81 },
    { date: '2024-01-15', securityScore: 82, vulnerabilities: 8, criticalIssues: 1, complianceScore: 88, apiSecurityScore: 84 },
    { date: '2024-01-22', securityScore: 85, vulnerabilities: 6, criticalIssues: 1, complianceScore: 90, apiSecurityScore: 87 },
    { date: '2024-01-29', securityScore: 88, vulnerabilities: 5, criticalIssues: 0, complianceScore: 92, apiSecurityScore: 89 }
  ];

  const vulnerabilityTrends: VulnerabilityTrend[] = [
    { category: 'Authentication', count: 15, trend: 'down', percentage: -25 },
    { category: 'Data Storage', count: 8, trend: 'down', percentage: -40 },
    { category: 'Network Security', count: 12, trend: 'stable', percentage: 0 },
    { category: 'Input Validation', count: 6, trend: 'down', percentage: -50 },
    { category: 'Code Quality', count: 10, trend: 'up', percentage: 20 }
  ];

  const complianceStatus: ComplianceStatus[] = [
    { framework: 'GDPR', score: 92, status: 'compliant', lastAssessment: '2024-01-15', nextAssessment: '2024-04-15' },
    { framework: 'HIPAA', score: 88, status: 'compliant', lastAssessment: '2024-01-10', nextAssessment: '2024-04-10' },
    { framework: 'SOC2', score: 75, status: 'partial', lastAssessment: '2024-01-20', nextAssessment: '2024-02-20' },
    { framework: 'PCI DSS', score: 95, status: 'compliant', lastAssessment: '2024-01-05', nextAssessment: '2024-04-05' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-red-600';
      case 'down': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
      case 'partial': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
      case 'non-compliant': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200';
    }
  };

  const exportReport = (format: 'pdf' | 'csv' | 'json') => {
    // In a real app, this would generate and download the report
    console.log(`Exporting report in ${format} format`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Security Analytics</h1>
              <p className="text-muted-foreground">Comprehensive security metrics and trend analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedApp} onValueChange={setSelectedApp}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select App" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="app1">Mobile Banking App</SelectItem>
                <SelectItem value="app2">E-commerce App</SelectItem>
                <SelectItem value="app3">Healthcare App</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Security Score</p>
                    <p className="text-3xl font-bold text-blue-600">88</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600">+13 points</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Vulnerabilities</p>
                    <p className="text-3xl font-bold text-orange-600">5</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600">-7 issues</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Compliance Score</p>
                    <p className="text-3xl font-bold text-green-600">92</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600">+8 points</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">API Security</p>
                    <p className="text-3xl font-bold text-purple-600">89</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600">+11 points</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </Card>
            </div>

            {/* Security Score Trend Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Security Score Trend</h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Security Score</span>
                </div>
              </div>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Interactive chart showing security score trends over time</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Data: {securityMetrics.length} data points over {timeRange}
                  </p>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Security Events</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Security scan completed successfully</p>
                    <p className="text-xs text-muted-foreground">2 hours ago • Score: 88</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Medium severity vulnerability detected</p>
                    <p className="text-xs text-muted-foreground">5 hours ago • Input validation issue</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Compliance assessment updated</p>
                    <p className="text-xs text-muted-foreground">1 day ago • GDPR: 92%</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Vulnerability Trends by Category</h3>
              <div className="space-y-4">
                {vulnerabilityTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">{trend.category}</p>
                        <p className="text-sm text-muted-foreground">{trend.count} vulnerabilities</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`font-medium ${getTrendColor(trend.trend)}`}>
                          {getTrendIcon(trend.trend)} {trend.percentage}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {trend.trend === 'up' ? 'Increased' : trend.trend === 'down' ? 'Decreased' : 'Stable'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4">Security Score Distribution</h4>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Pie chart showing score distribution</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4">Monthly Comparison</h4>
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Bar chart comparing monthly metrics</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Compliance Framework Status</h3>
              <div className="space-y-4">
                {complianceStatus.map((compliance, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{compliance.framework}</h4>
                      <Badge className={getComplianceStatusColor(compliance.status)}>
                        {compliance.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Score</p>
                        <p className="text-2xl font-bold">{compliance.score}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Assessment</p>
                        <p className="font-medium">{compliance.lastAssessment}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next Assessment</p>
                        <p className="font-medium">{compliance.nextAssessment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Vulnerabilities Tab */}
          <TabsContent value="vulnerabilities" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Vulnerability Analysis</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <p className="text-2xl font-bold text-red-600">0</p>
                    <p className="text-sm text-muted-foreground">Critical</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">2</p>
                    <p className="text-sm text-muted-foreground">High</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">3</p>
                    <p className="text-sm text-muted-foreground">Medium</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Generate Security Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h4 className="font-medium mb-2">Executive Summary</h4>
                  <p className="text-sm text-muted-foreground mb-4">High-level security overview for stakeholders</p>
                  <Button onClick={() => exportReport('pdf')} variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </Card>

                <Card className="p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h4 className="font-medium mb-2">Detailed Analysis</h4>
                  <p className="text-sm text-muted-foreground mb-4">Comprehensive security assessment report</p>
                  <Button onClick={() => exportReport('csv')} variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </Card>

                <Card className="p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <Target className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h4 className="font-medium mb-2">Compliance Report</h4>
                  <p className="text-sm text-muted-foreground mb-4">Regulatory compliance status report</p>
                  <Button onClick={() => exportReport('json')} variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export JSON
                  </Button>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecurityAnalytics;

