const express = require("express");
const _ = require("lodash");
const minimist = require("minimist");
const Handlebars = require("handlebars");
const serialize = require("serialize-javascript");

const app = express();

app.get("/", (req, res) => {
  const query = minimist(process.argv.slice(2));
  const title = query.title || "alert-testing sample";
  const items = _.uniq(["alpha", "beta", "beta", "gamma"]).sort();

  const tpl = Handlebars.compile(
    "<html><head><title>{{title}}</title></head><body>" +
      "<h1>{{title}}</h1>" +
      "<pre id='data'>{{data}}</pre>" +
      "<ul>{{#each items}}<li>{{this}}</li>{{/each}}</ul>" +
    "</body></html>"
  );

  const html = tpl({
    title,
    items,
    data: serialize({ now: new Date().toISOString(), items })
  });

  res.setHeader("content-type", "text/html; charset=utf-8");
  res.send(html);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`sample server listening on http://localhost:${port}`);
});
