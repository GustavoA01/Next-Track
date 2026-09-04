import { redirectToAuthCodeFlow } from '@/actions/redirectFlow';
import { Button } from './ui/button';

export const ConnectAccountButton = () => (
  <form action={redirectToAuthCodeFlow}>
    <Button type="submit" className="rounded-full sm:text-md font-semibold">
      Conectar
    </Button>
  </form>
);
