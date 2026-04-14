const trails = [
  {
    id: "jiuxi",
    name: "九溪烟树 - 五云山 - 十里琅珰 - 龙井村",
    location: "西湖风景名胜区",
    image: "assets/outdoor/jiuxi.jpg",
    season: "春季热门",
    difficulty: "轻中度",
    duration: "半天到一天",
    intro:
      "溪流、茶园、山脊线连成一条非常完整的春日徒步体验，适合想在周末真正离开室内、但又不想跑太远的人。",
    why:
      "春天的九溪水量和新茶季氛围都很好，既有流水感，也有龙井茶园的层次感。",
    tags: ["溪流", "茶园", "春天", "拍照", "半天", "经典", "新手进阶", "龙井", "山脊线"],
    routeSummary: "九溪公交站上山，穿过五云山与真际寺，走十里琅珰山脊，最后下到龙井村。",
    ascent: "九溪公交站 / 九溪烟树一线",
    descent: "龙井村下山，也可按体力原路折返",
    passBy: ["西山游步道", "五云山牌坊", "真际寺", "十里琅珰", "棋盘山", "龙井村茶园"],
    tips: [
      "九溪和山脊部分石阶较多，雨后容易湿滑，穿抓地力好的鞋更稳妥。",
      "如果打算一路走到龙井村，建议至少预留半天时间，并携带足量饮水。",
      "春季茶村游客较多，周末建议早点出发，避开中午后人流高峰。"
    ],
    guide: [
      "从九溪公交站附近进入西山游步道，先沿九溪一线热身，路段相对好走，也更容易进入状态。",
      "穿过“五云山”牌坊后开始持续上行，核心打卡点是真际寺和五云山一线，适合短暂停留看山景。",
      "继续沿十里琅珰山脊往北走，途中能看到茶山、林间步道和开阔视野，是整条线路最好看的部分。",
      "经过棋盘山一带后朝龙井村方向下撤，下山后可以在龙井村一线补给、休息，再决定是否继续逛茶园。",
      "如果不想走成长线，也可以在五云山或十里琅珰段视体力折返，不必强行走完全程。 "
    ],
    sourceNote: "路线信息综合杭州日报活动路线与十里琅珰常见徒步走法整理。",
    sources: [
      {
        label: "都市快报：九溪-五云山-真际寺-十里琅珰-棋盘山-龙井一线",
        url: "https://mdaily.hangzhou.com.cn/dskb/2024/04/11/article_detail_2_20240411A036.html"
      },
      {
        label: "图片来源：Wikimedia Commons - 九溪十八涧",
        url: "https://commons.wikimedia.org/wiki/File:%E6%9D%AD%E5%B7%9E._%E4%B9%9D%E6%BA%AA%E5%8D%81%E5%85%AB%E6%B6%A7%EF%BC%88%E4%B9%9D%E6%BA%AA%E7%83%9F%E6%A0%91%EF%BC%89_-_panoramio_%281%29.jpg"
      }
    ]
  },
  {
    id: "jingshan",
    name: "径山古道 - 茶园竹海 - 径山寺",
    location: "余杭径山",
    image: "assets/outdoor/jingshan.jpg",
    season: "春季热门",
    difficulty: "新手友好",
    duration: "半天",
    intro:
      "想要更安静、更疗愈的徒步氛围，径山很适合。竹海、茶田、古道和寺院组合在一起，节奏慢但不会无聊。",
    why:
      "适合想通过步行从高压工作里抽离出来的人，走法清晰，目的地也明确。",
    tags: ["禅意", "茶园", "竹海", "春天", "新手", "半天", "寺庙", "安静", "余杭"],
    routeSummary: "从洞桥自然村附近古道口上山，沿古道经过半山亭、望江亭等点位，抵达径山寺后原路下撤。",
    ascent: "洞桥自然村 / 径山古道入口",
    descent: "建议原路返回洞桥自然村，最稳妥也最清晰",
    passBy: ["径山古道石碑", "茶园与竹林段", "半山亭", "望江亭", "佛圣水", "径山寺"],
    tips: [
      "古道多为石板与台阶路，连续上坡不算陡，但对膝盖仍有一定消耗，建议慢走。",
      "如果打算在径山寺停留用斋饭或喝茶，最好把时间放宽一点，别把行程压得太满。",
      "天气湿润时石板路会变滑，登山杖会非常有帮助。"
    ],
    guide: [
      "建议从径山镇洞桥自然村一线的古道入口起步，这条走法辨识度高，也最符合大众休闲徒步习惯。",
      "上山前半段以竹林和茶田为主，坡度相对平缓，适合边走边适应；途中可在半山亭、望江亭短暂停留。",
      "继续往上会经过佛圣水等古道节点，沿线能感受到比较强的古道历史感和禅茶氛围。",
      "终点以径山寺为核心，可在寺院周边休整；对多数普通周末用户来说，到寺后原路下山是最不容易迷路的选择。",
      "如果只是想轻量放松，不建议再额外拼接野路或陌生岔路，保持一上一下的清晰路线就很好。"
    ],
    sourceNote: "路线信息综合杭州网对径山古道“今道”介绍与公开徒步路线节点整理。",
    sources: [
      {
        label: "杭州网：径山古道有“古道”和“今道”，今道起点为洞桥自然村",
        url: "https://hznews.hangzhou.com.cn/chengshi/content/2022-11/06/content_8392395.htm"
      },
      {
        label: "公开徒步资料：径山古道沿途节点包括半山亭、望江亭、佛圣水等",
        url: "https://www.sohu.com/a/192502860_755050"
      },
      {
        label: "图片来源：Wikimedia Commons - 径山古道边半里茶园",
        url: "https://commons.wikimedia.org/wiki/File:%E5%BE%84%E5%B1%B1%E5%8F%A4%E9%81%93%E8%BE%B9%E5%8D%8A%E9%87%8C%E8%8C%B6%E5%9B%AD.jpg"
      }
    ]
  },
  {
    id: "baoshi",
    name: "黄龙洞 - 初阳台 - 保俶塔 - 葛岭",
    location: "西湖北线 / 宝石山",
    image: "assets/outdoor/baoshi.jpg",
    season: "春季轻徒步",
    difficulty: "入门级",
    duration: "2小时左右",
    intro:
      "如果用户只是想周末出门走一走，不想做太重的攻略，宝石山是一条非常适合新手和城市轻徒步的线路。",
    why:
      "距离近、路线短、视野好，春天草木起来后很适合看湖景和拍城市山景。",
    tags: ["新手", "城市轻徒步", "湖景", "拍照", "半天", "日出", "保俶塔", "短线"],
    routeSummary: "从黄龙洞登山口或北山路保俶塔前山路上山，经过初阳台、保俶塔、葛岭后回到山下。",
    ascent: "黄龙洞登山口 / 北山路坚匏别墅南门一线",
    descent: "推荐从葛岭或黄龙洞一线下山，形成轻松小环线",
    passBy: ["黄龙洞登山口", "初阳台", "保俶塔", "宝石流霞", "蛤蟆峰", "葛岭"],
    tips: [
      "虽然路线短，但部分石阶有坡度，穿运动鞋会更舒服。",
      "宝石山观景点比较多，清晨和傍晚都很适合，周末拍照人流也会偏多。",
      "如果是第一次徒步，建议走黄龙洞登山口这条更清晰的入口，减少找路成本。"
    ],
    guide: [
      "这条线很适合“只想出门透口气”的用户，推荐从黄龙洞登山口或北山路保俶塔前山路上山。",
      "上山后可先到初阳台，再继续向保俶塔方向移动，这一段是看西湖与城市轮廓的核心视角。",
      "随后经过宝石流霞、蛤蟆峰、葛岭等点位，路线不长，适合慢慢走、慢慢看。",
      "下山时可以直接从葛岭或回到黄龙洞一线，形成轻松闭环；如果体力一般，原路折返也完全没问题。",
      "整体更适合放松型用户，不需要把它当成强度训练线，关键是把周末从室内带到户外。 "
    ],
    sourceNote: "路线信息综合杭州网春季西湖登山攻略与每日商报春季推荐线路整理。",
    sources: [
      {
        label: "杭州网：宝石山入门级路线",
        url: "https://hznews.hangzhou.com.cn/wenti/content/2018-03/16/content_6822714_0.htm"
      },
      {
        label: "每日商报：黄龙洞登山口途经初阳台、保俶塔、葛岭的推荐走法",
        url: "https://mdaily.hangzhou.com.cn/mrsb/2025/03/01/article_detail_3_20250301A099.html"
      },
      {
        label: "图片来源：Wikimedia Commons - 宝石山",
        url: "https://commons.wikimedia.org/wiki/File:%E5%AE%9D%E7%9F%B3%E5%B1%B1.JPG"
      }
    ]
  }
];

const trailList = document.getElementById("trail-list");
const detailPanel = document.getElementById("detail-panel");
const detailTitle = document.getElementById("detail-title");
const detailSubtitle = document.getElementById("detail-subtitle");
const resultSummary = document.getElementById("result-summary");
const searchInput = document.getElementById("trail-search");
const quickTags = document.getElementById("quick-tags");
const clearSearch = document.getElementById("clear-search");

const tagOptions = ["新手", "茶园", "溪流", "寺庙", "拍照", "城市轻徒步", "半天", "安静"];

function createTagButtons() {
  quickTags.innerHTML = "";
  tagOptions.forEach((tag) => {
    const button = document.createElement("button");
    button.className = "tag-button";
    button.type = "button";
    button.textContent = tag;
    button.addEventListener("click", () => {
      searchInput.value = tag;
      renderTrailList(tag);
    });
    quickTags.appendChild(button);
  });
}

function getFilteredTrails(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return trails;

  return trails.filter((trail) => {
    const haystack = [
      trail.name,
      trail.location,
      trail.intro,
      trail.why,
      trail.routeSummary,
      trail.difficulty,
      trail.duration,
      ...trail.tags,
      ...trail.passBy
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

function getMatchReason(trail, query) {
  if (!query.trim()) return "当季热门推荐，适合春天周末出发。";

  const normalized = query.trim().toLowerCase();
  const matchedTag = trail.tags.find((tag) => tag.toLowerCase().includes(normalized));
  if (matchedTag) return `匹配到你的需求关键词：${matchedTag}`;
  if (trail.name.toLowerCase().includes(normalized)) return "名称直接匹配，适合优先查看。";
  if (trail.passBy.join(" ").toLowerCase().includes(normalized)) return "路线节点与你的搜索意图相符。";
  return "根据简介和路线特征匹配到你的模糊需求。";
}

function renderTrailList(query = "") {
  const filtered = getFilteredTrails(query);
  trailList.innerHTML = "";
  resultSummary.textContent = query.trim()
    ? `搜索 “${query.trim()}” 共找到 ${filtered.length} 条推荐`
    : `当前展示 ${filtered.length} 条春季热门徒步推荐`;

  if (!filtered.length) {
    trailList.innerHTML = `<div class="empty-state">没有找到完全匹配的路线，可以试试“新手”“茶园”“溪流”“半天”这类关键词。</div>`;
    return;
  }

  filtered.forEach((trail, index) => {
    const card = document.createElement("article");
    card.className = "trail-card";
    card.dataset.id = trail.id;
    card.innerHTML = `
      <img src="${trail.image}" alt="${trail.name}">
      <div class="trail-copy">
        <div class="trail-topline">
          <span class="card-tag">${trail.season}</span>
          <span class="badge">${trail.location}</span>
        </div>
        <h3>${trail.name}</h3>
        <p class="simple-intro">${trail.intro}</p>
        <div class="stats-row">
          <span class="badge">难度：${trail.difficulty}</span>
          <span class="badge">建议时长：${trail.duration}</span>
        </div>
        <p class="match-reason">${getMatchReason(trail, query)}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      document.querySelectorAll(".trail-card").forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
      renderDetail(trail);
      detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    trailList.appendChild(card);

    if (index === 0 && !document.querySelector(".trail-card.active")) {
      card.classList.add("active");
      renderDetail(trail);
    }
  });
}

function renderDetail(trail) {
  detailPanel.classList.remove("empty");
  detailTitle.textContent = trail.name;
  detailSubtitle.textContent = trail.routeSummary;

  detailPanel.innerHTML = `
    <div class="detail-visual">
      <img src="${trail.image}" alt="${trail.name}">
    </div>
    <div class="detail-copy">
      <div class="detail-topline">
        <span class="card-tag">${trail.season}</span>
        <span class="badge">${trail.location}</span>
      </div>
      <div class="stats-row">
        <span class="badge">难度：${trail.difficulty}</span>
        <span class="badge">建议时长：${trail.duration}</span>
      </div>
      <p>${trail.why}</p>

      <div class="meta-grid">
        <dl class="meta-list">
          <dt>从哪里上山</dt>
          <dd>${trail.ascent}</dd>
        </dl>
        <dl class="meta-list">
          <dt>怎么下山</dt>
          <dd>${trail.descent}</dd>
        </dl>
      </div>

      <div class="guide-block">
        <h3>路线会经过</h3>
        <p>${trail.passBy.join(" → ")}</p>
      </div>

      <div class="guide-block">
        <h3>详细攻略</h3>
        <ol class="guide-list">
          ${trail.guide.map((item) => `<li>${item}</li>`).join("")}
        </ol>
      </div>

      <div class="guide-block">
        <h3>注意事项</h3>
        <ul class="tips-list">
          ${trail.tips.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>

      <div class="guide-block">
        <h3>信息来源</h3>
        <p>${trail.sourceNote}</p>
        <ul class="source-list">
          ${trail.sources.map((source) => `<li><a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a></li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

searchInput.addEventListener("input", (event) => {
  renderTrailList(event.target.value);
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  renderTrailList("");
});

createTagButtons();
renderTrailList();
