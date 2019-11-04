<template>
  <div class="d2-page-cover">
    <div class="d2-page-cover__logo">
      <slot/>
    </div>
    <p class="d2-page-cover__title">独创的“中文语义分析、行为分析”等多项国际领先的智能计算技术，提供稿件可疑内容的审核识别服务。</p>
    <p class="d2-page-cover__title">检测并提醒稿件中重要同志的名字书写错误、职务错误、职务名称不匹配等情况。</p>
    <p class="d2-page-cover__title">辅助人工审稿，提高审稿效率。 </p>
    <p class="d2-page-cover__title">降低错误率，避免形成不良传播影响，维护本网、维护国家政治形象。</p>
    <!-- <p class="d2-page-cover__sub-title">优雅的中后台集成方案</!-->
    <!-- <p class="d2-page-cover__build-time">FINAL BUILD TIME {{$buildTime}}</p>
    <slot name="footer"/> -->
  </div>
</template>

<style lang="scss" scoped>
.d2-page-cover {
  @extend %full;
  @extend %unable-select;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .d2-page-cover__logo {
    img {
      width: 200px;
    }
  }
  .d2-page-cover__title {
    margin: 0px;
    margin-bottom: 20px;
    font-weight: bold;
    color: $color-text-main;
  }
  .d2-page-cover__sub-title {
    margin: 0px;
    margin-bottom: 5px;
    color: $color-text-normal;
  }
  .d2-page-cover__build-time {
    margin: 0px;
    margin-bottom: 10px;
    font-size: 12px;
    color: $color-text-placehoder;
  }
}
</style>
