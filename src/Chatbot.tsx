import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Info, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your mental wellness assistant. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const generateBotResponse = (userInput: string): Message => {
    const userText = userInput.toLowerCase();
    let response = '';
    
    // Simple keyword matching for responses
    if (userText.includes('anxious') || userText.includes('anxiety') || userText.includes('worried')) {
      response = "I understand feeling anxious can be challenging. Try taking a few deep breaths - inhale for 4 counts, hold for 4, and exhale for 6. This can help activate your parasympathetic nervous system. Would you like to explore more anxiety management techniques?";
    } 
    else if (userText.includes('sad') || userText.includes('depressed') || userText.includes('unhappy')) {
      response = "I'm sorry to hear you're feeling down. Remember that it's okay to not be okay sometimes. Would it help to talk about what's causing these feelings? Or perhaps we could discuss some mood-lifting activities?";
    }
    else if (userText.includes('stress') || userText.includes('stressed') || userText.includes('overwhelmed')) {
      response = "Being stressed can feel overwhelming. Consider taking a short break to reset - even 5 minutes of mindfulness or a brief walk can help. Would you like some stress management techniques or help prioritizing your tasks?";
    }
    else if (userText.includes('sleep') || userText.includes('tired') || userText.includes('insomnia')) {
      response = "Sleep difficulties can significantly impact mental health. Establishing a consistent sleep routine and creating a relaxing bedtime ritual can help. Would you like some specific tips for improving sleep quality?";
    }
    else if (userText.includes('meditation') || userText.includes('mindfulness')) {
      response = "Mindfulness and meditation are powerful tools for mental wellness. Even just 5 minutes of focused breathing can make a difference. Would you like a simple guided meditation exercise to try right now?";
    }
    else if (userText.includes('thank')) {
      response = "You're very welcome! I'm here anytime you need support or someone to talk to. Is there anything else on your mind today?";
    }
    else if (userText.includes('hello') || userText.includes('hi') || userText.includes('hey')) {
      response = "Hello! It's good to hear from you. How are you feeling today?";
    }
    else if (userText.includes('good') || userText.includes('great') || userText.includes('happy') || userText.includes('fine')) {
      response = "I'm glad to hear you're doing well! Is there anything specific you'd like to talk about or any aspect of your mental wellness you'd like to explore today?";
    }
    else if (userText.includes('help') || userText.includes('resources')) {
      response = "I'm here to help. We have resources on anxiety, depression, stress management, sleep improvement, and mindfulness practices. Which area would you like to explore?";
    }
    else {
      response = "Thank you for sharing. I'm here to support you. Would you like to talk more about how you're feeling, or would you prefer some coping strategies or resources?";
    }
    
    return {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date()
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage();
    }
  };

  const resetConversation = () => {
    if (window.confirm('Are you sure you want to reset this conversation?')) {
      setMessages([
        {
          id: '1',
          text: "Hello! I'm your mental wellness assistant. How are you feeling today?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const suggestedPrompts = [
    "I'm feeling anxious today",
    "How can I improve my sleep?",
    "I need help with stress management",
    "What are some mindfulness exercises?",
    "I'm feeling sad and don't know why"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)]">
      <div className="bg-white dark:bg-gray-800 rounded-t-xl shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Bot className="h-6 w-6 text-teal-600 mr-2" />
          <h1 className="text-xl font-bold">Mental Wellness Assistant</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={resetConversation}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Reset conversation"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Information"
          >
            <Info className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="flex-grow bg-gray-100 dark:bg-gray-900 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user' 
                    ? 'bg-teal-600 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-gray-800 rounded-tl-none'
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.sender === 'bot' ? (
                    <Bot className="h-4 w-4 mr-1 text-teal-600" />
                  ) : (
                    <User className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                </div>
                <p className="whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Suggested prompts */}
      <div className="bg-white dark:bg-gray-800 p-3 overflow-x-auto">
        <div className="flex space-x-2">
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => {
                setInput(prompt);
                inputRef.current?.focus();
              }}
              className="whitespace-nowrap px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSendMessage} className="bg-white dark:bg-gray-800 rounded-b-xl shadow-md p-4">
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700"
            disabled={isTyping}
          />
          <button
            type="submit"
            className={`p-3 rounded-r-lg ${
              isTyping || input.trim() === ''
                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
            disabled={isTyping || input.trim() === ''}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Note: This is a simulated chatbot for demonstration purposes. In a real application, this would connect to a more sophisticated AI system.
        </p>
      </form>
    </div>
  );
};

export default Chatbot;