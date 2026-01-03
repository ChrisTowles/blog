-- Remove personas, chatbots, capabilities, and skills system

-- Drop junction tables first (FK constraints)
DROP TABLE IF EXISTS persona_capabilities;
DROP TABLE IF EXISTS capability_knowledge_bases;

-- Drop main tables
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS knowledge_bases;
DROP TABLE IF EXISTS capabilities;
DROP TABLE IF EXISTS chatbots;
DROP TABLE IF EXISTS personas;

-- Remove columns from chats
ALTER TABLE chats DROP COLUMN IF EXISTS persona_id;
ALTER TABLE chats DROP COLUMN IF EXISTS persona_slug;
ALTER TABLE chats DROP COLUMN IF EXISTS chatbot_slug;

-- Drop old indexes (if they exist)
DROP INDEX IF EXISTS chats_persona_id_idx;
