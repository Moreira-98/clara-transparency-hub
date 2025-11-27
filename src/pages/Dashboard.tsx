import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Wallet, ShieldCheck, ArrowRight } from "lucide-react";
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { investorPortfolio, blocks, monthlyReturns } from "@/lib/mockData";

const Dashboard = () => {
  const totalInvested = investorPortfolio.reduce((sum, item) => sum + item.investedAmount, 0);
  const totalCurrent = investorPortfolio.reduce((sum, item) => sum + item.currentValue, 0);
  const totalReturn = ((totalCurrent - totalInvested) / totalInvested) * 100;
  const tct = 94; // Mock TCT percentage

  const portfolioDistribution = investorPortfolio.map(item => {
    const block = blocks.find(b => b.id === item.blockId);
    return {
      name: block?.name || "",
      value: item.currentValue,
    };
  });

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard do Investidor</h1>
          <p className="text-muted-foreground mt-1">Rastreabilidade total do seu capital</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patrimônio Total Investido</CardTitle>
            <Wallet className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalCurrent)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Investido: {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(totalInvested)}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-4 w-4 text-positive" />
              <span className="text-sm font-medium text-positive">+{totalReturn.toFixed(2)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transparência Entregue (TCT)</CardTitle>
            <ShieldCheck className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{tct}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Relatórios emitidos ≤30 dias
            </p>
            <div className="w-full bg-muted rounded-full h-2 mt-3">
              <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${tct}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retorno do Mês Atual</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-positive">
              +{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(monthlyReturns[monthlyReturns.length - 1].monthReturn)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Acumulado: {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(monthlyReturns[monthlyReturns.length - 1].accumulated)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Returns Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Variação Mensal do Investimento</CardTitle>
            <p className="text-sm text-muted-foreground">Retorno acumulado e mensal</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyReturns}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [
                    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value),
                    "",
                  ]}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="accumulated"
                  name="Retorno Acumulado"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
                <Line
                  type="monotone"
                  dataKey="monthReturn"
                  name="Retorno do Mês"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Portfolio Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição do Patrimônio</CardTitle>
            <p className="text-sm text-muted-foreground">Por bloco de liquidez</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={portfolioDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {portfolioDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [
                    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value),
                    "Valor",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Investor's Blocks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Seus Blocos de Liquidez</h2>
          <Link to="/blocos" className="text-sm text-primary hover:underline flex items-center gap-1">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {investorPortfolio.map((item) => {
            const block = blocks.find(b => b.id === item.blockId);
            if (!block) return null;

            return (
              <Link key={item.blockId} to={`/blocos/${item.blockId}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{block.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{block.purpose}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        Score Médio: {block.avgScore}/10
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Valor Investido</p>
                        <p className="text-lg font-bold">
                          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.investedAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Valor Atual</p>
                        <p className="text-lg font-bold text-positive">
                          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(item.currentValue)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-positive" />
                      <span className="text-sm font-medium text-positive">+{item.return.toFixed(2)}%</span>
                      <span className="text-xs text-muted-foreground">retorno acumulado</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
