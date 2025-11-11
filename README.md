# ProfileMe.dev

![ProfileMe.dev Banner](https://via.placeholder.com/1200x400?text=ProfileMe.dev+-+Create+Amazing+GitHub+Profiles)

ProfileMe.dev helps developers create stunning GitHub profiles in minutes with an intuitive, customizable interface.

## 🚀 Demo

Check out the live version: **[https://www.profileme.dev](https://www.profileme.dev)**

## ✨ Features

### 🎯 Introduction Section
- Showcase your basic information and bio
- Link to your portfolio and notable projects
- Highlight your current focus and achievements

### 🛠️ Skills & Technologies
- **60+ technologies and software icons** to choose from
- Customizable skill display with color and monochrome options
- Easy selection and organization of your tech stack

### 🌐 Social Media Integration
- **18 social media platforms** supported
- Direct linking to all your professional profiles
- Clean, consistent icon presentation

### 📊 Badges & Statistics
- GitHub stats badges and metrics
- Twitter follower counts display
- Twitch streaming status integration
- Visual elements to enhance your profile

### 💖 Support Links
- BuyMeACoffee integration
- Other donation and support platforms
- Professional sponsorship options

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Icons**: Custom SVG implementation
- **Deployment**: Vercel (recommended)

## ⚡ Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/profileme-dev.git
   cd profileme-dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

## 🤝 Contributing

We love your input! We want to make contributing to ProfileMe.dev as easy and transparent as possible.

### Ways to Contribute
- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests

### Getting Started with Contributions

#### 1. Finding Issues
Check out our [Issues tab](https://github.com/your-username/profileme-dev/issues) for open tasks. Look for labels like:
- `good first issue` - Perfect for new contributors
- `help wanted` - Areas where we need assistance
- `bug` - Issues that need fixing

#### 2. Adding New Icons

We're always expanding our technology stack! Here's how to add new icons:

**Step 1: Create SVG Files**
Create three variations (128px × 128px recommended):
- `[iconName]-colored.svg` - Full brand colors
- `[iconName].svg` - Light mode version
- `[iconName]-dark.svg` - Dark mode version

**Step 2: Update Icon Data**
Add your icon to the `iconData` object in `_app.js`:

```json
{
  "name": "Your Technology",
  "path": "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/yourtech-colored.svg",
  "iTag": "yourtech",
  "link": "https://official-website.com"
}
```

**Step 3: Add CSS Styles**
Update `styles/global.css`:

```css
.yourtech {
  @apply bg-[url('https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/yourtech.svg')] dark:bg-[url('https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/yourtech-dark.svg')];
}

.yourtech.colored {
  @apply bg-[url('https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/yourtech-colored.svg')];
}
```

### Pull Request Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **GNU AGPLv3 License** - see the [LICENSE](LICENSE) file for details.

Please review the license terms before making modifications to this project.

## 🆘 Support

If you need help or have questions:
- 📧 Email: support@profileme.dev
- 🐛 Create an [Issue](https://github.com/your-username/profileme-dev/issues)
- 💬 Join our Discord community

## 🙏 Acknowledgments

- Thanks to all our contributors
- Icons provided by various open-source projects
- Built with love for the developer community

---

<div align="center">

**Made with ❤️ for developers everywhere**

[Website](https://profileme.dev) • [GitHub](https://github.com/your-username/profileme-dev) • [Twitter](https://twitter.com/profileme_dev)

</div>
