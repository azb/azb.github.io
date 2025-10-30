# WebXR App

A simple WebXR application with a ground plane and a floating cube.

## Setup

1. Place your texture files in this directory:
   - `ground.png` - Texture for the ground plane
   - `cubetexture.png` - Texture for the cube

2. Start a local web server (required for WebXR and to avoid CORS errors):

   **Option 1: Python (Recommended)**
   ```bash
   python server.py
   ```
   Or double-click `start-server.bat` (Windows)

   **Option 2: Node.js**
   ```bash
   npx http-server -p 8000 -o
   ```

   **Option 3: PHP**
   ```bash
   php -S localhost:8000
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Requirements

- WebXR-compatible browser (Chrome/Edge with WebXR support enabled)
- HTTPS or localhost (WebXR requires secure context)
- VR headset (optional - for full VR experience)

## Features

- Ground plane (10x10 meters) with `ground.png` texture
- Floating cube (25cm) at origin, 1 meter above ground with `cubetexture.png` texture
- WebXR VR support
- Shadows and lighting
- Responsive design

