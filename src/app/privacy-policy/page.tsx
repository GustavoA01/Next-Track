import Link from "next/link";

const PrivacyPolicyPage = () => (
  <div className="max-w-2xl space-y-8 p-4 flex flex-col items-center justify-center min-h-screen m-auto">
    <h1 className="text-2xl font-bold mb-4">
      Política de Privacidade e Termos de Uso
    </h1>
    <ul className="list-disc pl-5 space-y-2">
      <li>
        O Next Track utiliza a API do Spotify para autenticação e leitura
        temporária das playlists.
      </li>
      <li>Os dados são processados pela IA apenas para gerar recomendações.</li>
      <li>
        O histórico da conversa é salvo apenas para seu acesso pessoal. Essas
        informações não são utilizadas para treinamento de modelos ou fins
        publicitários.
      </li>
    </ul>

    <Link
      href="/"
      className="px-4 py-2 bg-primary text-black rounded-md hover:bg-primary/90 transition"
    >
      Voltar para a Página Inicial
    </Link>
  </div>
);

export default PrivacyPolicyPage;
