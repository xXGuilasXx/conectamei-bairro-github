import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Search,
  FileText,
  Star,
  Users,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { bairros, categorias, prestadores } from "@/lib/data";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663511049766/AMmQMALUQtyfHWkNibXH3y/hero-community-PU24Zyiw7cZ2kgmYL2Uq5T.webp";
const NEIGHBORS_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663511049766/AMmQMALUQtyfHWkNibXH3y/happy-neighbors-arccbxGySXosCPG3REQxm6.webp";

const steps = [
  {
    icon: Search,
    title: "Busque",
    desc: "Encontre profissionais MEI por categoria e bairro.",
  },
  {
    icon: FileText,
    title: "Solicite",
    desc: "Envie um pedido de orçamento em segundos.",
  },
  {
    icon: Star,
    title: "Avalie",
    desc: "Compartilhe sua experiência e ajude a comunidade.",
  },
];

const stats = [
  { value: String(prestadores.length), label: "Prestadores cadastrados" },
  { value: String(categorias.length), label: "Categorias de serviço" },
  { value: String(bairros.length), label: "Bairros atendidos" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Comunidade vibrante"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative container py-24 md:py-36 lg:py-44">
          <div className="max-w-xl space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-xs font-semibold backdrop-blur-sm border border-white/20">
              <MapPin size={14} /> Serviços do seu bairro
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Conecte-se aos{" "}
              <span className="text-green-300">profissionais</span> da sua
              comunidade
            </h1>
            <p className="text-lg text-white/85 leading-relaxed max-w-md">
              Encontre MEIs locais de confiança, solicite orçamentos e fortaleça
              a economia do seu bairro.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Link href="/catalogo">
                  Explorar Catálogo <ArrowRight size={18} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
              >
                <Link href="/solicitar-orcamento">Solicitar Orçamento</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-5">
        <div className="container flex flex-wrap justify-center gap-8 md:gap-16">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-white">{s.value}</p>
              <p className="text-sm text-primary-foreground/80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">
              Como funciona
            </h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Em três passos simples você encontra o profissional ideal para a
              sua necessidade.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <Card
                key={title}
                className="relative border-none shadow-md hover:shadow-lg transition-shadow duration-200 group"
              >
                <CardContent className="pt-8 pb-6 px-6 text-center space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon size={28} className="text-primary" />
                  </div>
                  <span className="absolute top-4 right-4 text-xs font-bold text-muted-foreground/50">{`0${i + 1}`}</span>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="text-muted-foreground text-sm">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-20 bg-secondary/30">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              Por que confiar no ConectaMEI?
            </h2>
            <ul className="space-y-4">
              {[
                {
                  icon: ShieldCheck,
                  text: "Prestadores formalizados como MEI",
                },
                { icon: Users, text: "Indicações da própria comunidade" },
                { icon: Star, text: "Avaliações transparentes de vizinhos" },
                { icon: MapPin, text: "Profissionais do seu bairro" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{text}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-2 gap-2">
              <Link href="/catalogo">
                Ver prestadores <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={NEIGHBORS_IMG}
              alt="Vizinhos usando a plataforma"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
