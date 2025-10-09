import { Link } from 'react-router-dom';
import { UserPlus, Plus, CheckCircle, ArrowRight, Clock, Target, BarChart3 } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      number: "01",
      icon: <UserPlus className="w-12 h-12" />,
      title: "Create Your Account",
      description: "Sign up in seconds with just your email and password. No credit card required.",
      details: [
        "Quick 30-second signup process",
        "Secure account creation",
        "Instant access to your workspace",
        "Free forever plan available"
      ]
    },
    {
      number: "02", 
      icon: <Plus className="w-12 h-12" />,
      title: "Add Your First Tasks",
      description: "Start by adding your most important tasks. Set priorities, due dates, and descriptions.",
      details: [
        "Create tasks with titles and descriptions",
        "Set priority levels (Low, Medium, High, Urgent)",
        "Add due dates and reminders",
        "Organize with tags and categories"
      ]
    },
    {
      number: "03",
      icon: <Target className="w-12 h-12" />,
      title: "Organize & Prioritize",
      description: "Use our smart features to organize your tasks and focus on what matters most.",
      details: [
        "Drag-and-drop task organization",
        "Filter by priority, status, or due date",
        "Create custom task lists",
        "Set up recurring tasks"
      ]
    },
    {
      number: "04",
      icon: <CheckCircle className="w-12 h-12" />,
      title: "Stay On Track",
      description: "Get reminders, track progress, and celebrate your achievements as you complete tasks.",
      details: [
        "Smart notifications and reminders",
        "Progress tracking and analytics",
        "Achievement badges and streaks",
        "Calendar integration for planning"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Save Time",
      description: "Reduce time spent on task management by 40% with our streamlined interface."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Stay Focused",
      description: "Clear priorities and deadlines help you focus on what's truly important."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Track Progress",
      description: "Visual analytics show your productivity trends and help you improve."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">How It Works</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Get started with Focus Hub in just a few simple steps and transform your productivity today.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="mb-16">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                        {step.number}
                      </div>
                      <div className="text-blue-600">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-xl text-gray-600 mb-6">
                      {step.description}
                    </p>
                    <ul className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Step Visual */}
                  <div className="flex-1">
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                      <div className="text-center">
                        <div className="text-blue-600 mb-4">
                          {step.icon}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {step.title}
                        </h4>
                        <p className="text-gray-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-8">
                    <ArrowRight className="w-8 h-8 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Focus Hub?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of users who have transformed their productivity with our simple yet powerful task management system.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
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
            It only takes a few minutes to set up your account and start organizing your tasks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Create Free Account
            </Link>
            <Link 
              to="/features"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
