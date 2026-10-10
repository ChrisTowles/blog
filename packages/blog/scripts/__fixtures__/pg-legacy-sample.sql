INSERT INTO workflows (id,name,"ownerId","createdAt","updatedAt") VALUES ('tmpl-product-idea','Template','SYSTEM','2026-10-10 20:30:37.705872+00','2026-10-10 20:30:37.705872+00');
INSERT INTO users (id,email,name,avatar,username,provider,"providerId","createdAt") VALUES
('u1','a@x.dev','Chris O''Neil','http://a/b.png','chris','github','123','2026-01-02 03:04:05.678901'),
('u2','b@x.dev','Zoë 🚀','http://a/c.png','zoe','google','g-9','2026-02-03 04:05:06');
INSERT INTO chats (id,title,"userId","containerId","createdAt") VALUES ('c1','Hello; world -- /* x */','u1',NULL,'2026-03-01 10:00:00'),('c2',NULL,'u2','cont_1','2026-03-02 10:00:00');
INSERT INTO messages (id,"chatId",role,parts,"createdAt") VALUES
('m1','c1','user','[{"type":"text","text":"line1\nline2 ''q'' \\ back; semi"}]','2026-03-01 10:00:01'),
('m2','c1','assistant',NULL,'2026-03-01 10:00:02'),
('m3','c1','assistant','null','2026-03-01 10:00:03');
INSERT INTO messages (id,"chatId",role,parts) SELECT 'mbig','c2','assistant', json_build_array(json_build_object('type','text','text', repeat('x''y;é🚀"', 40000)))::json;
INSERT INTO documents (id,slug,title,path,url,"contentHash") VALUES ('d1','s','T','p','/u','h');
INSERT INTO document_chunks (id,"documentId","chunkIndex",content,"contextualContent",embedding) VALUES ('ch1','d1',0,'c','cc', (SELECT array_fill(0.1::real, ARRAY[1024])::vector));
INSERT INTO loan_applications (id,"userId",status,"applicationData") VALUES ('la1','u1','reviewing','{"income": 100000, "name": "A"}');
INSERT INTO loan_reviews (id,"applicationId",reviewer,decision,analysis,flags) VALUES ('lr1','la1','the-bank','flagged','text','["a","b"]');
INSERT INTO loan_messages (id,"applicationId",role,parts) VALUES ('lm1','la1','user','[{"k":1}]');
INSERT INTO typing_groups (id,name,kind,slug) VALUES (7,'Fam','family','u1abcd-fam'),(9,'Class','classroom','u2abcd-class');
INSERT INTO typing_group_members ("groupId","userId",role,"invitedBy") VALUES (7,'u1','guardian',NULL),(7,'u2','guardian','u1');
INSERT INTO typing_group_invites (id,"groupId",token,email,"expiresAt","acceptedBy","acceptedAt") VALUES (3,7,'tok1','e@x.dev','2026-12-01 00:00:00','u2','2026-11-01 12:00:00.5'),(5,9,'tok2',NULL,'2026-12-02 00:00:00',NULL,NULL);
INSERT INTO typing_learners (id,"groupId","displayName","avatarUrl","birthYear","currentStage") VALUES (4,7,'Kid',NULL,2016,3);
INSERT INTO typing_lessons (id,slug,stage,kind,title,text,"targetAccuracy",topic) VALUES (11,'l1',1,'drill','D','asdf',0.95,NULL),(12,'l2',2,'word','W','hello',0.9,'space');
INSERT INTO typing_attempts (id,"learnerId","lessonId","gameSlug",wpm,"netWpm",accuracy,"durationMs","errorsByKey") VALUES (21,4,11,NULL,12.5,11.25,0.95,30000,'{"a": 2, "s": 1}'),(22,4,NULL,'letter-rain',8,7,0.8,1000,'{}');
INSERT INTO typing_key_stats (id,"learnerId",key,attempts,errors,"avgMs") VALUES (31,4,'a',10,2,123.5);
INSERT INTO typing_spelling_lists (id,"learnerId","weekOf",words,source,"createdBy") VALUES (41,4,'2026-09-28','{apple,"it''s, ok","say \"hi\""}','paste','u1');
INSERT INTO typing_spelling_progress (id,"spellingListId",word,"consecutiveCorrect",mastered,"masteredAt") VALUES (51,41,'apple',3,true,'2026-10-01 09:00:00'),(52,41,'it''s, ok',0,false,NULL);
INSERT INTO workflow_runs (id,"workflowId",status,"inputData") VALUES ('wr1','tmpl-product-idea','completed','{"a":1}');
INSERT INTO node_executions (id,"runId","nodeId",status,"tokensIn","startedAt") VALUES ('ne1','wr1','define','completed',10,'2026-10-01T00:00:00.000Z');
