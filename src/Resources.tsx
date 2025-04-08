import React, { useState } from 'react';
import { Search, BookOpen, Video, FileText, Headphones, ExternalLink } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide' | 'audio';
  category: 'anxiety' | 'depression' | 'stress' | 'sleep' | 'mindfulness' | 'general';
  url: string;
  imageUrl: string;
}

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const resources: Resource[] = [
    {
      id: 1,
      title: "Understanding Anxiety: Causes and Coping Strategies",
      description: "Learn about the root causes of anxiety and discover effective strategies to manage symptoms in daily life.",
      type: "article",
      category: "anxiety",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1474418397713-2f1091853e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "5-Minute Guided Meditation for Stress Relief",
      description: "A quick guided meditation practice that you can do anywhere to reduce stress and center yourself.",
      type: "audio",
      category: "stress",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "Improving Sleep Quality: A Comprehensive Guide",
      description: "Practical tips and techniques to improve your sleep hygiene and get more restful sleep each night.",
      type: "guide",
      category: "sleep",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 4,
      title: "Recognizing Signs of Depression",
      description: "How to identify symptoms of depression in yourself and others, and when to seek professional help.",
      type: "article",
      category: "depression",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 5,
      title: "Mindfulness Practices for Everyday Life",
      description: "Simple mindfulness exercises you can incorporate into your daily routine to increase awareness and reduce stress.",
      type: "video",
      category: "mindfulness",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 6,
      title: "Building Resilience: Bouncing Back from Setbacks",
      description: "Strategies to develop emotional resilience and cope with life's challenges in a healthy way.",
      type: "guide",
      category: "general",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 7,
      title: "Breathing Techniques for Anxiety Management",
      description: "Learn effective breathing exercises that can help reduce anxiety symptoms in moments of stress.",
      type: "video",
      category: "anxiety",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 8,
      title: "Understanding the Mind-Body Connection",
      description: "Explore how mental and physical health are interconnected and how to support both for overall wellbeing.",
      type: "article",
      category: "general",
      url: "#",
      imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    },
  ];

  const categories = [
    { id: 'anxiety', name: 'Anxiety' },
    { id: 'depression', name: 'Depression' },
    { id: 'stress', name: 'Stress Management' },
    { id: 'sleep', name: 'Sleep' },
    { id: 'mindfulness', name: 'Mindfulness' },
    { id: 'general', name: 'General Wellness' },
  ];

  const types = [
    { id: 'article', name: 'Articles', icon: <FileText className="h-5 w-5" /> },
    { id: 'video', name: 'Videos', icon: <Video className="h-5 w-5" /> },
    { id: 'guide', name: 'Guides', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'audio', name: 'Audio', icon: <Headphones className="h-5 w-5" /> },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? resource.category === selectedCategory : true;
    const matchesType = selectedType ? resource.type === selectedType : true;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'article': return <FileText className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      case 'guide': return <BookOpen className="h-5 w-5" />;
      case 'audio': return <Headphones className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-4">Mental Health Resources</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Explore our curated collection of resources to support your mental wellness journey.
        </p>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          
          <select
            className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700"
            value={selectedType || ''}
            onChange={(e) => setSelectedType(e.target.value || null)}
          >
            <option value="">All Types</option>
            {types.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Resource Type Buttons */}
      <section className="flex flex-wrap gap-3 mb-8">
        <button
          className={`flex items-center px-4 py-2 rounded-full ${
            selectedType === null 
              ? 'bg-teal-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
          }`}
          onClick={() => setSelectedType(null)}
        >
          All
        </button>
        {types.map(type => (
          <button
            key={type.id}
            className={`flex items-center px-4 py-2 rounded-full ${
              selectedType === type.id 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
            onClick={() => setSelectedType(type.id === selectedType ? null : type.id)}
          >
            <span className="mr-2">{type.icon}</span>
            {type.name}
          </button>
        ))}
      </section>

      {/* Resources Grid */}
      <section>
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={resource.imageUrl} 
                    alt={resource.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                      {categories.find(c => c.id === resource.category)?.name}
                    </span>
                    <span className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      {getTypeIcon(resource.type)}
                      <span className="ml-1 capitalize">{resource.type}</span>
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{resource.description}</p>
                  <a 
                    href={resource.url} 
                    className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
                  >
                    View Resource <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300">No resources found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
                setSelectedType(null);
              }}
              className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Help Section */}
      <section className="mt-16 bg-teal-50 dark:bg-teal-900/30 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Need Immediate Support?</h2>
        <p className="mb-4">
          If you're experiencing a mental health crisis or need immediate support, please reach out to one of these resources:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>National Suicide Prevention Lifeline: <strong>988</strong> (Call or Text)</li>
          <li>Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong></li>
          <li>Emergency Services: <strong>911</strong></li>
        </ul>
        <p>Remember, seeking help is a sign of strength, not weakness.</p>
      </section>
    </div>
  );
};

export default Resources;