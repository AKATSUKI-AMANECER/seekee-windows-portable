const defaultQueries = [
  'mejores herramientas de IA para productividad',
  'diseño de app portable para Windows',
  'cómo resumir un documento largo',
  'flujo de trabajo para investigación',
  'últimas noticias sobre IA'
];

const resultBank = {
  'mejores herramientas de IA para productividad': [
    {
      title: 'Herramientas IA para productividad',
      snippet: 'Busca asistentes para escribir, resumir, transformar documentos y automatizar tareas repetitivas en el trabajo diario.',
      tag: 'Productividad'
    },
    {
      title: 'Workflow de IA útil para equipos',
      snippet: 'Usa la IA para resumir conversaciones, extraer ideas clave y convertir notas en tareas ejecutables.',
      tag: 'Trabajo'
    }
  ],
  'diseño de app portable para Windows': [
    {
      title: 'Diseño de aplicación portable para Windows',
      snippet: 'Una app portable suele tener una sola carpeta, sin instalación, y ejecutarse con un lanzador local para abrir el navegador.',
      tag: 'Diseño'
    }
  ],
  'cómo resumir un documento largo': [
    {
      title: 'Guía para resumir documentos',
      snippet: 'Identifica idea principal, argumentos clave y conclusión; luego convierte el contenido en bullets claros.',
      tag: 'Aprender'
    }
  ]
};

function generateResults(query) {
  const clean = (query || '').trim();
  if (!clean) {
    return [
      {
        title: 'Sin consulta aún',
        snippet: 'Escribe una idea para crear resultados relevantes.',
        tag: 'Inicio'
      }
    ];
  }

  const key = clean.toLowerCase();
  if (resultBank[key]) return resultBank[key];

  return [
    {
      title: `Resultados para “${clean}”`,
      snippet: `Busca fuentes confiables, extrae ideas clave y conviértelas en un resumen sencillo con pasos claros de acción.`,
      tag: 'Investigación'
    },
    {
      title: `Resumen rápido de ${clean}`,
      snippet: `Primero define el objetivo, luego recolecta 3 fuentes y extrae el punto central, ejemplos y conclusiones relevantes.`,
      tag: 'IA'
    },
    {
      title: `Siguiente paso para ${clean}`,
      snippet: `Convierte la información en notas, tabla de puntos clave o plan de trabajo para facilitar la comprensión y ejecución.`,
      tag: 'Productividad'
    }
  ];
}

function buildAssistantReply(query) {
  const clean = (query || '').trim() || 'tu tema';
  return `
    <p><strong>Consulta:</strong> ${clean}</p>
    <p>Este flujo funciona bien:</p>
    <p>1. Define el objetivo y busca 3 fuentes confiables.</p>
    <p>2. Extrae hechos clave, ejemplos y conclusiones.</p>
    <p>3. Convierte la información en un resumen breve o un plan de acción.</p>
    <p>4. Guarda el resultado y compártelo cuando lo necesites.</p>
  `;
}

function renderResults(results) {
  const container = document.getElementById('resultsList');
  const count = document.getElementById('resultCount');

  if (!results.length) {
    container.innerHTML = '<div class="result-item"><p class="result-snippet">Aún no hay resultados.</p></div>';
    count.textContent = '0 resultados';
    return;
  }

  container.innerHTML = results.map(item => `
    <article class="result-item">
      <h3 class="result-title">${item.title}</h3>
      <p class="result-snippet">${item.snippet}</p>
      <span class="result-tag">${item.tag}</span>
    </article>
  `).join('');

  count.textContent = `${results.length} resultados`;
}

function updateAssistant(query) {
  const output = document.getElementById('assistantOutput');
  output.innerHTML = buildAssistantReply(query);
}

function doSearch() {
  const input = document.getElementById('queryInput');
  const query = input.value.trim();
  const results = generateResults(query || defaultQueries[0]);
  renderResults(results);
  updateAssistant(query || defaultQueries[0]);
}

function bindActions() {
  document.getElementById('searchBtn').addEventListener('click', doSearch);
  document.getElementById('askBtn').addEventListener('click', doSearch);

  document.getElementById('queryInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      doSearch();
    }
  });

  document.querySelectorAll('.suggestion').forEach((button) => {
    button.addEventListener('click', () => {
      const input = document.getElementById('queryInput');
      input.value = button.textContent.trim();
      doSearch();
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('queryInput');
  input.value = defaultQueries[0];
  renderResults(generateResults(defaultQueries[0]));
  updateAssistant(defaultQueries[0]);
  bindActions();
});
