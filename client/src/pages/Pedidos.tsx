import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, Clock, CheckCircle2, Package } from "lucide-react";
import { getPedidos, updatePedidoStatus, type Pedido } from "@/lib/data";

const statusConfig = {
  pendente: { label: "Pendente", color: "bg-amber-100 text-amber-800", icon: Clock },
  aceito: { label: "Aceito", color: "bg-blue-100 text-blue-800", icon: Package },
  concluido: { label: "Concluído", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
};

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    setPedidos(getPedidos());
  }, []);

  const handleStatusChange = (id: string, status: Pedido["status"]) => {
    updatePedidoStatus(id, status);
    setPedidos(getPedidos());
  };

  return (
    <div className="py-10">
      <div className="container max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
            <ClipboardList size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Meus Pedidos</h1>
            <p className="text-muted-foreground text-sm">Acompanhe suas solicitações de orçamento.</p>
          </div>
        </div>

        {pedidos.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
              <ClipboardList size={28} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Nenhum pedido realizado ainda.</p>
            <p className="text-sm text-muted-foreground">Solicite um orçamento no catálogo para começar.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pedidos.slice().reverse().map((pedido) => {
              const cfg = statusConfig[pedido.status];
              const Icon = cfg.icon;
              return (
                <Card key={pedido.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{pedido.prestadorNome}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{pedido.descricao}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary" className="text-xs">{pedido.categoria}</Badge>
                          <span>{pedido.solicitanteNome || "Solicitante"}</span>
                          <span>{new Date(pedido.data).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
                          <Icon size={12} /> {cfg.label}
                        </span>
                        {pedido.status === "pendente" && (
                          <Button size="sm" variant="outline" onClick={() => handleStatusChange(pedido.id, "aceito")}>
                            Simular aceite
                          </Button>
                        )}
                        {pedido.status === "aceito" && (
                          <Button size="sm" variant="outline" onClick={() => handleStatusChange(pedido.id, "concluido")}>
                            Concluir
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
