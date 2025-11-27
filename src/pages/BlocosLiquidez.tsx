import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, ArrowLeft, TrendingUp, Building2, DollarSign, Calendar, BarChart3 } from "lucide-react";
import { blocks, companyDetails } from "@/lib/mockData";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const BlocosLiquidez = () => {
  const { blockId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  // If no blockId, show list of all blocks
  if (!blockId) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Blocos de Liquidez</h1>
        <p className="text-muted-foreground">Selecione um bloco para ver os detalhes de alocação</p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block) => (
            <Link key={block.id} to={`/blocos/${block.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50">
                <CardHeader>
                  <CardTitle>{block.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{block.purpose}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Score Médio:</span>
                    <Badge className="bg-primary/10 text-primary">{block.avgScore}/10</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const block = blocks.find(b => b.id === blockId);

  if (!block) {
    return (
      <div className="container mx-auto p-6">
        <p>Bloco não encontrado</p>
        <Link to="/blocos">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
      </div>
    );
  }

  const filteredCompanies = block.companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const companyDetail = selectedCompany ? companyDetails[selectedCompany] : null;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Baixo": return "text-positive bg-positive/10";
      case "Moderado": return "text-warning bg-warning/10";
      case "Alto": return "text-error bg-error/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return "text-positive bg-positive/10";
    if (score >= 7.5) return "text-primary bg-primary/10";
    if (score >= 6) return "text-warning bg-warning/10";
    return "text-error bg-error/10";
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/blocos">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{block.name}</h1>
          <p className="text-muted-foreground mt-1">{block.purpose}</p>
        </div>
      </div>

      {/* Block Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Score Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{block.avgScore}/10</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Risco Agregado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={getRiskColor(block.riskLevel)}>
              {block.riskLevel} {block.riskScore}/10
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Valor Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(block.currentAmount)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Empresas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{block.companies.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Companies Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Empresas Financiadas</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Rastreamento completo do capital alocado
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar empresa ou setor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Valor Alocado</TableHead>
                  <TableHead>Taxa</TableHead>
                  <TableHead>Prazo</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.sector}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(company.value)}
                    </TableCell>
                    <TableCell>{company.rate}</TableCell>
                    <TableCell>{company.term}</TableCell>
                    <TableCell>
                      <Badge className={getScoreColor(company.score)}>
                        {company.score}/10
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={company.status === "Em dia" ? "default" : "secondary"}>
                        {company.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {companyDetails[company.name] && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCompany(company.name)}
                        >
                          Ver Detalhes
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma empresa encontrada
            </div>
          )}
        </CardContent>
      </Card>

      {/* Company Detail Modal */}
      <Dialog open={!!selectedCompany} onOpenChange={() => setSelectedCompany(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {companyDetail && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Ranking de Reputação</DialogTitle>
                <p className="text-sm text-muted-foreground">Análise detalhada do score de credibilidade</p>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Company Header */}
                <div className="flex items-center gap-4 p-6 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-primary text-primary-foreground rounded-full">
                    <div className="text-3xl font-bold">{companyDetail.score.toFixed(1)}</div>
                    <div className="text-xs">de 10</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{companyDetail.name}</h3>
                    <p className="text-muted-foreground">{companyDetail.sector}</p>
                    <div className="flex gap-2 mt-2">
                      {companyDetail.badges.map((badge: string, idx: number) => (
                        <Badge key={idx} variant="outline">{badge}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Score Components */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Detalhamento do Score de Credibilidade</h4>
                  <div className="space-y-4">
                    {companyDetail.components.map((component: any, idx: number) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{component.criterion}</p>
                            <p className="text-xs text-muted-foreground">Fonte: {component.source}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">Score: {component.score.toFixed(1)}</p>
                            <p className="text-xs text-muted-foreground">
                              Peso: {component.weight}% | Contrib: {component.contribution.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${(component.score / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary Table */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Resumo dos Componentes</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Critério</TableHead>
                        <TableHead>Peso</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Contribuição</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {companyDetail.components.map((component: any, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{component.criterion}</TableCell>
                          <TableCell>{component.weight}%</TableCell>
                          <TableCell>{component.score.toFixed(1)}</TableCell>
                          <TableCell>{component.contribution.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="font-bold bg-primary/5">
                        <TableCell>Score Final</TableCell>
                        <TableCell>100%</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{companyDetail.score.toFixed(1)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Monthly Evolution */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Evolução Mensal do Score</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={companyDetail.monthlyScores}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis domain={[0, 10]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        name="Score"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Methodology */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Metodologia do Score</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Motor de Data Science:</strong> O score é calculado por um modelo de Machine Learning que processa dados de múltiplas fontes em tempo real.
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li><strong>Dados da Clara:</strong> Histórico de pagamentos dentro dos FIDCs da plataforma</li>
                    <li><strong>Dados Proprietários Nuclea:</strong> Comportamento em outros sistemas financeiros (SLCC+)</li>
                    <li><strong>Fontes Externas:</strong> Informações públicas (BACEN, Receita Federal, bureaus de crédito)</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlocosLiquidez;
