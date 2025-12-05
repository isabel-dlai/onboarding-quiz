# DeepLearning.AI Course Difficulty Scoring Rubric

**Version 1.1** - Prescriptive rubric for objective difficulty assessment

---

## ⚠️ IMPORTANT: How to Use This Rubric

**DO NOT** score courses holistically or based on gut feeling.

**YOU MUST:**
1. Score each dimension independently (1-5)
2. Apply the weighted formula exactly
3. Round the final result to the nearest integer
4. Document your reasoning for each dimension score

**This rubric is designed to be systematic and repeatable.** Two people scoring the same course should get the same result.

---

## 📊 The Five Dimensions & Weights

| Dimension | Weight | Why This Weight? |
|-----------|--------|------------------|
| **AI/ML Knowledge** | 40% | Primary differentiator between courses |
| **Domain Specialization** | 25% | Niche topics require specialized context |
| **Python Proficiency** | 15% | Most courses require similar coding skills |
| **System Complexity** | 15% | Building simple vs complex architectures |
| **Theoretical Depth** | 5% | Minor factor in practical courses |

---

## 🎯 Dimension 1: AI/ML Knowledge Required (40%)

**Score each course 1-5 based ONLY on these criteria:**

| Score | Prerequisites | Key Indicators |
|-------|--------------|----------------|
| **1** | No AI knowledge | Course teaches "what is AI", basic prompting, general literacy |
| **2** | Conceptual understanding | Knows what LLMs are, basic prompt engineering, model capabilities |
| **3** | Applied ML knowledge | Understands embeddings, RAG, agents (using frameworks), evaluation metrics |
| **4** | Technical ML fundamentals | Knows training loops, loss functions, attention mechanisms, architectures |
| **5** | Research-level expertise | Understands DPO, RLHF, distributed training, tokenization internals |

---

## 🔬 Dimension 2: Domain Specialization (25%)

**Score based ONLY on how niche/specialized the topic is:**

| Score | Specialization Level | Examples |
|-------|---------------------|----------|
| **1** | Universal/Broadly applicable | General prompting, intro to AI, Python basics |
| **2** | Common use cases | Chatbots, code assistants, common frameworks (ChatGPT, Claude) |
| **3** | Popular specialized tools | LangChain, LlamaIndex, RAG systems, basic agents |
| **4** | Technical specialization | Vector databases, LLMOps, red teaming, specific architectures |
| **5** | Highly niche | Pre-training, quantization algorithms, voice agents for production |

---

## 💻 Dimension 3: Python Proficiency Required (15%)

**Score based ONLY on coding complexity required:**

| Score | Python Level | What You Need to Do |
|-------|-------------|---------------------|
| **1** | None | No coding, or click-through only |
| **2** | Basic | Run notebooks, modify parameters, simple API calls |
| **3** | Intermediate | Write functions, work with APIs, pandas/numpy |
| **4** | Advanced | Complex data structures, async code, debugging |
| **5** | Expert | Systems programming, optimization, low-level implementations |

---

## 🏗️ Dimension 4: System Complexity (15%)

**Score based ONLY on architectural complexity:**

| Score | System Type | Components |
|-------|------------|------------|
| **1** | Single component | One tool/concept in isolation |
| **2** | Simple pipeline | 2-3 connected components (input → process → output) |
| **3** | Multi-component system | RAG pipeline, agent with multiple tools |
| **4** | Complex orchestration | Multi-agent systems, event-driven workflows, agentic RAG |
| **5** | Production architecture | Distributed systems, monitoring, scaling, CI/CD |

---

## 📚 Dimension 5: Theoretical Depth (5%)

**Score based ONLY on mathematical/theoretical requirement:**

| Score | Theory Level | Focus |
|-------|-------------|-------|
| **1** | None | Pure practical usage, no math |
| **2** | Conceptual | High-level "why it works", best practices |
| **3** | Applied theory | Trade-offs, when to use what, evaluation |
| **4** | Mathematical | Equations, algorithms, formal understanding |
| **5** | Research | Reading papers, proofs, novel techniques |

---

## 🧮 REQUIRED FORMULA

**YOU MUST calculate the score using this exact formula:**

```
Raw_Score = (
    AI_Knowledge × 0.40 +
    Domain_Specialization × 0.25 +
    Python_Proficiency × 0.15 +
    System_Complexity × 0.15 +
    Theoretical_Depth × 0.05
)

Final_Score = ROUND(Raw_Score)
```

**Example Calculation:**

For a course with scores: AI=4, Domain=3, Python=3, System=4, Theory=3

```
Raw_Score = (4 × 0.40) + (3 × 0.25) + (3 × 0.15) + (4 × 0.15) + (3 × 0.05)
          = 1.60 + 0.75 + 0.45 + 0.60 + 0.15
          = 3.55

Final_Score = ROUND(3.55) = 4
```
