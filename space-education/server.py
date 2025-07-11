#!/usr/bin/env python3
"""
Simple HTTP Server for Space Explorer Educational Website
"""

import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = Path(__file__).parent

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add headers to prevent caching during development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 Space Explorer Server Started!")
        print(f"📍 Serving at: http://localhost:{PORT}")
        print(f"📂 Serving directory: {DIRECTORY}")
        print(f"\n✨ Opening browser automatically...")
        print(f"Press Ctrl+C to stop the server\n")
        
        # Automatically open the browser
        webbrowser.open(f'http://localhost:{PORT}')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Server stopped.")
            sys.exit(0)

if __name__ == "__main__":
    main()