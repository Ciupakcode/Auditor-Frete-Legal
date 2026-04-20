export type Language = 'pt' | 'es';

export const translations = {
  pt: {
    appTitle: "Auditor Frete Legal",
    appSubtitle: "V1.4 - Fiscalização Portuária",
    listaNegra: "Lista Negra",
    todos: "Todos",
    riscoCritico: "Risco Crítico",
    sobInvestigacao: "Sob Invest.",
    empresa: "Empresa",
    infracoes: "Infrações",
    status: "Status",
    nenhumRegistro: "Nenhum registro encontrado.",
    lblDecreto5791: "Base mínima de negociação.",
    lblDecreto2327: "Multa 10 jornales (Carta Fraude).",
    
    mainTitle: "Auditoria de Carga em Tempo Real",
    mainDesc: "Proteja seu patrimônio contra o subfaturamento logístico.",
    btnGuide: "Guia Rápido da Lei",
    btnGuideHide: "Ocultar Guia",
    
    guideTitle: "GUIA RÁPIDO: OPERAÇÃO FRETE LEGAL",
    guide1Title: "1. CONSULTE A EMPRESA 🔴",
    guide1Desc: "Antes de fechar o frete, digite o nome. O Alerta Vermelho indica histórico de pagar abaixo do custo legal.",
    guide2Title: "2. AUDITE O PREÇO ⚖️",
    guide2Desc: "O frete NUNCA pode ser menor que o Custo Operativo (Art. 4º - Decreto 5.791/2021). O app calcula o valor mínimo.",
    guide3Title: "3. CARTA DE FLETE OBRIGATÓRIA 📄",
    guide3Desc: "Exija o documento de porte obrigatório. Sem ela ou com dados falsos, a multa é de 10 JORNALES (Decreto 2.327/2024).",
    guide4Title: "4. DENUNCIE NO ATO! 📲",
    guide4Desc: "O app gera a denúncia completa para o WhatsApp da DINATRAN (0962) 35 22 25. Tenha fotos do Painel e da Carta de Flete.",
    
    alertIlegalTitle: "ALERTA: FRETE ILEGAL DETECTADO",
    alertIlegalDesc: "O valor oferecido está abaixo do piso mínimo legal obrigatório.",
    
    scannerTitle: "Scanner de Evidências (IA)",
    scannerDesc: "Tire foto da Carta de Flete e do Odômetro. A Inteligência Artificial irá cruzar os dados com a lista da DINATRAN.",
    scannerUploading: "Lendo Documentos...",
    scannerBtn: "Fazer Upload da Foto",
    
    inputTransportadora: "Transportadora (Nome ou RUC)",
    inputSearch: "Busque ou digite...",
    alertaCritico: "ALERTA CRÍTICO",
    alertaMassivo: "Histórico massivo de subfaturamento.",
    alertaAtencao: "ATENÇÃO",
    alertaIrregularidades: "Irregularidades em análise via Expediente.",
    alertaRegular: "REGULAR",
    alertaSemRegistros: "Sem registros de infrações massivas recentes.",
    
    inputChapa: "Chapa (Placa)",
    inputDistanciaReal: "Distância Real (GPS/Maps)",
    inputDistanciaDoc: "Distância Carta (Ofertado)",
    inputPeso: "Peso da Carga (Ton)",
    inputValor: "Valor Oferecido (₲)",
    inputMermas: "Descontos Carga (Mermas) ₲",
    btnAuditar: "Recalcular Auditoria",
    
    resTitle: "RESULTADO DA AUDITORIA",
    resPrejuizoBadge: "Prejuízo",
    resLiquido: "Líquido Real",
    resTabela: "Tabela Comparativa de Frete",
    resMatrizRef: "Matriz de Custos (Ref.",
    resFreteOfertado: "Valor Bruto Ofertado:",
    resMermas: "Descontos Carga (Mermas):",
    resDiferenca: "Diferença Mínimo Legal:",
    resKmRoubado: "KM Roubado",
    
    // Mercado
    marketTitle: "Cotações & Mercado",
    marketDolar: "Cotação Dólar (₲)",
    marketDiesel: "Preço Diesel (₲/L)",
    marketConsumo: "Consumo Médio (km/L)",
    resLucroDolar: "Lucro Estimado (USD)",
    
    // Matriz Modal
    modalMatrizTitle: "Matriz de Custos DINATRAN",
    modalMatrizKm: "Distância (km)",
    modalMatrizBase: "Custo Base (₲)",
    modalMatrizCoeff: "Coeficiente",
    modalMatrizLegal: "Preço Legal (₲/km)",
    btnVerMatriz: "Ver Tabela de Referência",
    
    // Tabela de Custos Detalhada
    resCustosTitle: "Detalhamento de Custos Operativos",
    resCustosDiesel: "Combustível (Est. Diesel)",
    resCustosManut: "Manutenção (15.03%)",
    resCustosAdm: "Administrativo & Depreciação (12.06%)",
    resCustosIva: "Imposto IVA (10%)",
    resCustosItem: "Natureza do Gasto",
    resCustosTotal: "Custo Total de Operação",
    
    resPisoLegal: "Piso Legal",
    resDepreciação: "Depreciação",
    
    vereditoTitle: "VEREDITO FINAL",
    vereditoNegativo: "Você está pagando para trabalhar nesta viagem.",
    vereditoPositivo: "Viagem com lucro livre positivo.",
    
    chkTitle: "Checklist de Evidências no App",
    chkDesc: "Para garantir a validade da denúncia vinculada ao Expediente nº 26000059120B, reúna:",
    chk1: "Carta de Flete (legível, com carimbo e assinatura).",
    chk2: "Painel do caminhão (mostrando o KM total no local da descarga).",
    chk3: "Dados: Nome da empresa e número da placa (chapa).",
    
    avisoSeguranca: "Aviso de Segurança Jurídica",
    avisoDesc: "A falta da Carta de Flete é uma infração que gera multa de 10 jornales. Portanto, exigir o documento correto é um direito e uma obrigação para evitar sanções em fiscalizações de rota.",
    
    denunciaTitle: "Formalizar Denúncia no App",
    denunciaDesc: "Preencha obrigatoriamente a leitura do seu painel final para confirmar a quilometragem na denúncia:",
    inputOdInicial: "Odômetro Inicial (Carga)",
    inputOdFinal: "Odômetro Final (Descarga)",
    inputNome: "Nome completo do Denunciante",
    inputCedula: "Nº da Cédula",
    btnPreenchaOd: "Preencha os Dados para Liberar Emissão",
    btnEnviarDossie: "ENVIAR DOSSIÊ P/ WHATSAPP DINATRAN",
    
    footerTxt: "Auditor Independente de Fretes • Sistema de Proteção ao Caminhoneiro",
    footerAss: "Assinado Digitalmente: EXP-2600-0591-20B",
    generateWhatsApp: (empresa: string, chapa: string, kmInicial: number | string, kmFinal: number | string, dGps: number, dPapel: number, vFrete: number, lucroFinal: number, nome: string, cedula: string) => {
        return `*DENÚNCIA DINATRAN (Decreto 5.791/2021)* \n\n🏢 *Empresa/Transportadora:* ${empresa || 'Não informada'} \n🚛 *Placa (Chapa/Nº Coche):* ${chapa || 'Não informada'} \n👤 *Denunciante:* ${nome} (Cédula: ${cedula})\n\n*Motivo:* Oferta de frete abaixo do referencial do Art. 4º (Decreto 5.791/2021) e fraude em quilometragem.\n\n*Detalhes Técnicos da Irregularidade:*\n📍 *Odômetro Real:* ${kmInicial} km inicial ➡️ ${kmFinal} km final\n📏 *Distância Total Percorrida:* ${dGps} km \n📄 *Distância Declarada na Carta:* ${dPapel} km \n💰 *Valor Ofertado:* ₲ ${vFrete.toLocaleString('es-PY')} \n📉 *Prejuízo Calculado:* ₲ ${Math.abs(lucroFinal).toLocaleString('es-PY')} \n\n*⚠️ Anexos:* Envio a seguir foto/vídeo da Carta de Flete e do Odômetro.`;
    }
  },
  es: {
    appTitle: "Auditor Flete Legal",
    appSubtitle: "V1.4 - Fiscalización Portuaria",
    listaNegra: "Lista Negra",
    todos: "Todos",
    riscoCritico: "Riesgo Crítico",
    sobInvestigacao: "Bajo Invest.",
    empresa: "Empresa",
    infracoes: "Infracciones",
    status: "Estado",
    nenhumRegistro: "Ningún registro encontrado.",
    lblDecreto5791: "Base mínima de negociación.",
    lblDecreto2327: "Multa 10 jornales (Carta Fraude).",
    
    mainTitle: "Auditoría de Carga en Tiempo Real",
    mainDesc: "Proteja su patrimonio contra la subfacturación logística.",
    btnGuide: "Guía Rápida de la Ley",
    btnGuideHide: "Ocultar Guía",
    
    guideTitle: "GUÍA RÁPIDA: OPERACIÓN FLETE LEGAL",
    guide1Title: "1. CONSULTE LA EMPRESA 🔴",
    guide1Desc: "Antes de cerrar el flete, escriba el nombre. La Alerta Roja indica historial de pagos por debajo del costo legal.",
    guide2Title: "2. AUDITE EL PRECIO ⚖️",
    guide2Desc: "El flete NUNCA puede ser menor que el Costo Operativo (Art. 4º - Decreto 5.791/2021). La app calcula el valor mínimo.",
    guide3Title: "3. CARTA DE FLETE OBLIGATORIA 📄",
    guide3Desc: "Exija el documento de porte obligatorio. Sin ella o con datos falsos, la multa es de 10 JORNALES (Decreto 2.327/2024).",
    guide4Title: "4. ¡DENUNCIE EN EL ACTO! 📲",
    guide4Desc: "La app genera la denuncia completa para el WhatsApp de DINATRAN (0962) 35 22 25. Tenga fotos del Tablero y de la Carta de Flete.",
    
    alertIlegalTitle: "ALERTA: FLETE ILEGAL DETECTADO",
    alertIlegalDesc: "El valor ofrecido está por debajo del piso mínimo legal obligatorio.",
    
    scannerTitle: "Escáner de Evidencias (IA)",
    scannerDesc: "Tome foto de la Carta de Flete y del Odómetro. La Inteligencia Artificial cruzará los datos con la lista de DINATRAN.",
    scannerUploading: "Leyendo Documentos...",
    scannerBtn: "Subir Foto",
    
    inputTransportadora: "Transportadora (Nombre o RUC)",
    inputSearch: "Busque o escriba...",
    alertaCritico: "ALERTA CRÍTICO",
    alertaMassivo: "Historial masivo de subfacturación.",
    alertaAtencao: "ATENCIÓN",
    alertaIrregularidades: "Irregularidades en análisis vía Expediente.",
    alertaRegular: "REGULAR",
    alertaSemRegistros: "Sin registros de infracciones masivas recientes.",
    
    inputChapa: "Chapa (Placa)",
    inputDistanciaReal: "Distancia Real (GPS/Maps)",
    inputDistanciaDoc: "Distancia Carta (Ofertado)",
    inputPeso: "Peso de la Carga (Ton)",
    inputValor: "Valor Ofrecido (₲)",
    inputMermas: "Descuentos Carga (Mermas) ₲",
    btnAuditar: "Recalcular Auditoría",
    
    resTitle: "RESULTADO DE LA AUDITORÍA",
    resPrejuizoBadge: "Pérdida",
    resLiquido: "Líquido Real",
    resTabela: "Tabla Comparativa de Flete",
    resMatrizRef: "Matriz de Costos (Ref.",
    resFreteOfertado: "Valor Bruto Ofrecido:",
    resMermas: "Descuentos Carga (Mermas):",
    resDiferenca: "Diferencia Mínimo Legal:",
    resKmRoubado: "KM Robado",
    
    // Mercado
    marketTitle: "Cotizaciones & Mercado",
    marketDolar: "Cotización Dólar (₲)",
    marketDiesel: "Precio Diesel (₲/L)",
    marketConsumo: "Consumo Medio (km/L)",
    resLucroDolar: "Ganancia Estimada (USD)",
    
    // Matriz Modal
    modalMatrizTitle: "Matriz de Costos DINATRAN",
    modalMatrizKm: "Distancia (km)",
    modalMatrizBase: "Costo Base (₲)",
    modalMatrizCoeff: "Coeficiente",
    modalMatrizLegal: "Precio Legal (₲/km)",
    btnVerMatriz: "Ver Tabla de Referencia",
    
    // Tabela de Custos Detalhada
    resCustosTitle: "Detalle de Costos Operativos",
    resCustosDiesel: "Combustible (Est. Diesel)",
    resCustosManut: "Mantenimiento (15.03%)",
    resCustosAdm: "Administrativo & Depreciación (12.06%)",
    resCustosIva: "Impuesto IVA (10%)",
    resCustosItem: "Naturaleza del Gasto",
    resCustosTotal: "Costo Total de Operación",
    
    resPisoLegal: "Piso Legal",
    resDepreciação: "Depreciación",
    
    vereditoTitle: "VEREDICTO FINAL",
    vereditoNegativo: "Usted está pagando para trabajar en este viaje.",
    vereditoPositivo: "Viaje con ganancia libre positiva.",
    
    chkTitle: "Checklist de Evidencias en App",
    chkDesc: "Para asegurar la validez de la denuncia vinculada al Expediente nº 26000059120B, reúna:",
    chk1: "Carta de Flete (legible, con sello y firma).",
    chk2: "Tablero del camión (mostrando el KM total en el lugar de descarga).",
    chk3: "Datos: Nombre de la empresa y número de placa (chapa).",
    
    avisoSeguranca: "Aviso de Seguridad Jurídica",
    avisoDesc: "La falta de la Carta de Flete es una infracción que genera multa de 10 jornales. Por lo tanto, exigir el documento correcto es un derecho y una obligación para evitar sanciones en fiscalizaciones de ruta.",
    
    denunciaTitle: "Formalizar Denuncia en App",
    denunciaDesc: "Llene obligatoriamente la lectura de su tablero final para confirmar el kilometraje en la denuncia:",
    inputOdInicial: "Odómetro Inicial (Carga)",
    inputOdFinal: "Odómetro Final (Descarga)",
    inputNome: "Nombre, apellido del denunciante",
    inputCedula: "Número de cédula",
    btnPreenchaOd: "Complete los Datos para Liberar Emisión",
    btnEnviarDossie: "ENVIAR DOSSIER X WHATSAPP DINATRAN",
    
    footerTxt: "Auditor Independiente de Fletes • Sistema de Protección al Camionero",
    footerAss: "Firmado Digitalmente: EXP-2600-0591-20B",
    generateWhatsApp: (empresa: string, chapa: string, kmInicial: number | string, kmFinal: number | string, dGps: number, dPapel: number, vFrete: number, lucroFinal: number, nome: string, cedula: string) => {
        return `*DENUNCIA DINATRAN (Decreto 5.791/2021)* \n\n🏢 *Nombre de la empresa:* ${empresa || 'No informada'} \n🚛 *Número de coche o chapa:* ${chapa || 'No informada'} \n👤 *Nombre, apellido:* ${nome}\n🪪 *Número de cédula:* ${cedula}\n\n*Motivo detallado:* Oferta de flete por debajo del referencial del Art. 4º (Decreto 5.791/2021) y posible fraude en kilometraje.\n\n*Desglose de Auditoría AI:*\n📍 *Odómetro Relevado:* ${kmInicial} km inicial ➡️ ${kmFinal} km final\n📏 *Distancia Total Recorrida:* ${dGps} km \n📄 *Distancia Declarada en Carta:* ${dPapel} km \n💰 *Valor Ofrecido:* ₲ ${vFrete.toLocaleString('es-PY')} \n📉 *Pérdida Calculada:* ₲ ${Math.abs(lucroFinal).toLocaleString('es-PY')} \n\n*⚠️ Anexos que envío a continuación:* Foto y/o video de la Carta de Flete y del Tablero/Odómetro.`;
    }
  }
};
