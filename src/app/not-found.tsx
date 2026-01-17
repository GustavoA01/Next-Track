import Link from "next/link"

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen text-center px-4">
    <h1 className="text-4xl font-bold mb-4">404 - Página Não Encontrada</h1>
    <p className="mb-8">
      A página que você está procurando não existe ou foi movida.
    </p>
    
    <Link
      href="/"
      className="px-4 py-2 bg-primary text-black rounded-md hover:bg-primary/70 transition"
    >
      Voltar para a Página Inicial
    </Link>
  </div>
)

export default NotFound
