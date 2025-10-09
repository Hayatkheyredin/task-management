import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, BarChart3, Bell, Users, Shield, Zap, Target } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Task Management",
      description: "Create, organize, and prioritize tasks with intelligent categorization and due date tracking.",
      benefits: ["Priority-based organization", "Due date reminders", "Task categorization", "Quick task creation"]
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Calendar Integration",
      description: "Visualize your tasks in a beautiful calendar view to plan your week and stay on schedule.",
      benefits: ["Monthly and weekly views", "Drag-and-drop scheduling", "Deadline visualization", "Time blocking"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Progress Analytics",
      description: "Track your productivity with detailed analytics and insights into your work patterns.",
      benefits: ["Completion rates", "Productivity trends", "Time tracking", "Performance metrics"]
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Smart Notifications",
      description: "Get timely reminders and updates without being overwhelmed by constant notifications.",
      benefits: ["Customizable alerts", "Smart timing", "Priority-based notifications", "Quiet hours"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Share tasks and projects with your team for better coordination and accountability.",
      benefits: ["Shared workspaces", "Task assignments", "Team progress tracking", "Collaborative planning"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Data Security",
      description: "Your data is protected with enterprise-grade security and privacy controls.",
      benefits: ["End-to-end encryption", "GDPR compliance", "Secure backups", "Privacy controls"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Built for speed with instant sync and real-time updates across all your devices.",
      benefits: ["Real-time sync", "Offline access", "Fast loading", "Instant updates"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Powerful Features</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Everything you need to stay organized, productive, and focused on what matters most.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-200"
              >
                <div className="text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already boosting their productivity with Focus Hub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link 
              to="/login"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};