import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Target, Shield, Calendar } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { managerKPIs, blockPerformance, sectorDistribution } from "@/lib/mockData";

const PainelGestora = () => {
  const [timeFilter, setTimeFilter] = useState("month");

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Painel da Gestora</h1>
          <p className="text-muted-foreground mt-1">
            Monitoramento de KPIs e desempenho dos Blocos de Liquidez
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
              <SelectItem value="year">Este Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              TCT - Transparência Entregue
            </CardTitle>
            <Shield className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-primary">
                  {managerKPIs.tct.current}%
                </span>
                <span className="text-sm text-muted-foreground pb-1">
                  / Meta: {managerKPIs.tct.target}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(managerKPIs.tct.current / managerKPIs.tct.target) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4 text-positive" />
                <span className="text-positive font-medium">Tendência positiva</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Percentual do capital com relatório emitido em ≤30 dias
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Adoção do Mecanismo
            </CardTitle>
            <Target className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-primary">
                  {managerKPIs.adoption.current}%
                </span>
                <span className="text-sm text-muted-foreground pb-1">
                  / Meta: {managerKPIs.adoption.target}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(managerKPIs.adoption.current / managerKPIs.adoption.target) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4 text-positive" />
                <span className="text-positive font-medium">Em crescimento</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Percentual de Blocos de Liquidez adotando a plataforma
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Resultado no Crédito
            </CardTitle>
            <TrendingDown className="h-5 w-5 text-positive" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-positive">
                  ↓{managerKPIs.creditResult.current}%
                </span>
                <span className="text-sm text-muted-foreground pb-1">
                  / Meta: ↓{managerKPIs.creditResult.target}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-positive h-2 rounded-full transition-all"
                  style={{ width: `${(managerKPIs.creditResult.current / managerKPIs.creditResult.target) * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingDown className="h-4 w-4 text-positive" />
                <span className="text-positive font-medium">Redução efetiva</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Redução da inadimplência comparado ao período anterior
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Block Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Bloco de Liquidez</CardTitle>
            <p className="text-sm text-muted-foreground">
              Comparação de TCT e Inadimplência
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={blockPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="tct" name="TCT (%)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inadimplencia" name="Inadimplência (%)" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sector Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Setor</CardTitle>
            <p className="text-sm text-muted-foreground">
              Alocação de capital e Score médio
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectorDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ sector, avgScore }) => `${sector} (${avgScore})`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sectorDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number, name: string, props: any) => {
                    if (name === "value") {
                      return [
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          notation: "compact",
                          maximumFractionDigits: 1,
                        }).format(value),
                        "Capital Alocado",
                      ];
                    }
                    return [value, name];
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total de Blocos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">Em captação ativa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Capital Total Gerenciado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(700000000)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Através da plataforma</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Empresas Financiadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">10</div>
            <p className="text-xs text-muted-foreground mt-1">Distribuídas nos blocos</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PainelGestora;
