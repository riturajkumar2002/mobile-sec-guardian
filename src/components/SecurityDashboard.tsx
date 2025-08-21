import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Shield, AlertTriangle, CheckCircle, Scan, FileText, Smartphone, Globe, Activity, Target, Users, BookOpen, Zap, TrendingUp, Eye, Lock, Database, Network, Code, Smartphone as MobileIcon, BarChart3 } from 'lucide-react';
import securityShield from '@/assets/security-shield.png';

interface VulnerabilityResult {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  category: string;
  cveId?: string;
  remediation?: string;
  riskScore?: number;
}

interface ScanResult {
  appName: string;
  packageName: string;
  version: string;
  securityScore: number;
  vulnerabilities: VulnerabilityResult[];
  scanDuration: number;
  timestamp: string;
  complianceScore?: {
    gdpr: number;
    hipaa: number;
    soc2: number;
  };
  apiSecurityScore?: number;
  deviceSecurityScore?: number;
}

interface ThreatIntelligence {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  affectedPlatforms: string[];
  timestamp: string;
  source: string;
}

interface SecurityMetrics {
  totalScans: number;
  averageScore: number;
  criticalVulnerabilities: number;
  complianceIssues: number;
  lastUpdated: string;
}

interface SecurityDashboardProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  triggerScan?: boolean;
  onScanComplete?: () => void;
}

const SecurityDashboard = ({ 
  activeTab: externalActiveTab, 
  onTabChange, 
  triggerScan, 
  onScanComplete 
}: SecurityDashboardProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [deploymentUrl, setDeploymentUrl] = useState('');
  const [scanMethod, setScanMethod] = useState<'file' | 'url'>('file');
  const [internalActiveTab, setInternalActiveTab] = useState('dashboard');
  const activeTab = externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;
  const setActiveTab = onTabChange || setInternalActiveTab;
  const [threats, setThreats] = useState<ThreatIntelligence[]>([]);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    totalScans: 0,
    averageScore: 0,
    criticalVulnerabilities: 0,
    complianceIssues: 0,
    lastUpdated: new Date().toISOString()
  });
  const [isRealTimeMonitoring, setIsRealTimeMonitoring] = useState(false);
  const [complianceChecks, setComplianceChecks] = useState({
    gdpr: false,
    hipaa: false,
    soc2: false
  });

  const mockVulnerabilities: VulnerabilityResult[] = [
    {
      id: '1',
      severity: 'critical',
      title: 'Insecure Data Storage',
      description: 'Sensitive data stored in plaintext in local database',
      category: 'Data Protection',
      cveId: 'CVE-2024-1234',
      remediation: 'Implement encrypted storage using Android Keystore or iOS Keychain',
      riskScore: 9.8
    },
    {
      id: '2',
      severity: 'high',
      title: 'Missing Certificate Pinning',
      description: 'App vulnerable to man-in-the-middle attacks',
      category: 'Network Security',
      cveId: 'CVE-2024-5678',
      remediation: 'Implement SSL certificate pinning for all network communications',
      riskScore: 8.5
    },
    {
      id: '3',
      severity: 'medium',
      title: 'Insufficient Authentication',
      description: 'Weak password policy implementation',
      category: 'Authentication',
      cveId: 'CVE-2024-9012',
      remediation: 'Enforce strong password requirements and implement MFA',
      riskScore: 6.2
    },
    {
      id: '4',
      severity: 'low',
      title: 'Debug Mode Enabled',
      description: 'Debug information exposed in production build',
      category: 'Code Quality',
      cveId: 'CVE-2024-3456',
      remediation: 'Disable debug mode in production builds',
      riskScore: 3.1
    }
  ];

  const mockThreats: ThreatIntelligence[] = [
    {
      id: '1',
      title: 'New Android Malware Campaign',
      severity: 'high',
      description: 'Sophisticated banking trojan targeting financial apps',
      affectedPlatforms: ['Android'],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: 'ThreatFox'
    },
    {
      id: '2',
      title: 'iOS Zero-Day Exploit',
      severity: 'critical',
      description: 'Safari WebKit vulnerability allows arbitrary code execution',
      affectedPlatforms: ['iOS'],
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      source: 'CISA'
    },
    {
      id: '3',
      title: 'Supply Chain Attack Warning',
      severity: 'medium',
      description: 'Compromised SDK affecting multiple mobile apps',
      affectedPlatforms: ['Android', 'iOS'],
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      source: 'SecurityWeek'
    }
  ];

  useEffect(() => {
    setThreats(mockThreats);
    setSecurityMetrics({
      totalScans: 156,
      averageScore: 78,
      criticalVulnerabilities: 23,
      complianceIssues: 12,
      lastUpdated: new Date().toISOString()
    });
  }, []);

  // Handle external scan triggers
  useEffect(() => {
    if (triggerScan && activeTab === 'scan') {
      // Check if we have the required inputs for scanning
      const canStartScan = (scanMethod === 'file' && uploadedFile) || 
                          (scanMethod === 'url' && deploymentUrl.trim());
      
      if (canStartScan) {
        startScan();
      } else if (scanMethod === 'file' && !uploadedFile) {
        // Trigger file upload if no file is selected
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) {
          fileInput.click();
        }
      }
      
      // Notify parent that scan trigger has been handled
      if (onScanComplete) {
        onScanComplete();
      }
    }
  }, [triggerScan, activeTab, scanMethod, uploadedFile, deploymentUrl]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const startScan = async () => {
    if (scanMethod === 'file' && !uploadedFile) return;
    if (scanMethod === 'url' && !deploymentUrl.trim()) return;
    
    setIsScanning(true);
    
    // Simulate scanning process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResult: ScanResult = {
      appName: scanMethod === 'file' 
        ? uploadedFile!.name.replace(/\.(apk|ipa)$/, '')
        : new URL(deploymentUrl).hostname,
      packageName: scanMethod === 'file' ? 'com.example.app' : 'com.deployed.app',
      version: '1.0.0',
      securityScore: scanMethod === 'url' ? 85 : 72,
      vulnerabilities: scanMethod === 'url' 
        ? mockVulnerabilities.filter(v => v.severity !== 'critical') 
        : mockVulnerabilities,
      scanDuration: 3.2,
      timestamp: new Date().toISOString(),
      complianceScore: {
        gdpr: scanMethod === 'url' ? 92 : 78,
        hipaa: scanMethod === 'url' ? 88 : 75,
        soc2: scanMethod === 'url' ? 85 : 70
      },
      apiSecurityScore: scanMethod === 'url' ? 89 : 76,
      deviceSecurityScore: scanMethod === 'file' ? 81 : 88
    };
    
    setScanResult(mockResult);
    setIsScanning(false);
    
    // Update metrics
    setSecurityMetrics(prev => ({
      ...prev,
      totalScans: prev.totalScans + 1,
      averageScore: Math.round((prev.averageScore + mockResult.securityScore) / 2),
      criticalVulnerabilities: prev.criticalVulnerabilities + mockResult.vulnerabilities.filter(v => v.severity === 'critical').length,
      lastUpdated: new Date().toISOString()
    }));
  };

  const runComplianceCheck = (type: 'gdpr' | 'hipaa' | 'soc2') => {
    setComplianceChecks(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const toggleRealTimeMonitoring = () => {
    setIsRealTimeMonitoring(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <img src={securityShield} alt="Security Shield" className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mobile Security Guardian</h1>
            <p className="text-muted-foreground">Advanced mobile app security testing & compliance platform</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/training">
              <Button variant="outline" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Training
              </Button>
            </Link>
            <Link to="/analytics">
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </Link>
            <Button
              variant={isRealTimeMonitoring ? "default" : "outline"}
              size="sm"
              onClick={toggleRealTimeMonitoring}
            >
              <Activity className="w-4 h-4 mr-2" />
              {isRealTimeMonitoring ? 'Monitoring Active' : 'Enable Monitoring'}
            </Button>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="scan">Security Scan</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="threats">Threat Intel</TabsTrigger>
            <TabsTrigger value="api">API Security</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Security Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">{securityMetrics.totalScans}</div>
                <p className="text-sm text-muted-foreground">Total Scans</p>
              </Card>
              <Card className="p-6 text-center">
                <div className={`text-3xl font-bold ${getScoreColor(securityMetrics.averageScore)}`}>
                  {securityMetrics.averageScore}
                </div>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-red-600">{securityMetrics.criticalVulnerabilities}</div>
                <p className="text-sm text-muted-foreground">Critical Issues</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-600">{securityMetrics.complianceIssues}</div>
                <p className="text-sm text-muted-foreground">Compliance Issues</p>
              </Card>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Scan className="w-4 h-4 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Security scan completed</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Critical vulnerability detected</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Compliance check passed</p>
                      <p className="text-xs text-muted-foreground">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('scan')}>
                    <Scan className="w-4 h-4 mr-2" />
                    New Security Scan
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('compliance')}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Run Compliance Check
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('threats')}>
                    <Target className="w-4 h-4 mr-2" />
                    View Threat Intel
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Security Scan Tab */}
          <TabsContent value="scan" className="space-y-6">
            {/* Analysis Section */}
            {!scanResult && (
              <Card className="p-8 border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    {scanMethod === 'file' ? (
                      <Upload className="w-10 h-10 text-primary" />
                    ) : (
                      <Globe className="w-10 h-10 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Analyze Mobile App</h3>
                    <p className="text-muted-foreground mb-4">
                      Choose your analysis method for comprehensive security testing
                    </p>
                    
                    <Tabs value={scanMethod} onValueChange={(value) => setScanMethod(value as 'file' | 'url')} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="file">Upload File</TabsTrigger>
                        <TabsTrigger value="url">Deployment URL</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="file" className="space-y-4">
                        <input
                          type="file"
                          accept=".apk,.ipa"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload">
                          <Button variant="default" size="lg" className="cursor-pointer">
                            <Upload className="w-5 h-5 mr-2" />
                            Choose APK/IPA File
                          </Button>
                        </label>
                        {uploadedFile && (
                          <div className="bg-card p-4 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Smartphone className="w-6 h-6 text-primary" />
                              <div className="text-left">
                                <p className="font-medium">{uploadedFile.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="url" className="space-y-4">
                        <div className="space-y-4">
                          <Input
                            type="url"
                            placeholder="https://your-app-deployment-url.com"
                            value={deploymentUrl}
                            onChange={(e) => setDeploymentUrl(e.target.value)}
                            className="text-center"
                          />
                          {deploymentUrl && (
                            <div className="bg-card p-4 rounded-lg border">
                              <div className="flex items-center gap-3">
                                <Globe className="w-6 h-6 text-primary" />
                                <div className="text-left">
                                  <p className="font-medium">{deploymentUrl}</p>
                                  <p className="text-sm text-muted-foreground">Deployment URL</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    {((scanMethod === 'file' && uploadedFile) || (scanMethod === 'url' && deploymentUrl.trim())) && (
                      <Button 
                        variant="default" 
                        size="lg" 
                        className="w-full mt-4"
                        onClick={startScan}
                        disabled={isScanning}
                      >
                        {isScanning ? (
                          <>
                            <Scan className="w-5 h-5 mr-2 animate-spin" />
                            Scanning...
                          </>
                        ) : (
                          <>
                            <Shield className="w-5 h-5 mr-2" />
                            Start Security Scan
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Scanning Progress */}
            {isScanning && (
              <Card className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                    <Scan className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <h3 className="text-xl font-semibold">Security Scan in Progress</h3>
                  <p className="text-muted-foreground">Analyzing your mobile app for vulnerabilities...</p>
                  <div className="space-y-2">
                    <Progress value={67} className="w-full" />
                    <p className="text-sm text-muted-foreground">Checking authentication mechanisms...</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Scan Results */}
            {scanResult && !isScanning && (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <Card className="p-6 text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(scanResult.securityScore)}`}>
                      {scanResult.securityScore}
                    </div>
                    <p className="text-sm text-muted-foreground">Security Score</p>
                  </Card>
                  <Card className="p-6 text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {scanResult.vulnerabilities.filter(v => v.severity === 'critical' || v.severity === 'high').length}
                    </div>
                    <p className="text-sm text-muted-foreground">Critical/High</p>
                  </Card>
                  <Card className="p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-600">
                      {scanResult.vulnerabilities.filter(v => v.severity === 'medium').length}
                    </div>
                    <p className="text-sm text-muted-foreground">Medium Risk</p>
                  </Card>
                  <Card className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {scanResult.vulnerabilities.filter(v => v.severity === 'low').length}
                    </div>
                    <p className="text-sm text-muted-foreground">Low Risk</p>
                  </Card>
                  <Card className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {scanResult.scanDuration}s
                    </div>
                    <p className="text-sm text-muted-foreground">Scan Time</p>
                  </Card>
                </div>

                {/* App Info */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Application Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">App Name</p>
                      <p className="font-medium">{scanResult.appName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Package Name</p>
                      <p className="font-medium">{scanResult.packageName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Version</p>
                      <p className="font-medium">{scanResult.version}</p>
                    </div>
                  </div>
                </Card>

                {/* Enhanced Vulnerabilities */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Security Vulnerabilities
                  </h3>
                  <div className="space-y-4">
                    {scanResult.vulnerabilities.map((vuln) => (
                      <div key={vuln.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{vuln.title}</h4>
                          <Badge variant={getSeverityColor(vuln.severity) as any}>
                            {vuln.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{vuln.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
                          <p>Category: {vuln.category}</p>
                          {vuln.cveId && <p>CVE: {vuln.cveId}</p>}
                          {vuln.riskScore && <p>Risk Score: {vuln.riskScore}</p>}
                        </div>
                        {vuln.remediation && (
                          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Remediation:</p>
                            <p className="text-sm text-blue-700 dark:text-blue-300">{vuln.remediation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Actions */}
                <div className="flex gap-4">
                  <Button variant="default" onClick={() => {
                    setScanResult(null);
                    setUploadedFile(null);
                    setDeploymentUrl('');
                  }}>
                    <Upload className="w-4 h-4 mr-2" />
                    Scan Another App
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Compliance Framework Assessment
              </h3>
              <p className="text-muted-foreground mb-6">
                Evaluate your mobile app against industry-standard compliance frameworks
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* GDPR Compliance */}
                <Card className="p-6 border-2 hover:border-primary/50 transition-colors">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <Lock className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">GDPR Compliance</h4>
                    <p className="text-sm text-muted-foreground">Data protection & privacy regulations</p>
                    {scanResult?.complianceScore?.gdpr && (
                      <div className={`text-2xl font-bold ${getComplianceColor(scanResult.complianceScore.gdpr)}`}>
                        {scanResult.complianceScore.gdpr}%
                      </div>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={() => runComplianceCheck('gdpr')}
                      className="w-full"
                    >
                      {complianceChecks.gdpr ? 'Checking...' : 'Run Assessment'}
                    </Button>
                  </div>
                </Card>

                {/* HIPAA Compliance */}
                <Card className="p-6 border-2 hover:border-primary/50 transition-colors">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <Database className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold">HIPAA Compliance</h4>
                    <p className="text-sm text-muted-foreground">Healthcare data security standards</p>
                    {scanResult?.complianceScore?.hipaa && (
                      <div className={`text-2xl font-bold ${getComplianceColor(scanResult.complianceScore.hipaa)}`}>
                        {scanResult.complianceScore.hipaa}%
                      </div>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={() => runComplianceCheck('hipaa')}
                      className="w-full"
                    >
                      {complianceChecks.hipaa ? 'Checking...' : 'Run Assessment'}
                    </Button>
                  </div>
                </Card>

                {/* SOC2 Compliance */}
                <Card className="p-6 border-2 hover:border-primary/50 transition-colors">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                      <Shield className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold">SOC2 Compliance</h4>
                    <p className="text-sm text-muted-foreground">Security & availability controls</p>
                    {scanResult?.complianceScore?.soc2 && (
                      <div className={`text-2xl font-bold ${getComplianceColor(scanResult.complianceScore.soc2)}`}>
                        {scanResult.complianceScore.soc2}%
                      </div>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={() => runComplianceCheck('soc2')}
                      className="w-full"
                    >
                      {complianceChecks.soc2 ? 'Checking...' : 'Run Assessment'}
                    </Button>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          {/* Threat Intelligence Tab */}
          <TabsContent value="threats" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Threat Intelligence Feed
              </h3>
              <p className="text-muted-foreground mb-6">
                Stay updated with the latest mobile security threats and vulnerabilities
              </p>
              
              <div className="space-y-4">
                {threats.map((threat) => (
                  <div key={threat.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{threat.title}</h4>
                      <Badge variant={getSeverityColor(threat.severity) as any}>
                        {threat.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{threat.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Platforms: {threat.affectedPlatforms.join(', ')}</span>
                      <span>Source: {threat.source}</span>
                      <span>{formatTimestamp(threat.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* API Security Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Network className="w-5 h-5" />
                API Security Testing
              </h3>
              <p className="text-muted-foreground mb-6">
                Test your mobile app's API endpoints for security vulnerabilities
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="API Base URL (e.g., https://api.example.com)" />
                  <Button variant="default">
                    <Scan className="w-4 h-4 mr-2" />
                    Test API Security
                  </Button>
                </div>
                
                {scanResult?.apiSecurityScore && (
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">API Security Score:</span>
                      <div className={`text-2xl font-bold ${getScoreColor(scanResult.apiSecurityScore)}`}>
                        {scanResult.apiSecurityScore}%
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Team Collaboration Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Collaboration
              </h3>
              <p className="text-muted-foreground mb-6">
                Collaborate with your team on security assessments and remediation
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Team Members</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm">Security Analyst</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm">Developer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm">QA Engineer</span>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Recent Activities</h4>
                  <div className="space-y-2 text-sm">
                    <p>• Security scan completed by Security Analyst</p>
                    <p>• Vulnerability assigned to Developer</p>
                    <p>• Remediation code submitted for review</p>
                    <p>• Security assessment approved by QA</p>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecurityDashboard;