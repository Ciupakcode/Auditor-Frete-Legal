export type Status = 'Risco Crítico' | 'Sob Investigação' | 'Regular';

export interface CompanyRecord {
  id: string;
  empresa: string;
  infracoes: number;
  status: Status;
  ruc: string;
  contato?: string;
}

export const TRANSPORTADORAS_VIGENTES: CompanyRecord[] = [
  {
    "id": "200",
    "empresa": "ASOCIACION DE TRANSPORTISTAS DE GUAJAYBI",
    "ruc": "80115895-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "201",
    "empresa": "G-3 TRANSPORTES S.A.",
    "ruc": "80045490-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "202",
    "empresa": "RAMON FARIÑA VELAZQUEZ",
    "ruc": "1040640-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "203",
    "empresa": "TRANSPORTE Y GANADERA HERMANOS ORTIZ",
    "ruc": "80103905-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "204",
    "empresa": "UNIPERSONAL HECTOR ADRIAN CASTILLO CUELLAR",
    "ruc": "3962559-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "205",
    "empresa": "TRANSPORTADORA LOMAGRANDENSE S.A. DE TRANSPORTES, COMERCIAL, INDUSTRIAL Y SERVICIOS",
    "ruc": "80022441-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "206",
    "empresa": "AGROTODO IMPORT & EXPORT S.A.",
    "ruc": "80096628-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "207",
    "empresa": "AGRO LOG S.A. (ALSA)",
    "ruc": "80065682-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "208",
    "empresa": "BOICY S.A.",
    "ruc": "80046013-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "209",
    "empresa": "TRANSLIBERDADE LOGISTICA S.A.",
    "ruc": "80089642-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "210",
    "empresa": "UNIPERSONAL RD TRANSPORTES DE GRACIELA ELLIZABETH GIMÉNEZ ESPINOZA",
    "ruc": "3413938-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "211",
    "empresa": "W. M. S.A.",
    "ruc": "80065204-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "212",
    "empresa": "WANDERLEI CARLOS LENZ EBERLING",
    "ruc": "3473724-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "213",
    "empresa": "TRANSPORTE Y TURISMO SOL NACIENTE S. A.",
    "ruc": "80069855-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "214",
    "empresa": "CJ TRANSPORTES S.R.L.",
    "ruc": "80089839-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "215",
    "empresa": "COMERCIAL INDEPENDENCIA S.R.L. IMPORT EXPORT",
    "ruc": "80028995-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "216",
    "empresa": "GRENTOMM S.A.",
    "ruc": "80082586-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "217",
    "empresa": "MONTY GROUP S.A.",
    "ruc": "80113571-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "218",
    "empresa": "SANMAR AGRO TRANSPORTE S.A.",
    "ruc": "80071687-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "219",
    "empresa": "AGROSERVICIOS S. R. L.",
    "ruc": "80078417-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "220",
    "empresa": "GRUPO EVOLUCION S. A.",
    "ruc": "80096212-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "221",
    "empresa": "P.R.G. EMPRENDIMIENTOS S.A.",
    "ruc": "80095684-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "222",
    "empresa": "TRANSFEPAJE S. A.",
    "ruc": "80057577-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "223",
    "empresa": "TRANSPORTADORA FLETEXPRESS S.R.L.",
    "ruc": "80092997-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "224",
    "empresa": "TRANSPORTADORA SAN FRANCISCO DE VICTOR BENITEZ RECALDE",
    "ruc": "5916269-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "225",
    "empresa": "UNIP. TRANSPORTADORA MCAL. FRANCISCO SOLANO LOPEZ DE RENATO PEDRO MEES",
    "ruc": "4196191-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "226",
    "empresa": "FENIX GROUP SERVICES S. A.",
    "ruc": "80098219-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "227",
    "empresa": "TRANS GRANOS S.R.L.",
    "ruc": "80086452-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "228",
    "empresa": "TRANS POWER S. A.",
    "ruc": "80071838-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "229",
    "empresa": "EMP. DE TRANSP. SAN CRISTOBAL S. A.",
    "ruc": "80056600-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "230",
    "empresa": "COOP. M.T.A. Y CRED., CONSUMO Y SERV. COOPTRABADEÑO LTDA.",
    "ruc": "40104952-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "231",
    "empresa": "UNIP. MC TRANSPORTES DE MARCOS ANTONIO CANDIA SALINAS",
    "ruc": "2864196-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "232",
    "empresa": "S.V.M. TRUCKS IMPORT. EXPORT. S.A.",
    "ruc": "80064336-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "233",
    "empresa": "TRANSPORTADORA F.C. S. R. L.",
    "ruc": "80078518-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "234",
    "empresa": "TRANSPORTES TUCANO S. A.",
    "ruc": "80066533-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "235",
    "empresa": "UNIP. IMPERIAL TRANSPORTE Y SERVICIOS DE FRANCISCO JAVIER DAVALOS WISZ",
    "ruc": "1402735-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "236",
    "empresa": "TRANS ORIENTE IMPORT. EXPORT. S. A.",
    "ruc": "80101285-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "237",
    "empresa": "UNIPERSONAL YUCA TRANSPORTE DE ADENI POTULSKI",
    "ruc": "2475402-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "238",
    "empresa": "ASOCIACION DE TRANSPORTISTAS DE CAMPO 9 (ATC9)",
    "ruc": "80108514-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "239",
    "empresa": "TROCIUK & CIA. A.G.I.S.A.",
    "ruc": "80003285-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "240",
    "empresa": "GRUPO ARA VEVE SOCIEDAD ANONIMA",
    "ruc": "80107496-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "241",
    "empresa": "BODEGAS Y VIÑEDOS SANTA ELENA S.R.L.",
    "ruc": "80106820-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "242",
    "empresa": "DAMIAN CACERES VERA",
    "ruc": "1424330-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "243",
    "empresa": "TRANSPORTE Y SERVICIOS SOFI DE ALFREDO MEIKOL ROSSWAG NOGUERA.",
    "ruc": "4712257-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "244",
    "empresa": "TRANSPORTADORA COMERCIAL A & A DE MARIA DEL ROSARIO COLMAN MEZA.",
    "ruc": "4036267-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "245",
    "empresa": "COOP. DE PRODUCCION AGROINDUSTRIAL SANTA MARIA LTDA.",
    "ruc": "80005645-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "246",
    "empresa": "ANDREA CANO FERNANDEZ.",
    "ruc": "5449275-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "247",
    "empresa": "GRUPO GA IMPORT EXPORT S.A.",
    "ruc": "80110543-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "248",
    "empresa": "TORO PAMPA S.A.",
    "ruc": "80076732-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "249",
    "empresa": "ISAAC HILDEBRAND FRIESEN.",
    "ruc": "951849-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "250",
    "empresa": "PIKY S.A.",
    "ruc": "80028181-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "251",
    "empresa": "EL RANCHO S.A.",
    "ruc": "80094219-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "252",
    "empresa": "UNIP. MC TRANSPORTES DE SERGIO JAVIER RUIZ ESCOBAR",
    "ruc": "3553141-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "253",
    "empresa": "RAKEBA S.R.L.",
    "ruc": "80100748-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "254",
    "empresa": "AGILIZA TRANSPORTES S.A.",
    "ruc": "80037175-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "255",
    "empresa": "KINROSS SOCIEDAD NONIMA.",
    "ruc": "80116192-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "256",
    "empresa": "TRYLON PARAGUAY S. A.",
    "ruc": "80102008-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "257",
    "empresa": "AZUR LOGISTICA SOCIEDAD ANONIMA",
    "ruc": "80102042-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "258",
    "empresa": "EL PAISANO EXPRESS S.R.L.",
    "ruc": "80099803-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "259",
    "empresa": "B. LOVERA TRANSPORTES S.A.",
    "ruc": "80103535-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "260",
    "empresa": "TRANS MBL LOGISTICA Y TRANSPORTE S.A.",
    "ruc": "80117618-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "261",
    "empresa": "TRANS FENIX E.A.S.",
    "ruc": "80119680-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "262",
    "empresa": "UNIPERSONAL RUBEN DARIO SILVEYRA ARIAS",
    "ruc": "1520378-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "263",
    "empresa": "EVOLUCION S.R.L. DE VENTAS Y SERVICIOS",
    "ruc": "80018385-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "264",
    "empresa": "TRANS BRUM S.R.L.",
    "ruc": "80108412-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "265",
    "empresa": "TRANSPORTE COSTELA S.A.",
    "ruc": "80092244-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "266",
    "empresa": "GRUPO AGROCOM S.A.",
    "ruc": "80100845-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "267",
    "empresa": "UNIP. TRANSPORTADORA SAN ANTONIO DE ANTONIO HIDALGO BLANCO",
    "ruc": "1561829-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "268",
    "empresa": "COOPERATIVA MULTIACTIVA DE TRANSPORTE, TRABAJOS, SERVICIOS, PRODUCCION, AHORRO Y CRÉDITO GRANELEROS DE ARROZ G.D.A.” LTDA.",
    "ruc": "80110301-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "269",
    "empresa": "TRANS FAMILY IMPORT EXPORT S.A.",
    "ruc": "80073970-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "270",
    "empresa": "UNIPERSONAL TRANSHORIZONTE DE ERWIN FRIESEN BERGEN",
    "ruc": "3504018-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "271",
    "empresa": "TRANSPORTADORA EL FUTURO DE MONICA CAROLINA ACOSTA RODAS",
    "ruc": "2546192-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "272",
    "empresa": "UNIPERSONAL SEGELOG DE ANA MARIA ROJAS AYALA",
    "ruc": "1484303-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "273",
    "empresa": "TRANSLOAD S.R.L.",
    "ruc": "80105752-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "274",
    "empresa": "GROUP TEO S.A.",
    "ruc": "80097826-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "275",
    "empresa": "SIERRA DORADA SOCIEDAD ANÓNIMA",
    "ruc": "80070003-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "276",
    "empresa": "TRANS GACELA SOCIEDAD ANÓNIMA",
    "ruc": "80109516-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "277",
    "empresa": "TRANSPORTES Y SERVICIOS HEIMBORG DE EGON HEIMBORG",
    "ruc": "1258390-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "278",
    "empresa": "MARIA DE LOS ANGELES S. R. L.",
    "ruc": "80036283-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "279",
    "empresa": "TRANSLI S.A.",
    "ruc": "80023745-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "280",
    "empresa": "UNIPERSONAL JANDIR INACIO KLEIN MAYER",
    "ruc": "2988309-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "281",
    "empresa": "UNIPERSONAL TRANS CARLOS DE JAIR COSTA CARLOS",
    "ruc": "4927334-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "282",
    "empresa": "ROSANGELA MARTA MENEGAT NISSOLA",
    "ruc": "5425243-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "283",
    "empresa": "GRUPO G3 SOCIEDAD ANONIMA",
    "ruc": "80052602-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "284",
    "empresa": "TRANSPORTE Y SERVICIOS KURUNDU S.A.",
    "ruc": "80019812-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "285",
    "empresa": "TRAMOPAR SOCIEDAD ANONIMA",
    "ruc": "80108603-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "286",
    "empresa": "DISTRIBUCIÓN Y LOGÍSTICA (DYL) S.R.L.",
    "ruc": "80035097-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "287",
    "empresa": "TRANSPORTADORA LA OVETENSE S.R.L.",
    "ruc": "80022157-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "288",
    "empresa": "TRANSPORTADORA YBYTYRUZU S.A.",
    "ruc": "80068464-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "289",
    "empresa": "COOTRANSPORTE LTDA.",
    "ruc": "80068694-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "290",
    "empresa": "ASOCIACION DE TRANSPORTADORA POTRERO GUAYAKY",
    "ruc": "80081429-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "291",
    "empresa": "UNIPERSONAL CARMELO MEDINA SANCHEZ",
    "ruc": "850299-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "292",
    "empresa": "UNIPERSONAL MARCOS MANUEL SANCHEZ ROJAS",
    "ruc": "4583095-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "293",
    "empresa": "UNIPERSONAL MG TRANSPORTES DE CLAUDIONOR MAGALLHAES GOMEZ",
    "ruc": "6820988",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "294",
    "empresa": "VRC EXPRESS SOCIEDAD ANONIMA",
    "ruc": "80066440-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "295",
    "empresa": "UNIPERSONAL R.L. TRANSPORTADORA DE ROSALBA ANTONIA MOREL ROMAN",
    "ruc": "2970954-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "296",
    "empresa": "ARGI GROUP SOCIEDAD ANÓNIMA",
    "ruc": "80125118-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "297",
    "empresa": "TRANSPORTADORA RC S.R.L.",
    "ruc": "80082108-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "298",
    "empresa": "LIDER TRUCK S.R.L.",
    "ruc": "80082730-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "299",
    "empresa": "TRANS GONSALVES S.A.",
    "ruc": "80097433-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "300",
    "empresa": "TRANSPORTADORA EL PROGRESO S.R.L.",
    "ruc": "80093795-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "301",
    "empresa": "TRANSPORTADORA RUTA 6TA S.R.L.",
    "ruc": "80102424-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "302",
    "empresa": "LAGUNA BLANCA LOGISTICA S.A.",
    "ruc": "80103043-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "303",
    "empresa": "COOPERATIVA MULTIACTIVA DE TRABAJO Y SERVICIOS DE TRANSPORTES DEL PARAGUAY LIMITADA (COOTRAP LTDA.)",
    "ruc": "80028305-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "304",
    "empresa": "TRANSPORTADORA ACARAY S. A.",
    "ruc": "80072937-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "305",
    "empresa": "TRANSRED S.A. (TRANSP. REPRESENT. DISTRIBUCION)",
    "ruc": "80015858-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "306",
    "empresa": "ORO BLANCO CEREALES S.A.",
    "ruc": "80047145-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "307",
    "empresa": "UNIP. TRANSPORTE YUCA DE POTULSKI PIETA GALEANO",
    "ruc": "3952591-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "308",
    "empresa": "GMG TRANSPORTADORA S.A.",
    "ruc": "80129324-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "309",
    "empresa": "SERELI SOCIEDAD ANONIMA",
    "ruc": "80086482-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "310",
    "empresa": "TRANSPORTADORA INDEPENDENCIA S.R.L.",
    "ruc": "80020391-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "311",
    "empresa": "AGRO NEGOCIOS CAMPOS DEL SUR S.R.L.",
    "ruc": "80095335-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "312",
    "empresa": "TRANSAGRO SOCIEDAD ANONIMA",
    "ruc": "80024300-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "313",
    "empresa": "LOGISTICA POLO E.A.S.",
    "ruc": "80134852-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "314",
    "empresa": "AGRO M Y M S.R.L.",
    "ruc": "80058191-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "315",
    "empresa": "UNIP. LM TRANSPORTADORA DE LUANDER MATEUS VILHALBA LIMA",
    "ruc": "6846252-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "316",
    "empresa": "3 JJJ DE JORGE CHAMORRO",
    "ruc": "1012528-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "317",
    "empresa": "UNIP. NUEVO HORIZONTE TRANSPORTE Y LOGISTICA DE CLAUDIA ELUISA KOHL GRUTZMAN",
    "ruc": "4819745-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "318",
    "empresa": "UNIPERSONAL CHE KUARAHY DE OSCAR ALFREDO MARIN ROMERO",
    "ruc": "2251012-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "319",
    "empresa": "UNIPERSONAL RL TRANSPORTE DE ROSALBA ANTONIA MOREL ROMAN",
    "ruc": "2970954-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "320",
    "empresa": "RC AGRO TRANSPORTADORA DE RICHARD JOAQUIN CENDRA DUARTE",
    "ruc": "4086013",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "321",
    "empresa": "UNIP. ARNALDO MAIER GONZALEZ",
    "ruc": "2673352-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "322",
    "empresa": "TRANS RG SOCIEDAD ANONIMA",
    "ruc": "80141887-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "323",
    "empresa": "FORTALEZA TRANSPORTES S.A.",
    "ruc": "80124683-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "324",
    "empresa": "MOLINOS HARINEROS D' ITALIA S.A.",
    "ruc": "80048379-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "325",
    "empresa": "SOC. DE TRANSPORTISTAS DE CAMIONEROS DE CURUGUATY S.A.",
    "ruc": "80131610-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "326",
    "empresa": "SOCIEDAD DE TRANSPORTISTAS DE CAMIONEROS DE CURUGUATY (SOTCUR)",
    "ruc": "80124794-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "327",
    "empresa": "TRANS ITA LOGISTICA PARAGUAY S.A.",
    "ruc": "80130595-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "328",
    "empresa": "TRANSPORTADORA TODO GRANO S.A.",
    "ruc": "80094058-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "329",
    "empresa": "UNIP. CESAR ALCIDES RECALDE CARBALLO",
    "ruc": "2801306-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "330",
    "empresa": "UNIP. DE JULIANO GARCIA ZWIRTES (COPACON)",
    "ruc": "7174618-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "331",
    "empresa": "UNIP. LILIAN GRACIELA MARTINEZ ALMADA",
    "ruc": "3885373-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "332",
    "empresa": "UNIP. TRANSPORTADORA GMG DE PEDRO DANIEL REYES LOPEZ",
    "ruc": "5057269",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "333",
    "empresa": "UNIP. YP TRANSPORTE DE JOAO CEZAR DA SILVA",
    "ruc": "6328285-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "334",
    "empresa": "VILSON GRUNEVLD",
    "ruc": "3008970",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "335",
    "empresa": "X-PAR S. R. L.",
    "ruc": "80107924-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "336",
    "empresa": "COOPERATIVA MULTIACTIVA DE PRODUCCIÓN, SERVICIOS PÚBLICOS, CONSUMO, AHORRO Y CRÉDITO SAN ANDRÉS LTDA.",
    "ruc": "80015279-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "337",
    "empresa": "AGRÍCOLA ALIANZA SOCIEDAD ANÓNIMA",
    "ruc": "80048453-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "338",
    "empresa": "EL CIERVO SOCIEDAD ANÓNIMA",
    "ruc": "80086510-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "339",
    "empresa": "AGRO - SAFRA SOCIEDAD ANÓNIMA",
    "ruc": "80066278-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "340",
    "empresa": "LÍDER REPUESTOS SOCIEDAD ANÓNIMA",
    "ruc": "80088518-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "341",
    "empresa": "TERRA NOVA INSUMOS AGRÍCOLAS SOCIEDAD ANÓNIMA",
    "ruc": "80092442-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "342",
    "empresa": "UNIPERSONAL DERLIS ASUNCIÓN VILLALBA DUARTE",
    "ruc": "4255497-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "343",
    "empresa": "AGRO SILO SANTA CATALINA SOCIEDAD ANÓNIMA",
    "ruc": "80007801-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "344",
    "empresa": "DI TRENTO INVERSIONES SOCIEDAD ANÓNIMA",
    "ruc": "80087144-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "345",
    "empresa": "L&S TRANSPORTES SA",
    "ruc": "80096203-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "346",
    "empresa": "RONNY NRIQUE CLOSS RECKZIEGEL",
    "ruc": "1195576-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "347",
    "empresa": "UNIPERSONAL ADILSO FEIDEN",
    "ruc": "2433250-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "348",
    "empresa": "UNIPERSONAL ALDO ANDRÉS GONZÁLEZ SILVERO",
    "ruc": "4300608-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "349",
    "empresa": "UNIPERSONAL CIRILO GONZÁLEZ DELVALLE",
    "ruc": "1869983-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "350",
    "empresa": "UNIPERSONAL SANTA ANA DE ARTEMIO RAMÍREZ ALDERETE",
    "ruc": "1939589-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "351",
    "empresa": "COOPERATIVA CHORTITZER LTDA.",
    "ruc": "80004464-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "352",
    "empresa": "UNIPERSONAL CARLOS RAÚL AYALA VERA",
    "ruc": "747630-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "353",
    "empresa": "ASERRADERO SANTA CATALINA SOCIEDAD ANÓNIMA.",
    "ruc": "80051490-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "354",
    "empresa": "DIVERXO E.A.S. UNIPERSONAL",
    "ruc": "80144286-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "355",
    "empresa": "TRANSPORTADORA LJD IMPORTADORA Y EXPORTADORA SOCIEDAD ANÓNIMA.",
    "ruc": "80055324-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "356",
    "empresa": "UNIPERSONAL SOSA TRANSPORTE HUGO ORLANDO SOSA NÚÑEZ",
    "ruc": "3714765-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "357",
    "empresa": "UNIPERSONAL TRANSPORTES GRV DE GEOVANE ROBERTO VEIT",
    "ruc": "5407421-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "358",
    "empresa": "NEMESIS PARAGUAY E.A.S.",
    "ruc": "80143010-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "359",
    "empresa": "REAL INTERCONTINENTAL SOCIEDAD ANÓNIMA",
    "ruc": "80112570-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "360",
    "empresa": "UNIPERSONAL TRANSPORTADORA GRUPO UNIVERSAL DE JONATHAN JESÚS GENES GARAY",
    "ruc": "6028606-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "361",
    "empresa": "UNIPERSONAL VIRGILIO DELOSANTO MARTINEZ MARTINEZ",
    "ruc": "2479014-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "362",
    "empresa": "LÁCTEOS KATUETE SOCIEDAD ANÓNIMA",
    "ruc": "80104046-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "363",
    "empresa": "UNIPERSONAL EVILSON TREICHEL LENZ",
    "ruc": "3171315-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "364",
    "empresa": "HENRY SCHROEDER BUHLER",
    "ruc": "2658952-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "365",
    "empresa": "INTERNACIONAL DE TRANSPORTES DELTA SOCIEDAD ANÓNIMA",
    "ruc": "80067124-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "366",
    "empresa": "PEDRO LUÍS VILLALBA CABRAL",
    "ruc": "3853304-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "367",
    "empresa": "TRANSPORTADORA FRANCO RAFAEL E.A.S.",
    "ruc": "80142845-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "368",
    "empresa": "PIVOT SOLUCIÓN INTEGRAL S.R.L.",
    "ruc": "80114600-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "369",
    "empresa": "ROBERT ALEXIS NEUMAN ANTUNEZ",
    "ruc": "4239366-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "370",
    "empresa": "TRANSPORTADORA BG E.A.S.",
    "ruc": "80146847-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "371",
    "empresa": "UNIPERSONAL GREGORIO VAZQUEZ RODRÍGUEZ (TRANS MORONI).",
    "ruc": "3018809-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "372",
    "empresa": "GRANOS DEL CAMPO E.A.S.",
    "ruc": "80137632-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "373",
    "empresa": "UNIPERSONAL DENIS GREGORIO RAMÍREZ GIMÉNEZ (DG TRANSPORTES).",
    "ruc": "4076009-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "374",
    "empresa": "RD TRANSPORTES E.A.S.",
    "ruc": "80137624-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "375",
    "empresa": "UNIIPERSONAL ALBA ROSA BARRIOS FERREIRA",
    "ruc": "3685172-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "376",
    "empresa": "AGRO LOGÍSTICA SOCIEDAD ANÓNIMA",
    "ruc": "80070108-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "377",
    "empresa": "DMC TRANSPORTES SOCIEDAD ANÓNIMA",
    "ruc": "80085625-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "378",
    "empresa": "TSM SOCIEDAD ANÓNIMA",
    "ruc": "80110200-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "379",
    "empresa": "FECULARIA SALTO PILAO SOCIEDAD ANÓNIMA",
    "ruc": "80018977-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "380",
    "empresa": "UNIPERSONAL JEAN SENO WIESENHUTTER SCHNEIDER",
    "ruc": "2453239",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "381",
    "empresa": "BRIANNA EMPRENDIMIENTOS E.A.S.",
    "ruc": "80135725-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "382",
    "empresa": "COMERCIAL KONZEN SOCIEDAD ANÓNIMA",
    "ruc": "80025336-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "383",
    "empresa": "RCN EMPRENDIMIENTOS SOCIEDAD ANÓNIMA",
    "ruc": "80112310-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "384",
    "empresa": "COOPERATIVA MULTIACTIVA NEULAND LTDA.",
    "ruc": "80017582-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "385",
    "empresa": "GCP SOCIEDAD ANÓNIMA",
    "ruc": "80105932-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "386",
    "empresa": "UNIPERSONAL AGRO SOSA TRANSPORTE TERRESTRE DE CARGA DE WILMAR SOSA",
    "ruc": "6127759-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "387",
    "empresa": "UNIPERSONAL ROBERTO DANIEL BENITEZ VERA",
    "ruc": "3344571-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "388",
    "empresa": "UNIPERSONAL SADEFLA TRANSPORTES DE MARCOS DANIEL RAMÍREZ COLMAN",
    "ruc": "4897030-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "389",
    "empresa": "UNIPERSONAL TRANSPORTE TERRESTRE DE CARGA ATILIO ZORRILLA AVALOS",
    "ruc": "4024274-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "390",
    "empresa": "UNIPERSONAL MARCO ANTONIO NÚÑEZ SALINAS",
    "ruc": "3444207-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "391",
    "empresa": "AGROPECUARIA GARCIA E.A.S.",
    "ruc": "80140968-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "392",
    "empresa": "UNIPERSONAL DERLIS RAMÓN MERCADO GONZÁLEZ (DLR TRANSPORTES)",
    "ruc": "5322283-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "393",
    "empresa": "TRANSPORTADORA SANTA RITA S.A.",
    "ruc": "80044704-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "394",
    "empresa": "SUMAR TRANSPORTES SOCIEDAD ANÓNIMA",
    "ruc": "80130051-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "395",
    "empresa": "TRANSPORTADORA IB SRL.",
    "ruc": "80120836-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "396",
    "empresa": "UNIPERSONAL FERRE TRANSP DE CHRISTIAN DAVID GALEANO",
    "ruc": "2195509-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "397",
    "empresa": "UNIPERSONAL LEANDRO ANDREI PEREIRA DE MELO",
    "ruc": "4107017-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "398",
    "empresa": "UNIPERSONAL TRANSPORTADORA ROSSI DE VANDERLEI SERGIO ROSSI",
    "ruc": "5418664-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "399",
    "empresa": "UNIPERSONAL TRANSPORTADORA VERDECCHIA DE RICARDO DE JESÚS VERDECCHIA A.",
    "ruc": "1367242-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "400",
    "empresa": "UNIPERSONAL ELTON ROBERTO WEBLER",
    "ruc": "5192810-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "401",
    "empresa": "UNIPERSONAL TRANSPORTADORA SAMU'U CARLOS JULIÁN ABENTE ZAVALA",
    "ruc": "5301236-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "402",
    "empresa": "TRANSPORTADORA YPACARAI DE TOMÁS ROBERTO CENTURIÓN MORÍNIGO",
    "ruc": "1684942-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "403",
    "empresa": "ESUR GROUP S.A.",
    "ruc": "80105287-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "404",
    "empresa": "UNIPERSONAL ISMAEL GONZÁLEZ CENTURIÓN",
    "ruc": "3821432-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "405",
    "empresa": "SÚPER AGRO S.R.L.",
    "ruc": "80023567-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "406",
    "empresa": "SILO NUEVO MÉJICO S.A.",
    "ruc": "80091813-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "407",
    "empresa": "VERDE TRANSPORTES S.R.L.",
    "ruc": "80124186-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "408",
    "empresa": "TRANSPORTADORA SADY LUZ Y HERMANOS DE EUGENIA FERNÁNDEZ DE FIGUEREDO",
    "ruc": "2879408-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "409",
    "empresa": "INSUMAGRO SOCIEDAD ANÓNIMA",
    "ruc": "80052350-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "410",
    "empresa": "RM TRANSPORTES E.A.S.",
    "ruc": "80137467-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "411",
    "empresa": "PM-TRANSPORTES E.A.S.",
    "ruc": "80161042-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "412",
    "empresa": "UNIPERSONAL TRANSPORTES ANDRADE DE JOSIAS DE ANDRADE",
    "ruc": "3949404-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "413",
    "empresa": "HOVASA E.A.S.",
    "ruc": "80140529-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "414",
    "empresa": "UNIPERSONAL GUSTAVO TEODORO MARTÍNEZ GIMÉNEZ",
    "ruc": "3451655-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "415",
    "empresa": "UNIPERSONAL ALCIDES RUBÉN PÉREZ MEDINA",
    "ruc": "2072202-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "416",
    "empresa": "TREXIM SOCIEDAD ANÓNIMA (TRADING IMPORT EXPORT)",
    "ruc": "80064402-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "417",
    "empresa": "TRANSPORTADORA ROCHA SOCIEDAD ANÓNIMA",
    "ruc": "80087503-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "418",
    "empresa": "EL BUEN AMIGO GROUP E.A.S.",
    "ruc": "80151959-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "419",
    "empresa": "AGRODECA TRANSPORTES E.I.R.L. DE TIAGO DESTRI",
    "ruc": "80080537-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "420",
    "empresa": "TGR TRANSPORTE & LOGÍSTICA E.A.S.",
    "ruc": "80148518-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "421",
    "empresa": "ADR GROUP S.A.",
    "ruc": "80142515-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "422",
    "empresa": "EMPRENDIMIENTOS COMERCIALES Y PRODUCTIVOS S.A.",
    "ruc": "80057078-2",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "423",
    "empresa": "GONZAGA TRANSPORTES E.A.S.",
    "ruc": "80152365-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "424",
    "empresa": "UNIPERSONAL TRANS FM FERNANDO ANDRÉS MACHADO BARRETO",
    "ruc": "4585892-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "425",
    "empresa": "CASILLA 2 AGRONEGOCIOS E.A.S.",
    "ruc": "80153075-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "426",
    "empresa": "UNIPERSONAL JUAN RAMÓN GIMÉNEZ ÁLVAREZ",
    "ruc": "3770902-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "427",
    "empresa": "UNIPERSONAL AMELIA LEZCANO MELGAREJO",
    "ruc": "5218678-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "428",
    "empresa": "BELOTTO S.R.L.",
    "ruc": "80057511-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "429",
    "empresa": "ASOCIACIÓN DE TRANSPORTISTAS DE CARGAS DEL 2° DEPARTAMENTO SAN PEDRO",
    "ruc": "80146817-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "430",
    "empresa": "3H TRANSPORTES S.R.L.",
    "ruc": "80148700-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "431",
    "empresa": "UNIPERSONAL ANDRÉS LUÍS MAZETTO BOING",
    "ruc": "5564397-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "432",
    "empresa": "UNIPERSONAL FÁTIMA LARISSA MUÑOZ SAUCEDO",
    "ruc": "4466920-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "433",
    "empresa": "COSTA EXPRESS S.A.",
    "ruc": "80028445-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "434",
    "empresa": "GAUCHO RECTIFICADORA DE MOTORES S.A. (GRUPO IMPERIAL)",
    "ruc": "80080984-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "435",
    "empresa": "UNIPERSONAL TRANSPORTADORA YPORAVE DE ARMANDO GÓMEZ PÁEZ",
    "ruc": "2883117-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "436",
    "empresa": "ARAUCARIA E.A.S. UNIPERSONAL",
    "ruc": "80157710-1",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "437",
    "empresa": "TRANS MMG E.A.S. (TRANSPOTADORA MMG)",
    "ruc": "80158507-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "438",
    "empresa": "AGRISERVO S.A.",
    "ruc": "80090567-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "439",
    "empresa": "FUTURO TRANSPORTES UNIPERSONAL E.A.S.",
    "ruc": "80125952-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "440",
    "empresa": "TRANSPORTADORA DIANA E.A.S.",
    "ruc": "80152592-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "441",
    "empresa": "UNIPERSONAL MELISSA PAOLA NOEMÍ JARA CENTURIÓN (TRANSPORTADORA MJC LOGISTICS.)",
    "ruc": "4123256-9",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "442",
    "empresa": "PAX THIEN S.A.",
    "ruc": "80048023-6",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "443",
    "empresa": "AGRO VALCAR SOCIEDAD ANÓNIMA",
    "ruc": "80102385-8",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "444",
    "empresa": "GRANOS DE MI TIERRA S.A.",
    "ruc": "80135155-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "445",
    "empresa": "AGROTRANSPORTADORA FR E.A.S. UNIPERSONAL.",
    "ruc": "80133050-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "446",
    "empresa": "EDUARDA GROUP E.A.S. (EDUARDA TRANSPORTES).",
    "ruc": "80165652-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "447",
    "empresa": "CONTINENTAL EXPRESS E.A.S. UNIPERSONAL (CONTINENTAL EXPRESS).",
    "ruc": "80155387-3",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "448",
    "empresa": "MULTIMODAL LOGÍSTICA E.A.S.",
    "ruc": "80166638-4",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "449",
    "empresa": "UNIPERSONAL GASPAR EFRAÍN AYALA RIVAS",
    "ruc": "1685688-0",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "450",
    "empresa": "GRUPO FUERZA MERCANTIL SOCIEDAD ANÓNIMA",
    "ruc": "80086134-5",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "451",
    "empresa": "JM GROUP E.A.S.",
    "ruc": "80132172-7",
    "infracoes": 0,
    "status": "Regular"
  },
  {
    "id": "452",
    "empresa": "UNIPERSONAL EMIGDIO CONCEPCIÓN SILVERA GALLINAR",
    "ruc": "3.005.506-7",
    "infracoes": 0,
    "status": "Regular"
  }
];
