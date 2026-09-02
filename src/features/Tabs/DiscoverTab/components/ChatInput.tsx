import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';
import { UseFormRegister } from 'react-hook-form';

type ChatInputProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleOnKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isResponseLoading: boolean;
  register: UseFormRegister<{
    prompt: string;
  }>;
  errorMessage?: string;
};

export const ChatInput = ({
  onSubmit,
  handleOnKeyDown,
  isResponseLoading,
  register,
  errorMessage,
}: ChatInputProps) => (
  <form onSubmit={onSubmit} className="space-y-2">
    <div className="flex w-full items-end gap-2 rounded-3xl bg-input/30 p-2 pl-4">
      <Textarea
        {...register('prompt')}
        onKeyDown={handleOnKeyDown}
        disabled={isResponseLoading}
        placeholder="Peça músicas..."
        className="min-h-9 max-h-20 w-full resize-none border-none bg-transparent px-0 py-2 shadow-none hide-scrollbar max-sm:text-sm focus-visible:ring-0 dark:bg-transparent"
      />
      <Button
        size="icon"
        type="submit"
        disabled={isResponseLoading}
        className="group shrink-0 rounded-full"
      >
        {isResponseLoading ? (
          <Spinner />
        ) : (
          <Sparkles className="transition-all duration-200 group-hover:text-white" />
        )}
      </Button>
    </div>
    {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
  </form>
);
