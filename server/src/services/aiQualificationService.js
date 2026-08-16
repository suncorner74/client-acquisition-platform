/**
 * AI Lead Qualification & Proposal Generator Service
 */

const qualifyLeadWithAI = async (lead) => {
  const { name, company, projectType, budget, timeline, message } = lead;
  const msgLower = (message || '').toLowerCase();

  // 1. Calculate Intent & Lead Quality Score (0 - 100)
  let baseScore = 50;

  // Budget scoring
  if (budget === '$5,000+') baseScore += 30;
  else if (budget === '$2,500 - $5,000') baseScore += 25;
  else if (budget === '$1,000 - $2,500') baseScore += 18;
  else if (budget === '$500 - $1,000') baseScore += 10;
  else baseScore += 5;

  // Timeline scoring (URGENT / High intent)
  if (timeline === 'ASAP') baseScore += 12;
  else if (timeline === '1-2 weeks') baseScore += 10;
  else if (timeline === '1 month') baseScore += 7;

  // Message detail scoring
  const wordCount = message ? message.split(/\s+/).length : 0;
  if (wordCount > 50) baseScore += 10;
  if (wordCount > 100) baseScore += 5;

  // Keyword intent signals
  const highIntentKeywords = ['database', 'api', 'dashboard', 'automation', 'payment', 'stripe', 'react', 'node', 'client', 'scale', 'enterprise', 'urgent', 'launch'];
  let keywordHits = 0;
  highIntentKeywords.forEach(kw => {
    if (msgLower.includes(kw)) keywordHits++;
  });
  baseScore += Math.min(keywordHits * 2, 10);

  const finalScore = Math.min(Math.max(baseScore, 35), 98);

  // Quality Tier Classification
  let qualityTier = 'Medium Priority Lead';
  let tierBadgeColor = 'cyan';
  if (finalScore >= 80) {
    qualityTier = '🔥 High Priority / High Value Lead';
    tierBadgeColor = 'emerald';
  } else if (finalScore < 60) {
    qualityTier = '⚠️ Low Priority / Budget Constrained';
    tierBadgeColor = 'amber';
  }

  // 2. Recommend Tech Stack based on Project Type & Message
  const techStack = [];
  if (projectType === 'AI Application' || msgLower.includes('ai') || msgLower.includes('bot') || msgLower.includes('gpt')) {
    techStack.push('React / Next.js', 'Node.js Express', 'OpenAI / Gemini API', 'Tailwind CSS', 'Pinecone / Vector DB');
  } else if (projectType === 'E-commerce' || msgLower.includes('store') || msgLower.includes('payment') || msgLower.includes('stripe')) {
    techStack.push('Next.js 14', 'Node.js API', 'MongoDB / PostgreSQL', 'Stripe Payments', 'Tailwind CSS');
  } else if (projectType === 'SaaS' || msgLower.includes('dashboard') || msgLower.includes('subscription')) {
    techStack.push('React.js', 'Node.js / Express', 'MongoDB Mongoose', 'JWT Authentication', 'Tailwind CSS');
  } else {
    techStack.push('React 18', 'Node.js REST API', 'MongoDB Atlas', 'Tailwind CSS', 'Vercel / Render Host');
  }

  // 3. Estimate Hours & Timeline
  let estimatedHours = '40 - 60 Hours';
  let estimatedDuration = '2 - 3 Weeks';
  if (budget === '$5,000+' || projectType === 'SaaS' || projectType === 'AI Application') {
    estimatedHours = '80 - 120 Hours';
    estimatedDuration = '4 - 6 Weeks';
  } else if (budget === 'Under $500') {
    estimatedHours = '15 - 25 Hours';
    estimatedDuration = '1 Week';
  }

  // 4. Identify Potential Risks
  const riskAnalysis = [];
  if (budget === 'Under $500' && (projectType === 'SaaS' || projectType === 'AI Application')) {
    riskAnalysis.push('Budget-to-scope mismatch: SaaS/AI projects typically require higher initial setup investment.');
  }
  if (timeline === 'ASAP' && wordCount < 30) {
    riskAnalysis.push('Unclear requirements: Immediate start requested without complete specification document.');
  }
  if (msgLower.includes('realtime') || msgLower.includes('chat') || msgLower.includes('socket')) {
    riskAnalysis.push('Real-time infrastructure complexity: Requires WebSockets & scalable background workers.');
  }
  if (riskAnalysis.length === 0) {
    riskAnalysis.push('Low architectural risk. Standard full-stack workflow.');
  }

  // 5. Discovery Questions for Developer Call
  const discoveryQuestions = [
    `What are the 3 non-negotiable core features required for MVP launch?`,
    `Do you have existing UI/UX wireframes, branding guidelines, or reference sites?`,
    `What is your target launch deadline or key milestone date?`
  ];
  if (msgLower.includes('api') || msgLower.includes('integration')) {
    discoveryQuestions.push(`Which third-party APIs or databases need to be integrated?`);
  }

  // 6. Generate Complete Professional Proposal Document
  const clientOrg = company ? `${company}` : `${name}`;
  const generatedProposal = `
# 📄 Client Project Proposal & Technical Blueprint

**Prepared For:** ${name} (${clientOrg})  
**Project Type:** ${projectType}  
**Target Budget:** ${budget}  
**Proposed Timeline:** ${estimatedDuration} (${estimatedHours})  
**Date Generated:** ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

---

## 1. Executive Summary & Project Goal
Thank you for sharing your project vision! Based on your requirements, we will build a modern, high-performance **${projectType}** tailored specifically for ${clientOrg}.

Our objective is to deliver an enterprise-grade digital product featuring clean UI design, sub-second load times, secure authentication, and seamless user flows.

---

## 2. Recommended Technology Stack
To ensure maximum scalability, security, and developer efficiency, we propose the following stack:
${techStack.map(t => `- **${t}**`).join('\n')}

---

## 3. Scope of Work & Deliverables

### Phase 1: Architecture & UI/UX Design (Week 1)
- Interactive wireframes & responsive UI layout design.
- Database schema modeling and REST API architecture planning.

### Phase 2: Core Development & Logic (Weeks 2 - 3)
- Frontend application built with React/Next.js and styled with Tailwind CSS.
- Backend API server with secure endpoints, data validation, and error handling.
- Database integration with automated indexing and query optimization.

### Phase 3: Integration, Testing & Security (Week 3 - 4)
- Cross-browser testing and mobile responsiveness optimization.
- Security hardening (Rate limiting, CORS, input sanitization).

### Phase 4: Production Deployment & Handover (Final Deliverable)
- Deployment to cloud hosting (Vercel / Render / AWS) with SSL certification.
- Full codebase ownership handover & developer documentation.

---

## 4. Investment & Commercial Terms
- **Estimated Effort:** ${estimatedHours}
- **Target Budget Alignment:** ${budget}
- **Payment Structure:** 50% Upfront Milestone / 50% Upon Final Deployment & Approval

---

## 5. Next Steps
1. Approve this proposal & confirm project scope.
2. Schedule a 20-minute Technical Discovery Call to finalize API endpoints.
3. Sign statement of work & commence Phase 1 development!
`.trim();

  return {
    leadScore: finalScore,
    qualityTier,
    tierBadgeColor,
    summary: `Lead evaluates at ${finalScore}/100 quality score. High intent detected for ${projectType} with ${budget} budget allocation.`,
    techStack,
    estimatedScope: {
      hours: estimatedHours,
      duration: estimatedDuration,
      budgetFit: budget
    },
    riskAnalysis,
    discoveryQuestions,
    generatedProposal,
    qualifiedAt: new Date()
  };
};

module.exports = { qualifyLeadWithAI };
