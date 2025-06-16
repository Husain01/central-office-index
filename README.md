# Ashara Central Office - MSB

A modern, mobile-first office directory application for Ashara Central Office - MSB, built with Next.js 15 and Tailwind CSS.

## Features

- 📱 **Mobile-First Design** - Optimized for mobile devices with responsive layout
- 🔍 **Real-Time Search** - Search across all offices, departments, and rooms
- 📞 **Direct Contact** - Call or WhatsApp floor heads directly
- 🏢 **Floor Navigation** - Quick navigation between floors with smooth scrolling
- 💾 **Offline Ready** - Static export for reliable offline functionality
- ⚡ **Fast Performance** - Optimized for speed and low bandwidth usage

## Office Coverage

The application includes comprehensive coverage of all floors:

- **Basement** - Computer Lab, Activity Room (ITS facilities)
- **Ground Floor** - Dua Hall, KG A/B, Nursery A/B (Religious and Educational)
- **First Floor** - PRO, Chemistry Lab, Welfare, Transport (Operational departments)
- **Second Floor** - Communications, HR, Finance, Procurement (Administrative)
- **Third Floor** - ITS Office, Development, Allocations (Technical departments)
- **Fourth Floor** - PMO offices, Conference rooms (Executive level)

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Export**: Static site generation for optimal performance

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd central-office-index
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates an optimized static export in the `dist` folder, ready for deployment on any static hosting service.

## Usage

1. **Browse Floors**: Scroll through all floors to see available offices
2. **Quick Navigation**: Use the navigation buttons to jump to specific floors
3. **Search**: Type in the search bar to find specific offices or departments
4. **Contact Floor Heads**: Click the phone or WhatsApp buttons to contact floor supervisors
5. **Floor Plans**: Placeholder buttons are ready for future floor plan integration

## Future Enhancements

- [ ] Floor plan integration with interactive maps
- [ ] PWA functionality for app-like experience
- [ ] Real-time availability status
- [ ] Employee directory integration
- [ ] Multi-language support

## Deployment

This application is designed to be deployed on Vercel's free tier:

1. Connect your GitHub repository to Vercel
2. The static export configuration ensures optimal performance
3. Automatic deployments on every commit

## Contributing

To update office information or add new features:

1. Edit the data in `src/data/offices.ts`
2. Update components in `src/components/` as needed
3. Test thoroughly before deployment

## Contact

For technical support or feature requests, contact the ITS Development team via the application's directory.

---

Built with ❤️ for Ashara Central Office - MSB
