import React, { useState, useEffect } from 'react';
import { Calendar, BarChart2, PieChart, Save, Trash2 } from 'lucide-react';

interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  activities: string[];
  notes: string;
}

const MoodTracker: React.FC = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [currentMood, setCurrentMood] = useState<number>(3);
  const [currentActivities, setCurrentActivities] = useState<string[]>([]);
  const [currentNotes, setCurrentNotes] = useState<string>('');
  const [view, setView] = useState<'form' | 'calendar' | 'stats'>('form');

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  const moodLabels = ['Very Bad', 'Bad', 'Neutral', 'Good', 'Very Good'];
  
  const activityOptions = [
    'Exercise', 'Reading', 'Meditation', 'Social Activity', 'Work/Study',
    'Creative Activity', 'Outdoors', 'Rest', 'Entertainment', 'Family Time'
  ];

  const handleActivityToggle = (activity: string) => {
    if (currentActivities.includes(activity)) {
      setCurrentActivities(currentActivities.filter(a => a !== activity));
    } else {
      setCurrentActivities([...currentActivities, activity]);
    }
  };

  const handleSaveEntry = () => {
    const existingEntryIndex = entries.findIndex(entry => entry.date === currentDate);
    
    const newEntry: MoodEntry = {
      id: existingEntryIndex >= 0 ? entries[existingEntryIndex].id : Date.now().toString(),
      date: currentDate,
      mood: currentMood,
      activities: currentActivities,
      notes: currentNotes
    };

    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...entries];
      updatedEntries[existingEntryIndex] = newEntry;
      setEntries(updatedEntries);
    } else {
      // Add new entry
      setEntries([...entries, newEntry]);
    }

    // Reset form
    setCurrentMood(3);
    setCurrentActivities([]);
    setCurrentNotes('');
    
    // Show success message
    alert('Mood entry saved successfully!');
  };

  const handleDeleteEntry = (date: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter(entry => entry.date !== date));
    }
  };

  const loadEntry = (date: string) => {
    const entry = entries.find(e => e.date === date);
    if (entry) {
      setCurrentDate(entry.date);
      setCurrentMood(entry.mood);
      setCurrentActivities(entry.activities);
      setCurrentNotes(entry.notes);
      setView('form');
    }
  };

  // Calculate mood averages for stats
  const calculateMoodStats = () => {
    if (entries.length === 0) return { average: 0, counts: [0, 0, 0, 0, 0] };
    
    const total = entries.reduce((sum, entry) => sum + entry.mood, 0);
    const average = total / entries.length;
    
    const counts = [0, 0, 0, 0, 0];
    entries.forEach(entry => {
      counts[entry.mood]++;
    });
    
    return { average, counts };
  };

  const stats = calculateMoodStats();

  // Get most common activities
  const getTopActivities = () => {
    const activityCounts: Record<string, number> = {};
    
    entries.forEach(entry => {
      entry.activities.forEach(activity => {
        activityCounts[activity] = (activityCounts[activity] || 0) + 1;
      });
    });
    
    return Object.entries(activityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const topActivities = getTopActivities();

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-4">Mood Tracker</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Track your daily mood and activities to identify patterns and improve your mental wellbeing.
        </p>
        
        {/* View Selector */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setView('form')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              view === 'form' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            <Save className="mr-2 h-5 w-5" />
            Log Mood
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              view === 'calendar' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Calendar View
          </button>
          <button
            onClick={() => setView('stats')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              view === 'stats' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
            }`}
          >
            <BarChart2 className="mr-2 h-5 w-5" />
            Statistics
          </button>
        </div>
      </section>

      {view === 'form' && (
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Log Your Mood</h2>
          
          <div className="space-y-6">
            {/* Date Selector */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700"
              />
            </div>
            
            {/* Mood Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                How are you feeling today?
              </label>
              <div className="flex justify-between items-center">
                {moodLabels.map((label, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <button
                      onClick={() => setCurrentMood(index)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 ${
                        currentMood === index 
                          ? 'bg-teal-600 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {index === 0 ? '😢' : index === 1 ? '😕' : index === 2 ? '😐' : index === 3 ? '🙂' : '😄'}
                    </button>
                    <span className="text-sm text-center">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Activities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Activities (select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {activityOptions.map(activity => (
                  <button
                    key={activity}
                    onClick={() => handleActivityToggle(activity)}
                    className={`px-3 py-2 rounded-md text-sm ${
                      currentActivities.includes(activity)
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes (optional)
              </label>
              <textarea
                id="notes"
                value={currentNotes}
                onChange={(e) => setCurrentNotes(e.target.value)}
                rows={4}
                placeholder="How was your day? Any specific thoughts or feelings?"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700"
              ></textarea>
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveEntry}
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Save Entry
              </button>
            </div>
          </div>
        </section>
      )}

      {view === 'calendar' && (
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Calendar View</h2>
          
          {entries.length > 0 ? (
            <div className="space-y-4">
              {entries
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map(entry => (
                  <div 
                    key={entry.id} 
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold">{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => loadEntry(entry.date)}
                          className="text-teal-600 hover:text-teal-700"
                          aria-label="Edit entry"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteEntry(entry.date)}
                          className="text-red-600 hover:text-red-700"
                          aria-label="Delete entry"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">
                        {entry.mood === 0 ? '😢' : entry.mood === 1 ? '😕' : entry.mood === 2 ? '😐' : entry.mood === 3 ? '🙂' : '😄'}
                      </span>
                      <span>{moodLabels[entry.mood]}</span>
                    </div>
                    
                    {entry.activities.length > 0 && (
                      <div className="mb-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Activities:</p>
                        <div className="flex flex-wrap gap-2">
                          {entry.activities.map(activity => (
                            <span 
                              key={activity} 
                              className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md text-xs"
                            >
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {entry.notes && (
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Notes:</p>
                        <p className="text-sm">{entry.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 mb-4">No mood entries yet.</p>
              <button
                onClick={() => setView('form')}
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Create Your First Entry
              </button>
            </div>
          )}
        </section>
      )}

      {view === 'stats' && (
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Mood Statistics</h2>
          
          {entries.length > 0 ? (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium mb-4">Mood Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-center mb-2">Average Mood</p>
                    <p className="text-4xl text-center font-bold text-teal-600">
                      {stats.average.toFixed(1)}
                    </p>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                      {stats.average < 1 ? 'Very Bad' : 
                       stats.average < 2 ? 'Bad' : 
                       stats.average < 3 ? 'Neutral' : 
                       stats.average < 4 ? 'Good' : 'Very Good'}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-center mb-2">Mood Distribution</p>
                    <div className="flex justify-between items-end h-32">
                      {stats.counts.map((count, index) => {
                        const percentage = (count / entries.length) * 100;
                        return (
                          <div key={index} className="flex flex-col items-center w-1/5">
                            <div 
                              className="w-full bg-teal-600 rounded-t-sm" 
                              style={{ height: `${Math.max(percentage, 5)}%` }}
                            ></div>
                            <p className="text-xs mt-1">{moodLabels[index].split(' ')[0]}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">Top Activities</h3>
                {topActivities.length > 0 ? (
                  <div className="space-y-3">
                    {topActivities.map(([activity, count]) => (
                      <div key={activity} className="flex items-center">
                        <span className="w-1/3">{activity}</span>
                        <div className="w-2/3 flex items-center">
                          <div 
                            className="bg-teal-600 h-6 rounded-sm"
                            style={{ width: `${(count / entries.length) * 100}%` }}
                          ></div>
                          <span className="ml-2 text-sm">{count} times</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">No activities recorded yet.</p>
                )}
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">Insights</h3>
                <div className="bg-teal-50 dark:bg-teal-900/30 p-4 rounded-lg">
                  <p className="mb-2">Based on your entries:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    {entries.length < 5 ? (
                      <li>Keep logging your mood to see more personalized insights.</li>
                    ) : (
                      <>
                        <li>Your average mood is {stats.average.toFixed(1)} ({stats.average < 1 ? 'Very Bad' : 
                          stats.average < 2 ? 'Bad' : 
                          stats.average < 3 ? 'Neutral' : 
                          stats.average < 4 ? 'Good' : 'Very Good'}).</li>
                        {topActivities.length > 0 && (
                          <li>Your most frequent activity is {topActivities[0][0]}.</li>
                        )}
                        {stats.average >= 3 && topActivities.length > 0 && (
                          <li>Activities like {topActivities[0][0]} seem to correlate with better moods.</li>
                        )}
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 mb-4">No mood entries yet to generate statistics.</p>
              <button
                onClick={() => setView('form')}
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Create Your First Entry
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default MoodTracker;