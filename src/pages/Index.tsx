import React from 'react';
import { Link } from 'react-router-dom';
import SecurityDashboard from '@/components/SecurityDashboard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Shield, 
  BookOpen, 
  BarChart3, 
  Target, 
  Zap, 
  Users, 
  Lock, 
  Database, 
  Network, 
  Code,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Scanning",
      description: "Comprehensive mobile app security testing with APK/IPA file analysis and deployment URL scanning",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Security Training",
      description: "Interactive learning modules covering mobile app security fundamentals to advanced topics",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Security Analytics",
      description: "Advanced metrics, trend analysis, and comprehensive reporting capabilities",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Threat Intelligence",
      description: "Real-time threat feeds and vulnerability updates for proactive security",
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/20"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Compliance Checking",
      description: "GDPR, HIPAA, SOC2, and PCI DSS compliance assessment and monitoring",
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20"
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "API Security Testing",
      description: "Comprehensive API endpoint security testing and vulnerability assessment",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/20"
    }
  ];

  const benefits = [
    "Automated vulnerability detection and assessment",
    "Real-time security monitoring and alerts",
    "Comprehensive compliance framework support",
    "Interactive security training and certification",
    "Advanced analytics and trend reporting",
    "Team collaboration and workflow management"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
            <Shield className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Mobile Security Guardian
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Advanced mobile app security testing platform with comprehensive vulnerability assessment, 
            compliance checking, threat intelligence, and interactive training modules.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Shield className="w-5 h-5 mr-2" />
                Start Security Scan
              </Button>
            </Link>
            <Link to="/training">
              <Button size="lg" variant="outline">
                <BookOpen className="w-5 h-5 mr-2" />
                Security Training
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comprehensive Security Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to secure your mobile applications, from automated scanning 
              to team training and compliance management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <div className={feature.color}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Mobile Security Guardian?
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive security solutions designed for modern mobile app development teams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Security Excellence</h3>
              <div className="space-y-4">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Advanced Capabilities</h3>
              <div className="space-y-4">
                {benefits.slice(3).map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Secure Your Mobile Apps?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of developers and security professionals who trust Mobile Security Guardian 
            to protect their applications and maintain compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Zap className="w-5 h-5 mr-2" />
                Get Started Now
              </Button>
            </Link>
            <Link to="/analytics">
              <Button size="lg" variant="outline">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <SecurityDashboard />
    </div>
  );
};

export default Index;
