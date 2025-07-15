# Dream's Exit (梦的出口)

**[中文](README.md) | [English](README_EN.md)**

A poetic memory recording and emotional sharing platform that makes precious memories eternal and allows fleeting emotions to resonate.

## 🌟 Project Introduction

"Dream's Exit" is a poetic personal emotional space, inspired by the cherishing of beautiful memories and the longing for emotional resonance. As the lyrics say: "Memories are too beautiful, so people are nostalgic." This provides a safe and private haven for everyone.

## ✨ Core Features

### 🔖 Chronoscroll
- **Private Memory Recording Space**: Create your own "mirage"
- **Multimedia Support**: Perfect combination of text, images, and background music
- **Elegant Interface**: Beautiful card-style layout with preview and detailed viewing
- **Editing Function**: Modify and improve your memories anytime
- **Personal Exclusive**: Each user has their own independent memory space

### 🎭 Echo Gallery
- **Anonymous Emotional Sharing**: Express freely like "butterflies dancing in the sky"
- **Ephemeral Nature**: All echoes automatically disappear after 24 hours
- **Real-time Updates**: View the latest emotional echoes
- **Silent Resonance**: Find comfort in others' emotions
- **Aesthetic of Transience**: Experience the poetry of "things remain, people change"

## 🛠 Tech Stack

- **Frontend Framework**: React Router v7
- **Package Manager**: pnpm
- **Database**: Supabase (PostgreSQL)
- **Styling Framework**: Tailwind CSS
- **Icon Library**: Lucide React
- **Date Handling**: date-fns
- **Deployment**: Multiple deployment options supported

## 🚀 Quick Start

### 1. Clone the Project
```bash
git clone https://github.com/zym9863/dreams-exit.git
cd dreams-exit
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Configuration
Create a `.env` file and configure Supabase information:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start Development Server
```bash
pnpm dev
```

Visit http://localhost:5173 to experience the application.

## 📊 Database Structure

### Chronoscroll Entries Table (chronoscroll_entries)
```sql
- id: UUID (Primary Key)
- title: VARCHAR(255) (Title)
- content: TEXT (Content)
- image_url: TEXT (Image URL)
- music_url: TEXT (Music URL)
- music_title: VARCHAR(255) (Music Title)
- created_at: TIMESTAMP (Creation Time)
- updated_at: TIMESTAMP (Update Time)
- user_id: UUID (User ID)
```

### Echo Gallery Table (echo_entries)
```sql
- id: UUID (Primary Key)
- content: TEXT (Content)
- created_at: TIMESTAMP (Creation Time)
- expires_at: TIMESTAMP (Expiration Time, 24 hours later)
```

## 🎨 Design Philosophy

### Visual Design
- **Gradient Background**: Dreamy gradient from purple to blue
- **Glass Morphism**: Frosted glass effect card design
- **Starry Elements**: Dynamic star points create night sky atmosphere
- **Elegant Animation**: Smooth transitions and hover effects

### Interactive Experience
- **Intuitive Navigation**: Clear functional zoning
- **Responsive Design**: Adapts to various device sizes
- **Loading States**: Elegant loading animations
- **Error Handling**: Friendly error messages

## 🔐 Privacy Protection

- **Local User ID**: Uses localStorage to generate random user identifiers
- **Anonymous Echoes**: Echo Gallery is completely anonymous
- **Data Security**: Supabase provides enterprise-level security
- **Auto Cleanup**: Expired echoes are automatically deleted

## 📱 Feature Highlights

### Chronoscroll
- ✅ Create, edit, and delete memories
- ✅ Image preview and music playback
- ✅ Elegant timeline display
- ✅ Responsive grid layout

### Echo Gallery
- ✅ Anonymous emotional echo sending
- ✅ Real-time remaining time display
- ✅ Automatic expiration cleanup
- ✅ Character limit and input validation

## 🚢 Deployment Instructions

### Production Build
```bash
pnpm build
```

### Start Production Server
```bash
pnpm start
```

### Docker Deployment
The project includes a Dockerfile for containerized deployment.

## 🤝 Contributing Guidelines

Welcome to submit Issues and Pull Requests to improve this project.

## 📄 License

This project is licensed under the MIT License.

## 💫 Poetic Note

> "Memories are too beautiful, so people are nostalgic"
> "Who is not a tearful observer, a witness to the changes of things and people"

In this rapidly changing world, we need a place to preserve those precious moments, and a space to express those indescribable emotions. Dream's Exit was born for such needs.

May everyone find their own poetic corner here. ✨