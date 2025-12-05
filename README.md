# DeepLearning.AI Course Recommender

An interactive quiz that recommends DeepLearning.AI short courses based on your experience and interests.

**🔗 [Try it now](https://isabel-dlai.github.io/onboarding-quiz/course_recommender.html)**

## Overview

This tool helps learners discover the right DeepLearning.AI courses by matching:
- Python programming experience
- Learning goals (coding, prompting, foundations, agents, etc.)
- Preferred tools and frameworks
- Available time commitment

The recommender includes **84 courses** with difficulty scores based on a systematic 5-dimensional rubric.

## Files

- `course_recommender.html` - Main quiz application
- `recommendation_engine.js` - Recommendation logic and UI
- `courses_data.json` - Course database (84 courses)
- `SCORING_RUBRIC.md` - Formal difficulty scoring rubric
- `legacy/` - Archived scripts and data

## Local Development

Open the HTML file with a local server:

```bash
python3 -m http.server 8000
```

Then navigate to `http://localhost:8000/course_recommender.html`

## Difficulty Scoring

Courses are scored 1-5 using a weighted rubric:
- **AI/ML Knowledge** (40%)
- **Domain Specialization** (25%)
- **Python Proficiency** (15%)
- **System Complexity** (15%)
- **Theoretical Depth** (5%)

See `SCORING_RUBRIC.md` for the complete methodology.

## Design

UI matches DeepLearning.AI's aesthetic:
- Clean white cards on #f5f7fa background
- Red accent color (#ef4444)
- Color-coded difficulty badges (Green/Blue/Yellow/Orange/Red)
- Partner logos and course metadata

## License

Demonstration project. Course data scraped from DeepLearning.AI's public website.
