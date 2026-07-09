import { chatSchema } from '../chatSchema';

describe('chatSchema', () => {
  it('should accept a non-empty prompt', () => {
    const result = chatSchema.safeParse({ prompt: 'Recomende músicas calmas' });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.prompt).toBe('Recomende músicas calmas');
    }
  });

  it('should reject an empty prompt', () => {
    const result = chatSchema.safeParse({ prompt: '' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Você precisa inserir uma mensagem.'
      );
    }
  });

  it('should reject missing prompt field', () => {
    const result = chatSchema.safeParse({});

    expect(result.success).toBe(false);
  });
});
