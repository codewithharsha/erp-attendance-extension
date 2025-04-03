
# 📊 Attendance Predictor - Chrome Extension

A lightweight **Chrome extension** designed to help students track and predict their attendance, ensuring they maintain a minimum required percentage (e.g., 75%). This tool calculates how many classes you can miss while staying above the threshold and provides a detailed analysis of attendance scenarios.

---

## 🚀 Features

- ✅ **Fetches current attendance data** from Chrome storage (ERP integration placeholder)
- ✅ **Customizable periods per day** with persistent storage
- ✅ **Calculates maximum allowed absences** to maintain 75% attendance
- ✅ **Detailed analysis table** showing attendance percentages for different absence scenarios
- ✅ **Professional popup notifications** in the top-right corner
- ✅ **Color-coded messages**: Green for success, Red for errors/warnings
- ✅ **Auto-closing alerts** after 3 seconds
- ✅ **Responsive and user-friendly UI**

---
```markdown
 📂 Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/codewithharsha/erp-attendance-extenstion.git
   cd erp-attendance-extenstion
   ```

2. **Load the extension in Chrome**
   - Open `chrome://extensions/` in your browser
   - Enable **Developer Mode** (toggle in the top-right corner)
   - Click **"Load Unpacked"**
   - Select the `erp-attendance-extenstion` folder

3. **Configure your manifest.json** (ensure it includes `"storage"` permission)

---

## 🛠️ Technologies Used

- **HTML5 & CSS3**: Structured UI with inline styling
- **JavaScript (ES6)**: Core logic and DOM manipulation
- **Chrome Storage API**: Persistent data storage for user settings

---

## 🔧 Usage Guide

1. **Set Periods Per Day**: Enter the number of periods per day and click **"Save"**.
2. **Input Date Range**: Select the **Start Date** and **End Date** for the prediction period.
3. **Specify Holidays**: Enter the number of holidays in the selected period.
4. **Calculate**: Click **"Calculate"** to see how many classes you can miss while maintaining 75% attendance.
5. **View Analysis**: Click **"View Detailed Analysis"** for a table of attendance percentages based on absences.

---

## 📌 Popup Notification System

- 💡 **Success Messages**: Displayed in **green** (e.g., "Periods per day saved successfully.")
- ❌ **Error/Warning Messages**: Displayed in **red** (e.g., "Error: Enter a valid number of periods per day (> 0).")
- 📍 **Position**: Top-right corner of the popup
- ⏱️ **Duration**: Auto-closes after **3 seconds** with a smooth fade effect

---

## 🎨 UI Preview

![Attendance Predictor UI](screenshots/preview.png)  
*Replace `screenshots/preview.png` with the actual path to your screenshot after adding it to the repo.*

---

## 📋 Project Structure

```
attendance-predictor/
├── icons
  ├── icon16.png
  ├── icon48.png
  ├── icon128.png
├── popup.html
├── popup.js 
├── styles.css 
├── manifest.json     
├── background.js
└── README.md         # Project documentation
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a new branch**
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes and commit**
   ```sh
   git commit -m "Add your feature description"
   ```
4. **Push to your fork**
   ```sh
   git push origin feature/your-feature-name
   ```
5. **Submit a Pull Request**

---

## 📧 Contact

- 🔗 **GitHub**: [Your GitHub Profile](https://github.com/codewithharsha)
- 📩 **Email**: mharsha22122002@gmail.com

---

## ⭐ Support

If you find this project helpful, please give it a ⭐ on GitHub! Feedback and suggestions are always appreciated.

---

🚀 **Happy attendance tracking!**
