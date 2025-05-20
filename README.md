# Pass the Plate

A Next.js application for sharing food with your community.

## Features

- Modern UI with Tailwind CSS
- TypeScript support
- Form validation with Zod
- Toast notifications
- Responsive design
- Dark mode support
- Map integration with Mapbox

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pass-the-plate.git
cd pass-the-plate
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env.local` file in the root directory and add your Mapbox token:
```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Mapbox](https://www.mapbox.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

## Project Structure

```
pass-the-plate/
├── app/                 # Next.js app directory
├── components/          # React components
├── context/            # React context providers
├── lib/                # Utility functions
├── public/             # Static assets
└── styles/             # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.