# FinQuest

A gamified financial planning app for California teachers enrolled in the CalSTRs retirement plan. Users create an avatar and set goals like an adventure game, helping them visualize their financial future and make better retirement planning decisions.

## Features

- Interactive questionnaire for gathering user information
- Native date pickers for easy date input
- Real-time input validation
- Basic CalSTRs pension calculations
- Avatar-based results visualization
- Progress tracking with visual indicators

## Complete Setup Guide for Mac Users

### Prerequisites Installation

1. **Install Homebrew** (Mac's package manager):
   - Open Terminal (press `Cmd + Space`, type "Terminal", and press Enter)
   - Copy and paste this command:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
   - Follow the prompts in the Terminal
   - After installation, run these commands to add Homebrew to your PATH:
   ```bash
   echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
   eval "$(/opt/homebrew/bin/brew shellenv)"
   ```

2. **Install Git**:
   ```bash
   brew install git
   ```

3. **Install Node.js and npm**:
   ```bash
   brew install node
   ```

### Setting Up the Project

1. **Clone the Repository**:
   ```bash
   cd ~/Documents  # or wherever you want to store the project
   git clone https://github.com/kbergs/finquest.git
   cd finquest
   ```

2. **Install Project Dependencies**:
   ```bash
   npm install
   ```

3. **Install Expo CLI globally**:
   ```bash
   npm install -g expo-cli
   ```

4. **Install Expo Go on Your iPhone**:
   - Open the App Store on your iPhone
   - Search for "Expo Go"
   - Download and install the app

### Running the App

1. **Start the Development Server**:
   ```bash
   npx expo start
   ```

2. **Running on Your iPhone**:
   - Make sure your iPhone and Mac are on the same WiFi network
   - Open the Camera app on your iPhone
   - Scan the QR code shown in the Terminal
   - This will open the app in Expo Go

### Troubleshooting Common Issues

1. **If you see "command not found" for any brew commands**:
   ```bash
   echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
   source ~/.zshrc
   ```

2. **If npm install fails**:
   ```bash
   sudo npm install -g npm@latest  # Update npm
   npm cache clean --force         # Clear npm cache
   ```

3. **If Expo fails to start**:
   ```bash
   npm install -g expo-cli@latest  # Update Expo CLI
   expo doctor --fix-dependencies  # Fix dependencies
   ```

## Development Status

This is a work in progress. Current features include:
- Basic questionnaire flow
- Date validation
- Simple pension calculations
- Results visualization

Upcoming features:
- Avatar customization
- Detailed financial projections
- Premium features
- Investment strategy recommendations

## Tech Stack

- React Native with Expo
- TypeScript
- date-fns for date handling
- react-native-modal-datetime-picker for native date selection

## License

MIT
