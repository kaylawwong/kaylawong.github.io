async function fetchData() {
  const data = await d3.csv("./dataset/videogames_long.csv", d3.autoType);
  return data;
}

fetchData().then((data) => {

    // visualization 1
    const vis1 = vl
        .markBar()
        .data(data)
        .encode(
            vl.x().fieldN("platform"),
            vl.y().fieldQ("global_sales").aggregate("sum")
        )
        .width("container")
        .height(300)
        .toSpec();

});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}