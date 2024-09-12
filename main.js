// Função para calcular o custo dos garçons
function calcularCusto() {
    const numeroGarcons = parseInt(document.getElementById('garcons').value);
    const horasEvento = parseInt(document.getElementById('horas').value);
    const custoPorGarcom = 10.50;

    if (numeroGarcons <= 0) {
        document.getElementById('custoGarcons').innerText = "Erro: Número de garçons inválido.";
        return;
    }

    if (horasEvento <= 0) {
        document.getElementById('custoGarcons').innerText = "Erro: Quantidade de horas inválida.";
        return;
    }

    const custoTotal = numeroGarcons * horasEvento * custoPorGarcom;
    document.getElementById('custoGarcons').innerText = `Custo total: R$ ${custoTotal.toFixed(2)}`;

    // Armazenar dados no localStorage
    localStorage.setItem('numeroGarcons', numeroGarcons);
    localStorage.setItem('horasEvento', horasEvento);
    localStorage.setItem('custoTotal', custoTotal.toFixed(2));
}

// Função para calcular alimentos e bebidas
function calcularAlimentos() {
    const convidados = parseInt(document.getElementById('convidados').value);

    if (convidados < 30 || convidados > 350) {
        document.getElementById('alimentos').innerText = "Número de convidados inválido.";
        return;
    }

    const totalCafe = (convidados * 0.2).toFixed(2);
    const totalAgua = (convidados * 0.5).toFixed(2);
    const totalSalgadinhos = convidados * 7;

    document.getElementById('alimentos').innerText = `${totalCafe} litro(s) de café, ${totalAgua} litro(s) de água, ${totalSalgadinhos} salgadinho(s)`;

    // Armazenar dados no localStorage
    localStorage.setItem('convidados', convidados);
    localStorage.setItem('alimentos', document.getElementById('alimentos').innerText);
}

// Função para escolher o auditório
function escolherAuditorio() {
    const convidados = parseInt(document.getElementById('convidados').value);

    if (convidados <= 0 || convidados > 350) {
        document.getElementById('auditorio').innerText = "Número de convidados inválido.";
        return;
    }

    let mensagem = '';
    if (convidados <= 150) {
        mensagem = "Use o auditório Alfa";
    } else if (convidados <= 220) {
        mensagem = `Use o auditório Alfa e inclua mais ${convidados - 150} cadeiras`;
    } else if (convidados <= 350) {
        mensagem = "Use o auditório Beta";
    }

    document.getElementById('auditorio').innerText = mensagem;

    // Armazenar dados no localStorage
    localStorage.setItem('auditorio', mensagem);
}

// Função para gerar o PDF
function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Obter os dados da localStorage
    const numeroGarcons = localStorage.getItem('numeroGarcons') || "Não informado";
    const horasEvento = localStorage.getItem('horasEvento') || "Não informado";
    const custoGarcons = localStorage.getItem('custoTotal') ? `R$ ${localStorage.getItem('custoTotal')}` : "Não informado";
    
    const convidados = localStorage.getItem('convidados') || "Não informado";
    const alimentos = localStorage.getItem('alimentos') || "Não informado";
    const auditorio = localStorage.getItem('auditorio') || "Não informado";

    // Adicionar conteúdo da página index.html ao PDF
    doc.setFontSize(18);
    doc.text("Relatório de Gerenciamento de Eventos", 10, 10);
    doc.setFontSize(12);
    doc.text("Dados do Evento:", 10, 20);
    doc.text(`Número de garçons: ${numeroGarcons}`, 10, 30);
    doc.text(`Horas do evento: ${horasEvento}`, 10, 40);
    doc.text(`Custo total dos garçons: ${custoGarcons}`, 10, 50);
    
    doc.text("Alimentos e Bebidas:", 10, 60);
    doc.text(alimentos, 10, 70);
    
    doc.text("Auditório sugerido:", 10, 80);
    doc.text(auditorio, 10, 90);

    // Adicionar nova página com a tabela de auditórios
    doc.addPage();
    doc.setFontSize(18);
    doc.text("Tabela de Auditórios", 10, 10);

    // Usando jsPDF AutoTable para gerar a tabela no PDF
    doc.autoTable({
        head: [['Auditório', 'Capacidade Máxima']],
        body: [
            ['Alfa', '150'],
            ['Beta', '350'],
            ['Gama', '500']
        ]
    });

    // Salvar o arquivo PDF
    doc.save('relatorio_evento.pdf');
}
