-- Seed 5 workflow templates with deterministic IDs for idempotency
-- Uses DO $$ blocks with IF NOT EXISTS checks on workflow ID

DO $$
BEGIN
  -- =============================================================================
  -- 1. Product Idea Evaluator
  -- =============================================================================
  IF NOT EXISTS (SELECT 1 FROM workflows WHERE id = 'tmpl-product-idea') THEN
    INSERT INTO workflows (id, name, description, viewport, "ownerId", "isPublished", version, "createdAt", "updatedAt")
    VALUES (
      'tmpl-product-idea',
      'Product Idea Evaluator',
      'Evaluate a product idea across market, technical, and risk dimensions, then produce a scored recommendation.',
      '{"x":0,"y":0,"zoom":0.85}',
      'SYSTEM',
      1,
      1,
      NOW()::text,
      NOW()::text
    );

    INSERT INTO workflow_nodes (id, "workflowId", "nodeId", type, label, "positionX", "positionY", prompt, model, temperature, "maxTokens", "outputSchema", "inputMapping", "createdAt", "updatedAt") VALUES
    (
      'tmpl-product-idea-define',
      'tmpl-product-idea',
      'define',
      'prompt',
      'Define Idea',
      300, 0,
      'Define this product idea concisely: {{input.idea}}. Identify the target audience and core value proposition in 2-3 sentences.',
      'claude-haiku-4-5',
      0.7,
      1024,
      '{"type":"object","properties":{"definition":{"type":"string","description":"Concise definition of the product idea"},"targetAudience":{"type":"string","description":"The target audience for this product"},"valueProposition":{"type":"string","description":"The core value proposition"}},"required":["definition","targetAudience","valueProposition"]}',
      '{}',
      NOW()::text,
      NOW()::text
    ),
    (
      'tmpl-product-idea-market',
      'tmpl-product-idea',
      'market',
      'classifier',
      'Market Analysis',
      100, 200,
      'Analyze the market for: {{define.definition}}. Target: {{define.targetAudience}}. Estimate market size and competition.',
      'claude-haiku-4-5',
      0.3,
      1024,
      '{"type":"object","properties":{"marketSize":{"type":"string","description":"Estimated market size","enum":["small","medium","large","massive"]},"competition":{"type":"string","description":"Level of competition","enum":["low","moderate","high","saturated"]},"opportunity":{"type":"string","description":"Summary of the market opportunity"}},"required":["marketSize","competition","opportunity"]}',
      '{}',
      NOW()::text,
      NOW()::text
    ),
    (
      'tmpl-product-idea-technical',
      'tmpl-product-idea',
      'technical',
      'classifier',
      'Technical Assessment',
      500, 200,
      'Assess technical feasibility of: {{define.definition}}. Value: {{define.valueProposition}}. Consider complexity and available technology.',
      'claude-haiku-4-5',
      0.3,
      1024,
      '{"type":"object","properties":{"feasibility":{"type":"string","description":"Technical feasibility rating","enum":["straightforward","moderate","challenging","infeasible"]},"challenges":{"type":"array","items":{"type":"string"},"description":"Key technical challenges"},"timeToMvp":{"type":"string","description":"Estimated time to build an MVP"}},"required":["feasibility","challenges","timeToMvp"]}',
      '{}',
      NOW()::text,
      NOW()::text
    ),
    (
      'tmpl-product-idea-risk',
      'tmpl-product-idea',
      'risk',
      'validator',
      'Risk Assessment',
      300, 400,
      'Assess risks. Market: size={{market.marketSize}}, competition={{market.competition}}. Technical: feasibility={{technical.feasibility}}, challenges={{technical.challenges}}. List top 2 risks.',
      'claude-haiku-4-5',
      0.2,
      1024,
      '{"type":"object","properties":{"riskLevel":{"type":"string","description":"Overall risk level","enum":["low","medium","high","critical"]},"topRisks":{"type":"array","items":{"type":"string"},"description":"Top 2 risks identified"}},"required":["riskLevel","topRisks"]}',
      '{}',
      NOW()::text,
      NOW()::text
    ),
    (
      'tmpl-product-idea-score',
      'tmpl-product-idea',
      'score',
      'prompt',
      'Final Score',
      300, 600,
      'Score this product idea 1-10. Market: {{market.marketSize}} size, {{market.competition}} competition. Tech: {{technical.feasibility}}, MVP in {{technical.timeToMvp}}. Risk: {{risk.riskLevel}} ({{risk.topRisks}}). Give score and recommendation.',
      'claude-haiku-4-5',
      0.7,
      1024,
      '{"type":"object","properties":{"score":{"type":"number","description":"Overall score from 1 to 10"},"recommendation":{"type":"string","description":"Summary recommendation"},"goNoGo":{"type":"string","description":"Final go/no-go decision","enum":["strong-go","go","conditional-go","no-go"]}},"required":["score","recommendation","goNoGo"]}',
      '{}',
      NOW()::text,
      NOW()::text
    );

    INSERT INTO workflow_edges (id, "workflowId", "edgeId", "sourceNode", "targetNode", "sourceHandle", "targetHandle", label, animated, "edgeType", "createdAt") VALUES
    ('e_define_market',    'tmpl-product-idea', 'e_define_market',    'define', 'market',    NULL, NULL, NULL, 0, 'smoothstep', NOW()::text),
    ('e_define_technical', 'tmpl-product-idea', 'e_define_technical', 'define', 'technical', NULL, NULL, NULL, 0, 'smoothstep', NOW()::text),
    ('e_market_risk',      'tmpl-product-idea', 'e_market_risk',      'market', 'risk',      NULL, NULL, NULL, 0, 'smoothstep', NOW()::text),
    ('e_technical_risk',   'tmpl-product-idea', 'e_technical_risk',   'technical', 'risk',   NULL, NULL, NULL, 0, 'smoothstep', NOW()::text),
    ('e_risk_score',       'tmpl-product-idea', 'e_risk_score',       'risk',  'score',      NULL, NULL, NULL, 0, 'smoothstep', NOW()::text);
  END IF;

  -- =============================================================================
  -- 2. Translation Quality Check
  -- =============================================================================
  IF NOT EXISTS (SELECT 1 FROM workflows WHERE id = 'tmpl-translation') THEN
    INSERT INTO workflows (id, name, description, viewport, "ownerId", "isPublished", version, "createdAt", "updatedAt")
    VALUES (
      'tmpl-translation',
      'Translation Quality Check',
      'Detect language, translate to Spanish, back-translate to English, and compare quality to assess translation fidelity.',
      '{"x":0,"y":0,"zoom":0.85}',
      'SYSTEM',
      1,
      1,
      NOW()::text,
      NOW()::text
    );

    INSERT INTO workflow_nodes (id, "workflowId", "nodeId", type, label, "positionX", "positionY", prompt, model, temperature, "maxTokens", "outputSchema", "inputMapping", "createdAt", "updatedAt") VALUES
    (
      'tmpl-translation-detect',
      'tmpl-translation',
      'detect',
      'classifier',
      'Detect Language',
      300, 0,
      'Detect the language of: "{{input.text}}"',
      'claude-haiku-4-5',
      0.1,
      1024,
      '{"type":"object","properties":{"language":{"type":"string","description":"Detected language name"},"confidence":{"type":"number","description":"Confidence score from 0 to 1"}},"required":["language","confidence"]}',
      '{}',
      NOW()::text,
      NOW()::text
    ),
    (
      'tmpl-translation-translate',
      'tmpl-translation',
      'translate',
      'transform',
      'Translate to Spanish',
      300, 180,
      'Translate this {{detect.language}} text to Spanish: "{{input.text}}". Return only the translation.',
      'claude-haiku-4-5',
      0.3,
      1024,
      '{"type":"object","properties":{"translation":{"type":"string","description":"Spanish translation of the input text"}},"required":["translation"]}',
      '{}',
      NOW()::text,
      NOW()::text
    ),
    (
      'tmpl-translation-backtranslate',
      'tmpl-translation',
      'backtranslate',
      'transform',
      'Back-Translate',
      300, 360,
      'Translate this Spanish text back to English: "{{translate.translation}}". Return only the translation.',
      'claude-haiku-4-5',
      0.3,
      1024,
      '{"type":"object","properties":{"translation":{"type":"string","description":"English back-translation of the Spanish text"}},"required":["translation"]}',
      '{}',
      NOW()::text,
      NOW()::text
    ),
    (
      'tmpl-translation-compare',
      'tmpl-translation',
      'compare',
      'prompt',
      'Compare Quality',
      300, 540,
      'Compare the original "{{input.text}}" with the back-translation "{{backtranslate.translation}}". Rate quality and note differences.',
      'claude-haiku-4-5',
      0.7,
      1024,
      '{"type":"object","properties":{"quality":{"type":"string","description":"Translation quality rating","enum":["excellent","good","acceptable","poor"]},"differences":{"type":"string","description":"Notable differences between original and back-translation"},"preservedMeaning":{"type":"boolean","description":"Whether the core meaning was preserved"}},"required":["quality","differences","preservedMeaning"]}',
      '{}',
      NOW()::text,
      NOW()::text
    );

    INSERT INTO workflow_edges (id, "workflowId", "edgeId", "sourceNode", "targetNode", "sourceHandle", "targetHandle", label, animated, "edgeType", "createdAt") VALUES
    ('e_detect_translate',        'tmpl-translation', 'e_detect_translate',        'detect',        'translate',      NULL, NULL, NULL, 0, 'smoothstep', NOW()::text),
    ('e_translate_backtranslate', 'tmpl-translation', 'e_translate_backtranslate', 'translate',     'backtranslate',  NULL, NULL, NULL, 0, 'smoothstep', NOW()::text),
    ('e_backtranslate_compare',   'tmpl-translation', 'e_backtranslate_compare',   'backtranslate', 'compare',        NULL, NULL, NULL, 0, 'smoothstep', NOW()::text);
  END IF;

  -- =============================================================================
  -- 4. Blog Post Generator
  -- =============================================================================
  IF NOT EXISTS (SELECT 1 FROM workflows WHERE id = 'tmpl-blog-post') THEN
    INSERT INTO workflows (id, name, description, viewport, "ownerId", "isPublished", version, "createdAt", "updatedAt")
    VALUES (
      'tmpl-blog-post',
      'Blog Post Generator',
      'Generate a complete blog post from a topic: title, outline, draft, and SEO metadata.',
      '{"x":0,"y":0,"zoom":0.85}',
      'SYSTEM',
      1,
      1,
      NOW()::text,
      NOW()::text
    );

    INSERT INTO workflow_nodes (id, "workflowId", "nodeId", type, label, "positionX", "positionY", prompt, model, temperature, "maxTokens", "outputSchema", "inputMapping", "createdAt", "updatedAt") VALUES
    (
      'tmpl-blog-post-title',
      'tmpl-blog-post',
      'title',
      'prompt',
      'Generate Title',
      300, 0,
      'Generate a compelling blog post title about: {{input.topic}}. Make it specific and engaging.',
      'claude-haiku-4-5',
      0.7,
      1024,
      '{"type":"object","properties":{"title":{"type":"string","description":"The blog post title"},"hook":{"type":"string","description":"A compelling hook or angle for the post"}},"required":["title","hook"]}',
      '{}',
      NOW()::text,
      NOW()::text
    ),
    (
      'tmpl-blog-post-outline',
      'tmpl-blog-post',
      'outline',
      'prompt',
      'Create Outline',
      300, 180,
      'Write a 4-section outline for: "{{title.title}}". Hook: {{title.hook}}. Each section should have a heading and 1-sentence description.',
      'claude-haiku-4-5',
      0.7,
      1024,
      '{"type":"object","properties":{"sections":{"type":"array","items":{"type":"object","properties":{"heading":{"type":"string"},"description":{"type":"string"}},"required":["heading","description"]},"description":"Array of outline sections with heading and description"}},"required":["sections"]}',
      '{}',
      NOW()::text,
      NOW()::text
    ),
    (
      'tmpl-blog-post-draft',
      'tmpl-blog-post',
      'draft',
      'prompt',
      'Write Draft',
      300, 360,
      'Write a short blog post (~200 words) based on this outline: {{outline.sections}}. Title: "{{title.title}}". Use a conversational, developer-friendly tone.',
      'claude-haiku-4-5',
      0.7,
      2048,
      '{"type":"object","properties":{"markdown":{"type":"string","description":"The blog post content in markdown"},"wordCount":{"type":"number","description":"Approximate word count of the draft"}},"required":["markdown","wordCount"]}',
      '{}',
      NOW()::text,
      NOW()::text
    ),
    (
      'tmpl-blog-post-seo',
      'tmpl-blog-post',
      'seo',
      'transform',
      'SEO Metadata',
      300, 540,
      'Generate SEO metadata for this blog post. Title: "{{title.title}}". Content: {{draft.markdown}}',
      'claude-haiku-4-5',
      0.3,
      1024,
      '{"type":"object","properties":{"metaDescription":{"type":"string","description":"SEO meta description (under 160 characters)"},"keywords":{"type":"array","items":{"type":"string"},"description":"SEO keywords for the post"},"ogTitle":{"type":"string","description":"Open Graph title for social sharing"}},"required":["metaDescription","keywords","ogTitle"]}',
      '{}',
      NOW()::text,
      NOW()::text
    );

    INSERT INTO workflow_edges (id, "workflowId", "edgeId", "sourceNode", "targetNode", "sourceHandle", "targetHandle", label, animated, "edgeType", "createdAt") VALUES
    ('e_title_outline',  'tmpl-blog-post', 'e_title_outline',  'title',   'outline', NULL, NULL, NULL, 0, 'smoothstep', NOW()::text),
    ('e_outline_draft',  'tmpl-blog-post', 'e_outline_draft',  'outline', 'draft',   NULL, NULL, NULL, 0, 'smoothstep', NOW()::text),
    ('e_draft_seo',      'tmpl-blog-post', 'e_draft_seo',      'draft',   'seo',     NULL, NULL, NULL, 0, 'smoothstep', NOW()::text);
  END IF;

  -- =============================================================================
  -- 5. Customer Feedback Analyzer
  -- =============================================================================
  IF NOT EXISTS (SELECT 1 FROM workflows WHERE id = 'tmpl-feedback') THEN
    INSERT INTO workflows (id, name, description, viewport, "ownerId", "isPublished", version, "createdAt", "updatedAt")
    VALUES (
      'tmpl-feedback',
      'Customer Feedback Analyzer',
      'Parse customer feedback, classify sentiment and topics in parallel, then synthesize a prioritized action report.',
      '{"x":0,"y":0,"zoom":0.85}',
      'SYSTEM',
      1,
      1,
      NOW()::text,
      NOW()::text
    );

    INSERT INTO workflow_nodes (id, "workflowId", "nodeId", type, label, "positionX", "positionY", prompt, model, temperature, "maxTokens", "outputSchema", "inputMapping", "createdAt", "updatedAt") VALUES
    (
      'tmpl-feedback-parse',
      'tmpl-feedback',
      'parse',
      'transform',
      'Parse Feedback',
      300, 0,
      'Parse this customer feedback into structured form: "{{input.feedback}}". Extract the core complaint or praise, and any specific product/feature mentioned.',
      'claude-haiku-4-5',
      0.2,
      1024,
      '{"type":"object","properties":{"coreMessage":{"type":"string","description":"The core complaint or praise extracted from the feedback"},"productMentioned":{"type":"string","description":"Specific product or feature mentioned"},"customerIntent":{"type":"string","description":"What the customer intends or wants"}},"required":["coreMessage","productMentioned","customerIntent"]}',
      '{}',
      NOW()::text,
      NOW()::text
    ),
    (
      'tmpl-feedback-sentiment',
      'tmpl-feedback',
      'sentiment',
      'classifier',
      'Classify Sentiment',
      100, 200,
      'Classify the sentiment of: "{{parse.coreMessage}}". Customer intent: {{parse.customerIntent}}.',
      'claude-haiku-4-5',
      0.1,
      1024,
      '{"type":"object","properties":{"sentiment":{"type":"string","description":"Sentiment classification","enum":["very-positive","positive","neutral","negative","very-negative"]},"urgency":{"type":"string","description":"Urgency level of the feedback","enum":["low","medium","high","critical"]}},"required":["sentiment","urgency"]}',
      '{}',
      NOW()::text,
      NOW()::text
    ),
    (
      'tmpl-feedback-topics',
      'tmpl-feedback',
      'topics',
      'classifier',
      'Extract Topics',
      500, 200,
      'Extract topics from: "{{parse.coreMessage}}". Product: {{parse.productMentioned}}. Categorize into department.',
      'claude-haiku-4-5',
      0.2,
      1024,
      '{"type":"object","properties":{"topics":{"type":"array","items":{"type":"string"},"description":"Topics extracted from the feedback"},"department":{"type":"string","description":"Department responsible","enum":["engineering","product","support","sales","marketing","operations"]}},"required":["topics","department"]}',
      '{}',
      NOW()::text,
      NOW()::text
    ),
    (
      'tmpl-feedback-report',
      'tmpl-feedback',
      'report',
      'prompt',
      'Synthesize Report',
      300, 420,
      'Synthesize a feedback report. Core: {{parse.coreMessage}}. Sentiment: {{sentiment.sentiment}} (urgency: {{sentiment.urgency}}). Topics: {{topics.topics}}. Department: {{topics.department}}. Write a 2-sentence summary and suggest a response action.',
      'claude-haiku-4-5',
      0.7,
      1024,
      '{"type":"object","properties":{"summary":{"type":"string","description":"2-sentence summary of the feedback"},"suggestedAction":{"type":"string","description":"Suggested response action"},"priority":{"type":"string","description":"Priority level for action","enum":["low","medium","high","urgent"]}},"required":["summary","suggestedAction","priority"]}',
      '{}',
      NOW()::text,
      NOW()::text
    );

    INSERT INTO workflow_edges (id, "workflowId", "edgeId", "sourceNode", "targetNode", "sourceHandle", "targetHandle", label, animated, "edgeType", "createdAt") VALUES
    ('e_parse_sentiment',  'tmpl-feedback', 'e_parse_sentiment',  'parse',     'sentiment', NULL, NULL, NULL, 0, 'smoothstep', NOW()::text),
    ('e_parse_topics',     'tmpl-feedback', 'e_parse_topics',     'parse',     'topics',    NULL, NULL, NULL, 0, 'smoothstep', NOW()::text),
    ('e_sentiment_report', 'tmpl-feedback', 'e_sentiment_report', 'sentiment', 'report',    NULL, NULL, NULL, 0, 'smoothstep', NOW()::text),
    ('e_topics_report',    'tmpl-feedback', 'e_topics_report',    'topics',    'report',    NULL, NULL, NULL, 0, 'smoothstep', NOW()::text);
  END IF;

  -- =============================================================================
  -- 6. Dad Joke Generator
  -- =============================================================================
  IF NOT EXISTS (SELECT 1 FROM workflows WHERE id = 'tmpl-dad-joke') THEN
    INSERT INTO workflows (id, name, description, viewport, "ownerId", "isPublished", version, "createdAt", "updatedAt")
    VALUES (
      'tmpl-dad-joke',
      'Dad Joke Generator',
      'Generate an original dad joke, rate its groan-worthiness, and refine it for maximum comedic impact.',
      '{"x":0,"y":0,"zoom":0.85}',
      'SYSTEM',
      1,
      1,
      NOW()::text,
      NOW()::text
    );

    INSERT INTO workflow_nodes (id, "workflowId", "nodeId", type, label, "positionX", "positionY", prompt, model, temperature, "maxTokens", "outputSchema", "inputMapping", "createdAt", "updatedAt") VALUES
    (
      'tmpl-dad-joke-generate',
      'tmpl-dad-joke',
      'generate',
      'prompt',
      'Generate Joke',
      300, 0,
      'Write an original dad joke about: {{input.topic}}. It should be family-friendly, use a pun or wordplay, and make someone groan. Do NOT use the atoms joke ("they make up everything") or any other overused classic. Be creative.',
      'claude-haiku-4-5',
      0.9,
      1024,
      '{"type":"object","properties":{"joke":{"type":"string","description":"The dad joke"}},"required":["joke"]}',
      '{}',
      NOW()::text,
      NOW()::text
    ),
    (
      'tmpl-dad-joke-rate',
      'tmpl-dad-joke',
      'rate',
      'validator',
      'Rate Joke',
      300, 250,
      E'Rate this dad joke on a scale of 1-10 for groan-worthiness and explain why:\n\n{{generate.joke}}',
      'claude-haiku-4-5',
      0.3,
      256,
      '{"type":"object","properties":{"score":{"type":"number","description":"Groan-worthiness score from 1 to 10"},"reason":{"type":"string","description":"Explanation of the rating"}},"required":["score","reason"]}',
      '{}',
      NOW()::text,
      NOW()::text
    ),
    (
      'tmpl-dad-joke-refine',
      'tmpl-dad-joke',
      'refine',
      'prompt',
      'Refine Joke',
      300, 500,
      E'Here is a dad joke that scored {{rate.score}}/10:\n\n{{generate.joke}}\n\nFeedback: {{rate.reason}}\n\nIf the score is below 7, improve it. If 7 or above, keep it but add a bonus follow-up joke. Return the final joke(s).',
      'claude-haiku-4-5',
      0.8,
      1024,
      '{"type":"object","properties":{"finalJoke":{"type":"string","description":"The final (possibly improved) dad joke"},"bonusJoke":{"type":"string","description":"A bonus follow-up joke if the original scored 7+"}},"required":["finalJoke","bonusJoke"]}',
      '{}',
      NOW()::text,
      NOW()::text
    );

    INSERT INTO workflow_edges (id, "workflowId", "edgeId", "sourceNode", "targetNode", "sourceHandle", "targetHandle", label, animated, "edgeType", "createdAt") VALUES
    ('e_generate_rate',  'tmpl-dad-joke', 'e_generate_rate',  'generate', 'rate',   NULL, NULL, NULL, 0, 'smoothstep', NOW()::text),
    ('e_rate_refine',    'tmpl-dad-joke', 'e_rate_refine',    'rate',     'refine', NULL, NULL, NULL, 0, 'smoothstep', NOW()::text);
  END IF;
END $$;
