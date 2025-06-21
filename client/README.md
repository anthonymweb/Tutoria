# Tutoring Platform Client

This is the client-side application for the tutoring platform, built with React and Tailwind CSS.

## Features

- User authentication (login/register)
- Role-based access control (student/tutor/admin)
- Session management
- Profile management
- Payment processing
- Analytics dashboard
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create a `.env` file in the root directory with the following variables:
```
REACT_APP_API_URL=http://localhost:3002
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Project Structure

```
src/
  ├── components/         # Reusable components
  │   ├── admin/         # Admin-specific components
  │   ├── auth/          # Authentication components
  │   └── ...
  ├── contexts/          # React contexts
  ├── hooks/             # Custom hooks
  ├── utils/             # Utility functions
  ├── App.js            # Main application component
  └── index.js          # Application entry point
```

## Dependencies

- React
- React Router
- Axios
- Tailwind CSS
- date-fns
- recharts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 