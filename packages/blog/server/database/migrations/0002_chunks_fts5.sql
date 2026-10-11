CREATE VIRTUAL TABLE `document_chunks_fts` USING fts5(
	`content`,
	`contextualContent`,
	content='document_chunks',
	content_rowid='rowid',
	tokenize='trigram'
);--> statement-breakpoint
CREATE TRIGGER `document_chunks_fts_ai` AFTER INSERT ON `document_chunks` BEGIN
	INSERT INTO `document_chunks_fts`(`rowid`, `content`, `contextualContent`)
	VALUES (new.`rowid`, new.`content`, new.`contextualContent`);
END;--> statement-breakpoint
CREATE TRIGGER `document_chunks_fts_ad` AFTER DELETE ON `document_chunks` BEGIN
	INSERT INTO `document_chunks_fts`(`document_chunks_fts`, `rowid`, `content`, `contextualContent`)
	VALUES ('delete', old.`rowid`, old.`content`, old.`contextualContent`);
END;--> statement-breakpoint
CREATE TRIGGER `document_chunks_fts_au` AFTER UPDATE OF `content`, `contextualContent` ON `document_chunks` BEGIN
	INSERT INTO `document_chunks_fts`(`document_chunks_fts`, `rowid`, `content`, `contextualContent`)
	VALUES ('delete', old.`rowid`, old.`content`, old.`contextualContent`);
	INSERT INTO `document_chunks_fts`(`rowid`, `content`, `contextualContent`)
	VALUES (new.`rowid`, new.`content`, new.`contextualContent`);
END;--> statement-breakpoint
INSERT INTO `document_chunks_fts`(`document_chunks_fts`) VALUES ('rebuild');
