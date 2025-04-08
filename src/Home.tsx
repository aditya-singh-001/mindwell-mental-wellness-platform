import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, BarChart, MessageSquare } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 opacity-90"></div>
        <img 
          src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Peaceful landscape" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Journey to Mental Wellness Starts Here</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Track your mood, access resources, and chat with our wellness assistant to support your mental health journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/chatbot" className="bg-white text-teal-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition-colors shadow-lg">
              Talk to Wellness Assistant
            </Link>
            <Link to="/resources" className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 px-6 rounded-full transition-colors">
              Explore Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How MindWell Supports You</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Our platform offers multiple tools to help you on your mental wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<BookOpen className="h-10 w-10 text-teal-600" />}
            title="Curated Resources"
            description="Access a library of articles, videos, and exercises designed to support various aspects of mental health."
            link="/resources"
          />
          <FeatureCard 
            icon={<BarChart className="h-10 w-10 text-teal-600" />}
            title="Mood Tracking"
            description="Track your daily mood and identify patterns to better understand your emotional wellbeing."
            link="/mood-tracker"
          />
          <FeatureCard 
            icon={<MessageSquare className="h-10 w-10 text-teal-600" />}
            title="Wellness Assistant"
            description="Chat with our AI assistant for immediate support, coping strategies, and personalized guidance."
            link="/chatbot"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800 rounded-3xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="MindWell has been a game-changer for my daily mental health routine. The mood tracker helps me identify patterns I never noticed before."
              author="Jamie L."
            />
            <TestimonialCard 
              quote="The chatbot is surprisingly helpful when I need someone to talk to at 2 AM. It's like having a supportive friend available 24/7."
              author="Alex T."
            />
            <TestimonialCard 
              quote="I love how the resources are organized by specific needs. It makes it easy to find exactly what I need when I'm struggling."
              author="Morgan P."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Wellness Journey?</h2>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            Join thousands of others who are taking proactive steps toward better mental health.
          </p>
          <Link to="/chatbot" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-lg">
            Start Now
          </Link>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <Link to={link} className="text-teal-600 hover:text-teal-700 font-medium flex items-center">
        Learn more <span className="ml-1">→</span>
      </Link>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author }) => {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
      <p className="italic mb-4 text-gray-700 dark:text-gray-200">"{quote}"</p>
      <p className="font-bold text-teal-600 dark:text-teal-400">— {author}</p>
    </div>
  );
};

export default Home;