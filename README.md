# 🛡️ Mobile Security Guardian

**Advanced mobile app security testing & compliance platform**

A comprehensive React-based security platform that provides automated vulnerability assessment, compliance checking, threat intelligence, and interactive security training for mobile applications.

## ✨ Features

- 🔍 **Advanced Security Scanning** - APK/IPA file analysis and deployment URL testing
- 📊 **Real-time Monitoring** - Live security metrics and compliance tracking
- 🎓 **Security Training** - Interactive learning modules and quizzes
- 📈 **Analytics Dashboard** - Comprehensive security metrics and trend analysis
- 🔒 **Compliance Framework** - GDPR, HIPAA, SOC2, and PCI DSS support
- 🚨 **Threat Intelligence** - Real-time vulnerability feeds and alerts
- 🔌 **API Security Testing** - Comprehensive endpoint security assessment
- 👥 **Team Collaboration** - Role-based access and workflow management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd mobile-sec-guardian

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build & Preview
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Deploy on Render (Recommended)

1. **Push your code to GitHub**
2. **Connect your repository to Render**
3. **Use the included `render.yaml` for automatic configuration**
4. **Deploy with one click**

📖 **Detailed deployment guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)

### Alternative Platforms
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: `npm run deploy`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── SecurityDashboard.tsx    # Main security dashboard
│   ├── SecurityTraining.tsx     # Training modules
│   └── SecurityAnalytics.tsx    # Analytics dashboard
├── pages/              # Page components
├── lib/                # Utility functions
├── hooks/              # Custom React hooks
└── assets/             # Static assets
```

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Hooks + Context
- **UI Components**: Radix UI primitives

## 📱 Key Components

### Security Dashboard
- 6-tab interface for comprehensive security management
- Real-time monitoring and alerts
- Vulnerability assessment and reporting
- Compliance framework evaluation

### Security Training Center
- Progressive learning modules (Beginner → Advanced)
- Interactive security quizzes
- Progress tracking and certification
- OWASP Mobile Top 10 coverage

### Security Analytics
- Comprehensive metrics dashboard
- Trend analysis and reporting
- Export capabilities (PDF, CSV, JSON)
- Performance monitoring

## 🔧 Configuration

### Environment Variables
```bash
NODE_ENV=production
```

### Build Configuration
- **Development**: `npm run dev`
- **Production**: `npm run build`
- **Preview**: `npm run preview`
- **Linting**: `npm run lint`

## 📊 Performance

- **Bundle Size**: Optimized with Vite
- **Loading Speed**: Fast initial load with code splitting
- **Responsiveness**: Mobile-first design approach
- **Accessibility**: WCAG compliant components

## 🔒 Security Features

- **Vulnerability Detection**: Automated security scanning
- **Compliance Checking**: Regulatory framework support
- **Threat Intelligence**: Real-time security updates
- **Data Protection**: Secure handling of uploaded files
- **Access Control**: Role-based permissions

## 🚀 Getting Started

1. **Clone and install** the repository
2. **Run the development server** with `npm run dev`
3. **Explore the features**:
   - Navigate to `/` for the main dashboard
   - Visit `/training` for security training modules
   - Access `/analytics` for security metrics
4. **Deploy to production** using the deployment guide

## 📚 Documentation

- **Features Overview**: [FEATURES.md](./FEATURES.md)
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **API Reference**: Available in component files
- **Security Guidelines**: Built into the training modules

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check the docs folder
- **Issues**: Report bugs via GitHub Issues
- **Features**: Request new features via GitHub Discussions

## 🌟 What's Next?

- [ ] AI-powered vulnerability detection
- [ ] CI/CD pipeline integration
- [ ] Advanced reporting features
- [ ] Mobile app version
- [ ] Team collaboration enhancements

---

**Built with ❤️ for the security community**

*Mobile Security Guardian - Your comprehensive mobile app security solution*
