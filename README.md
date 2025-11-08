# LeapScholar AI Profile Evaluation Agent

A Next.js prototype for an AI-powered university matching platform that helps students find their perfect study abroad destination through an interactive conversation interface.

## Features

- 🎯 **Landing Page**: Trust-building design with clear value proposition and social proof
- 💬 **AI Agent Interface**: Conversational UI that collects user preferences through smart questions
- 🎓 **University Matches**: Personalized results with match scores, rankings, and detailed information
- 🔍 **Filters & Sorting**: Refine results by country, ranking, and tuition
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ✨ **Smooth Animations**: Polished interactions and transitions throughout

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (Icons)
- **Framer Motion** (Animations)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd leapscholar-ai-profile-evaluator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── page.tsx              # Landing page
│   ├── evaluate/
│   │   └── page.tsx          # AI agent conversation interface
│   ├── results/
│   │   └── page.tsx          # University matches results
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Landing/              # Landing page components
│   ├── Agent/                # AI agent components
│   ├── Results/              # Results page components
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── profileAgent.ts       # Question flow logic
│   └── mockData.ts           # Sample university data
└── types/
    └── index.ts              # TypeScript interfaces
```

## Key Pages

### Landing Page (`/`)
- Hero section with value proposition
- Trust signals and testimonials
- How it works section
- Features showcase
- Call-to-action sections

### Evaluation Page (`/evaluate`)
- Interactive chat interface
- Progress tracking
- Smart question flow (8 questions)
- Multiple input types (multiple choice, multi-select, text)

### Results Page (`/results`)
- Personalized university matches
- Match scores and rankings
- Detailed university cards
- Filters and sorting
- Export and share options

## Customization

### Adding More Questions
Edit `lib/profileAgent.ts` to add or modify questions in the evaluation flow.

### Updating University Data
Modify `lib/mockData.ts` to add more universities or update existing ones.

### Styling
Tailwind CSS classes are used throughout. Modify `tailwind.config.ts` to customize the design system.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

Build the production bundle:
```bash
npm run build
npm start
```

## Design Notes

See [DESIGN_NOTES.md](./DESIGN_NOTES.md) for detailed UX decisions and design rationale.

## Future Enhancements

- Backend integration for real AI matching
- User authentication and profile saving
- Detailed university pages
- Application tracking
- Scholarship matching
- Visa guidance
- Counselor chat integration

## License

This is a prototype project for demonstration purposes.

## Contact

For questions or feedback, please contact the LeapScholar team.
