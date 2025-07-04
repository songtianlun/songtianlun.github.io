# Personal Portfolio Website Development

# Default target
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  serve     - Start development server on localhost:8000"
	@echo "  serve-alt - Start development server on localhost:3000 (alternative)"
	@echo "  open      - Open website in default browser"
	@echo "  build     - Validate HTML/CSS/JS files"
	@echo "  clean     - Clean temporary files"
	@echo "  deploy    - Deploy to GitHub Pages"
	@echo "  watch     - Watch for file changes and reload browser"
	@echo "  readme    - Generate README.md from projects.json"
	@echo "  test      - Run website tests"

# Development server using Python's built-in HTTP server
.PHONY: serve
serve:
	@echo "Starting development server..."
	@echo "Open http://localhost:8000 in your browser"
	@echo "Press Ctrl+C to stop the server"
	@python3 -m http.server 8000 2>/dev/null || python -m http.server 8000

# Alternative development server using different port
.PHONY: serve-alt
serve-alt:
	@echo "Starting development server on port 3000..."
	@echo "Open http://localhost:3000 in your browser"
	@echo "Press Ctrl+C to stop the server"
	@python3 -m http.server 3000 2>/dev/null || python -m http.server 3000

# Open website in default browser
.PHONY: open
open:
	@echo "Opening website in browser..."
	@if command -v xdg-open > /dev/null; then \
		xdg-open http://localhost:8000; \
	elif command -v open > /dev/null; then \
		open http://localhost:8000; \
	else \
		echo "Please open http://localhost:8000 in your browser"; \
	fi

# Start server and open browser
.PHONY: dev
dev:
	@echo "Starting development environment..."
	@make open &
	@make serve

# Validate files
.PHONY: build
build:
	@echo "Validating project files..."
	@if [ ! -f "index.html" ]; then echo "❌ index.html not found"; exit 1; fi
	@if [ ! -f "style.css" ]; then echo "❌ style.css not found"; exit 1; fi
	@if [ ! -f "script.js" ]; then echo "❌ script.js not found"; exit 1; fi
	@if [ ! -f "projects.json" ]; then echo "❌ projects.json not found"; exit 1; fi
	@echo "✅ All required files found"
	@echo "🔍 Checking JSON syntax..."
	@python3 -m json.tool projects.json > /dev/null && echo "✅ JSON syntax is valid" || echo "❌ JSON syntax error"
	@echo "📊 Project statistics:"
	@echo "  - HTML files: $$(find . -name '*.html' | wc -l)"
	@echo "  - CSS files: $$(find . -name '*.css' | wc -l)"
	@echo "  - JS files: $$(find . -name '*.js' | wc -l)"
	@echo "  - JSON files: $$(find . -name '*.json' | wc -l)"
	@echo "  - Total projects: $$(cat projects.json | grep -o '"name":' | wc -l)"

# Clean temporary files
.PHONY: clean
clean:
	@echo "Cleaning temporary files..."
	@find . -name '.DS_Store' -delete 2>/dev/null || true
	@find . -name 'Thumbs.db' -delete 2>/dev/null || true
	@find . -name '*.tmp' -delete 2>/dev/null || true
	@echo "✅ Cleanup complete"

# Deploy to GitHub Pages
.PHONY: deploy
deploy:
	@echo "🚀 Deploying to GitHub Pages..."
	@if [ -z "$$(git status --porcelain)" ]; then \
		echo "✅ Working directory is clean"; \
	else \
		echo "📝 Uncommitted changes found, committing..."; \
		git add .; \
		git commit -m "Update portfolio website 🚀"; \
	fi
	@git push origin main
	@echo "✅ Deployed! Visit https://songtianlun.github.io/"

# Watch for file changes (requires inotify-tools on Linux)
.PHONY: watch
watch:
	@echo "👀 Watching for file changes..."
	@if command -v inotifywait > /dev/null 2>&1; then \
		echo "Press Ctrl+C to stop watching"; \
		while inotifywait -e modify,create,delete *.html *.css *.js *.json 2>/dev/null; do \
			echo "🔄 Files changed, reload your browser"; \
		done; \
	else \
		echo "❌ inotifywait not found. Install inotify-tools:"; \
		echo "  Ubuntu/Debian: sudo apt-get install inotify-tools"; \
		echo "  CentOS/RHEL: sudo yum install inotify-tools"; \
		echo "  macOS: brew install fswatch"; \
	fi

# Live reload server (requires Python packages)
.PHONY: live
live:
	@echo "🔄 Starting live reload server..."
	@if command -v livereload > /dev/null 2>&1; then \
		livereload -p 8000; \
	else \
		echo "❌ livereload not found. Install with:"; \
		echo "  pip install livereload"; \
		echo "  pip3 install livereload"; \
		echo ""; \
		echo "Falling back to basic server..."; \
		make serve; \
	fi

# Quick project info
.PHONY: info
info:
	@echo "📋 Project Information:"
	@echo "  Name: Personal Portfolio Website"
	@echo "  Author: 宋天伦"
	@echo "  Type: Static HTML/CSS/JS"
	@echo "  Deployment: GitHub Pages"
	@echo ""
	@echo "🔗 URLs:"
	@echo "  Development: http://localhost:8000"
	@echo "  Production: https://songtianlun.github.io/"
	@echo ""
	@echo "📁 Files:"
	@ls -la *.html *.css *.js *.json 2>/dev/null || echo "  Some files may be missing"

# Install development dependencies
.PHONY: install
install:
	@echo "📦 Installing development dependencies..."
	@if command -v pip3 > /dev/null 2>&1; then \
		pip3 install livereload; \
		echo "✅ livereload installed"; \
	elif command -v pip > /dev/null 2>&1; then \
		pip install livereload; \
		echo "✅ livereload installed"; \
	else \
		echo "❌ pip not found, please install Python first"; \
	fi
	@if command -v apt-get > /dev/null 2>&1; then \
		sudo apt-get update && sudo apt-get install -y inotify-tools; \
		echo "✅ inotify-tools installed"; \
	elif command -v brew > /dev/null 2>&1; then \
		brew install fswatch; \
		echo "✅ fswatch installed"; \
	else \
		echo "⚠️  File watching tools not installed (optional)"; \
	fi

# Test the website
.PHONY: test
test:
	@echo "🧪 Testing website..."
	@make build
	@echo "🌐 Testing HTTP server..."
	@timeout 5 python3 -m http.server 9999 >/dev/null 2>&1 & \
	sleep 2 && \
	curl -s http://localhost:9999 >/dev/null && \
	echo "✅ HTTP server test passed" || echo "❌ HTTP server test failed"
	@pkill -f "python3 -m http.server 9999" 2>/dev/null || true

# Generate README from projects.json
.PHONY: readme
readme:
	@echo "📝 Generating README.md from projects.json..."
	@if [ ! -f "projects.json" ]; then echo "❌ projects.json not found"; exit 1; fi
	@node scripts/generate-readme.js
	@echo "✅ README.md generated successfully"

# Default development command
.PHONY: default
default: serve