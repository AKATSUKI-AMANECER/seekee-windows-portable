const defaultQueries = [
  'best AI productivity tools',
  'Windows portable app design',
  'research workflow for students',
  'how to summarize a long document',
  'latest AI news updates'
];

const generateResults = (query) => {
  const clean = query.trim();
  if (!clean) {
    return [];
  }

  const keywords = clean.split(/\s+/).slice(0, 3).join(' ');

  return [
    {
      title: `Search results for “${clean}”`,
      snippet: `Find reliable sources, tutorials, and summaries related to ${clean}. This portable app focuses on discovery, productivity, research, and learning workflows.`,
      tag: 'Research'
    },
    {
      title: `AI summary ideas for ${keywords}`,
      snippet: `Use a short overview, bullet points, and key takeaways to condense your research into a useful knowledge snapshot.`,
      tag: 'AI Tools'
    },
    {
      title: `Practical quick actions for ${keywords}`,
      snippet: `Compare sources, collect notes, and turn your query into a summary, outline, or study checklist with a clear next-step plan.`,
      tag: 'Productivity'
    }
  ];
};

const buildAssistantReply = (query) => {
  const clean = query.trim() || 'your topic';
  const suggestion = clean.length > 40 ? `${clean.slice(0, 40)}...` : clean;

  return `
    <p><strong>Query:</strong> ${suggestion}</p>
    <p>Here’s a good workflow:</p>
    <p>1. Search the main idea and collect 3 trusted sources.</p>
    <p>2. Extract the strongest facts, findings, and examples.</p>
    <p>3. Turn them into a short summary, checklist, or research note.</p>
    <p>4. Save the result for later reading or sharing.</p>
  `;
};

const renderResults = (results) => {
  const container = document.getElementById('resultsList');
  const count = document.getElementById('resultCount');

  if (!results.length) {
    container.innerHTML = '<div class="result-item"><p class="result-snippet">Type a search phrase to see recommendations.</p></div>';
    count.textContent = '0 results';
    return;
  }

  container.innerHTML = results
    .map(
      (item) => `
        <article class="result-item">
          <h3 class="result-title">${item.title}</h3>
          <p class="result-snippet">${item.snippet}</p>
          <span class="result-tag">${item.tag}</span>
        </article>
      `
    )
    .join('');

  count.textContent = `${results.length} results`;
};

const updateAssistant = (query) => {
  const output = document.getElementById('assistantOutput');
  output.innerHTML = buildAssistantReply(query);
};

const doSearch = () => {
  const input = document.getElementById('queryInput');
  const query = input.value.trim();
  const results = generateResults(query || defaultQueries[0]);
  renderResults(results);
  updateAssistant(query || defaultQueries[0]);

  if (!query) {
    input.value = defaultQueries[0];
  }
};

const bindActions = () => {
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
};

window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('queryInput');
  input.value = defaultQueries[0];
  renderResults(generateResults(defaultQueries[0]));
  updateAssistant(defaultQueries[0]);
  bindActions();
});

window.addEventListener('beforeunload', () => {
  document.getElementById('queryInput').blur();
});

if (typeof window !== 'undefined') {
  window.SEKEE_PORTABLE = true;
}
