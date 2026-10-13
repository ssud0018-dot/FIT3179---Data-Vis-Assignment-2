// Loads each Vega-Lite specification from /specs and draws it into its container.
// Specs are plain JSON files so each chart can be read (and marked) on its own.

const charts = [
  ["#fig1", "specs/c1_line.json"],
  ["#fig2", "specs/c2_choropleth.json"],
  ["#fig3", "specs/c3_symbol_map.json"],
  ["#fig4", "specs/c4_tile_grid.json"],
  ["#fig5", "specs/c5_occupations.json"],
  ["#fig6", "specs/c6_heatmap.json"],
  ["#fig7", "specs/c7_capitals_dumbbell.json"],
  ["#fig8", "specs/c8_census.json"]
];

function showError(selector, message) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = '<p class="err">This chart could not be loaded (' + message + "). " +
    "If you opened the file directly, serve the folder with Live Server or GitHub Pages instead.</p>";
}

// Shared look (fonts, axis and legend colours) for every chart.
fetch("js/theme.json")
  .then((r) => r.json())
  .then((theme) => {
    charts.forEach(([selector, specUrl]) => {
      fetch(specUrl)
        .then((r) => r.json())
        .then((spec) => vegaEmbed(selector, spec, { actions: false, renderer: "svg", config: theme }))
        .catch((err) => showError(selector, err.message));
    });
  })
  .catch((err) => charts.forEach(([selector]) => showError(selector, err.message)));
