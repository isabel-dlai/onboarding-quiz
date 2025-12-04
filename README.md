# DeepLearning.AI Course Recommender

A modern, interactive web application that recommends DeepLearning.AI short courses based on user preferences and experience level.

## Features

- **Smart Recommendations**: Matches courses based on:
  - Python programming experience
  - Learning goals (coding, prompting, foundations, building apps, agents, specialized topics)
  - Preferred tools and frameworks (LangChain, Hugging Face, Anthropic, etc.)
  - Available time commitment

- **Modern UI**:
  - Clean, gradient-based design matching DeepLearning.AI's aesthetic
  - Smooth animations and transitions
  - Responsive design for all devices
  - Progress tracking through questions

- **Comprehensive Course Data**: 84 short courses with:
  - Course titles and descriptions
  - Difficulty levels
  - Duration and lesson counts
  - Instructor information
  - Learning outcomes

## Files

- `course_recommender.html` - Main HTML interface
- `recommendation_engine.js` - JavaScript recommendation logic
- `courses_data.json` - Course data in JSON format
- `short_courses_data.csv` - Original scraped course data
- `scrape_short_courses.py` - Web scraper for updating course data

## How to Use

### Option 1: Local Development Server (Recommended)

1. Start a local HTTP server:
   ```bash
   python3 -m http.server 8000
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8000/course_recommender.html
   ```

### Option 2: Using Node.js

1. Install a simple server:
   ```bash
   npm install -g http-server
   ```

2. Run the server:
   ```bash
   http-server -p 8000
   ```

3. Open `http://localhost:8000/course_recommender.html`

## Updating Course Data

To refresh the course data from DeepLearning.AI:

1. Install dependencies:
   ```bash
   uv venv
   uv pip install requests beautifulsoup4
   ```

2. Run the scraper:
   ```bash
   uv run scrape_short_courses.py
   ```

3. Convert CSV to JSON:
   ```bash
   uv run convert_csv_to_json.py
   ```

## Recommendation Algorithm

The app uses a scoring system that considers:

1. **Python Experience** (0-100 points)
   - Beginners → Python courses or no-code options
   - Advanced → Specialized technical courses

2. **Learning Goals** (0-80 points)
   - Matches course content to stated objectives
   - Prioritizes hands-on vs. theoretical based on preferences

3. **Tool Preferences** (0-60 points per tool)
   - Matches courses featuring selected frameworks
   - Considers partner organizations

4. **Time Commitment** (0-30 points)
   - Filters by course duration
   - Respects user's available time

5. **Difficulty Alignment** (0-20 points)
   - Matches beginner/intermediate courses to skill level

The top 3 courses are recommended with explanations for why they match.

## Design

The UI matches DeepLearning.AI's official course platform aesthetic:
- Clean white cards on light gray background (#f5f7fa)
- Professional red accent color (#ef4444) matching "Start Learning" button
- Modern sans-serif typography
- Subtle shadows and clean borders
- Orange/amber badges matching "Short Course" style
- Minimal, professional design with excellent readability

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This is a demonstration project for course recommendation. Course data is scraped from DeepLearning.AI's public website.
