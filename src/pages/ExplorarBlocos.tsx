import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, TrendingUp, Target, Shield } from "lucide-react";
import { blocks } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const ExplorarBlocos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const { toast } = useToast();

  const filteredBlocks = blocks
    .filter(block => block.status === "captacao")
    .filter(block => {
      const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           block.purpose.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = sectorFilter === "all" || block.sector === sectorFilter;
      const matchesRisk = riskFilter === "all" || block.riskLevel === riskFilter;
      return matchesSearch && matchesSector && matchesRisk;
    });

  const handleAportar = (blockName: string) => {
    toast({
      title: "Fluxo de Investimento Iniciado",
      description: `Preparando aporte para ${blockName}. Em produção, você seria direcionado para o checkout.`,
    });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Baixo": return "text-positive bg-positive/10";
      case "Moderado": return "text-warning bg-warning/10";
      case "Alto": return "text-error bg-error/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-3 py-8">
        <h1 className="text-4xl font-bold">Explore Blocos de Liquidez Disponíveis</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Invista com rastreabilidade total do seu capital. Escolha blocos com base no propósito e no Score de Reputação.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou propósito do bloco..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por Setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Setores</SelectItem>
                <SelectItem value="Agronegócio">Agronegócio</SelectItem>
                <SelectItem value="Varejo">Varejo</SelectItem>
                <SelectItem value="Indústria">Indústria</SelectItem>
              </SelectContent>
            </Select>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por Risco" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Níveis</SelectItem>
                <SelectItem value="Baixo">Baixo</SelectItem>
                <SelectItem value="Moderado">Moderado</SelectItem>
                <SelectItem value="Alto">Alto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Exibindo {filteredBlocks.length} {filteredBlocks.length === 1 ? "bloco" : "blocos"} disponível(is) para captação
      </div>

      {/* Blocks Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlocks.map((block) => {
          const progress = (block.currentAmount / block.targetAmount) * 100;

          return (
            <Card key={block.id} className="flex flex-col hover:shadow-xl transition-all border-2 hover:border-primary/50">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl">{block.name}</CardTitle>
                  <Badge className={getRiskColor(block.riskLevel)}>
                    {block.riskLevel}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{block.purpose}</p>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Setor:</span>
                    <Badge variant="outline">{block.sector}</Badge>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-primary">Score Médio da Carteira</span>
                    </div>
                    <div className="text-3xl font-bold text-primary">{block.avgScore}/10</div>
                    <p className="text-xs text-muted-foreground mt-1">Baseado em Machine Learning</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        Status de Captação
                      </span>
                      <span className="text-sm font-bold">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          notation: "compact",
                          maximumFractionDigits: 1,
                        }).format(block.currentAmount)}
                      </span>
                      <span>
                        Meta: {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          notation: "compact",
                          maximumFractionDigits: 1,
                        }).format(block.targetAmount)}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Gestora: <span className="font-medium">{block.managedBy}</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleAportar(block.name)}
                  className="w-full"
                  size="lg"
                >
                  Aportar Agora
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredBlocks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum bloco encontrado com os filtros selecionados.</p>
        </div>
      )}
    </div>
  );
};

export default ExplorarBlocos;
