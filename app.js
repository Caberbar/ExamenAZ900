// Fallback embebido: se usa si falla la carga de preguntas (por abrir el archivo sin servidor)
window.FALLBACK_QUESTIONS = [
  {
    "question": "Se puede crear un grupo de recursos dentro de otro grupo de recursos.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Una máquina virtual de Azure puede estar en múltiples grupos de recursos.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Un grupo de recursos puede contener recursos de múltiples regiones de Azure.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "La adición de grupos de recursos en una suscripción de Azure genera costos adicionales.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Copiar 10 GB de datos a Azure desde una red local a través de una VPN genera costos adicionales de transferencia de datos de Azure.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Copiar 10 GB de datos desde Azure a una red local a través de una VPN genera costos adicionales de transferencia de datos de Azure.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Al crear grupos de recursos adicionales en una suscripción de Azure, se incurre en costos adicionales.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Al copiar varios gigabits de datos a Azure desde una red local a través de una VPN, se incurre en costos adicionales de transferencia de datos.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Al copiar varios GB de datos desde Azure a una red local a través de una VPN, se incurre en costos adicionales de transferencia de datos.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Una única cuenta de Microsoft puede utilizarse para gestionar múltiples suscripciones de Azure.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Dos suscripciones de Azure se pueden fusionar en una sola suscripción creando una solicitud de soporte.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Una empresa puede utilizar recursos de múltiples suscripciones.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Azure Active Directory (Azure AD) requiere la implementación de controladores de dominio en máquinas virtuales de Azure.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Azure Active Directory (Azure AD) proporciona servicios de autenticación para recursos alojados en Azure y Microsoft 365.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "A cada cuenta de usuario en Azure Active Directory (Azure AD) se le puede asignar solo una licencia.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Para lograr un modelo de nube híbrida, una empresa debe migrar siempre desde un modelo de nube privada.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Una empresa puede ampliar la capacidad de su red interna utilizando la nube pública.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "En un modelo de nube pública, solo los usuarios invitados de su empresa pueden acceder a los recursos en la nube.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "El Acuerdo de Nivel de Servicio (SLA) de tiempo de actividad garantizado para los servicios de pago de Azure es de al menos 99.9 por ciento.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Las empresas pueden aumentar el Acuerdo de Nivel de Servicio (SLA) de tiempo de actividad garantizado añadiendo recursos de Azure a múltiples regiones.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Las empresas pueden aumentar el Acuerdo de Nivel de Servicio (SLA) de tiempo de actividad garantizado comprando múltiples suscripciones.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Las identidades almacenadas en un Active Directory local se pueden sincronizar con Azure Active Directory (Azure AD).",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Las identidades almacenadas en Azure Active Directory (Azure AD), servicios de nube de terceros, y Active Directory local pueden utilizarse para acceder a los recursos de Azure.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Azure tiene servicios de autenticación y autorización incorporados que proporcionan acceso seguro a los recursos de Azure.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Para implementar una solución de Autenticación Multifactor (MFA) de Azure, debe implementar una solución de federación o sincronizar identidades locales en la nube.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Dos métodos válidos para la Autenticación Multifactor (MFA) de Azure son la identificación con imagen y un número de pasaporte.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "La Autenticación Multifactor (MFA) de Azure puede ser requerida para cuentas de usuario administrativas y no administrativas.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Una solución de plataforma como servicio (PaaS) que aloja aplicaciones web en Azure proporciona la capacidad de escalar la plataforma automáticamente.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Una solución de plataforma como servicio (PaaS) que aloja aplicaciones web en Azure proporciona servicios de desarrollo profesional para añadir continuamente características a aplicaciones personalizadas.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Un usuario al que se le asigna el rol Propietario (Owner) puede transferir la propiedad de una suscripción de Azure.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Puede convertir la suscripción de Azure de su empresa de Prueba Gratuita (Free Trial) a Pago por Uso (Pay-As-You-Go).",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "El límite de gasto de Azure es fijo y no se puede aumentar ni disminuir.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Con las Reservas de Azure (Azure Reservations), usted paga menos por las máquinas virtuales que con la tarificación de pago por uso (pay-as-you-go).",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Si crea dos máquinas virtuales de Azure que utilizan el tamaño B2S, cada máquina virtual siempre generará los mismos costos mensuales.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Cuando se detiene una máquina virtual de Azure, se sigue pagando por los costos de almacenamiento asociados a la máquina virtual.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Si su empresa utiliza una cuenta gratuita de Azure, solo podrá utilizar un subconjunto de los servicios de Azure.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Todas las cuentas gratuitas de Azure caducan después de un período específico.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Puede crear hasta 10 cuentas gratuitas de Azure utilizando la misma cuenta de Microsoft.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Un recurso de Azure puede tener múltiples bloqueos de Eliminación (Delete locks).",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Un recurso de Azure hereda los bloqueos de su grupo de recursos.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Si un recurso de Azure tiene un bloqueo de Solo lectura (Read-only lock), puede añadir un bloqueo de Eliminación (Delete lock) al recurso.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Con Software como servicio (SaaS), debe aplicar las actualizaciones de software.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Con Infraestructura como servicio (IaaS), debe instalar el software que desea utilizar.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Azure Backup es un ejemplo de Plataforma como servicio (PaaS).",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "El Reglamento General de Protección de Datos (GDPR) define las reglas de protección de datos y privacidad.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "El Reglamento General de Protección de Datos (GDPR) se aplica a las empresas que ofrecen bienes o servicios a personas en la UE.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Azure se puede utilizar para construir una infraestructura que cumpla con el Reglamento General de Protección de Datos (GDPR).",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "La autorización para acceder a los recursos de Azure solo puede ser proporcionada a los usuarios de Azure Active Directory (Azure AD).",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Azure China es operado por Microsoft.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Azure Government es operado por Microsoft.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Azure Government está disponible solo para agencias gubernamentales de EE. UU. y sus socios.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "La mayoría de los servicios de Azure se introducen en vista previa privada antes de ser introducidos en vista previa pública y, luego, en disponibilidad general.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Los servicios de Azure en vista previa pública solo pueden gestionarse mediante Azure CLI.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "El costo de un servicio de Azure en vista previa privada disminuye cuando el servicio pasa a estar disponible de forma general.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Azure Advisor proporciona recomendaciones sobre cómo mejorar la seguridad de un entorno de Azure Active Directory (Azure AD).",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Azure Advisor proporciona recomendaciones sobre cómo reducir el costo de ejecución de las máquinas virtuales de Azure.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Azure Advisor proporciona recomendaciones sobre cómo configurar la configuración de red en las máquinas virtuales de Azure.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Todos los recursos de Azure implementados en un grupo de recursos deben usar la misma región de Azure.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Si asigna una etiqueta (tag) a un grupo de recursos, todos los recursos de Azure en ese grupo de recursos se asignan a la misma etiqueta.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Si asigna permisos a un usuario para administrar un grupo de recursos, el usuario puede administrar todos los recursos de Azure en ese grupo de recursos.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "En Azure Active Directory Premium P2, se garantiza al menos un 99.9 por ciento de disponibilidad.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "El Acuerdo de Nivel de Servicio (SLA) para Azure Active Directory Premium P2 es el mismo que el SLA para Azure Active Directory Free.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Todos los clientes de pago de Azure reciben un crédito si su porcentaje de tiempo de actividad mensual es inferior a la cantidad garantizada en el Acuerdo de Nivel de Servicio (SLA).",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Azure Monitor puede supervisar el rendimiento de los equipos locales (on-premises).",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Azure Monitor puede enviar alertas a los grupos de seguridad de Azure Active Directory.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Azure Monitor puede activar alertas basadas en datos de un espacio de trabajo de Azure Log Analytics.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Desde Azure Service Health, un administrador puede ver el estado de todos los servicios implementados en un entorno de Azure y todos los demás servicios disponibles en Azure.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Desde Azure Service Health, un administrador puede crear una regla para recibir alertas si falla un servicio de Azure.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Desde Azure Service Health, un administrador puede evitar que un fallo del servicio afecte a una máquina virtual específica.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Puede configurar los registros de actividad de Azure Active Directory (Azure AD) para que aparezcan en Azure Monitor.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Desde Azure Monitor, puede supervisar recursos en múltiples suscripciones de Azure.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Desde Azure Monitor, puede crear alertas.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Puede crear directivas de grupo (Group Policies) en Azure Active Directory (Azure AD).",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Puede unir dispositivos Windows 10 a Azure Active Directory (Azure AD).",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Puede unir dispositivos Android a Azure Active Directory (Azure AD).",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Todos los servicios de Azure en vista previa privada deben ser accedidos utilizando un portal de Azure separado.",
    "options": ["Sí", "No"],
    "answer": "No"
  },
  {
    "question": "Los servicios de Azure en vista previa pública pueden ser utilizados en entornos de producción.",
    "options": ["Sí", "No"],
    "answer": "Sí"
  },
  {
    "question": "Los servicios de Azure en vista previa pública están sujetos a un Acuerdo de Nivel de Servicio (SLA).",
    "options": ["Sí", "No"],
    "answer": "No"
  }
];

(function () {
  const els = {
    current: document.getElementById('current'),
    total: document.getElementById('total'),
    points: document.getElementById('points'),
    answered: document.getElementById('answered'),
    accuracy: document.getElementById('accuracy'),
    question: document.getElementById('question'),
    options: document.getElementById('options'),
    feedback: document.getElementById('feedback'),
    nextBtn: document.getElementById('nextBtn'),
    checkBtn: document.getElementById('checkBtn'),
    resetBtn: document.getElementById('resetBtn'),
    final: document.getElementById('final'),
    finalScore: document.getElementById('finalScore'),
    restartBtn: document.getElementById('restartBtn'),
    card: document.getElementById('card'),
    progressBar: document.getElementById('progressBar'),
    examTitle: document.getElementById('examTitle'),
    examSubtitle: document.getElementById('examSubtitle'),
    apuntesLink: document.getElementById('apuntesLink'),
    modeSwitch: document.getElementById('modeSwitch'),
  };

  const state = {
    questions: [],
    currentIndex: 0,
    score: 0,
    answered: false,
    answeredCount: 0,
  };

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function chooseExamSubset(arr) {
    const total = arr.length;
    const min = 30;
    const max = 60;
    let count;
    if (total >= min) {
      const upper = Math.min(max, total);
      count = Math.floor(Math.random() * (upper - min + 1)) + min;
    } else {
      count = total;
    }
    return arr.slice(0, count);
  }

  function normalizeQuestion(q) {
    const n = { ...q };
    // Unificar clave de respuesta
    if (n.answer == null && n.right != null) n.answer = n.right;
    // Tipo por defecto
    if (!n.type) n.type = 'yes_no';
    // Normalizar matching
    if (n.type === 'matching') {
      n.correctMap = n.mapping || n.answer || {};
      n.left = Array.isArray(n.left) ? n.left : Object.keys(n.correctMap);
      // Si right no existe, derivarlo de los valores del mapa
      n.right = Array.isArray(n.right) ? n.right : Array.from(new Set(Object.values(n.correctMap)));
    }
    return n;
  }

  // Explicaciones automáticas por patrones
  function getAutoExplanation(q) {
    const t = (q.question || '').toLowerCase();
    const a = q.answer;

    // Grupos de recursos
    if (t.includes('resource group') && t.includes('inside another')) {
      return 'Los grupos de recursos son contenedores lógicos de recursos y no se pueden anidar. Cada recurso pertenece a un único grupo de recursos. Referencia: https://learn.microsoft.com/azure/azure-resource-manager/management/manage-resource-groups-portal';
    }
    if (t.includes('virtual machine') && t.includes('multiple resource groups')) {
      return 'Una máquina virtual solo puede existir en un grupo de recursos a la vez (aunque puede moverse entre grupos). Referencia: https://learn.microsoft.com/azure/azure-resource-manager/management/manage-resource-groups-portal';
    }
    if (t.includes('resource group') && t.includes('multiple azure regions')) {
      return 'Un grupo de recursos puede contener recursos en diferentes regiones; el grupo de recursos tiene una ubicación para metadatos pero no limita la ubicación de los recursos. Referencia: https://learn.microsoft.com/azure/azure-resource-manager/management/overview';
    }

    // Costes de transferencia
    if (t.includes('copying') && t.includes('to azure') && t.includes('vpn')) {
      return 'La entrada de datos hacia Azure (ingreso) normalmente no se factura, mientras que la salida desde Azure (egreso) sí puede tener coste. Por eso copiar datos hacia Azure vía VPN no incurre en cargos de transferencia. Referencia: https://azure.microsoft.com/pricing/details/bandwidth/';
    }
    if (t.includes('copying') && t.includes('from azure') && t.includes('vpn')) {
      return 'La salida de datos desde Azure a Internet o a redes locales suele estar sujeta a cargos de ancho de banda (egreso). Referencia: https://azure.microsoft.com/pricing/details/bandwidth/';
    }

    // NSG
    if (t.includes('network security group') && t.includes('virtual network subnet')) {
      return 'Un NSG se puede asociar a una subred para aplicar sus reglas a todos los recursos de esa subred. Referencia: https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview';
    }
    if (t.includes('network security group') && t.includes('virtual network.') ) {
      return 'Los NSG no se asocian a la VNet completa; solo a subredes o a NIC de VM. Referencia: https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview';
    }
    if (t.includes('network security group') && t.includes('network interface')) {
      return 'Además de subredes, un NSG puede asociarse directamente a una NIC para un control granular. Referencia: https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview';
    }

    // Cifrado / Firewall
    if (t.includes('azure firewall') && t.includes('encrypt')) {
      return 'Azure Firewall inspecciona y filtra tráfico; no cifra el tráfico. El cifrado se hace con TLS/IPsec en los extremos. Referencia: https://learn.microsoft.com/azure/firewall/overview';
    }
    if (t.includes('virtual machines') && t.includes('encrypt the network traffic')) {
      return 'Las VM pueden cifrar tráfico utilizando TLS/SSL o IPsec hacia destinos en Internet; el cifrado lo proporcionan las aplicaciones o protocolos. Referencia: https://learn.microsoft.com/windows/security/threat-protection/';
    }

    // Portal
    if (t.includes('select the correct azure portal url')) {
      return 'El portal de administración de Azure es https://portal.azure.com, accesible desde navegadores modernos.';
    }

    // Archive tier
    if (t.includes('archive access tier')) {
      return 'El nivel Archive mantiene los blobs en estado offline; para leerlos primero hay que rehidratarlos a niveles Hot o Cool. Referencia: https://learn.microsoft.com/azure/storage/blobs/access-tiers-overview';
    }

    // SLA compuesto
    if (t.includes('composite sla')) {
      return 'El SLA compuesto de dependencias se calcula multiplicando las disponibilidades individuales (p.ej., Web App 99.95% × SQL 99.99% ≈ 99.94%). Referencia: https://learn.microsoft.com/azure/architecture/framework/resiliency/availability-sla';
    }

    // Site Recovery
    if (t.includes('site recovery')) {
      return 'Azure Site Recovery orquesta la recuperación ante desastres (DR) replicando cargas de trabajo y coordinando failover. No es alta disponibilidad ni tolerancia a fallos inmediata. Referencia: https://learn.microsoft.com/azure/site-recovery/site-recovery-overview';
    }

    // Security Center / Defender for Cloud
    if (t.includes('security center')) {
      return 'Microsoft Defender for Cloud (antes Security Center) evalúa y monitoriza recursos en Azure y entornos híbridos, incluyendo recursos locales mediante Azure Arc. Algunas funcionalidades avanzadas requieren plan pago. Referencia: https://learn.microsoft.com/azure/defender-for-cloud/';
    }

    // Advisor
    if (t.includes('azure advisor')) {
      return 'Azure Advisor ofrece recomendaciones de coste, rendimiento, alta disponibilidad y seguridad. No inventaria copias de seguridad; para eso usa Azure Backup y Recovery Services Vault. Referencia: https://learn.microsoft.com/azure/advisor/advisor-overview';
    }

    // SaaS / PaaS / IaaS
    if (t.includes('platform as a service')) {
      return 'PaaS abstrae el sistema operativo y la infraestructura; proporciona capacidades como autoescalado, pero no da control total del SO ni servicios de desarrollo gestionados. Referencia: https://learn.microsoft.com/azure/architecture/guide/technology-choices/compute-decision-tree';
    }
    if (t.includes('software as a service')) {
      return 'En SaaS, el proveedor gestiona la infraestructura y la aplicación; tú configuras la solución y su uso, no instalas ni mantienes el software. Referencia: https://learn.microsoft.com/azure/architecture/guide/technology-choices/saas';
    }
    if (t.includes('azure virtual machines are an example')) {
      return 'Las máquinas virtuales de Azure son Infraestructura como servicio (IaaS): control de sistema operativo, redes y discos. Referencia: https://learn.microsoft.com/azure/virtual-machines/';
    }
    if (t.includes('azure sql database is an example')) {
      return 'Azure SQL Database es Plataforma como servicio (PaaS): servicio gestionado con parches, backup y escalado controlados por la plataforma. Referencia: https://learn.microsoft.com/azure/azure-sql/database/sql-database-paas-overview';
    }

    // RBAC / permisos
    if (t.includes('delegate permissions') && t.includes('virtual machines')) {
      return 'Asignar permisos a varias VM se hace más fácil si comparten el mismo grupo de recursos, porque puedes aplicar RBAC al ámbito del grupo. Referencia: https://learn.microsoft.com/azure/role-based-access-control/overview';
    }

    // Locks
    if (t.includes('delete lock')) {
      return 'Los bloqueos evitan cambios: para eliminar un recurso con bloqueo de eliminación, primero hay que quitar el bloqueo. Referencia: https://learn.microsoft.com/azure/azure-resource-manager/management/lock-resources';
    }

    // Disponibilidad
    if (t.includes('minimum number of virtual machines') && t.includes('high availability')) {
      return 'Para alta disponibilidad en un conjunto, se necesitan al menos dos VM distribuidas en dominios de error/actualización o zonas de disponibilidad. Referencia: https://learn.microsoft.com/azure/virtual-machines/availability-set-overview';
    }
    if (t.includes('availability zones') && t.includes('high availability')) {
      return 'Para tolerar la caída de una zona, usa al menos dos zonas distintas en la misma región. Referencia: https://learn.microsoft.com/azure/availability-zones/az-overview';
    }

    // Portal y dispositivos
    if (t.includes('android') && t.includes('azure portal')) {
      return 'El portal de Azure es una aplicación web; puedes crear y administrar VMs desde un navegador en Android. Referencia: https://learn.microsoft.com/azure/azure-portal/azure-portal-overview';
    }

    // Notificaciones de mantenimiento
    if (t.includes('service failure notifications') || t.includes('maintenance status')) {
      return 'En la hoja de Máquinas virtuales del portal existe “Estado de mantenimiento”, que muestra incidencias del host que pueden afectar a la VM. Referencia: https://learn.microsoft.com/azure/virtual-machines/maintenance-and-updates';
    }

    // Soporte
    if (t.includes('support plan')) {
      return 'El plan Standard es el nivel más económico con soporte 24x7 por teléfono; Developer es solo horario laboral y no incluye 24x7. Referencia: https://azure.microsoft.com/support/plans/';
    }

    // Sitio público migración
    if (t.includes('migrate a public website')) {
      return 'En Azure pagas por uso mensual de los recursos consumidos; no hay coste por “conexiones” y la transferencia de datos a Azure generalmente no se factura. Referencia: https://azure.microsoft.com/pricing/calculator/';
    }

    // Fallback genérico
    return `La respuesta correcta es “${a}”. Si quieres una explicación más detallada para esta pregunta, dímelo y la añado. Referencia general: https://learn.microsoft.com/azure/`;
  }

  function getParams() {
    const p = new URLSearchParams(window.location.search);
    return {
      preguntas: p.get('preguntas'),
      apuntes: p.get('apuntes'),
      name: p.get('name'),
      title: p.get('title'),
      mode: p.get('mode') || 'practica',
    };
  }

  function resolvePath(path) {
    if (!path) return null;
    try {
      const u = new URL(path, window.location.href);
      return u.href;
    } catch {
      return path;
    }
  }

  async function loadQuestions() {
    const params = getParams();
    const src = resolvePath(params.preguntas);
    if (src) {
      try {
        const res = await fetch(src, { cache: 'no-store' });
        if (!res.ok) throw new Error('error');
        const data = await res.json();
        const arr = Array.isArray(data) ? data.map(normalizeQuestion) : window.FALLBACK_QUESTIONS.map(normalizeQuestion);
        return arr;
      } catch (e) {
        return window.FALLBACK_QUESTIONS.map(normalizeQuestion);
      }
    }
    try {
      const res = await fetch('./preguntas_avanzadas.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('error');
      const data = await res.json();
      const arr = Array.isArray(data) ? data.map(normalizeQuestion) : window.FALLBACK_QUESTIONS.map(normalizeQuestion);
      return arr;
    } catch (e) {
      return window.FALLBACK_QUESTIONS.map(normalizeQuestion);
    }
  }

  function updateStatus() {
    els.current.textContent = state.currentIndex + 1;
    els.total.textContent = state.questions.length;
    els.points.textContent = state.score;
    if (els.answered) els.answered.textContent = state.answeredCount;
    // Porcentaje de aciertos sobre preguntas respondidas
    const answeredPct = Math.round(
      state.answeredCount > 0 ? (state.score / state.answeredCount) * 100 : 0
    );
    if (els.accuracy) {
      els.accuracy.textContent = `${answeredPct}%`;
      els.accuracy.className = answeredPct >= 70
        ? 'text-green-700 dark:text-green-400 font-medium'
        : 'text-amber-700 dark:text-amber-400 font-medium';
    }
    const pct = Math.round(((state.currentIndex) / Math.max(1, state.questions.length)) * 100);
    els.progressBar.style.width = `${pct}%`;
  }

  function clearOptions() {
    els.options.innerHTML = '';
    els.feedback.textContent = '';
    els.feedback.className = 'mt-4 text-sm';
  }

  function renderQuestion() {
    const q = state.questions[state.currentIndex];
    els.question.innerHTML = (function formatQuestion(raw){
      const s = String(raw ?? '');
      const escaped = s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return escaped
        .replace(/&lt;br\/?&gt;/gi, '<br>')
        .replace(/\n/g, '<br>')
        .replace(/\/underline\s+([\s\S]*?)\s*\/underline\//g, '<span class="underline">$1</span>');
    })(q.question);
    clearOptions();
    state.answered = false;
    els.nextBtn.classList.add('hidden');
    els.checkBtn.classList.add('hidden');

    if (q.type === 'matching') {
      renderMatching(q);
    } else if (Array.isArray(q.answer)) {
      // Selección múltiple: el número requerido es el tamaño del array de respuestas
      const requiredCount = q.answer.length;
      const selected = new Set();

      q.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.className = 'option-btn w-full';
        btn.dataset.value = opt;
        btn.addEventListener('click', () => {
          if (state.answered) return;
          const v = btn.dataset.value;
          if (selected.has(v)) {
            selected.delete(v);
            btn.className = 'option-btn w-full';
          } else {
            selected.add(v);
            // Selected state: Blue filled
            btn.className = 'option-btn w-full bg-blue-600 text-white border-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:border-blue-500';
          }
        });
        els.options.appendChild(btn);
      });

      els.checkBtn.classList.remove('hidden');
      els.checkBtn.onclick = () => checkMultiSelect(selected, q, requiredCount);
    } else {
      // yes_no y dropdown de selección única
      q.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.className = 'option-btn w-full';
        btn.dataset.value = opt;
        btn.addEventListener('click', () => handleAnswer(btn, q));
        els.options.appendChild(btn);
      });
    }
  }

  function linkify(text) {
    if (!text) return '';
    return text.replace(/https?:\/\/\S+/g, (url) => `<a href="${url}" target="_blank" rel="noopener" class="underline text-blue-700 dark:text-blue-400">${url}</a>`);
  }

  function handleAnswer(clickedBtn, q) {
    if (state.answered) return;
    state.answered = true;
    state.answeredCount += 1;

    const correctAnswer = q.answer;

    const isCorrect = clickedBtn.dataset.value === correctAnswer;
    if (isCorrect) {
      state.score += 1;
    }
    const optionButtons = Array.from(els.options.querySelectorAll('button'));

    optionButtons.forEach((b) => (b.disabled = true));

    optionButtons.forEach((b) => {
      const v = b.dataset.value;
      // Reset to base, but we will override colors
      // Note: option-btn has transition, but we want immediate feedback colors
      if (v === correctAnswer) {
        b.className = 'option-btn w-full bg-green-600 text-white border-green-600 dark:bg-green-600 dark:border-green-500';
      } else if (b === clickedBtn) {
        b.className = 'option-btn w-full bg-red-600 text-white border-red-600 dark:bg-red-600 dark:border-red-500';
      } else {
        // Unselected, disabled. option-btn handles basic style, but we might want to dim it?
        // default option-btn is fine, just disabled.
        b.className = 'option-btn w-full opacity-60'; 
      }
    });

    const baseMsg = isCorrect ? '¡Correcto!' : `Incorrecto. Respuesta: ${correctAnswer}`;
    const baseClass = isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400';

    const explanationText = q.explanation || getAutoExplanation(q);
    const explanation = explanationText
      ? `<div class="mt-2 text-gray-700 dark:text-gray-300">Motivo: ${linkify(explanationText)}</div>`
      : '';

    els.feedback.innerHTML = `<div class="${baseClass} font-bold">${baseMsg}</div>${explanation}`;
    els.feedback.className = 'mt-4 text-sm';

    els.nextBtn.classList.remove('hidden');
    updateStatus();
  }

  function renderMatching(q) {
    // Construir filas con selects para cada elemento de la izquierda
    const container = document.createElement('div');
    container.className = 'space-y-2';

    const selects = [];
    // Barajar opciones para evitar que el orden sugiera la respuesta
    const options = shuffle([...q.right]);

    q.left.forEach((leftItem, idx) => {
      const row = document.createElement('div');
      row.className = 'grid grid-cols-1 sm:grid-cols-2 gap-3 items-center';

      const label = document.createElement('div');
      label.textContent = leftItem;
      label.className = 'text-sm sm:text-base';

      const select = document.createElement('select');
      select.className = 'w-full px-3 py-2 rounded border bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white';
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Selecciona…';
      placeholder.selected = true;
      placeholder.disabled = true;
      select.appendChild(placeholder);

      options.forEach((opt) => {
        const o = document.createElement('option');
        o.value = opt;
        o.textContent = opt;
        select.appendChild(o);
      });

      selects.push({ select, leftItem });
      row.appendChild(label);
      row.appendChild(select);
      container.appendChild(row);
    });

    els.options.appendChild(container);
    els.checkBtn.classList.remove('hidden');
    els.checkBtn.onclick = () => checkMatching(selects, q);
  }

  function checkMatching(selects, q) {
    if (state.answered) return;
    // Construir el mapa elegido por el usuario
    const userMap = {};
    let allChosen = true;
    selects.forEach(({ select, leftItem }) => {
      const v = select.value;
      if (!v) allChosen = false;
      userMap[leftItem] = v;
    });

    if (!allChosen) {
      els.feedback.textContent = 'Selecciona una opción para cada fila.';
      els.feedback.className = 'mt-4 text-sm text-amber-700 dark:text-amber-400 font-medium';
      return;
    }

    state.answered = true;
    state.answeredCount += 1;
    const correctMap = q.correctMap;
    let allCorrect = true;
    selects.forEach(({ select, leftItem }) => {
      const v = select.value;
      const ok = v === correctMap[leftItem];
      if (!ok) allCorrect = false;
      select.className = ok
        ? 'w-full px-3 py-2 rounded bg-green-600 text-white dark:bg-green-600'
        : 'w-full px-3 py-2 rounded bg-red-600 text-white dark:bg-red-600';
      select.disabled = true;
    });

    if (allCorrect) {
      state.score += 1;
      const explanationText = q.explanation || getAutoExplanation(q);
      const explanation = explanationText ? `<div class="mt-2 text-gray-700 dark:text-gray-300">Motivo: ${linkify(explanationText)}</div>` : '';
      els.feedback.innerHTML = `<div class="text-green-700 dark:text-green-400 font-bold">¡Correcto!</div>${explanation}`;
      els.feedback.className = 'mt-4 text-sm';
    } else {
      // Mostrar resumen correcto
      const resumen = q.left.map((l) => `${l} → ${correctMap[l]}`).join('\n');
      const explanationText = q.explanation || getAutoExplanation(q);
      const explanation = explanationText ? `<div class="mt-2 text-gray-700 dark:text-gray-300">Motivo: ${linkify(explanationText)}</div>` : '';
      els.feedback.innerHTML = `<div class="text-red-700 dark:text-red-400 font-bold whitespace-pre-line">Incorrecto. Respuestas correctas:\n${resumen}</div>${explanation}`;
      els.feedback.className = 'mt-4 text-sm';
    }

    els.checkBtn.classList.add('hidden');
    els.nextBtn.classList.remove('hidden');
    updateStatus();
  }

  function checkMultiSelect(selectedSet, q, requiredCount) {
    if (state.answered) return;
    if (!selectedSet || selectedSet.size !== requiredCount) {
      els.feedback.textContent = `Selecciona ${requiredCount} respuestas.`;
      els.feedback.className = 'mt-4 text-sm text-amber-700 dark:text-amber-400 font-medium';
      return;
    }

    state.answered = true;
    state.answeredCount += 1;

    const correctSet = new Set(Array.isArray(q.answer) ? q.answer : [q.answer]);
    const buttons = Array.from(els.options.querySelectorAll('button'));
    let allCorrect = true;

    buttons.forEach((b) => {
      const v = b.dataset.value;
      const isSelected = selectedSet.has(v);
      const isCorrect = correctSet.has(v);
      b.disabled = true;
      if (isCorrect) {
        b.className = 'option-btn w-full bg-green-600 text-white border-green-600 dark:bg-green-600 dark:border-green-500';
      } else if (isSelected) {
        allCorrect = false;
        b.className = 'option-btn w-full bg-red-600 text-white border-red-600 dark:bg-red-600 dark:border-red-500';
      } else {
        b.className = 'option-btn w-full opacity-60';
      }
    });

    if (allCorrect) {
      state.score += 1;
      const explanationText = q.explanation || getAutoExplanation(q);
      const explanation = explanationText ? `<div class="mt-2 text-gray-700 dark:text-gray-300">Motivo: ${linkify(explanationText)}</div>` : '';
      els.feedback.innerHTML = `<div class="text-green-700 dark:text-green-400 font-bold">¡Correcto!</div>${explanation}`;
      els.feedback.className = 'mt-4 text-sm';
    } else {
      const correctList = Array.from(correctSet).join('\n');
      const explanationText = q.explanation || getAutoExplanation(q);
      const explanation = explanationText ? `<div class="mt-2 text-gray-700 dark:text-gray-300">Motivo: ${linkify(explanationText)}</div>` : '';
      els.feedback.innerHTML = `<div class="text-red-700 dark:text-red-400 font-bold whitespace-pre-line">Incorrecto. Respuestas correctas:\n${correctList}</div>${explanation}`;
      els.feedback.className = 'mt-4 text-sm';
    }

    els.checkBtn.classList.add('hidden');
    els.nextBtn.classList.remove('hidden');
    updateStatus();
  }

  function nextQuestion() {
    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex += 1;
      updateStatus();
      renderQuestion();
    } else {
      showFinal();
    }
  }

  function resetQuiz() {
    state.currentIndex = 0;
    state.score = 0;
    state.answeredCount = 0;
    updateStatus();
    els.final.classList.add('hidden');
    els.card.classList.remove('hidden');
    shuffle(state.questions);
    renderQuestion();
  }

  function showFinal() {
    const finalPct = Math.round((state.score / Math.max(1, state.questions.length)) * 100);
    const aprobado = finalPct >= 70 ? 'Aprobado' : 'No aprobado';
    els.finalScore.textContent = `${state.score} / ${state.questions.length} (${finalPct}%) – ${aprobado}`;
    els.card.classList.add('hidden');
    els.final.classList.remove('hidden');
  }

  async function init() {
    const params = getParams();
    const title = params.title || params.name || 'Cuestionario';
    if (els.examTitle) els.examTitle.textContent = title;
    if (els.examSubtitle) els.examSubtitle.textContent = params.mode === 'examen' ? 'Modo examen' : 'Modo de práctica';
    const notesHref = resolvePath(params.apuntes);
    if (els.apuntesLink && notesHref) els.apuntesLink.href = notesHref;
    if (els.modeSwitch) {
      els.modeSwitch.onclick = (ev) => {
        ev.preventDefault();
        const url = new URL(window.location.href);
        url.searchParams.set('mode', params.mode === 'examen' ? 'practica' : 'examen');
        window.location.href = url.href;
      };
    }
    const loaded = await loadQuestions();
    const shuffled = shuffle(loaded);
    state.questions = params.mode === 'examen' ? chooseExamSubset(shuffled) : shuffled;
    updateStatus();
    renderQuestion();
  }

  els.nextBtn.addEventListener('click', nextQuestion);
  els.resetBtn.addEventListener('click', resetQuiz);
  els.restartBtn.addEventListener('click', resetQuiz);

  init();
})();
