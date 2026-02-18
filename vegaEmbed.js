async function fetchData() {
  const data = await d3.csv("dataset/videogames_long.csv", d3.autoType);
  return data;
}

fetchData().then((data) => {
  
  const myBirthYear = data.filter((d) => d.year === 2005);

  // Visualization 1
  const vis1 = vl
    .markRect()
    .data(data)
    .encode(
      vl.x().fieldN("platform"),
      vl.y().fieldN("genre"),
      vl.color().fieldQ("global_sales").aggregate("sum"),
      vl.tooltip(
        [
            vl.tooltip().fieldN("platform"),
            vl.tooltip().fieldN("genre"),
            vl.tooltip().fieldQ("global_sales").aggregate("sum")
        ]
      )
    )
    .width("container")
    .height(300)
    .toSpec();

  render("#view", vis1);

  const vis1a = vl
    .markBar()
    .data(data)
    .encode(
      vl.x().fieldN("genre"),
      vl.y().fieldQ("global_sales").aggregate("sum"),
      vl.tooltip(
        [
            vl.tooltip().fieldN("genre"),
            vl.tooltip().fieldQ("global_sales").aggregate("sum")
        ]
      )
    )
    .width("container")
    .height(300)
    .toSpec();

  render("#view1a", vis1a);

  const vis1b = vl
    .markBar()
    .data(data)
    .encode(
      vl.x().fieldN("platform"),
      vl.y().fieldQ("global_sales").aggregate("mean"),
      vl.tooltip(
        [
            vl.tooltip().fieldN("platform"),
            vl.tooltip().fieldQ("global_sales").aggregate("mean")
        ]
      )
    )
    .width("container")
    .height(300)
    .toSpec();

  render("#view1b", vis1b);

  // Visualization 2
  const vis2 = vl
    .markBar()
    .data(data)
    .encode(
      vl.x().fieldQ("year"),
      vl.y().fieldQ("global_sales").aggregate("mean"),
      vl.color().fieldN("platform"),
      vl.tooltip([vl.fieldN("genre")])
    )
    .width("container")
    .height(300)
    .toSpec();

  render("#view2", vis2);

  const vis2a = vl
    .markLine()
    .data(data)
    .encode(
      vl.x().fieldQ("year"),
      vl.y().fieldQ("global_sales").aggregate("sum"),
      vl.color().fieldN("platform"),
      vl.tooltip([
        vl.tooltip().fieldQ("year"),
        vl.tooltip().fieldN("platform"),
        vl.tooltip().fieldQ("global_sales").aggregate("sum")
    ])
    )
    .width("container")
    .height(300)
    .toSpec();

  render("#view2a", vis2a);

  const vis2b = vl
    .markLine()
    .data(data)
    .encode(
      vl.x().fieldQ("year"),
      vl.y().fieldQ("global_sales").aggregate("sum"),
      vl.color().fieldN("genre"),
      vl.tooltip([
        vl.tooltip().fieldQ("year"),
        vl.tooltip().fieldN("genre"),
        vl.tooltip().fieldQ("global_sales").aggregate("sum")
    ])
    )
    .width("container")
    .height(300)
    .toSpec();

  render("#view2b", vis2b);

  // Visualization 3
  const vis3 = vl
    .markBar()
    .data(data)
    .encode(
      vl.x().fieldN("platform"),
      vl.y().fieldQ("sales_amount").aggregate("sum").title("Sales (Millions)"),
      vl.color().fieldN("sales_region").title("Region"),
    )
    .width("container")
    .height(300)
    .toSpec();

  render("#view3", vis3);

  const vis3a = vl
    .markBar()
    .data(data)
    .encode(
      vl.x().fieldN("platform"),
      vl.y().fieldQ("sales_amount").aggregate("sum").stack("normnalize").title("Share of Sales (%)"),
      vl.color().fieldN("sales_region").title("Region"),
      vl.tooltip([ 
        vl.tooltip().fieldN("platform"), 
        vl.tooltip().fieldN("sales_region"), 
        vl.tooltip().fieldQ("sales_amount").aggregate("sum") 
      ])
    )
    .width("container")
    .height(300)
    .toSpec();

  render("#view3a", vis3a);

  // Visualization 4
  const vis4 = vl
    .markRect()
    .data(myBirthYear)
    .encode(
      vl.x().fieldN("platform"),
      vl.y().fieldN("genre"),
      vl.color().fieldQ("global_sales").aggregate("sum"),
      vl.tooltip([
        vl.tooltip().fieldN("platform"),
        vl.tooltip().fieldN("genre"),
        vl.tooltip().fieldQ("global_sales").aggregate("sum")
    ])
    )
    .width("container")
    .height(300)
    .toSpec();

  render("#view4", vis4);

  const vis4a = vl
    .markCircle()
    .data(myBirthYear)
    .transform( vl.aggregate([ 
        { op: "sum", field: "global_sales", as: "total_sales" }, 
        { op: "mean", field: "global_sales", as: "avg_sales" } 
    ]).groupby(["genre"]) ) 
    .encode( 
        vl.x().fieldN("genre"), 
        vl.y().fieldN("genre"), 
        vl.size().fieldQ("total_sales").title("Total Sales"), 
        vl.color().fieldQ("avg_sales").title("Avg Sales"), 
        vl.tooltip([ 
            vl.tooltip().fieldN("genre"), 
            vl.tooltip().fieldQ("total_sales"), 
            vl.tooltip().fieldQ("avg_sales") 
        ]) 
    )
    .width("container")
    .height(300)
    .toSpec();

  render("#view4a", vis4a);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}