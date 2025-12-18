import Link from "next/link";
import { Upload, Activity, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            VMware Log Analysis System
          </h1>
          <p className="text-muted-foreground text-lg">
            Analise logs VMware com timeline visual, drilldown por componentes e
            filtros avançados
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Link
            href="/upload"
            className="p-6 border rounded-lg hover:bg-accent transition-colors"
          >
            <Upload className="w-8 h-8 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Upload de Logs</h2>
            <p className="text-muted-foreground">
              Faça upload de arquivos .log ou .txt para análise
            </p>
          </Link>

          <Link
            href="/timeline"
            className="p-6 border rounded-lg hover:bg-accent transition-colors"
          >
            <Activity className="w-8 h-8 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Timeline</h2>
            <p className="text-muted-foreground">
              Visualize todos os eventos em uma timeline interativa
            </p>
          </Link>

          <Link
            href="/analyze"
            className="p-6 border rounded-lg hover:bg-accent transition-colors"
          >
            <Search className="w-8 h-8 mb-4 text-primary" />
            <h2 className="text-xl font-semibold mb-2">Análise</h2>
            <p className="text-muted-foreground">
              Analise logs detalhadamente com drilldown por componentes
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
