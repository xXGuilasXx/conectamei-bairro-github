import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface FeedbackItem {
  id: string;
  nome: string;
  nota: number;
  comentario: string;
  data: string;
}

const feedbacksIniciais: FeedbackItem[] = [
  { id: "1", nome: "Ana Paula", nota: 5, comentario: "Plataforma muito fácil de usar! Encontrei um encanador em minutos.", data: "2026-05-20" },
  { id: "2", nome: "Roberto", nota: 4, comentario: "Gostei da ideia, mas gostaria de mais prestadores na minha região.", data: "2026-05-18" },
  { id: "3", nome: "Fernanda", nota: 5, comentario: "Excelente iniciativa para o bairro. Já indiquei para vizinhos.", data: "2026-05-15" },
];

const FEEDBACKS_KEY = "conectamei_feedbacks";

function getFeedbacks(): FeedbackItem[] {
  try {
    const stored = localStorage.getItem(FEEDBACKS_KEY);
    if (!stored) return feedbacksIniciais;

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : feedbacksIniciais;
  } catch {
    return feedbacksIniciais;
  }
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="p-0.5 transition-transform hover:scale-110"
          aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
        >
          <Star
            size={24}
            className={n <= value ? "text-amber-400 fill-amber-400" : "text-gray-300"}
          />
        </button>
      ))}
    </div>
  );
}

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(getFeedbacks);
  const [nome, setNome] = useState("");
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(FEEDBACKS_KEY, JSON.stringify(feedbacks));
    } catch {
      // O MVP continua funcional mesmo se o navegador bloquear armazenamento local.
    }
  }, [feedbacks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || nota === 0 || !comentario.trim()) {
      toast.error("Preencha todos os campos e selecione uma nota.");
      return;
    }
    const novo: FeedbackItem = {
      id: crypto.randomUUID(),
      nome: nome.trim(),
      nota,
      comentario: comentario.trim(),
      data: new Date().toISOString().split("T")[0],
    };
    setFeedbacks([novo, ...feedbacks]);
    setNome("");
    setNota(0);
    setComentario("");
    toast.success("Feedback enviado! Obrigado por contribuir.");
  };

  const mediaNotas = feedbacks.length > 0
    ? (feedbacks.reduce((acc, f) => acc + f.nota, 0) / feedbacks.length).toFixed(1)
    : "0";

  return (
    <div className="py-10">
      <div className="container max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageSquare size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Feedback</h1>
            <p className="text-muted-foreground text-sm">Avalie a plataforma e ajude-nos a melhorar.</p>
          </div>
        </div>

        {/* Summary */}
        <div className="flex items-center gap-4 mb-8 p-4 bg-muted/50 rounded-xl">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-primary">{mediaNotas}</p>
            <div className="flex gap-0.5 justify-center mt-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={14} className={n <= Math.round(Number(mediaNotas)) ? "text-amber-400 fill-amber-400" : "text-gray-300"} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">{feedbacks.length} avaliações</p>
            <p className="text-xs text-muted-foreground">Média geral da plataforma</p>
          </div>
        </div>

        {/* Form */}
        <Card className="mb-10 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Deixe sua avaliação</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fb-nome">Seu nome</Label>
                <Input id="fb-nome" placeholder="Ex: João" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Nota</Label>
                <StarRating value={nota} onChange={setNota} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fb-comentario">Comentário</Label>
                <Textarea id="fb-comentario" placeholder="O que achou da plataforma?" rows={3} value={comentario} onChange={(e) => setComentario(e.target.value)} />
              </div>
              <Button type="submit">Enviar Feedback</Button>
            </form>
          </CardContent>
        </Card>

        {/* List */}
        <h2 className="text-xl font-bold mb-4">Avaliações recentes</h2>
        <div className="space-y-4">
          {feedbacks.map((f) => (
            <Card key={f.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{f.nome}</span>
                  <span className="text-xs text-muted-foreground">{new Date(f.data).toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} size={14} className={n <= f.nota ? "text-amber-400 fill-amber-400" : "text-gray-300"} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{f.comentario}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
