// get container
const container = document.getElementById('visualization-container');

// svg 1: bar chart
const svgWidth = 700;
const svgHeight = 350;

const margin = { top: 100, right: 40, bottom: 80, left: 60 };
const chartWidth = svgWidth - margin.left - margin.right;
const chartHeight = svgHeight - margin.top - margin.bottom;

const barData = [2, 12, 9, 8, 2];
const barLabels = ["2022", "2023", "2024", "2025", "2026"];

const maxValue = Math.max(...barData);

const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg1.setAttribute("width", svgWidth);
svg1.setAttribute("height", svgHeight);
svg1.style.border = "1px solid white";
svg1.style.marginBottom = "80px";

// title
const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
title.textContent = "concerts i have attended";
title.setAttribute("x", svgWidth / 2);
title.setAttribute("y", 32);
title.setAttribute("text-anchor", "middle");
title.setAttribute("fill", "white");
title.setAttribute("font-size", "20px");
svg1.appendChild(title);

// bars
barData.forEach((value, index) => {
    const barHeight = (value / maxValue) * chartHeight;

    const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bar.setAttribute(
        "x",
        margin.left + index * (chartWidth / barData.length) + 20
    );
    bar.setAttribute(
        "y",
        margin.top + chartHeight - barHeight
    );
    bar.setAttribute("width", 40);
    bar.setAttribute("height", barHeight);
    bar.setAttribute("fill", "#FAD0DE");

    svg1.appendChild(bar);

    // value label
    const valueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    valueLabel.textContent = value;
    valueLabel.setAttribute(
        "x",
        margin.left + index * (chartWidth / barData.length) + 40
    );
    valueLabel.setAttribute(
        "y",
        margin.top + chartHeight - barHeight - 8
    );
    valueLabel.setAttribute("text-anchor", "middle");
    valueLabel.setAttribute("fill", "white");
    valueLabel.setAttribute("font-size", "12px");

    svg1.appendChild(valueLabel);

    // x-axis labels
    const xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    xLabel.textContent = barLabels[index];
    xLabel.setAttribute(
        "x",
        margin.left + index * (chartWidth / barData.length) + 40
    );
    xLabel.setAttribute("y", svgHeight - 60);
    xLabel.setAttribute("text-anchor", "middle");
    xLabel.setAttribute("fill", "white");
    xLabel.setAttribute("font-size", "12px");

    svg1.appendChild(xLabel);
});

// y-axis title
const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "text");
yAxis.textContent = "number of concerts";
yAxis.setAttribute("x", -32);
yAxis.setAttribute("y", svgHeight / 2);
yAxis.setAttribute("fill", "white");
yAxis.setAttribute("font-size", "14px");
yAxis.setAttribute("transform", `rotate(-90 20 ${svgHeight / 2})`);
svg1.appendChild(yAxis);

// x-axis title
const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "text");
xAxis.textContent = "year";
xAxis.setAttribute("x", margin.left + chartWidth / 2);
xAxis.setAttribute("y", svgHeight - 20);
xAxis.setAttribute("text-anchor", "middle");
xAxis.setAttribute("fill", "white");
xAxis.setAttribute("font-size", "14px");

svg1.appendChild(xAxis);

container.appendChild(svg1);


// svg 2: creative

const artWidth = 700;
const artHeight = 300;

const svgArt = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgArt.setAttribute("width", artWidth);
svgArt.setAttribute("height", artHeight);
svgArt.style.border = "1px solid white";
svgArt.style.marginBottom = "80px";

// title
const artTitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
artTitle.textContent = "floating concert lights";
artTitle.setAttribute("x", artWidth / 2);
artTitle.setAttribute("y", 32);
artTitle.setAttribute("text-anchor", "middle");
artTitle.setAttribute("fill", "white");
artTitle.setAttribute("font-size", "20px");
svgArt.appendChild(artTitle);

// create floating circles
const circleCount = 25;

for (let i = 0; i < circleCount; i++) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    const cx = Math.random() * artWidth;
    const cy = Math.random() * (artHeight - 80) + 60;
    const r = Math.random() * 12 + 6;

    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("fill", "#FAD0DE");
    circle.setAttribute("opacity", "0.7");

    // animation (floating up & down)
    const animate = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "animateTransform"
    );
    animate.setAttribute("attributeName", "transform");
    animate.setAttribute("type", "translate");
    animate.setAttribute("from", `0 0`);
    animate.setAttribute("to", `0 -12`);
    animate.setAttribute("dur", `${Math.random() * 3 + 2}s`);
    animate.setAttribute("direction", "alternate");
    animate.setAttribute("repeatCount", "indefinite");

    circle.appendChild(animate);

    // hover interaction
    circle.addEventListener("mouseover", () => {
        circle.setAttribute("opacity", "1");
        circle.setAttribute("r", r + 4);
    });

    circle.addEventListener("mouseout", () => {
        circle.setAttribute("opacity", "0.7");
        circle.setAttribute("r", r);
    });

    svgArt.appendChild(circle);
}

container.appendChild(svgArt);