const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let backendProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  // Load your existing frontend
  win.loadFile(path.join(__dirname, "frontend/index.html"));

}

app.whenReady().then(() => {
  
  // Start Express backend automatically
  backendProcess = spawn("node", ["backend/server.js"], {
    stdio: "inherit",
    shell: true
  });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Kill backend when app quits
app.on("quit", () => {
  if (backendProcess) backendProcess.kill();
});
