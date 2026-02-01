# PlayStation Pulse PSFree Host 7.xx-9.xx

A modern, redesigned PlayStation 4 jailbreak host for firmware 7.xx-9.xx with multi-version GoldHEN support. This project features a complete visual overhaul of the original PSFree exploit, with a sleek dark theme optimized for PS4 browsers, version selection system, and an extensive collection of homebrew payloads.

## 🎮 Features

- **Extended Firmware Support**: Now supports PS4 firmware 7.00 through 9.60
- **Version Selection System**: Choose between GoldHEN v2.4b18.7 (Latest) or v2.4b18.5 (Stable)
- **Modern Dark Theme**: Sleek PlayStation-inspired design with gradient backgrounds and purple/pink accents
- **PS4 Browser Optimized**: Lightweight and fast-loading interface designed specifically for PS4 Fat and higher
- **Dual GoldHEN Support**: Both latest and stable GoldHEN versions with separate caching systems
- **13 Homebrew Payloads**: Comprehensive collection of essential PS4 homebrew tools
- **PSFree Fix**: Dedicated payload to resolve common PSFree exploit issues
- **Dual Loading System**: Local GoldHEN BinLoader support with online fallback
- **Isolated Caching**: Each GoldHEN version caches only its required files
- **Auto-Activation**: Automatic exploit activation in offline mode
- **Responsive Design**: Works on all screen sizes with touch-friendly interface

## 🔧 Supported Firmware Versions

### PlayStation 4 Firmware 7.xx
- 7.00, 7.01, 7.02
- 7.50, 7.51, 7.55

### PlayStation 4 Firmware 8.xx
- 8.00, 8.01, 8.03
- 8.50, 8.52

### PlayStation 4 Firmware 9.xx
- 9.00, 9.03, 9.04
- 9.50, 9.51, 9.60

## 📦 Included Payloads (13 Total)

### 🔧 System Fixes & Debugging
- **PSFree Fix**: Resolves common issues with PSFree exploit execution
- **PS4Debug**: Remote debugging tool for homebrew development
- **WebRTE**: Real-time editing features for advanced users

### 📁 File Management & Transfer
- **FTP Server**: Start FTP server for wireless file access and transfer
- **App2USB**: Transfer installed applications to USB storage
- **Backup**: Backup system data and databases to USB drive
- **Restore**: Restore system data and databases from USB backup

### 🔄 System Updates & Cache
- **Disable Updates**: Block PlayStation system updates
- **Enable Updates**: Re-enable PlayStation system updates  
- **AppCache Install**: Install and manage application cache files

### 🔐 Security & Privacy
- **History Blocker**: Block browser history tracking and data collection
- **RIF Renamer**: Manage and rename license (RIF) files
- **PUP Decrypt**: Decrypt PlayStation update (PUP) files for analysis

## 🚀 Installation & Usage

1. **Setup Web Server**: Host these files on a local web server or use online hosting
2. **Access via PS4**: Open the PS4 browser and navigate to your host URL
3. **Version Selection**: Choose your preferred GoldHEN version:
   - **GoldHEN v2.4b18.7 (Latest)**: Newest features and improvements
   - **GoldHEN v2.4b18.5 (Stable)**: Proven reliability and stability
4. **Cache Loading**: Selected version files will be cached for offline use
5. **Auto-Jailbreak**: The exploit automatically activates in offline mode
6. **Load Payloads**: Once jailbroken, select desired payloads from the interface

### 🔄 Version Selection Benefits

- **Isolated Systems**: Each version has its own complete file set and cache
- **No Cross-Contamination**: Switching versions won't affect cached files
- **Optimized Loading**: Only necessary files are cached per version
- **Fallback Options**: Use stable version if latest has issues

### 🔄 Payload Loading Methods

- **Local Loading**: Payloads are automatically sent to GoldHEN BinLoader if available
- **Online Fallback**: If BinLoader is unavailable, payloads switch to online loading mode
- **Confirmation Dialogs**: Each payload requests user confirmation before loading
- **Status Messages**: Real-time feedback on payload loading status

## 🎨 Design Features

- **Version Selection Interface**: Beautiful card-based version selector with hover effects
- **Color Scheme**: Dark gradient backgrounds with purple, blue, and pink accents
- **Typography**: Modern Inter font family for excellent readability
- **Interactive Elements**: Card-based design with full-area click functionality
- **Animations**: Subtle floating geometric shapes and smooth transitions
- **Compact Layout**: Optimized for quick navigation and minimal scrolling
- **Glassmorphism**: Backdrop blur effects for modern UI aesthetics
- **Visual Feedback**: Color-coded version badges and hover states

## 🛠️ Technical Details

- **Exploit Base**: PSFree 1.6 with Lapse Auto GoldHEN
- **Multi-Version Architecture**: Separate file sets for each GoldHEN version
- **Cache System**: Dual application cache manifests (PSPulse.manifest & PSPulse5.manifest)
- **Browser Compatibility**: Optimized for PS4's WebKit-based browser
- **Performance**: Minimal resource usage for stable operation on PS4 hardware
- **Payload System**: Dual-mode loading with automatic fallback mechanisms
- **Error Handling**: Comprehensive error catching and user feedback
- **Memory Management**: Optimized payload execution through thread management
- **Offline Auto-Activation**: Automatic exploit execution without user intervention

## 🎯 Browser Compatibility

- ✅ PlayStation 4 Fat Browser
- ✅ PlayStation 4 Slim Browser  
- ✅ PlayStation 4 Pro Browser
- ✅ Modern Desktop Browsers (for development)

## ⚠️ Important Notes

- **Firmware Check**: Automatically detects and validates PS4 firmware version
- **Safety**: Only use on compatible firmware versions to avoid system damage
- **Backup**: Always backup your system before using homebrew tools
- **Legal**: Use only with legally owned games and software

## 🔗 Credits & Links

- **Author**: [BlackArch](https://t.me/sudoBlackArch)
- **Telegram Community**: [PlayStation Pulse](https://t.me/PlayStation_Pulse)
- **PSFree Base**: Original PSFree exploit framework

## 📱 Community

Join our Telegram community for:
- Latest updates and releases
- Technical support and troubleshooting
- Latest FC 26 squads for PS4 | PS5
- PlayStation homebrew discussions
- Beta testing opportunities

## 🔄 Changelog

### v5.0 (Current)
- **🆕 Extended Firmware Support**: Added support for PS4 firmware 7.00-8.52
- **🔧 New Kernel Patches**: Added 700.bin, 750.bin, 800.bin, 850.bin for 7.xx-8.xx
- **📝 New Lapse Configs**: Added firmware offset files for 7.00-8.52
- **⚡ New ROP Chains**: Added ROP gadget chains for 7.xx-8.xx firmwares
- **🎯 Dynamic Patch Loading**: Automatic detection of raw binary vs ELF format
- **📦 Updated GoldHEN**: Now includes GoldHEN v2.4b18.7 (Latest)
- **🔄 Manifest Updates**: All new files added to cache manifests

### v4.0
- **🆕 Version Selection System**: Choose between GoldHEN v2.4b18.6 (Latest) or v2.4b18.5 (Stable)
- **🎨 Enhanced UI Design**: Beautiful card-based version selector with purple/pink color scheme
- **🔧 Isolated Caching**: Separate cache systems for each GoldHEN version
- **⚡ Auto-Activation**: Fixed offline mode auto-activation for both versions
- **🎯 Click-Friendly Interface**: Full-area clickable cards without unnecessary buttons
- **📱 Touch Optimized**: Improved mobile and PS4 browser compatibility
- **🔄 Smart File Management**: Version-specific file sets prevent conflicts

### v3.0
- **Major Payload Overhaul**: Added 13 essential homebrew payloads
- **PSFree Fix**: Dedicated payload to resolve exploit issues
- **Dual Loading System**: GoldHEN BinLoader support with online fallback
- **Removed Legacy Payloads**: Cleaned up interface by removing outdated tools
- **Enhanced Error Handling**: Fixed import errors and improved stability
- **Updated UI**: Reorganized payload categories with descriptive tooltips

### v2.0
- Complete UI/UX redesign with modern dark theme
- Optimized for PS4 browser performance
- Updated to GoldHEN v2.4b18.6
- Improved cache system with PSPulse.manifest
- Responsive design for all screen sizes
- Enhanced payload organization and descriptions

## 📄 License

This project is based on the original PSFree exploit and maintains compatibility with the PlayStation 4 homebrew ecosystem. Use responsibly and in accordance with local laws.

## 🚨 Disclaimer

This software is provided for educational and research purposes only. The authors are not responsible for any damage to your console or violation of terms of service. Use at your own risk and ensure you understand the implications of running homebrew software on your PlayStation 4.

---

**Made with ❤️ for the PlayStation Pulse Community**
