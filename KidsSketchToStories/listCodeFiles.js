const { readdirSync, statSync, mkdirSync, copyFileSync, existsSync } = require('fs');
const { join, basename } = require('path');

// Define your project's source folder (update if needed)
const projectDir = join(__dirname, "src");

// Define functionality categories based on keywords
const categories = {
  //drawing: ["draw", "canvas", "sketch", "paint"],
  navigator: ["navigator", "navigation", "router", "route", "stack", "redirect", "link", "store", "Appdispatch", "NavigationProps"],
  screen: ["screen", "display", "monitor", "view"],
  home: ["home", "landing", "welcome", "index", "Highlights", "hero", "Started", "theme", "creation"],
  //profile: ["profile", "user", "account", "settings"],
  //dashboard: ["dashboard", "admin", "control", "panel"],
  //camera: ["camera", "photo", "capture", "imagePicker"],
  //auth: ["auth", "login", "signup", "register", "session"],
  //pricing: ["pricing", "payment", "subscription", "revenue"],
  //subscription: ["subscription", "billing", "plan", "stripe"],
};

// Function to recursively list files by category
function listFilesByCategory(dir, fileList = {}) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      listFilesByCategory(fullPath, fileList); // Recursively scan subdirectories
    } else {
      Object.keys(categories).forEach((category) => {
        if (categories[category].some((keyword) => file.toLowerCase().includes(keyword))) {
          if (!fileList[category]) fileList[category] = [];
          fileList[category].push(fullPath);
        }
      });
    }
  });

  return fileList;
}

// Run the script and display categorized files
const categorizedFiles = listFilesByCategory(projectDir);

console.log("\n🚀 **Code Files Categorized by Functionality** 🚀\n");
// Create categorized_files directory and copy files
const outputBaseDir = join(__dirname, 'categorized_files');
if (!existsSync(outputBaseDir)) {
  mkdirSync(outputBaseDir);
}

Object.entries(categorizedFiles).forEach(([category, files]) => {
  console.log(`📂 **${category.toUpperCase()}**`);
  
  // Create category directory
  const categoryDir = join(outputBaseDir, category);
  if (!existsSync(categoryDir)) {
    mkdirSync(categoryDir);
  }
  
  // Copy files to category directory
  files.forEach((file) => {
    const destFile = join(categoryDir, basename(file));
    try {
      copyFileSync(file, destFile);
      console.log(`   - ${file} -> copied to ${category} folder`);
    } catch (err) {
      console.error(`   - Error copying ${file}: ${err.message}`);
    }
  });
  console.log("\n");
});

console.log(`✅ Files have been copied to: ${outputBaseDir}`);


//cd KidsSketchToStories && node listCodeFiles.js
