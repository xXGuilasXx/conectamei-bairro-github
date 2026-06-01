import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { prestadores, categorias, addPedido } from "@/lib/data";

export default function SolicitarOrcamento() {
  const params = useParams<{ prestadorId?: string }>();
  const [, navigate] = useLocation();
  const prestadoresDisponiveis = prestadores.filter(p => p.disponivel);
  const prestadorPre = params.prestadorId
    ? prestadoresDisponiveis.find(p => p.id === params.prestadorId)
    : null;

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    prestadorId: prestadorPre?.id || "",
    descricao: "",
    categoria: prestadorPre?.categoria || "",
  });
  const [enviado, setEnviado] = useState(false);

  const handlePrestadorChange = (prestadorId: string) => {
    const prestador = prestadoresDisponiveis.find(p => p.id === prestadorId);
    setForm(current => ({
      ...current,
      prestadorId,
      categoria: prestador?.categoria || current.categoria,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.descricao.trim() || !form.prestadorId) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    const prestador = prestadoresDisponiveis.find(
      p => p.id === form.prestadorId
    );
    if (!prestador) {
      toast.error("Selecione um prestador disponível.");
      return;
    }

    addPedido({
      prestadorId: form.prestadorId,
      prestadorNome: prestador.nome,
      categoria: prestador.categoria,
      solicitanteNome: form.nome.trim(),
      solicitanteTelefone: form.telefone.trim() || undefined,
      descricao: form.descricao.trim(),
    });
    setEnviado(true);
    toast.success("Orçamento solicitado com sucesso!");
  };

  if (enviado) {
    return (
      <div className="py-20">
        <div className="container max-w-lg text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold">Solicitação Enviada!</h2>
          <p className="text-muted-foreground">
            Seu pedido de orçamento foi registrado. O prestador receberá a
            notificação e entrará em contato.
          </p>
          <div className="flex justify-center gap-3">
            <Button onClick={() => navigate("/pedidos")}>
              Ver meus pedidos
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setEnviado(false);
                setForm({
                  nome: "",
                  telefone: "",
                  prestadorId: "",
                  descricao: "",
                  categoria: "",
                });
              }}
            >
              Nova solicitação
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">Solicitar Orçamento</h1>
        <p className="text-muted-foreground mb-8">
          Preencha o formulário abaixo para enviar sua solicitação ao prestador
          escolhido.
        </p>

        {params.prestadorId && !prestadorPre && (
          <div className="mb-6 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>
              O prestador selecionado não está disponível para novos orçamentos.
              Escolha outro profissional no formulário.
            </p>
          </div>
        )}

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Dados da Solicitação</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Seu nome *</Label>
                  <Input
                    id="nome"
                    placeholder="Ex: Maria Silva"
                    value={form.nome}
                    onChange={e => setForm({ ...form, nome: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone para contato</Label>
                  <Input
                    id="telefone"
                    placeholder="(11) 99999-0000"
                    value={form.telefone}
                    onChange={e =>
                      setForm({ ...form, telefone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Prestador *</Label>
                <Select
                  value={form.prestadorId}
                  onValueChange={handlePrestadorChange}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione um prestador" />
                  </SelectTrigger>
                  <SelectContent>
                    {prestadoresDisponiveis.map(p => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.nome} — {p.categoria} ({p.bairro})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={form.categoria}
                  onValueChange={v => setForm({ ...form, categoria: v })}
                  disabled={Boolean(form.prestadorId)}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map(c => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">
                  Descrição do serviço necessário *
                </Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva o que precisa, local, urgência, etc."
                  rows={4}
                  value={form.descricao}
                  onChange={e =>
                    setForm({ ...form, descricao: e.target.value })
                  }
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Enviar Solicitação de Orçamento
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
