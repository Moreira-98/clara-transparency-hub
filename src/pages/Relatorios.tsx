import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Calendar, TrendingUp, X } from "lucide-react";
import { reports, blocks } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const Relatorios = () => {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const { toast } = useToast();

  const handleDownloadPDF = (reportId: string) => {
    toast({
      title: "Download Iniciado",
      description: "O relatório PDF está sendo preparado para download.",
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

  const getScoreColor = (score: number) => {
    if (score >= 9) return "text-positive";
    if (score >= 7.5) return "text-primary";
    if (score >= 6) return "text-warning";
    return "text-error";
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Relatórios de Transparência</h1>
        <p className="text-muted-foreground mt-1">
          Documentação periódica completa dos seus investimentos
        </p>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => {
          const block = blocks.find(b => b.id === report.blockId);

          return (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold">{report.blockName}</h3>
                        <Badge className={getRiskColor(report.riskLevel)}>
                          {report.riskLevel}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Período</p>
                          <p className="font-medium flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {report.period}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Investidor</p>
                          <p className="font-medium">{report.investor}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Aporte Total</p>
                          <p className="font-medium">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(report.totalInvestment)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Nota</p>
                          <p className={`font-bold text-lg ${getScoreColor(report.riskScore)}`}>
                            {report.riskScore}/10
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Emitido em {report.emittedDate}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button onClick={() => setSelectedReport(report)} variant="outline">
                      Ver Relatório
                    </Button>
                    <Button
                      onClick={() => handleDownloadPDF(report.id)}
                      variant="default"
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Baixar PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Report Detail Modal */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedReport && (() => {
            const block = blocks.find(b => b.id === selectedReport.blockId);
            
            return (
              <>
                <DialogHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <DialogTitle className="text-2xl">Relatório de Transparência</DialogTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedReport.blockName} - {selectedReport.period}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedReport(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Investor Info */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Investidor</p>
                      <p className="font-semibold">{selectedReport.investor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Aporte Total</p>
                      <p className="font-semibold">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(selectedReport.totalInvestment)}
                      </p>
                    </div>
                  </div>

                  {/* Risk Score */}
                  <div className="flex items-center gap-4 p-6 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Risco Agregado</p>
                        <p className="text-2xl font-bold">{selectedReport.riskLevel}</p>
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm text-muted-foreground">Nota</p>
                      <p className={`text-3xl font-bold ${getScoreColor(selectedReport.riskScore)}`}>
                        {selectedReport.riskScore}/10
                      </p>
                    </div>
                  </div>

                  {/* Capital Tracking */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Rastreamento do Capital
                    </h3>
                    <div className="border rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Empresa</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {block?.companies.map((company, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{company.name}</TableCell>
                              <TableCell>
                                {new Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(company.value)}
                              </TableCell>
                              <TableCell>
                                <Badge className={getScoreColor(company.score) + " bg-transparent border"}>
                                  {company.score}/10
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={company.status === "Em dia" ? "default" : "secondary"}
                                  className={company.status === "Em dia" ? "bg-positive text-white" : "bg-warning text-white"}
                                >
                                  {company.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Emitido em {selectedReport.emittedDate}
                    </div>
                    <Button onClick={() => handleDownloadPDF(selectedReport.id)} className="gap-2">
                      <Download className="h-4 w-4" />
                      Baixar PDF
                    </Button>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Relatorios;
