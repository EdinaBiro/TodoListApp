# TodoListApp 📝

A modern todo application built with React Native and Expo. Manage your tasks efficiently with a beautiful, intuitive interface.

## 📱 Screenshots

<p float="left">
  <img src="./assets/screenshots/home.png" width="30%" />
  <img src="./assets/screenshots/add-task.png" width="30%" />
  <img src="./assets/screenshots/favorites.png" width="30%" />
</p>

## ✨ Features

- **Task Management**: Create, complete, and delete tasks with ease
- **Favorites System**: Mark important tasks as favorites with star ratings
- **Visual Feedback**: Smooth animations and visual indicators for completed tasks
- **Progress Tracking**: Real-time progress bar showing completion percentage
- **Organized Display**: Separate sections for active and completed tasks
- **Persistent Storage**: All tasks are saved locally using AsyncStorage
- **Beautiful Animations**: Lottie animations for enhanced user experience
- **Responsive Design**: Optimized for both iOS and Android devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (install globally: `npm install -g expo-cli`)
- iOS Simulator (for Mac users) or Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd TodoListApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on your preferred platform:
   - **iOS**: Press `i` in the terminal or scan QR code with Camera app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal to open in browser

## 🛠️ Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript development
- **AsyncStorage**: Local data persistence
- **Lottie React Native**: Beautiful animations
- **Expo Vector Icons**: Icon library
- **Expo Linear Gradient**: Gradient effects

## 📁 Project Structure

```
TodoListApp/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── AddTaskModal.tsx  # Modal for adding new tasks
│   │   ├── TaskItem.tsx      # Individual task component
│   │   └── TaskList.tsx      # Task list container
│   ├── screens/
│   │   └── HomeScreen.tsx    # Main application screen
│   ├── services/
│   │   └── storage.ts        # AsyncStorage service layer
│   ├── types/
│   │   └── Task.ts          # TypeScript type definitions
│   └── utils/               # Utility functions and constants
├── assets/                  # Images, animations, and static files
├── App.tsx                 # Root application component
├── package.json
└── app.json               # Expo configuration
```

### Data Persistence
All tasks are stored locally using AsyncStorage, ensuring:
- No data loss between app sessions
- Offline functionality
- Fast loading times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- None currently reported

## 🚧 Future Enhancements

- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Cloud synchronization
- [ ] Dark mode support
- [ ] Task search and filtering
- [ ] Export/import functionality

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include screenshots if applicable

---

Made with ❤️ using React Native and Expo
