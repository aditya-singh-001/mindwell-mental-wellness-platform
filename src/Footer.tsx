import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-700 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Heart className="mr-2 h-5 w-5" /> MindWell
            </h3>
            <p className="mb-4">
              Supporting your mental health journey with compassion and understanding.
            </p>
            <p className="text-sm">© {new Date().getFullYear()} MindWell. All rights reserved.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/resources" className="hover:underline">Resources</a></li>
              <li><a href="/mood-tracker" className="hover:underline">Mood Tracker</a></li>
              <li><a href="/chatbot" className="hover:underline">Chatbot</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                <a href="mailto:support@mindwell.com" className="hover:underline">support@mindwell.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                <a href="tel:+18001234567" className="hover:underline">1-800-123-4567</a>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 mt-1" />
                <span>123 Wellness Street<br />Mindful City, MC 12345</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-teal-600 text-center">
          <p className="text-sm">
            In case of emergency, please call the National Suicide Prevention Lifeline at 988 or text HOME to 741741 to reach the Crisis Text Line.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;