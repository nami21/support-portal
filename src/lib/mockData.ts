import { SpotlightPost, SpotlightUser } from '../types';

export const mockCurrentUser: SpotlightUser = {
  id: 'current-user',
  name: 'Sarah Johnson',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  role: 'user' // Default to user role for testing
};

export const mockUsers: SpotlightUser[] = [
  {
    id: 'user-1',
    name: 'Alex Chen',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'support'
  },
  {
    id: 'user-2',
    name: 'Maria Rodriguez',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'user'
  },
  {
    id: 'user-3',
    name: 'James Wilson',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'admin'
  },
  {
    id: 'user-4',
    name: 'Emily Davis',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'user'
  },
  {
    id: 'user-5',
    name: 'Michael Thompson',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'user'
  }
];

export const mockPosts: SpotlightPost[] = [
  {
    id: 'post-1',
    author: mockUsers[0],
    content: 'Excited to announce our new customer success initiative! We\'ve implemented a 24/7 support system to better serve our clients. This marks a significant milestone in our commitment to excellence.',
    tags: ['announcement', 'customer-success', 'support'],
    media: [
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
        alt: 'Team celebrating success'
      }
    ],
    timestamp: new Date('2024-01-15T10:30:00Z'),
    reactions: {
      '🎉': ['user-2', 'user-3', 'user-4'],
      '👏': ['user-1', 'user-2'],
      '💯': ['user-3']
    }
  },
  {
    id: 'post-2',
    author: mockUsers[2],
    content: 'Team building day was absolutely amazing! Great to see everyone collaborating and having fun outside the office. These moments really strengthen our bonds as a team.',
    tags: ['team-building', 'culture', 'fun'],
    media: [
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
        alt: 'Team building activities'
      }
    ],
    timestamp: new Date('2024-01-14T15:45:00Z'),
    reactions: {
      '❤️': ['user-1', 'user-2', 'user-4'],
      '🤝': ['user-3'],
      '🎯': ['user-1']
    }
  },
  {
    id: 'post-3',
    author: mockUsers[0],
    content: 'Quick reminder: Please remember to update your project timelines in the dashboard. The deadline for Q1 planning is approaching fast!',
    tags: ['reminder', 'deadline', 'planning'],
    timestamp: new Date('2024-01-13T09:15:00Z'),
    reactions: {
      '👍': ['user-2', 'user-3'],
      '✅': ['user-4']
    }
  },
  {
    id: 'post-4',
    author: mockUsers[2],
    content: 'Celebrating our development team\'s successful deployment of the new feature set. Zero downtime, flawless execution! 🚀',
    tags: ['development', 'deployment', 'success'],
    media: [
      {
        type: 'image',
        url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
        alt: 'Development team at work'
      }
    ],
    timestamp: new Date('2024-01-12T16:20:00Z'),
    reactions: {
      '🚀': ['user-1', 'user-2', 'user-4'],
      '💪': ['user-3'],
      '🎉': ['user-1', 'user-4']
    }
  }
];


export const mockEvents: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'Team Standup',
    date: new Date(2024, 0, 15), // January 15, 2024
    description: 'Weekly team standup meeting to discuss progress and blockers.'
  },
  {
    id: 'event-2',
    title: 'React Training Workshop',
    date: new Date(2024, 0, 20), // January 20, 2024
    description: 'Advanced React patterns and best practices workshop.'
  },
  {
    id: 'event-3',
    title: 'Company Holiday Party',
    date: new Date(2024, 0, 22), // January 22, 2024
    description: 'Annual company holiday celebration with dinner and activities.'
  },
  {
    id: 'event-4',
    title: 'System Maintenance',
    date: new Date(2024, 0, 25), // January 25, 2024
    description: 'Scheduled system maintenance window.'
  },
  {
    id: 'event-5',
    title: 'All Hands Meeting',
    date: new Date(2024, 0, 30), // January 30, 2024
    description: 'Monthly all-hands meeting with company updates.'
  }
];

export const motivationalQuotes: MotivationalQuote[] = [
  {
    id: 'quote-1',
    text: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney',
    category: 'motivation'
  },
  {
    id: 'quote-2',
    text: 'Innovation distinguishes between a leader and a follower.',
    author: 'Steve Jobs',
    category: 'leadership'
  },
  {
    id: 'quote-3',
    text: 'Your limitation—it\'s only your imagination.',
    author: 'Unknown',
    category: 'inspiration'
  },
  {
    id: 'quote-4',
    text: 'Great things never come from comfort zones.',
    author: 'Unknown',
    category: 'growth'
  },
  {
    id: 'quote-5',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
    category: 'perseverance'
  },
  {
    id: 'quote-6',
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    category: 'dreams'
  },
  {
    id: 'quote-7',
    text: 'It is during our darkest moments that we must focus to see the light.',
    author: 'Aristotle',
    category: 'resilience'
  },
  {
    id: 'quote-8',
    text: 'Believe you can and you\'re halfway there.',
    author: 'Theodore Roosevelt',
    category: 'confidence'
  },
  {
    id: 'quote-9',
    text: 'Start where you are. Use what you have. Do what you can.',
    author: 'Arthur Ashe',
    category: 'action',
  },
  {
    id: 'quote-10',
    text: 'Success is the sum of small efforts repeated day in and day out.',
    author: 'Robert Collier',
    category: 'perseverance',
  },
  {
    id: 'quote-11',
    text: 'Push yourself, because no one else is going to do it for you.',
    author: 'Unknown',
    category: 'motivation',
  },
  {
    id: 'quote-12',
    text: 'Discipline is the bridge between goals and accomplishment.',
    author: 'Jim Rohn',
    category: 'discipline',
  },
  {
    id: 'quote-13',
    text: 'Don’t watch the clock; do what it does. Keep going.',
    author: 'Sam Levenson',
    category: 'focus',
  },
  {
    id: 'quote-14',
    text: 'Every day is a chance to get better.',
    author: 'Unknown',
    category: 'growth',
  },
  {
    id: 'quote-15',
    text: 'The harder you work for something, the greater you’ll feel when you achieve it.',
    author: 'Unknown',
    category: 'effort',
  },
  {
    id: 'quote-16',
    text: 'You miss 100% of the shots you don’t take.',
    author: 'Wayne Gretzky',
    category: 'courage',
  },
   {
    id: 'quote-16',
    text: 'The future depends on what you do today.',
    author: 'Mahatma Gandhi',
    category: 'action'
  },
  {
    id: 'quote-17',
    text: 'It always seems impossible until it’s done.',
    author: 'Nelson Mandela',
    category: 'perseverance'
  },
  {
    id: 'quote-18',
    text: 'Dream big and dare to fail.',
    author: 'Norman Vaughan',
    category: 'ambition'
  },
  {
    id: 'quote-19',
    text: 'Don’t wait. The time will never be just right.',
    author: 'Napoleon Hill',
    category: 'urgency'
  },
  {
    id: 'quote-20',
    text: 'Success usually comes to those who are too busy to be looking for it.',
    author: 'Henry David Thoreau',
    category: 'focus'
  },
  {
    id: 'quote-21',
    text: 'The only limit to our realization of tomorrow is our doubts of today.',
    author: 'Franklin D. Roosevelt',
    category: 'confidence'
  },
  {
    id: 'quote-22',
    text: 'Act as if what you do makes a difference. It does.',
    author: 'William James',
    category: 'impact'
  },
  {
    id: 'quote-23',
    text: 'If opportunity doesn’t knock, build a door.',
    author: 'Milton Berle',
    category: 'initiative'
  },
  {
    id: 'quote-24',
    text: 'Quality means doing it right when no one is looking.',
    author: 'Henry Ford',
    category: 'integrity'
  },
  {
    id: 'quote-25',
    text: 'Do one thing every day that scares you.',
    author: 'Eleanor Roosevelt',
    category: 'courage'
  },
  {
    id: 'quote-26',
    text: 'Hustle beats talent when talent doesn’t hustle.',
    author: 'Ross Simmonds',
    category: 'grit'
  },
  {
    id: 'quote-27',
    text: 'Perseverance is not a long race; it’s many short races one after the other.',
    author: 'Walter Elliot',
    category: 'resilience'
  },
  {
    id: 'quote-28',
    text: 'You don’t have to be great to start, but you have to start to be great.',
    author: 'Zig Ziglar',
    category: 'beginning'
  },
  {
    id: 'quote-29',
    text: 'Energy and persistence conquer all things.',
    author: 'Benjamin Franklin',
    category: 'discipline'
  },
  {
    id: 'quote-30',
    text: 'The man who moves a mountain begins by carrying away small stones.',
    author: 'Confucius',
    category: 'patience'
  },
  {
    id: 'quote-31',
    text: 'Strive not to be a success, but rather to be of value.',
    author: 'Albert Einstein',
    category: 'purpose'
  },
  {
    id: 'quote-32',
    text: 'Don’t watch the clock; do what it does. Keep going.',
    author: 'Sam Levenson',
    category: 'perseverance'
  },
  {
    id: 'quote-33',
    text: 'Start where you are. Use what you have. Do what you can.',
    author: 'Arthur Ashe',
    category: 'resourcefulness'
  },
  {
    id: 'quote-34',
    text: 'Everything you’ve ever wanted is on the other side of fear.',
    author: 'George Addair',
    category: 'courage'
  },
  {
    id: 'quote-35',
    text: 'The harder you work for something, the greater you’ll feel when you achieve it.',
    author: 'Anonymous',
    category: 'work ethic'
  },
  {
    id: 'quote-36',
    text: 'Go the extra mile. It’s never crowded.',
    author: 'Dr. Wayne Dyer',
    category: 'excellence'
  },
  {
    id: 'quote-37',
    text: 'Success is walking from failure to failure with no loss of enthusiasm.',
    author: 'Winston Churchill',
    category: 'resilience'
  },
  {
    id: 'quote-38',
    text: 'Discipline is the bridge between goals and accomplishment.',
    author: 'Jim Rohn',
    category: 'discipline'
  },
  {
    id: 'quote-39',
    text: 'What lies behind us and what lies before us are tiny matters compared to what lies within us.',
    author: 'Ralph Waldo Emerson',
    category: 'inner strength'
  },
  {
    id: 'quote-40',
    text: 'Success doesn’t come to you. You go to it.',
    author: 'Marva Collins',
    category: 'initiative'
  },
  {
    id: 'quote-41',
    text: 'Do not wait to strike till the iron is hot, but make it hot by striking.',
    author: 'William Butler Yeats',
    category: 'action'
  },
  {
    id: 'quote-42',
    text: 'Great things are done by a series of small things brought together.',
    author: 'Vincent Van Gogh',
    category: 'consistency'
  },
  {
    id: 'quote-43',
    text: 'You miss 100% of the shots you don’t take.',
    author: 'Wayne Gretzky',
    category: 'risk'
  },
  {
    id: 'quote-44',
    text: 'Courage is resistance to fear, mastery of fear—not absence of fear.',
    author: 'Mark Twain',
    category: 'courage'
  },
  {
    id: 'quote-45',
    text: 'Action is the foundational key to all success.',
    author: 'Pablo Picasso',
    category: 'execution'
  },
  {
    id: 'quote-46',
    text: 'Keep your face always toward the sunshine—and shadows will fall behind you.',
    author: 'Walt Whitman',
    category: 'optimism'
  },
  {
    id: 'quote-47',
    text: 'You are never too old to set another goal or to dream a new dream.',
    author: 'C.S. Lewis',
    category: 'growth'
  },
  {
    id: 'quote-48',
    text: 'Don’t limit your challenges. Challenge your limits.',
    author: 'Jerry Dunn',
    category: 'self-improvement'
  },
  {
    id: 'quote-49',
    text: 'Only those who dare to fail greatly can ever achieve greatly.',
    author: 'Robert F. Kennedy',
    category: 'risk'
  },
  {
    id: 'quote-50',
    text: 'If you can’t fly, then run. If you can’t run, then walk. But whatever you do, keep moving forward.',
    author: 'Martin Luther King Jr.',
    category: 'determination'
  },
  {
    id: 'quote-51',
    text: 'Opportunities don’t happen. You create them.',
    author: 'Chris Grosser',
    category: 'opportunity'
  },
  {
    id: 'quote-52',
    text: 'A river cuts through rock not because of its power, but because of its persistence.',
    author: 'James N. Watkins',
    category: 'persistence'
  }
];