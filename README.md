# Internal Support Hub

This project is a comprehensive frontend support platform designed to streamline internal communication and support processes for employees and administrators within an organization. It provides features for managing FAQs, announcements, system updates, company documents, and team collaboration through spotlights.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast frontend build tool that provides a lightning-fast development experience.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Lucide React**: A collection of beautiful and consistent open-source icons for React applications.

## Getting Started

Follow these instructions to set up and run the project locally.

### 1. Open the Project in VS Code

If you have VS Code installed, you can open the project by navigating to the project's root directory in your terminal and running:

```bash
code .
```

### 2. Install Dependencies

Before running the application, you need to install the necessary Node.js packages. Open your terminal in the project's root directory and run:

```bash
npm install
```

### 3. Environment Variables Setup

This project uses environment variables for sensitive information, particularly for Supabase integration. You need to create a `.env` file in the root directory of your project.

Create a file named `.env` and add the following variables:

```
VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

Replace `"YOUR_SUPABASE_URL"` and `"YOUR_SUPABASE_ANON_KEY"` with your actual Supabase project URL and anonymous key.

**Note**: Ensure that `.env` is included in your `.gitignore` file to prevent it from being committed to version control.

### 4. Run the App in Development Mode

Once the dependencies are installed and the `.env` file is set up, you can start the development server:

```bash
npm run dev
```

This command will start the Vite development server, and the application will typically be accessible at `http://localhost:5173`.

## Key Features Location

Here's a quick guide to where some of the key features are located within the project structure:

- **Main Application Routes**: `src/App.tsx`
- **Authentication Context**: `src/contexts/AuthContext.tsx`
- **Application Data Context (FAQs, Announcements, Users, Documents)**: `src/contexts/AppContext.tsx`
- **Team Spotlights**: `src/pages/Spotlights/SpotlightsPage.tsx`
- **Post Management Components**: `src/pages/Spotlights/` directory
- **About Us Page**: `src/pages/about-us/AboutUs.tsx`
- **Company Documents**: `src/pages/documents/OtherDocuments.tsx`
- **Admin Panels (Users, FAQs, Announcements, Updates)**: `src/pages/admin/` directory

## Demo Accounts

The application includes demo accounts for testing different user roles:

- **Admin User**: `admin@company.com` (password: `demo_password`)
- **Support Agent**: `support@company.com` (password: `demo_password`)
- **Regular User**: `user@company.com` (password: `demo_password`)
- **Unassigned User**: `unassigned@company.com` (password: `demo_password`)
- **CTO/Admin**: `CTO@company.com` (password: `demo_password`)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main application layout
│   ├── ChatWidget.tsx  # AI chat integration
├── contexts/           # React context providers
│   ├── AuthContext.tsx # Authentication management
│   └── AppContext.tsx  # Application state management
├── lib/               # Utility functions and storage
│   ├── storage.ts     # Data persistence layer
│   ├── supabase.ts    # Supabase configuration
│   └── mockData.ts    # Demo data and mock content
├── pages/             # Main application pages
│   ├── about-us/      # Company information and leadership
│   ├── admin/         # Admin management panels
│   ├── documents/     # Document management
│   ├── Spotlights/    # Team collaboration and highlights
└── types/             # TypeScript type definitions
```

## Features

### 🔐 **Authentication & Access Control**
- **Role-Based Access Control**: Admin, Support, User, and Unassigned roles
- **Secure Login System**: Email/password authentication with demo accounts
- **Permission Management**: Feature access based on user roles
- **Unassigned User Flow**: Dedicated page for users awaiting role assignment

### 📋 **Content Management**
- **FAQ Management**: Categorized frequently asked questions with search functionality
- **Announcements**: Company-wide announcements and memos with attachment support
- **System Updates**: IT system updates and maintenance notifications with media
- **Document Management**: Company documents, forms, and templates

### 👥 **Team Collaboration**
- **Team Spotlights**: Social feed for team updates, achievements, and highlights
  - **Post Creation**: Rich text posts with tags and media attachments (Admin/Support only)
  - **Interactive Reactions**: Emoji-based reaction system for all users
  - **Media Support**: Image and video uploads with lightbox viewing
  - **Post Management**: Edit and delete functionality with proper permissions
  - **Real-time Engagement**: Live reaction counts and user interactions

- **About Us**: Company overview, mission, vision, and leadership information

### 🎫 **Support System**
- **Support Ticketing**: Internal support request system with categorization
- **Contact Support**: Multiple contact methods and department-specific contacts
- **AI Chat Integration**: Botpress-powered chat assistance

### 📊 **Administrative Tools**
- **User Management**: Add, edit, and manage user accounts with role assignment
- **Content Administration**: Manage FAQs, announcements, and system updates
- **Analytics Dashboard**: Overview of platform usage and content metrics

### 📱 **User Experience**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Sticky Footer**: Consistent footer placement across all pages
- **Interactive Navigation**: Dropdown menus and breadcrumb navigation
- **Search Functionality**: Global search across content types
- **Filter Systems**: Advanced filtering for documents, users, and content
- **Loading States**: Proper feedback for user actions and data loading

### 🎨 **Design System**
- **Consistent Branding**: Unified color scheme and typography
- **Modern UI Components**: Clean, professional interface design
- **Accessibility**: WCAG-compliant design patterns
- **Micro-interactions**: Smooth animations and hover effects
- **Visual Hierarchy**: Clear information architecture and layout

## Development Notes

- The application uses localStorage for data persistence in development
- All data is reset on page refresh (no persistent database in demo mode)
- The project is designed to be production-ready with proper database integration
- Responsive design optimized for desktop and mobile devices
- Role-based feature access ensures proper security and user experience
- Modular component architecture for easy maintenance and extension

## Deployment

The application is deployed and accessible at: https://steady-chebakia-7d2b6a.netlify.app

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Contributing

This project follows modern React development practices with TypeScript for type safety and Tailwind CSS for styling. The codebase is organized into logical modules with clear separation of concerns for maintainability and scalability.