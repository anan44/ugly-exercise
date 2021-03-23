const axios = require("axios");

const axi = axios.default;

const prefix = "https://www."
const reddit = "https://www.reddit.com/r/";
const ending = ".json";var page = "";

let app = require("express")
app = app()


function logInfo(m) {
  // LOG WITH INFO
  console.log("INFO:", m);
}

function getLen(x) {
  // HELPER
  let len = x.length;
  return len;
}


const getInfo = () => {
  return axi.get(reddit + page + ending).then(function (r) {
    // logInfo(r.data.data.children)
    let len = getLen(r.data.data.children);
    let INFO = {
      length: len
    }
    INFO.average = get_avg(r.data.data.children);
    let most_popular = popular(r)
    INFO.most_popular = most_popular;
    INFO.not_popular = {}
    INFO.not_popular.name = unpopuplar(r).name;
    INFO.not_popular.score = unpopuplar(r).score;
    return INFO
  });
}

async function main() {
  // NAME  
  page = "javascript";
  let data = await getInfo();
  logInfo(data);
}

function popular(data) {
  var pop = data.data.data.children[1].data.score;
  var pop_name = data.data.data.children[1].data.title
  for (var i = 0; i < data.data.data.children.length; i++) {
    if (pop < data.data.data.children[i].data.score) {
      pop = data.data.data.children[i].data.score
      pop_name = data.data.data.children[i].data.title;
    }
  }
  return { name: pop_name, score: pop }
}

function unpopuplar(data) {
  // NOT POPULAR
  var pop = data.data.data.children[1].data.score;
  var pop_name = data.data.data.children[1].data.title;
  for (var i = 0; i < data.data.data.children.length; i++) {
    if (pop > data.data.data.children[i].data.score) {
      pop = data.data.data.children[i].data.score
      pop_name = data.data.data.children[i].data.title;
    }
  }
  return { name: pop_name, score: pop };
}

const get_avg = (x) => {
  // GETS AVG
  let all = [];
  for (var i = 0; i < x.length; i++) {
    all.push(x[i].data.score);
  }
  let len = getLen(all);
  let sum = 0;
  for (x = 0; x < getLen(all); x++) {
    sum = sum + all[x];
  }
  return Math.floor(sum / len);
};

app.get("/:target", async function(req, res) {
  page = req.params.target
  res.send(await getInfo())
})

logInfo("Running in port 3000"); app.listen(3000);;
