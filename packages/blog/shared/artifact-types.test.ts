import { describe, it, expectTypeOf } from 'vitest';
import type {
  ArtifactStatus,
  ArtifactFile,
  CodeExecutionResult,
  ArtifactExecuteRequest,
  ArtifactSSEEvent,
  ArtifactSSETextEvent,
  ArtifactSSECodeEvent,
  ArtifactSSEExecutionResultEvent,
  ArtifactSSEFileEvent,
  ArtifactSSEContainerEvent,
  ArtifactSSEErrorEvent,
} from './artifact-types';

describe('artifact-types', () => {
  describe('ArtifactStatus', () => {
    it('should accept valid status values', () => {
      expectTypeOf<'idle'>().toMatchTypeOf<ArtifactStatus>();
      expectTypeOf<'executing'>().toMatchTypeOf<ArtifactStatus>();
      expectTypeOf<'streaming'>().toMatchTypeOf<ArtifactStatus>();
      expectTypeOf<'complete'>().toMatchTypeOf<ArtifactStatus>();
      expectTypeOf<'error'>().toMatchTypeOf<ArtifactStatus>();
    });

    it('should reject invalid status values', () => {
      expectTypeOf<'loading'>().not.toMatchTypeOf<ArtifactStatus>();
    });
  });

  describe('ArtifactFile', () => {
    it('should have required fields', () => {
      expectTypeOf<ArtifactFile>().toHaveProperty('fileId');
      expectTypeOf<ArtifactFile>().toHaveProperty('fileName');
      expectTypeOf<ArtifactFile>().toHaveProperty('mediaType');
      expectTypeOf<ArtifactFile>().toHaveProperty('url');
    });
  });

  describe('CodeExecutionResult', () => {
    it('should have stdout, stderr, and exitCode', () => {
      expectTypeOf<CodeExecutionResult>().toHaveProperty('stdout');
      expectTypeOf<CodeExecutionResult>().toHaveProperty('stderr');
      expectTypeOf<CodeExecutionResult>().toHaveProperty('exitCode');
    });
  });

  describe('ArtifactExecuteRequest', () => {
    it('should require prompt and have optional fields', () => {
      expectTypeOf<ArtifactExecuteRequest>().toHaveProperty('prompt');
      expectTypeOf<ArtifactExecuteRequest>().toHaveProperty('code');
      expectTypeOf<ArtifactExecuteRequest>().toHaveProperty('language');
      expectTypeOf<ArtifactExecuteRequest>().toHaveProperty('containerId');
      expectTypeOf<ArtifactExecuteRequest>().toHaveProperty('skills');
    });
  });

  describe('ArtifactSSEEvent union', () => {
    it('should accept all event types', () => {
      expectTypeOf<ArtifactSSETextEvent>().toMatchTypeOf<ArtifactSSEEvent>();
      expectTypeOf<ArtifactSSECodeEvent>().toMatchTypeOf<ArtifactSSEEvent>();
      expectTypeOf<ArtifactSSEExecutionResultEvent>().toMatchTypeOf<ArtifactSSEEvent>();
      expectTypeOf<ArtifactSSEFileEvent>().toMatchTypeOf<ArtifactSSEEvent>();
      expectTypeOf<ArtifactSSEContainerEvent>().toMatchTypeOf<ArtifactSSEEvent>();
      expectTypeOf<ArtifactSSEErrorEvent>().toMatchTypeOf<ArtifactSSEEvent>();
    });

    it('should discriminate by type field', () => {
      const textEvent: ArtifactSSEEvent = { type: 'artifact_text', text: 'hello' };
      if (textEvent.type === 'artifact_text') {
        expectTypeOf(textEvent).toMatchTypeOf<ArtifactSSETextEvent>();
      }
    });
  });
});
