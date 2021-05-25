// PostList.vue
<template>
  <div id="postlist">
    <div v-for="post in posts" :key="post.frontmatter.num">
      <a v-bind:href="post.path">
        <article class="outer">
          <a class="inner" :href="post.path" target="">
            <div class="photo-outer">
              <img
                v-if="post.frontmatter.num == 1"
                src="../assets/profile.png"
              />
              <img
                v-else-if="post.frontmatter.num == 2"
                src="../assets/2.png"
              />
              <img
                v-else-if="post.frontmatter.num == 3"
                src="../assets/COVIDpic/newSIQR-I-case1.png"
              />
              <img
                v-else-if="post.frontmatter.num == 4"
                src="../assets/nakano_campus.jpg"
              />
              <img
                v-else-if="post.frontmatter.num == 5"
                src="../assets/retroTinyBox.jpg"
              />
              <img
                v-else-if="post.frontmatter.num == 6"
                src="../assets/utsusemi.png"
              />
              <img
                v-else-if="post.frontmatter.num == 7"
                src="../assets/NCChackathon20summer.png"
              />
              <img
                v-else-if="post.frontmatter.num == 8"
                src="../assets/GAS.png"
              />
              <img
                v-else-if="post.frontmatter.num == 9"
                src="../assets/mac.jpg"
              />
              <img
                v-else-if="post.frontmatter.num == 10"
                src="../assets/menu.png"
              />
              <img
                v-else-if="post.frontmatter.num == 11"
                src="../assets/profile.png"
              />
              <img
                v-else-if="post.frontmatter.num == 12"
                src="../assets/meiji_adobe_1.jpg"
              />
              <img
                v-else-if="post.frontmatter.num == 13"
                src="../assets/osmanthus.png"
              />
              <img
                v-else-if="post.frontmatter.num == 202101"
                src="../assets/trello-tldr.png"
              />
              <img
                v-else-if="post.frontmatter.num == 202102"
                src="../assets/Julia.jpeg"
              />
            </div>
            <div class="text-outer">
              <div class="title">{{ post.title }}</div>
              <div class="description">{{ post.frontmatter.description }}</div>
              <div>
                <span
                  class="tags"
                  :key="index + `/` + item"
                  v-for="(item, index) in post.frontmatter.tags"
                  style="display: inline-block"
                >
                  {{ item }}
                </span>
              </div>
            </div>
          </a>
        </article>
      </a>
      <!--a v-bind:href="post.path">続きを読む</a-->
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$site.pages
        .filter((post) => post.path.startsWith("/posts/")) // blogディレクトリ以下を投稿記事一覧表示の対象とする
        .sort(
          // dateに設定した日付の降順にソートする
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        );
    },
  },
  methods: {},
  data: () => ({
    imgFirst: "../../assets/profile.png",
  }),
};

function absolute(base, relative) {
  const stack = base.split("/");
  const parts = relative.split("/");
  stack.pop();
  for (var i = 0; i < parts.length; i++) {
    if (parts[i] === ".") continue;
    if (parts[i] === "..") stack.pop();
    else stack.push(parts[i]);
  }
  return stack.join("/");
}
</script>

<style lang="scss" scoped>
.outer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  transition: all 1s;
  width: 100%;
}
.inner {
  box-shadow: 0 3px 7px -1px rgba(0, 0, 0, 0.1);
  border: solid 1px #f2f2f2;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  width: 95%;
  transition: all 0.5s;
}
a {
  text-decoration: none !important;
  color: black !important;
}
.photo-outer {
  position: relative;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
img {
  max-height: 120%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s;
}
.text-outer {
  padding: 1rem;
  background: #fff;
  position: relative;
  z-index: 1;
}
.title {
  text-align: center;
  font-weight: bold;
  line-height: 1;
  margin: 0;
  margin-bottom: 20px;
  font-size: 1.2rem;
}
.inner:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.15), 0 0 5px rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
  img {
    transform: translate(-50%, -50%) scale(1.03) rotate(3deg);
    transition: all 0.5s;
  }
}
.tags {
  display: inline-block;
  padding: 2px 8px;
  margin: 0 8px 10px 0;
  background: rgba(0, 0, 0, 0);
  font-size: 0.8em;
  border: 1px solid #0085de;
  border-radius: 3px;
  visibility: visible;
  position: relative;
}
@media (min-width: 480px) {
  .inner {
    max-width: 700px;
    height: 200px;
    width: 80%;
    flex-direction: row;
  }
  .photo-outer {
    flex-basis: 40%;
    height: auto;
    overflow: hidden;
    position: relative;
    width: 300px;
  }
  .text-outer {
    display: flex;
    flex-basis: 60%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .text-outer:before {
    transform: skewX(-3deg);
    content: "";
    background: #fff;
    width: 30px;
    position: absolute;
    left: -10px;
    top: 0;
    bottom: 0;
    z-index: -1;
  }
}
</style>
