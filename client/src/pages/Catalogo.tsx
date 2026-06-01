import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, MapPin, Phone, ArrowRight } from "lucide-react";
import { prestadores, categorias, bairros } from "@/lib/data";

const SERVICE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663511049766/AMmQMALUQtyfHWkNibXH3y/service-provider-7HYnMPWz4kYcqG9vLhHbZZ.webp";

export default function Catalogo() {
  const [catFiltro, setCatFiltro] = useState("todas");
  const [bairroFiltro, setBairroFiltro] = useState("todos");

  const filtrados = prestadores.filter(p => {
    const catOk = catFiltro === "todas" || p.categoria === catFiltro;
    const bairroOk = bairroFiltro === "todos" || p.bairro === bairroFiltro;
    return catOk && bairroOk;
  });

  return (
    <div className="py-10">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-10">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Catálogo de Prestadores</h1>
            <p className="text-muted-foreground mt-1">
              Encontre profissionais MEI do seu bairro por categoria de serviço.
            </p>
          </div>
          <img
            src={SERVICE_IMG}
            alt="Prestador MEI"
            className="w-28 h-28 rounded-2xl object-cover shadow-md hidden md:block"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-muted/50 rounded-xl">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Categoria
            </label>
            <Select value={catFiltro} onValueChange={setCatFiltro}>
              <SelectTrigger className="w-48 bg-white">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as categorias</SelectItem>
                {categorias.map(c => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Bairro
            </label>
            <Select value={bairroFiltro} onValueChange={setBairroFiltro}>
              <SelectTrigger className="w-48 bg-white">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os bairros</SelectItem>
                {bairros.map(b => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCatFiltro("todas");
                setBairroFiltro("todos");
              }}
            >
              Limpar filtros
            </Button>
          </div>
        </div>

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-4">
          {filtrados.length} prestador(es) encontrado(s)
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map(p => (
            <Card
              key={p.id}
              className="group hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                      {p.nome}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {p.categoria}
                      </Badge>
                      {p.disponivel ? (
                        <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />{" "}
                          Disponível
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground font-medium">
                          Indisponível
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-semibold">{p.avaliacao}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {p.descricao}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin size={13} /> {p.bairro}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Phone size={13} /> {p.telefone}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.servicos.map(s => (
                    <span
                      key={s}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-primary/5 text-primary font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {p.disponivel ? (
                  <Button asChild size="sm" className="w-full mt-2 gap-1.5">
                    <Link href={`/solicitar-orcamento/${p.id}`}>
                      Solicitar Orçamento <ArrowRight size={14} />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-2"
                    disabled
                  >
                    Temporariamente indisponível
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filtrados.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              Nenhum prestador encontrado com os filtros selecionados.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setCatFiltro("todas");
                setBairroFiltro("todos");
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
