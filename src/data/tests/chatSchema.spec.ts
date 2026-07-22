import { chatSchema } from '../chatSchema';

describe('chatSchema', () => {
  it('should accept a non-empty prompt', () => {
    expect(
      chatSchema.safeParse({ prompt: 'Recomende músicas calmas' })
    ).toEqual({
      success: true,
      data: { prompt: 'Recomende músicas calmas' },
    });
  });

  it('should reject an empty prompt', () => {
    const result = chatSchema.safeParse({ prompt: '' });

    expect(result.success).toBe(false);
    expect(result).toMatchObject({
      success: false,
      error: {
        issues: [
          expect.objectContaining({
            message: 'Você precisa inserir uma mensagem.',
          }),
        ],
      },
    });
  });

  it('should reject missing prompt field', () => {
    const result = chatSchema.safeParse({});

    expect(result.success).toBe(false);
  });
});
