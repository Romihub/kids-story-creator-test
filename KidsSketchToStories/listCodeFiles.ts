const { readdirSync, statSync } = require("fs");
const { join, dirname } = require("path");
import { fileURLToPath } from "url";

// Get directory name for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define your project's source folder (update if needed)
const projectDir = join(__dirname, "src");

// Define functionality categories based on keywords
const categories: { [key: string]: string[] } = {
  drawing: ["draw", "canvas", "sketch", "paint"],
  camera: ["camera", "photo", "capture", "imagePicker"],
  auth: ["auth", "login", "signup", "register", "session"],
  pricing: ["pricing", "payment", "subscription", "revenue"],
  subscription: ["subscription", "billing", "plan", "stripe"],
};

// Function to recursively list files by category
function listFilesByCategory(dir: string, fileList: { [key: string]: string[] } = {}): { [key: string]: string[] } {
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
Object.entries(categorizedFiles).forEach(([category, files]) => {
  console.log(`📂 **${category.toUpperCase()}**`);
  files.forEach((file) => console.log(`   - ${file}`));
  console.log("\n");
});