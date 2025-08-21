import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Shield, Lock, Database, Network, Code, CheckCircle, Play, Award, Users, Target, Zap } from 'lucide-react';

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  completed: boolean;
  progress: number;
  topics: string[];
}

interface SecurityQuiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const SecurityTraining = () => {
  const [activeTab, setActiveTab] = useState('modules');
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<SecurityQuiz | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const trainingModules: TrainingModule[] = [
    {
      id: '1',
      title: 'Mobile App Security Fundamentals',
      description: 'Learn the basics of mobile app security, common vulnerabilities, and best practices.',
      category: 'beginner',
      duration: 45,
      completed: false,
      progress: 0,
      topics: ['OWASP Mobile Top 10', 'Secure coding practices', 'Input validation', 'Authentication basics']
    },
    {
      id: '2',
      title: 'Advanced Authentication & Authorization',
      description: 'Deep dive into secure authentication mechanisms, OAuth 2.0, and session management.',
      category: 'intermediate',
      duration: 60,
      completed: false,
      progress: 0,
      topics: ['OAuth 2.0 flows', 'JWT security', 'Session management', 'Multi-factor authentication']
    },
    {
      id: '3',
      title: 'Data Protection & Encryption',
      description: 'Master data encryption, secure storage, and privacy compliance requirements.',
      category: 'intermediate',
      duration: 75,
      completed: false,
      progress: 0,
      topics: ['Encryption algorithms', 'Key management', 'Secure storage', 'GDPR compliance']
    },
    {
      id: '4',
      title: 'Network Security & API Protection',
      description: 'Secure your mobile app\'s network communications and API endpoints.',
      category: 'advanced',
      duration: 90,
      completed: false,
      progress: 0,
      topics: ['SSL/TLS implementation', 'Certificate pinning', 'API security', 'Rate limiting']
    },
    {
      id: '5',
      title: 'Penetration Testing for Mobile Apps',
      description: 'Learn how to conduct security assessments and penetration testing on mobile applications.',
      category: 'advanced',
      duration: 120,
      completed: false,
      progress: 0,
      topics: ['Static analysis', 'Dynamic analysis', 'Reverse engineering', 'Vulnerability assessment']
    }
  ];

  const securityQuizzes: SecurityQuiz[] = [
    {
      id: '1',
      question: 'What is the most critical security vulnerability in mobile apps according to OWASP Mobile Top 10?',
      options: [
        'Insecure data storage',
        'Weak server-side controls',
        'Insufficient cryptography',
        'Client-side injection'
      ],
      correctAnswer: 0,
      explanation: 'Insecure data storage is the most critical vulnerability as it can lead to exposure of sensitive user data.',
      category: 'Mobile Security Fundamentals'
    },
    {
      id: '2',
      question: 'Which authentication method provides the highest level of security for mobile apps?',
      options: [
        'Username and password only',
        'Biometric authentication',
        'Multi-factor authentication (MFA)',
        'Social media login'
      ],
      correctAnswer: 2,
      explanation: 'Multi-factor authentication combines multiple authentication factors, providing the highest security level.',
      category: 'Authentication & Authorization'
    },
    {
      id: '3',
      question: 'What is the recommended approach for storing sensitive data on mobile devices?',
      options: [
        'Plain text in shared preferences',
        'Encrypted storage using platform APIs',
        'SQLite database without encryption',
        'External SD card storage'
      ],
      correctAnswer: 1,
      explanation: 'Platform APIs like Android Keystore and iOS Keychain provide secure encrypted storage for sensitive data.',
      category: 'Data Protection'
    }
  ];

  const startModule = (module: TrainingModule) => {
    setSelectedModule(module);
    setActiveTab('learning');
  };

  const completeModule = () => {
    if (selectedModule) {
      const updatedModules = trainingModules.map(m => 
        m.id === selectedModule.id 
          ? { ...m, completed: true, progress: 100 }
          : m
      );
      // In a real app, you'd update the state here
      setSelectedModule(null);
      setActiveTab('modules');
    }
  };

  const startQuiz = () => {
    setCurrentQuiz(securityQuizzes[0]);
    setQuizAnswers([]);
    setShowResults(false);
    setActiveTab('quiz');
  };

  const submitQuizAnswer = (answerIndex: number) => {
    setQuizAnswers([...quizAnswers, answerIndex]);
  };

  const finishQuiz = () => {
    setShowResults(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'beginner': return <Shield className="w-4 h-4" />;
      case 'intermediate': return <Lock className="w-4 h-4" />;
      case 'advanced': return <Target className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Security Training Center</h1>
            <p className="text-muted-foreground">Interactive learning modules for mobile app security</p>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="modules">Training Modules</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="quiz">Security Quiz</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          {/* Training Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Available Training Modules</h2>
              <Button onClick={startQuiz} variant="outline">
                <Zap className="w-4 h-4 mr-2" />
                Take Security Quiz
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainingModules.map((module) => (
                <Card key={module.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(module.category)}>
                        {getCategoryIcon(module.category)}
                        <span className="ml-1">{module.category}</span>
                      </Badge>
                      {module.completed && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold">{module.title}</h3>
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Duration: {module.duration} min</span>
                        <span>{module.progress}% complete</span>
                      </div>
                      <Progress value={module.progress} className="w-full" />
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Topics covered:</p>
                      <div className="flex flex-wrap gap-1">
                        {module.topics.slice(0, 3).map((topic, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {module.topics.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{module.topics.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button 
                      onClick={() => startModule(module)}
                      className="w-full"
                      variant={module.completed ? "outline" : "default"}
                    >
                      {module.completed ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Learning
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning" className="space-y-6">
            {selectedModule ? (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">{selectedModule.title}</h2>
                    <Badge className={getCategoryColor(selectedModule.category)}>
                      {getCategoryIcon(selectedModule.category)}
                      <span className="ml-1">{selectedModule.category}</span>
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{selectedModule.description}</p>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Learning Objectives</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedModule.topics.map((topic, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <h3 className="text-lg font-medium">Interactive Content</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                        <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                        <p className="text-sm font-medium">Read Materials</p>
                      </Card>
                      <Card className="p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                        <Play className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <p className="text-sm font-medium">Watch Videos</p>
                      </Card>
                      <Card className="p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                        <Code className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                        <p className="text-sm font-medium">Practice Labs</p>
                      </Card>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <Button onClick={() => setActiveTab('modules')} variant="outline">
                      Back to Modules
                    </Button>
                    <Button onClick={completeModule} className="ml-auto">
                      <Award className="w-4 h-4 mr-2" />
                      Complete Module
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="p-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Select a Training Module</h3>
                <p className="text-muted-foreground mb-4">
                  Choose a module from the Training Modules tab to start learning
                </p>
                <Button onClick={() => setActiveTab('modules')}>
                  Browse Modules
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz" className="space-y-6">
            {currentQuiz && !showResults ? (
              <Card className="p-8 max-w-2xl mx-auto">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Security Quiz</h3>
                    <p className="text-muted-foreground mb-4">
                      Test your knowledge of mobile app security
                    </p>
                  </div>

                  <div className="text-left space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="font-medium mb-2">Question {quizAnswers.length + 1}:</p>
                      <p className="text-lg">{currentQuiz.question}</p>
                    </div>

                    <div className="space-y-3">
                      {currentQuiz.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start h-auto p-4"
                          onClick={() => submitQuizAnswer(index)}
                        >
                          <span className="text-left">{option}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={finishQuiz} variant="default">
                    Submit Answer
                  </Button>
                </div>
              </Card>
            ) : showResults ? (
              <Card className="p-8 max-w-2xl mx-auto">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  
                  <h3 className="text-xl font-semibold">Quiz Results</h3>
                  
                  <div className="space-y-4">
                    {securityQuizzes.map((quiz, index) => (
                      <div key={quiz.id} className="p-4 border rounded-lg">
                        <p className="font-medium mb-2">{quiz.question}</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Your answer: {quizAnswers[index] !== undefined ? quiz.options[quizAnswers[index]] : 'Not answered'}
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          Correct answer: {quiz.options[quiz.correctAnswer]}
                        </p>
                        <p className="text-sm bg-blue-50 dark:bg-blue-950/20 p-2 rounded">
                          <strong>Explanation:</strong> {quiz.explanation}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={() => setActiveTab('modules')} variant="outline">
                      Back to Training
                    </Button>
                    <Button onClick={startQuiz}>
                      Take Another Quiz
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Ready to Test Your Knowledge?</h3>
                <p className="text-muted-foreground mb-4">
                  Take our security quiz to assess your understanding of mobile app security concepts
                </p>
                <Button onClick={startQuiz}>
                  Start Quiz
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Learning Progress</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {trainingModules.filter(m => m.completed).length}
                  </div>
                  <p className="text-sm text-muted-foreground">Completed Modules</p>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {Math.round(trainingModules.reduce((acc, m) => acc + m.progress, 0) / trainingModules.length)}
                  </div>
                  <p className="text-sm text-muted-foreground">Average Progress</p>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {trainingModules.reduce((acc, m) => acc + m.duration, 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Learning Time (min)</p>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Module Progress</h3>
                {trainingModules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        {getCategoryIcon(module.category)}
                      </div>
                      <div>
                        <p className="font-medium">{module.title}</p>
                        <p className="text-sm text-muted-foreground">{module.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <Progress value={module.progress} className="w-full" />
                      </div>
                      <span className="text-sm font-medium">{module.progress}%</span>
                      {module.completed && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecurityTraining;

