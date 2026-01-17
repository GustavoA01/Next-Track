import Link from "next/link";

const PrivacyPage = () => (
  <div className="p-8 space-y-8">
    <h1 className="text-2xl font-bold mb-4">
      Política de Privacidade e Termos de Uso
    </h1>
    <p>
      O Next Track utiliza a API do Spotify para ler suas playlists apenas para
      fins de recomendação musical via IA. Nenhum dado pessoal é armazenado
      permanentemente ou compartilhado com terceiros. Dados utilizados
      exclusivamente para contexto, sem uso em treinamento de modelos.
    </p>

    <Link
      href="/"
      className="px-4 py-2 bg-primary text-black rounded-md hover:bg-primary/70 transition"
    >
      Voltar para a Página Inicial
    </Link>
  </div>
);

export default PrivacyPage;
