# Internal Support Hub

This project is a comprehensive frontend support platform designed to streamline internal communication and support processes for employees and administrators within an organization. It provides features for managing FAQs, announcements, system updates, company documents, team collaboration through spotlights, and training materials.

## 🚀 Live Demo

The application is deployed and accessible at: https://steady-chebakia-7d2b6a.netlify.app

## 🛠️ Technologies Used

- **React 18**: Modern JavaScript library for building user interfaces
- **TypeScript**: Type-safe JavaScript for better development experience
- **Vite**: Lightning-fast frontend build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Router DOM**: Declarative routing for React applications
- **Lucide React**: Beautiful and consistent open-source icon library
- **Local Storage**: Client-side data persistence for demo purposes

## 📋 Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🏗️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd internal-support-hub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables (Optional for Demo)
For production deployment with backend integration, create a `.env` file:
```env
VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
VITE_API_BASE_URL="YOUR_BACKEND_API_URL"
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

### 6. Preview Production Build
```bash
npm run preview
```

## 👥 Demo Accounts

The application includes demo accounts for testing different user roles:

| Email | Password | Role | Access Level |
|-------|----------|------|--------------|
| `admin@company.com` | `demo_password` | Admin | Full system access, user management, content creation |
| `cto@company.com` | `demo_password` | Admin | Full system access, user management, content creation |
| `support@company.com` | `demo_password` | Support | Document management, content creation, team oversight |
| `user@company.com` | `demo_password` | User | Standard employee access, content viewing |
| `unassigned@company.com` | `demo_password` | Unassigned | Limited access, pending role assignment |

## 🎯 Core Features

### 🔐 Authentication & Access Control
- **Role-Based Access Control (RBAC)**: Four distinct user roles with different permission levels
- **Secure Login System**: Email/password authentication with session management
- **Permission Management**: Feature access based on user roles and responsibilities
- **Unassigned User Flow**: Dedicated onboarding page for users awaiting role assignment
- **Session Persistence**: Maintains user sessions across browser refreshes

### 📚 Knowledge Management

#### FAQ System
- **Categorized FAQs**: Organized into four main categories:
  - **Policies & Benefits**: Company policies, HR information, benefits
  - **IT Systems & Software**: Software issues, system access, applications
  - **Hardware & Devices**: Laptops, phones, printers, equipment support
  - **Network & Connectivity**: WiFi, VPN, internet troubleshooting
- **Search Functionality**: Full-text search across FAQ titles and content
- **Tag System**: Categorization with searchable tags
- **CRUD Operations**: Admin/Support can create, edit, and delete FAQs
- **Responsive Design**: Optimized for all device sizes

#### Content Management
- **Announcements & Memos**: Company-wide communications with:
  - Type classification (Alert/Memo)
  - Target audience specification
  - Validity date management
  - File attachment support
  - Active/inactive status control
- **System Updates**: IT system notifications featuring:
  - Update type classification (Information/Advisory/Maintenance/Security)
  - Severity levels (High/Medium/Low)
  - Status tracking (Active/Resolved/Scheduled)
  - Image/media support with Google Drive integration
  - Internal/External classification

### 👥 Team Collaboration

#### Team Spotlights
- **Social Feed**: Interactive team updates and achievements platform
- **Post Creation**: Rich content posts with:
  - Text content with formatting
  - Hashtag tagging system
  - Media attachments (images/videos)
  - Admin/Support posting privileges
- **Engagement System**: 
  - Emoji reaction system (👍, ❤️, 🎉, 👏, 💯, 🚀, etc.)
  - Real-time reaction counts
  - User interaction tracking
- **Media Management**:
  - Image and video upload support
  - Media grid display with lightbox viewing
  - Thumbnail generation and optimization
- **Post Management**: Edit and delete functionality with proper permissions

#### Calendar & Events
- **Event Calendar**: Interactive calendar widget with:
  - Monthly view with event indicators
  - Event creation and management
  - Event type categorization
  - Date-based event filtering
- **Motivational Quotes**: Daily rotating inspirational content

### 📄 Document Management
- **Company Documents**: Centralized document repository with:
  - Document categorization and tagging
  - Google Drive integration for file storage
  - Search and filter capabilities
  - Creation date and author tracking
  - Direct file access links
- **Training Materials**: Comprehensive learning resources including:
  - **Awareness Campaigns**: Visual campaign materials with image carousel
  - **Training Videos**: Categorized video library with:
    - Category filtering (Security, Technology, Professional Development, etc.)
    - Skill level classification (Beginner/Intermediate/Advanced)
    - YouTube and Google Drive video integration
    - Thumbnail generation and preview
    - Search functionality across titles and descriptions

### 🎓 Training & Awareness
- **Awareness Campaigns**: 
  - Image-based campaign carousel
  - Auto-rotating slideshow with manual navigation
  - Campaign management (Add/Edit/Delete)
  - File upload for campaign images
- **Training Video Library**:
  - Multi-category organization
  - Skill level progression tracking
  - Video thumbnail and description display
  - Direct video playback integration
  - Advanced search and filtering

### 🎫 Support System
- **Gmail Integration**: Seamless ticket creation through:
  - Pre-formatted email templates
  - Automatic recipient addressing (support@company.com)
  - Structured ticket format with priority levels
- **Contact Information**: Multiple support channels including:
  - Department-specific contact details
  - Phone and email support options
  - Office hours and availability
  - Emergency contact procedures

### 🤖 AI Integration
- **Chatbot Interface**: AI-powered support assistant with:
  - Context-aware responses
  - Session management
  - Chat history persistence
  - Expandable/collapsible interface
  - Integration with FAQ system

### 🏢 Company Information
- **About Us Page**: Comprehensive company overview featuring:
  - Company mission, vision, and values
  - Leadership team profiles with photos and bios
  - Company statistics and milestones
  - Contact information and office details
  - Core values presentation

## 🎨 Design System

### Visual Design
- **Modern UI/UX**: Clean, professional interface design
- **Consistent Branding**: Unified color scheme and typography
- **Responsive Layout**: Mobile-first design approach
- **Accessibility**: WCAG-compliant design patterns
- **Micro-interactions**: Smooth animations and hover effects

### Color Palette
- **Primary**: Red gradient (#DC2626 to #B91C1C)
- **Secondary**: Gray scale (#F8FAFC to #1F2937)
- **Accent Colors**: Status-specific colors for different content types
- **Semantic Colors**: Success, warning, error, and info states

### Typography
- **Font System**: System font stack for optimal performance
- **Hierarchy**: Clear heading and body text differentiation
- **Line Spacing**: Optimized for readability (150% body, 120% headings)
- **Font Weights**: Maximum of 3 weights for consistency

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Mobile Features
- **Collapsible Navigation**: Mobile-friendly menu system
- **Touch Interactions**: Optimized for touch devices
- **Swipe Gestures**: Carousel and media navigation
- **Adaptive Layouts**: Content reflow for smaller screens

## 🔧 Backend Integration Requirements

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'support', 'user', 'unassigned')),
  division VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  profile_photo TEXT,
  birthday DATE,
  date_hired DATE,
  address TEXT,
  bio TEXT,
  phone_number VARCHAR(20),
  department VARCHAR(100),
  job_title VARCHAR(100),
  service_phone_number VARCHAR(20),
  immediate_superior VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### FAQs Table
```sql
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('policies', 'it-systems', 'hardware', 'network')),
  tags TEXT[], -- Array of tags
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Announcements Table
```sql
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('alert', 'memo')),
  target_audience VARCHAR(255) DEFAULT 'All Employees',
  validity_date TIMESTAMP NOT NULL,
  attachments TEXT[], -- Array of file URLs
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### System Updates Table
```sql
CREATE TABLE system_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('information', 'advisory', 'maintenance', 'security')),
  classification VARCHAR(20) DEFAULT 'internal' CHECK (classification IN ('internal', 'external')),
  severity VARCHAR(20) DEFAULT 'medium' CHECK (severity IN ('high', 'medium', 'low')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'scheduled')),
  date TIMESTAMP NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Documents Table
```sql
CREATE TABLE other_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_name VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  file_url TEXT NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Training Materials Table
```sql
CREATE TABLE training_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL CHECK (type IN ('awareness-campaign', 'training-video')),
  -- Awareness campaign fields
  title VARCHAR(500),
  image_url TEXT,
  -- Training video fields
  category VARCHAR(100),
  level VARCHAR(20) CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  video_title VARCHAR(500),
  video_description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  -- Common fields
  created_by VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Spotlight Posts Table
```sql
CREATE TABLE spotlight_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  tags TEXT[], -- Array of tags
  media JSONB, -- Array of media objects
  reactions JSONB DEFAULT '{}', -- Object with emoji keys and user ID arrays
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/refresh` - Refresh authentication token

#### FAQs
- `GET /api/faqs` - Get all FAQs with filtering
- `GET /api/faqs/:id` - Get specific FAQ
- `POST /api/faqs` - Create new FAQ (Admin/Support)
- `PUT /api/faqs/:id` - Update FAQ (Admin/Support)
- `DELETE /api/faqs/:id` - Delete FAQ (Admin/Support)

#### Announcements
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create announcement (Admin/Support)
- `PUT /api/announcements/:id` - Update announcement (Admin/Support)
- `DELETE /api/announcements/:id` - Delete announcement (Admin/Support)

#### System Updates
- `GET /api/system-updates` - Get all system updates
- `POST /api/system-updates` - Create system update (Admin/Support)
- `PUT /api/system-updates/:id` - Update system update (Admin/Support)
- `DELETE /api/system-updates/:id` - Delete system update (Admin/Support)

#### Documents
- `GET /api/documents` - Get all documents
- `POST /api/documents` - Create document (Admin/Support)
- `PUT /api/documents/:id` - Update document (Admin/Support)
- `DELETE /api/documents/:id` - Delete document (Admin/Support)

#### Training Materials
- `GET /api/training-materials` - Get all training materials
- `POST /api/training-materials` - Create training material (Admin/Support)
- `PUT /api/training-materials/:id` - Update training material (Admin/Support)
- `DELETE /api/training-materials/:id` - Delete training material (Admin/Support)

#### Spotlight Posts
- `GET /api/spotlight-posts` - Get all posts
- `POST /api/spotlight-posts` - Create post (Admin/Support)
- `PUT /api/spotlight-posts/:id` - Update post (Admin/Support)
- `DELETE /api/spotlight-posts/:id` - Delete post (Admin/Support)
- `POST /api/spotlight-posts/:id/react` - Add/remove reaction

#### File Upload
- `POST /api/upload` - Upload files (images, documents, videos)
- `DELETE /api/upload/:filename` - Delete uploaded file

### Backend Technology Recommendations

#### Option 1: Node.js + Express
```javascript
// Example Express.js setup
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// File upload configuration
const upload = multer({ dest: 'uploads/' });

// Authentication middleware
const authenticateToken = (req, res, next) => {
  // JWT verification logic
};

// Example route
app.get('/api/faqs', authenticateToken, async (req, res) => {
  // Database query logic
});
```

#### Option 2: Python + FastAPI
```python
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/faqs")
async def get_faqs(db: Session = Depends(get_db)):
    # Database query logic
    pass
```

#### Option 3: Supabase (Recommended)
- **Database**: PostgreSQL with Row Level Security
- **Authentication**: Built-in auth with JWT
- **File Storage**: Integrated file storage
- **Real-time**: WebSocket support for live updates
- **API**: Auto-generated REST and GraphQL APIs

### File Storage Solutions
- **AWS S3**: Scalable cloud storage
- **Google Cloud Storage**: Google Drive integration
- **Supabase Storage**: Integrated with Supabase backend
- **Cloudinary**: Image and video optimization

### Email Integration
- **SendGrid**: Transactional email service
- **AWS SES**: Amazon email service
- **Nodemailer**: SMTP email sending
- **Gmail API**: Direct Gmail integration

## 🚀 Deployment Options

### Frontend Deployment
- **Netlify**: Automatic deployments from Git (Current)
- **Vercel**: Optimized for React applications
- **AWS S3 + CloudFront**: Scalable static hosting
- **GitHub Pages**: Free hosting for public repositories

### Backend Deployment
- **Heroku**: Easy deployment with add-ons
- **AWS EC2**: Scalable cloud computing
- **DigitalOcean**: Developer-friendly cloud platform
- **Railway**: Modern deployment platform
- **Supabase**: Managed backend-as-a-service

## 🔒 Security Considerations

### Frontend Security
- **Input Validation**: Client-side validation for all forms
- **XSS Prevention**: Sanitized user inputs and outputs
- **CSRF Protection**: Token-based request validation
- **Secure Storage**: Encrypted local storage for sensitive data

### Backend Security Requirements
- **Authentication**: JWT-based authentication with refresh tokens
- **Authorization**: Role-based access control (RBAC)
- **Data Validation**: Server-side input validation and sanitization
- **Rate Limiting**: API request throttling
- **HTTPS**: SSL/TLS encryption for all communications
- **Database Security**: Parameterized queries, connection encryption

## 📊 Performance Optimization

### Current Optimizations
- **Code Splitting**: Lazy loading of route components
- **Image Optimization**: Responsive images with proper sizing
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Browser caching for static assets

### Backend Performance Requirements
- **Database Indexing**: Proper indexing for search queries
- **Caching**: Redis for session and data caching
- **CDN**: Content delivery network for static assets
- **Database Connection Pooling**: Efficient database connections

## 🧪 Testing Strategy

### Frontend Testing (To Implement)
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Cypress for user flow testing
- **Accessibility Tests**: axe-core for WCAG compliance

### Backend Testing Requirements
- **Unit Tests**: API endpoint testing
- **Integration Tests**: Database interaction testing
- **Load Testing**: Performance under high traffic
- **Security Testing**: Vulnerability assessment

## 📈 Analytics & Monitoring

### Recommended Implementation
- **User Analytics**: Google Analytics or Mixpanel
- **Error Tracking**: Sentry for error monitoring
- **Performance Monitoring**: Web Vitals tracking
- **Usage Analytics**: Feature usage tracking

### Backend Monitoring
- **Application Monitoring**: New Relic or DataDog
- **Database Monitoring**: Query performance tracking
- **Server Monitoring**: CPU, memory, and disk usage
- **Log Management**: Centralized logging system

## 🔄 Migration Strategy

### From Demo to Production
1. **Backend Setup**: Implement chosen backend solution
2. **Database Migration**: Transfer demo data to production database
3. **Authentication Integration**: Replace demo auth with real authentication
4. **File Storage**: Implement proper file upload and storage
5. **Email Integration**: Set up transactional email service
6. **Testing**: Comprehensive testing of all features
7. **Deployment**: Production deployment with monitoring

### Data Migration Script Example
```javascript
// Example migration script
const migrateData = async () => {
  const demoData = JSON.parse(localStorage.getItem('demo_data'));
  
  for (const item of demoData.faqs) {
    await fetch('/api/faqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
  }
};
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting consistency
- **Conventional Commits**: Standardized commit messages

## 📞 Support & Contact

For questions, issues, or contributions:
- **Email**: support@company.com
- **Documentation**: This README file
- **Issues**: GitHub Issues (if applicable)

## 📄 License

This project is proprietary software developed for internal use. All rights reserved.

---

**Note**: This is a demo application with mock data stored in localStorage. For production use, implement proper backend integration following the guidelines above.