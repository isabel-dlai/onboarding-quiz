// Course recommendation engine
let coursesData = [];
let currentQuestion = 1;
const totalQuestions = 4;
let userAnswers = {
    pythonExperience: null,
    learningGoals: [],
    tools: [],
    timeCommitment: null
};

// Load courses data
async function loadCourses() {
    try {
        const response = await fetch('courses_data.json');
        coursesData = await response.json();
        console.log(`Loaded ${coursesData.length} courses`);
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

// Initialize the app
function init() {
    loadCourses();
    setupEventListeners();
    showQuestion(1);
    updateProgress();
    updateNavigation();
}

// Set up event listeners
function setupEventListeners() {
    // Single select options (Q1, Q4)
    document.querySelectorAll('#q1 .option, #q4 .option').forEach(option => {
        option.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            document.getElementById('nextBtn').disabled = false;
        });
    });

    // Multi-select options (Q2)
    document.querySelectorAll('#q2 .option').forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('selected');
            // Enable next button if at least one option is selected
            const anySelected = document.querySelectorAll('#q2 .option.selected').length > 0;
            document.getElementById('nextBtn').disabled = !anySelected;
        });
    });

    // Multi-select options for Q3 (partners)
    document.querySelectorAll('#q3 .tool-option').forEach(option => {
        option.addEventListener('click', function() {
            // If a specific partner is clicked, deselect "Any Partner"
            const anyPartnerBtn = document.getElementById('anyPartnerBtn');
            if (anyPartnerBtn) {
                anyPartnerBtn.classList.remove('selected');
            }

            this.classList.toggle('selected');

            // Enable next button if at least one option is selected
            const anySelected = document.querySelectorAll('#q3 .option.selected').length > 0;
            document.getElementById('nextBtn').disabled = !anySelected;
        });
    });

    // Any Partner button handler
    const anyPartnerBtn = document.getElementById('anyPartnerBtn');
    if (anyPartnerBtn) {
        anyPartnerBtn.addEventListener('click', function() {
            // Deselect all specific partners
            document.querySelectorAll('#q3 .tool-option').forEach(opt => {
                opt.classList.remove('selected');
            });

            // Toggle "Any Partner" selection
            this.classList.toggle('selected');

            // Enable next button if selected
            document.getElementById('nextBtn').disabled = !this.classList.contains('selected');
        });
    }

    // See All Partners button
    const seeAllBtn = document.getElementById('seeAllToolsBtn');
    if (seeAllBtn) {
        seeAllBtn.addEventListener('click', toggleAllTools);
    }

    // Navigation buttons
    document.getElementById('nextBtn').addEventListener('click', handleNext);
    document.getElementById('backBtn').addEventListener('click', handleBack);
}

// Handle next button
function handleNext() {
    // Save current answer
    saveAnswer();

    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
        updateProgress();
        updateNavigation();
    } else {
        // Show results
        showResults();
    }
}

// Handle back button
function handleBack() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
        updateProgress();
        updateNavigation();
    }
}

// Save current answer
function saveAnswer() {
    const currentQ = document.querySelector(`#q${currentQuestion}`);

    switch(currentQuestion) {
        case 1:
            const selected1 = currentQ.querySelector('.option.selected');
            userAnswers.pythonExperience = selected1.dataset.value;
            break;
        case 2:
            const selectedGoals = currentQ.querySelectorAll('.option.selected');
            userAnswers.learningGoals = Array.from(selectedGoals).map(opt => opt.dataset.value);
            break;
        case 3:
            const selectedTools = currentQ.querySelectorAll('.option.selected');
            userAnswers.tools = Array.from(selectedTools).map(opt => opt.dataset.value);
            break;
        case 4:
            const selected4 = currentQ.querySelector('.option.selected');
            userAnswers.timeCommitment = selected4.dataset.value;
            break;
    }
}

// Show specific question
function showQuestion(questionNum) {
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
    document.getElementById(`q${questionNum}`).classList.add('active');

    // Restore previous selection if going back
    restoreSelection(questionNum);
}

// Restore previous selection
function restoreSelection(questionNum) {
    const question = document.getElementById(`q${questionNum}`);
    let hasSelection = false;

    switch(questionNum) {
        case 1:
            if (userAnswers.pythonExperience) {
                const option = question.querySelector(`[data-value="${userAnswers.pythonExperience}"]`);
                if (option) {
                    option.classList.add('selected');
                    hasSelection = true;
                }
            }
            break;
        case 2:
            if (userAnswers.learningGoals.length > 0) {
                userAnswers.learningGoals.forEach(goal => {
                    const option = question.querySelector(`[data-value="${goal}"]`);
                    if (option) {
                        option.classList.add('selected');
                        hasSelection = true;
                    }
                });
            }
            break;
        case 3:
            if (userAnswers.tools.length > 0) {
                userAnswers.tools.forEach(tool => {
                    const option = question.querySelector(`[data-value="${tool}"]`);
                    if (option) option.classList.add('selected');
                });
                hasSelection = true;
            }
            break;
        case 4:
            if (userAnswers.timeCommitment) {
                const option = question.querySelector(`[data-value="${userAnswers.timeCommitment}"]`);
                if (option) {
                    option.classList.add('selected');
                    hasSelection = true;
                }
            }
            break;
    }

    document.getElementById('nextBtn').disabled = !hasSelection;
}

// Update progress bar
function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

// Update navigation buttons
function updateNavigation() {
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (currentQuestion === 1) {
        backBtn.style.display = 'none';
    } else {
        backBtn.style.display = 'block';
    }

    if (currentQuestion === totalQuestions) {
        nextBtn.textContent = 'Get Recommendations';
    } else {
        nextBtn.textContent = 'Next';
    }
}

// Special beginner recommendations for users with no Python experience
function getBeginnerRecommendations() {
    const recommendations = [];

    // Find the core beginner courses by slug
    const aiPythonCourse = coursesData.find(c => c.slug === 'ai-python-for-beginners');
    const replitCourse = coursesData.find(c => c.slug === 'vibe-coding-101-with-replit');
    const chatgptPromptCourse = coursesData.find(c => c.slug === 'chatgpt-prompt-engineering-for-developers');

    // 1. Always recommend AI Python for Beginners first
    if (aiPythonCourse) {
        let reasons = ['Perfect starting point for complete beginners'];

        if (userAnswers.learningGoals.includes('coding')) {
            reasons.push('Teaches you to code with AI from scratch');
        } else {
            reasons.push('Learn Python basics to unlock more AI courses');
        }

        recommendations.push({
            course: aiPythonCourse,
            score: 1000, // Guaranteed top spot
            reasons: reasons
        });
    }

    // 2. Always recommend Vibe Coding 101 with Replit second
    if (replitCourse) {
        let reasons = ['Learn to build with AI-assisted coding'];

        if (userAnswers.learningGoals.includes('coding')) {
            reasons.push('Hands-on practice with AI coding tools');
        } else {
            reasons.push('Experience coding with AI guidance');
        }

        if (userAnswers.tools.includes('replit')) {
            reasons.push('Uses Replit - one of your selected tools');
        }

        recommendations.push({
            course: replitCourse,
            score: 900, // Guaranteed second spot
            reasons: reasons
        });
    }

    // 3. Always recommend ChatGPT Prompt Engineering third
    if (chatgptPromptCourse) {
        let reasons = ['Master prompt engineering fundamentals'];

        if (userAnswers.learningGoals.includes('prompting')) {
            reasons.push('Perfect match for learning prompting');
        } else {
            reasons.push('Essential skill for working with AI');
        }

        if (userAnswers.tools.includes('openai')) {
            reasons.push('Uses ChatGPT - one of your selected tools');
        }

        recommendations.push({
            course: chatgptPromptCourse,
            score: 800, // Guaranteed third spot
            reasons: reasons
        });
    }

    // 4. Add other beginner-friendly courses (Level 1-2) based on interests
    const otherBeginnerCourses = coursesData
        .filter(course => {
            // Exclude the three already added
            if (course.slug === 'ai-python-for-beginners' ||
                course.slug === 'prompt-engineering-with-llama-2' ||
                course.slug === 'reasoning-with-o1') {
                return false;
            }
            // Only include Level 1-2 courses
            return course.difficulty_score && course.difficulty_score <= 2;
        })
        .map(course => {
            let score = 100; // Base score for other beginners courses
            let reasons = ['Beginner-friendly'];

            const titleLower = course.title.toLowerCase();
            const slugLower = course.slug.toLowerCase();
            const learnText = course.what_youll_learn.join(' ').toLowerCase();

            // Match based on learning goals
            if (userAnswers.learningGoals.includes('prompting') &&
                (titleLower.includes('prompt') || titleLower.includes('canvas'))) {
                score += 50;
                reasons.push('Matches your prompting interest');
            }

            if (userAnswers.learningGoals.includes('foundations') &&
                (titleLower.includes('understand') || titleLower.includes('introduction'))) {
                score += 50;
                reasons.push('Builds foundational understanding');
            }

            if (userAnswers.learningGoals.includes('coding') &&
                (titleLower.includes('jupyter') || titleLower.includes('claude code'))) {
                score += 50;
                reasons.push('Helps you code with AI assistance');
            }

            // Tool matching
            userAnswers.tools.forEach(tool => {
                if (tool === 'any') return;

                const toolMatches = {
                    'anthropic': ['anthropic', 'claude'],
                    'openai': ['openai', 'gpt', 'canvas'],
                    'meta': ['meta', 'llama'],
                    'google': ['google', 'gemini', 'vertex'],
                    'pinecone': ['pinecone'],
                    'chroma': ['chroma'],
                    'weaviate': ['weaviate'],
                    'autogen': ['autogen'],
                    'langgraph': ['langgraph'],
                    'haystack': ['haystack'],
                    'mistral': ['mistral'],
                    'aws': ['bedrock', 'aws'],
                    'vertexai': ['vertex'],
                    'dspy': ['dspy'],
                    'pytorch': ['pytorch'],
                    'wandb': ['weights', 'biases', 'wandb']
                };

                const keywords = toolMatches[tool] || [tool];
                keywords.forEach(keyword => {
                    if (titleLower.includes(keyword) || slugLower.includes(keyword)) {
                        score += 30;
                        reasons.push(`Uses ${keyword}`);
                    }
                });
            });

            // Time commitment matching
            if (userAnswers.timeCommitment !== 'any') {
                const duration = course.duration || '';
                const minutes = parseDuration(duration);

                if (userAnswers.timeCommitment === 'short' && minutes < 60) {
                    score += 20;
                    reasons.push('Quick to complete');
                }
            }

            return { course, score, reasons: [...new Set(reasons)] };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 2); // Take top 2 additional courses

    // Add the other courses to recommendations
    recommendations.push(...otherBeginnerCourses);

    // Return top 5 (3 core + 2 based on interests)
    return recommendations.slice(0, 5);
}

// Recommendation algorithm
function getRecommendations() {
    // Special path for complete beginners
    if (userAnswers.pythonExperience === 'none') {
        return getBeginnerRecommendations();
    }

    let scored = coursesData.map(course => {
        let score = 0;
        let reasons = [];

        const titleLower = course.title.toLowerCase();
        const slugLower = course.slug.toLowerCase();
        const learnText = course.what_youll_learn.join(' ').toLowerCase();

        // Python experience matching
        if (userAnswers.pythonExperience === 'none') {
            if (titleLower.includes('python for beginners') || slugLower.includes('ai-python-for-beginners')) {
                score += 100;
                reasons.push('Perfect for Python beginners');
            }
            // Prefer prompting and non-coding courses for non-programmers
            if (titleLower.includes('prompt') || slugLower.includes('prompt')) {
                score += 50;
                reasons.push('No coding required');
            }
        }

        // Learning goal matching (iterate through all selected goals)
        userAnswers.learningGoals.forEach(goal => {
            switch(goal) {
                case 'coding':
                    if (titleLower.includes('python') || titleLower.includes('coding') ||
                        slugLower.includes('jupyter-ai') || slugLower.includes('claude-code')) {
                        score += 80;
                        reasons.push('Focuses on coding with AI');
                    }
                    break;
                case 'prompting':
                    if (titleLower.includes('prompt') || titleLower.includes('canvas') ||
                        titleLower.includes('llama') && !titleLower.includes('pretraining')) {
                        score += 80;
                        reasons.push('Teaches effective prompting');
                    }
                    break;
                case 'foundations':
                    if (titleLower.includes('transformer') || titleLower.includes('attention') ||
                        titleLower.includes('how') && titleLower.includes('work') ||
                        titleLower.includes('pretraining') || titleLower.includes('embedding')) {
                        score += 80;
                        reasons.push('Deep foundational concepts');
                    }
                    break;
                case 'building':
                    if (titleLower.includes('build') || titleLower.includes('application') ||
                        learnText.includes('build') || titleLower.includes('rag')) {
                        score += 80;
                        reasons.push('Hands-on application building');
                    }
                    break;
                case 'agents':
                    if (titleLower.includes('agent') || slugLower.includes('agent')) {
                        score += 80;
                        reasons.push('Focuses on AI agents');
                    }
                    break;
                case 'specialized':
                    if (titleLower.includes('voice') || titleLower.includes('rag') ||
                        titleLower.includes('fine-tun') || titleLower.includes('quantization')) {
                        score += 80;
                        reasons.push('Specialized AI topic');
                    }
                    break;
            }
        });

        // Tool matching
        userAnswers.tools.forEach(tool => {
            if (tool === 'any') return;

            const toolMatches = {
                'openai': ['openai', 'gpt', 'canvas'],
                'meta': ['meta', 'llama'],
                'google': ['google', 'gemini', 'vertex', 'google cloud'],
                'anthropic': ['anthropic', 'claude'],
                'langchain': ['langchain', 'langgraph'],
                'huggingface': ['hugging face', 'huggingface'],
                'microsoft': ['microsoft', 'semantic kernel', 'azure'],
                'llamaindex': ['llamaindex'],
                'aws': ['bedrock', 'aws', 'amazon'],
                'chroma': ['chroma'],
                'cohere': ['cohere'],
                'crewai': ['crewai'],
                'databricks': ['databricks'],
                'haystack': ['haystack'],
                'mistral': ['mistral'],
                'mongodb': ['mongodb'],
                'neo4j': ['neo4j'],
                'pinecone': ['pinecone'],
                'predibase': ['predibase'],
                'qdrant': ['qdrant'],
                'redis': ['redis'],
                'replit': ['replit'],
                'snowflake': ['snowflake'],
                'unstructured': ['unstructured'],
                'weaviate': ['weaviate'],
                'weights-biases': ['weights', 'biases', 'wandb'],
                'windsurf': ['windsurf']
            };

            const keywords = toolMatches[tool] || [tool];
            keywords.forEach(keyword => {
                if (titleLower.includes(keyword) || slugLower.includes(keyword) ||
                    course.partner?.toLowerCase().includes(keyword)) {
                    score += 60;
                    reasons.push(`Uses ${keyword}`);
                }
            });
        });

        // Time commitment matching (upper limit approach)
        if (userAnswers.timeCommitment !== 'any') {
            const duration = course.duration || '';
            const minutes = parseDuration(duration);

            switch(userAnswers.timeCommitment) {
                case 'short':
                    // Up to 1 hour
                    if (minutes <= 60) {
                        score += 30;
                        reasons.push('Fits in 1 hour');
                    }
                    break;
                case 'medium':
                    // Up to 2 hours
                    if (minutes <= 120) {
                        score += 30;
                        reasons.push('Fits in 2 hours');
                    }
                    break;
            }
        }

        // Difficulty matching (1-5 scale)
        if (course.difficulty_score) {
            const diffScore = course.difficulty_score;

            // Map Python experience to ideal difficulty range
            let idealDifficulty = [1, 5]; // default range
            let experienceLabel = '';

            if (userAnswers.pythonExperience === 'none') {
                idealDifficulty = [1, 2]; // Complete beginner courses
                experienceLabel = 'Perfect for beginners';
            } else if (userAnswers.pythonExperience === 'beginner') {
                idealDifficulty = [2, 3]; // Basic usage and intermediate
                experienceLabel = 'Good for beginners';
            } else if (userAnswers.pythonExperience === 'intermediate') {
                idealDifficulty = [3, 4]; // Intermediate to advanced
                experienceLabel = 'Matches your level';
            } else if (userAnswers.pythonExperience === 'advanced') {
                idealDifficulty = [4, 5]; // Advanced and expert
                experienceLabel = 'Appropriate difficulty';
            }

            // Award points based on how well the difficulty matches
            if (diffScore >= idealDifficulty[0] && diffScore <= idealDifficulty[1]) {
                // Perfect match - in the ideal range
                score += 40;
                reasons.push(experienceLabel);
            } else if (Math.abs(diffScore - idealDifficulty[0]) === 1 ||
                       Math.abs(diffScore - idealDifficulty[1]) === 1) {
                // Close match - one level away
                score += 15;
            } else if (diffScore < idealDifficulty[0]) {
                // Too easy - penalize more for advanced users
                const penalty = (idealDifficulty[0] - diffScore) * 10;
                score -= penalty;
                if (penalty > 20) {
                    reasons.push('May be too basic');
                }
            } else {
                // Too hard - penalize more for beginners
                const penalty = (diffScore - idealDifficulty[1]) * 15;
                score -= penalty;
                if (penalty > 20) {
                    reasons.push('May be challenging');
                }
            }
        }

        return { course, score, reasons: [...new Set(reasons)] };
    });

    // Sort by score and return top 3
    return scored
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
}

// Parse duration string to minutes
function parseDuration(duration) {
    if (!duration) return 0;

    const match = duration.match(/(\d+)\s*(Hour|Minute)/i);
    if (!match) return 0;

    const value = parseInt(match[1]);
    const unit = match[2].toLowerCase();

    return unit.startsWith('hour') ? value * 60 : value;
}

// Get difficulty label from score
function getDifficultyLabel(score) {
    const labels = {
        1: 'Level 1 - Beginner',
        2: 'Level 2 - Foundational',
        3: 'Level 3 - Intermediate',
        4: 'Level 4 - Advanced',
        5: 'Level 5 - Expert'
    };
    return labels[score] || `Level ${score}`;
}

// Get difficulty badge color
function getDifficultyColor(score) {
    const colors = {
        1: '#10b981', // green
        2: '#3b82f6', // blue
        3: '#f59e0b', // yellow/amber
        4: '#f97316', // orange
        5: '#ef4444'  // red
    };
    return colors[score] || '#6b7280';
}

// Show results
function showResults() {
    const recommendations = getRecommendations();

    if (recommendations.length === 0) {
        // Fallback to popular courses if no matches
        recommendations.push(...coursesData.slice(0, 3).map(course => ({
            course,
            score: 0,
            reasons: ['Popular course']
        })));
    }

    let html = '';

    // Special intro for complete beginners
    if (userAnswers.pythonExperience === 'none') {
        html += `
            <div style="background: #fef2f2;
                        border: 1px solid #fecaca;
                        border-radius: 12px;
                        padding: 24px;
                        margin-bottom: 30px;">
                <h2 style="margin-bottom: 10px; color: #1a1a1a; font-size: 1.5rem; font-weight: 600;">🎯 Your Beginner Learning Path</h2>
                <p style="color: #6b7280; line-height: 1.6; font-size: 1rem;">
                    Great choice starting from scratch! We've curated the perfect learning path for you.
                    <strong style="color: #1a1a1a;">Start with "AI Python for Beginners"</strong> to build a foundation, then practice
                    building with AI assistance, and master prompt engineering fundamentals.
                </p>
            </div>
        `;
    } else {
        html += '<h2 style="margin-bottom: 25px; color: #1a1a1a; font-weight: 600;">Your Recommended Courses</h2>';
    }

    // Show top 3 recommendations
    const topRecommendations = recommendations.slice(0, 3);

    topRecommendations.forEach((item, index) => {
        const course = item.course;

        // Special labels for beginner path
        let rank;
        if (userAnswers.pythonExperience === 'none') {
            if (index === 0) rank = '📚 Step 1: Start Here';
            else if (index === 1) rank = '💻 Step 2: Build with AI';
            else if (index === 2) rank = '🎯 Step 3: Master Prompting';
        } else {
            rank = index === 0 ? '🥇 Top Pick' : index === 1 ? '🥈 Great Match' : '🥉 Also Consider';
        }

        const badgeColor = getDifficultyColor(course.difficulty_score);

        html += `
            <div class="result-card">
                <div style="font-size: 0.9rem; color: #ef4444; font-weight: 600; margin-bottom: 10px;">${rank}</div>
                <h3>${course.title}</h3>

                <div class="course-meta">
                    ${course.difficulty_score ? `<span class="badge" style="background-color: ${badgeColor}; color: white;">${getDifficultyLabel(course.difficulty_score)}</span>` : ''}
                    <span>⏱️ ${course.duration}</span>
                    <span>🎥 ${course.video_lessons} lessons</span>
                    ${course.code_examples > 0 ? `<span>💻 ${course.code_examples} examples</span>` : ''}
                </div>

                ${course.instructor ? `<p style="margin: 10px 0; color: #6b7280;"><strong style="color: #374151;">Instructor:</strong> ${course.instructor}</p>` : ''}
                ${course.partner ? `
                    <div style="margin: 10px 0; display: flex; align-items: center; gap: 10px;">
                        <strong style="color: #374151;">Partner:</strong>
                        ${course.partner_image_url ? `<img src="${course.partner_image_url}" alt="${course.partner}" style="height: 24px; width: auto; object-fit: contain;">` : ''}
                        <span style="color: #6b7280;">${course.partner}</span>
                    </div>
                ` : ''}

                ${item.reasons.length > 0 ? `
                    <div style="margin: 15px 0;">
                        <strong style="color: #374151;">Why this course:</strong>
                        <ul style="list-style: none; padding-left: 0; margin-top: 8px;">
                            ${item.reasons.map(reason => `<li style="padding: 4px 0; color: #6b7280;">✓ ${reason}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

                ${course.what_youll_learn.length > 0 ? `
                    <div class="learn-points">
                        <h4>What you'll learn:</h4>
                        <ul>
                            ${course.what_youll_learn.slice(0, 3).map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

                <a href="${course.url}" class="enroll-btn" target="_blank">View Course →</a>
            </div>
        `;
    });

    html += '<button class="btn btn-primary restart-btn" onclick="restartQuiz()">Start Over</button>';

    document.getElementById('results').innerHTML = html;
    document.getElementById('results').classList.add('active');
    document.getElementById('navigation').style.display = 'none';
    document.querySelectorAll('.question').forEach(q => q.classList.remove('active'));
}

// Restart quiz
function restartQuiz() {
    currentQuestion = 1;
    userAnswers = {
        pythonExperience: null,
        learningGoals: [],
        tools: [],
        timeCommitment: null
    };

    // Clear all selections
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));

    // Reset UI
    document.getElementById('results').classList.remove('active');
    document.getElementById('navigation').style.display = 'flex';
    document.getElementById('nextBtn').disabled = true;

    showQuestion(1);
    updateProgress();
    updateNavigation();
}

// Toggle additional tools visibility
function toggleAllTools(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const additionalTools = document.querySelectorAll('.additional-tool');
    const btn = document.getElementById('seeAllToolsBtn');
    const btnText = document.getElementById('seeAllText');
    const isExpanded = btn.classList.contains('expanded');

    additionalTools.forEach(tool => {
        tool.style.display = isExpanded ? 'none' : 'flex';
    });

    btn.classList.toggle('expanded');
    btnText.textContent = isExpanded ? 'See All Partners' : 'Show Less';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
