

const svg = d3.select('#mini-stage');
const MAX_CIRCLES = 10;
const MIN_R = 14;
const MAX_R = 40;

const palette = d3.schemeTableau10;
const color = d3.scaleOrdinal(palette);

// Keep a simple array of circle data so we can remove the oldest when needed
let circles = []; // each: { id, x, y, r, fill }
let idCounter = 0;

// Helper to clamp values within the viewBox (optional safeguard)
const width = 960;
const height = 540;
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// Add a new circle datum and render
function addCircleAt(x, y) {
  const datum = {
    id: ++idCounter,
    x: clamp(x, 0, width),
    y: clamp(y, 0, height),
    r: Math.random() * (MAX_R - MIN_R) + MIN_R,
    fill: color(idCounter % palette.length)
  };

  circles.push(datum);
  if (circles.length > MAX_CIRCLES) {
    circles.shift(); // remove oldest
  }

  render();
}

// Data join to draw circles
function render() {
  const sel = svg.selectAll('circle').data(circles, d => d.id);

  // EXIT: fade out then remove
  sel.exit()
    .transition().duration(200)
    .attr('opacity', 0)
    .remove();

  // ENTER: start from r=0 and fade in
  const enter = sel.enter()
    .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', 0)
    .attr('fill', d => d.fill)
    .attr('opacity', 0);

  // ENTER + UPDATE: animate to final size/opacity
  enter.merge(sel)
    .transition().duration(280)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => d.r)
    .attr('opacity', 1);
}

// Click handler on the SVG
svg.on('click', function(event) {
  const [x, y] = d3.pointer(event, this);
  addCircleAt(x, y);
});

// Optional: keyboard shortcut "c" to clear
d3.select(window).on('keydown', (event) => {
  if (event.key.toLowerCase() === 'c') {
    circles = [];
    render();
  }
});
