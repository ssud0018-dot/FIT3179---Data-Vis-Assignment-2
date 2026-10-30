// Loads each Vega-Lite specification from /specs and draws it into its container.
// Specs are plain JSON files so each chart can be read (and marked) on its own.

const charts = [
  ["#fig1", "specs/f01_national_line.json"],
  ["#fig2", "specs/f02_index_vs_other.json"],
  ["#fig3", "specs/f03_choropleth.json"],
  ["#fig4", "specs/f04_symbol_map.json"],
  ["#fig5", "specs/f05_cartogram.json"],
  ["#fig6", "specs/f06_state_lines.json"],
  ["#fig7", "specs/f07_composition.json"],
  ["#fig8", "specs/f08_occupations.json"],
  ["#fig9", "specs/f09_scatter.json"],
  ["#fig10", "specs/f10_heatmap.json"],
  ["#fig11", "specs/f11_long_run_share.json"],
  ["#fig12", "specs/f12_dumbbell.json"],
  ["#fig13", "specs/f13_census.json"],
  ["#fig14", "specs/f14_shortage.json"]
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
