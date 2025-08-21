import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Scan, 
  FileText, 
  Smartphone, 
  Globe, 
  Activity, 
  Target, 
  Users, 
  BookOpen, 
  Zap, 
  TrendingUp, 
  Eye, 
  Lock, 
  Database, 
  Network, 
  Code, 
  Smartphone as MobileIcon, 
  BarChart3 
} from 'lucide-react';
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
        soc2: scanMethod === 'url' ? 95 : 82
      },
      apiSecurityScore: scanMethod === 'url' ? 90 : 70,
      deviceSecurityScore: scanMethod === 'url' ? 88 : 75
    };
    
    setScanResult(mockResult);
    setIsScanning(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="scan" className="flex items-center gap-2">
            <Scan className="w-4 h-4" />
            Security Scan
          </TabsTrigger>
          <TabsTrigger value="threats" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Threat Intel
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Dashboard content would go here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{securityMetrics.averageScore}%</h3>
              <p className="text-muted-foreground">Average Security Score</p>
            </Card>
            {/* More dashboard cards would go here */}
          </div>
        </TabsContent>

        <TabsContent value="scan" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Security Scan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Scan Method</label>
                <div className="flex gap-2">
                  <Button
                    variant={scanMethod === 'file' ? 'default' : 'outline'}
                    onClick={() => setScanMethod('file')}
                    size="sm"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    File Upload
                  </Button>
                  <Button
                    variant={scanMethod === 'url' ? 'default' : 'outline'}
                    onClick={() => setScanMethod('url')}
                    size="sm"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Deployment URL
                  </Button>
                </div>
              </div>
            </div>

            {scanMethod === 'file' && (
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Upload APK/IPA File</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground mb-2">
                    {uploadedFile ? uploadedFile.name : 'Drag & drop your APK or IPA file here'}
                  </p>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".apk,.ipa"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              </div>
            )}

            {scanMethod === 'url' && (
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Deployment URL</label>
                <Input
                  type="url"
                  placeholder="https://your-app.example.com"
                  value={deploymentUrl}
                  onChange={(e) => setDeploymentUrl(e.target.value)}
                />
              </div>
            )}

            <Button
              onClick={startScan}
              disabled={isScanning || (scanMethod === 'file' && !uploadedFile) || (scanMethod === 'url' && !deploymentUrl.trim())}
              className="w-full"
            >
              {isScanning ? (
                <>
                  <div className="animate-spin mr-2">⚡</div>
                  Scanning...
                </>
              ) : (
                <>
                  <Scan className="w-4 h-4 mr-2" />
                  Start Security Scan
                </>
              )}
            </Button>
          </Card>

          {scanResult && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Scan Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium mb-2">App Information</h4>
                  <p><strong>Name:</strong> {scanResult.appName}</p>
                  <p><strong>Package:</strong> {scanResult.packageName}</p>
                  <p><strong>Version:</strong> {scanResult.version}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Security Scores</h4>
                  <p><strong>Overall:</strong> {scanResult.securityScore}%</p>
                  {scanResult.complianceScore && (
                    <>
                      <p><strong>GDPR:</strong> {scanResult.complianceScore.gdpr}%</p>
                      <p><strong>HIPAA:</strong> {scanResult.complianceScore.hipaa}%</p>
                    </>
                  )}
                </div>
              </div>

              <h4 className="font-medium mb-4">Vulnerabilities</h4>
              <div className="space-y-3">
                {scanResult.vulnerabilities.map((vuln) => (
                  <div key={vuln.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(vuln.severity)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(vuln.severity)}`}>
                          {vuln.severity.toUpperCase()}
                        </span>
                        <span className="font-medium">{vuln.title}</span>
                      </div>
                      {vuln.cveId && (
                        <Badge variant="outline" className="text-xs">
                          {vuln.cveId}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{vuln.description}</p>
                    {vuln.remediation && (
                      <p className="text-sm text-green-600">
                        <strong>Remediation:</strong> {vuln.remediation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Threat Intelligence</h3>
            <div className="space-y-4">
              {threats.map((threat) => (
                <div key={threat.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                        {threat.severity.toUpperCase()}
                      </span>
                      <span className="font-medium">{threat.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(threat.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{threat.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Platforms: {threat.affectedPlatforms.join(', ')}</span>
                    <span>•</span>
                    <span>Source: {threat.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Security Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Scan Statistics</h4>
                <p><strong>Total Scans:</strong> {securityMetrics.totalScans}</p>
                <p><strong>Average Score:</strong> {securityMetrics.averageScore}%</p>
                <p><strong>Critical Vulnerabilities:</strong> {securityMetrics.criticalVulnerabilities}</p>
                <p><strong>Compliance Issues:</strong> {securityMetrics.complianceIssues}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Real-time Monitoring</h4>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-3 h-3 rounded-full ${isRealTimeMonitoring ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span>Real-time Monitoring {isRealTimeMonitoring ? 'Active' : 'Inactive'}</span>
                </div>
                <Button
                  variant={isRealTimeMonitoring ? 'outline' : 'default'}
                  onClick={() => setIsRealTimeMonitoring(!isRealTimeMonitoring)}
                  size="sm"
                >
                  {isRealTimeMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityDashboard;
