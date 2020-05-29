<template>
  <div class="title">
    <p class="title__text">
      <span class="title__message">Good {{ message }},</span>
      <span
        v-on:keyup.enter="handleName"
        v-on:blur="handleBlur"
        class="title__name"
        ref="test"
        contenteditable="true"
      >{{ propName }}</span>
      .
    </p>
    <p class="title__task">
      <span class="title__task-top">You've got</span>
      <span class="title__task-count">
        <em class="title__task-left">{{ propCount.left }}</em>
        <em v-if="propCount.total" class="title__task-total">&nbsp;/ {{ propCount.total }}</em>
      </span>
      <span class="title__task-bottom">
        <span v-if="propCount.total > 1">tasks</span>
        <span v-else>task</span> today !
      </span>
      <span class="title__task-info"></span>
    </p>
  </div>
</template>

<script>
import getDate from "../assets/commonJS/getDate.js";

export default {
  props: ["propCount", "propName"],
  data() {
    return {
      message: ""
    };
  },
  methods: {
    handleBlur(e) {
      const originalName = this.propName;
      const newName = e.target.innerText;
      if (newName !== originalName) {
        if (newName === "") {
          e.target.innerText = originalName;
        } else {
          this.$emit("changeName", newName);
        }
      }
    },
    handleName() {
      this.$refs.test.blur();
    }
  },
  mounted() {
    this.message = getDate().daytime;
  }
};
</script>

<style lang="scss">
.title {
  max-width: $max-width;
  margin: 0 auto;
  letter-spacing: 0.03rem;
  color: #fff;

  &__text {
    cursor: default;
    font-size: 1.6rem;
    @include flexbox;
    @include align-items(center);
    @include flex-wrap(wrap);
    @include ellipsis();
  }

  .wrap {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
  }

  &__message {
    display: block;
    min-height: 2.7rem;
    margin-right: 0.4rem;
    @include flex-shrink(0);
  }

  &__name {
    display: block;
    background: 0;
    border: 0;
    outline: 0;
    color: inherit;
    font-size: inherit;
    min-width: 1rem;
    // padding: 0 0.4rem;
    min-height: 2.7rem;
    // max-width: 50%;
    // width: 50%;
    overflow: hidden;
    @include flex-shrink(1);

    br {
      display: none;
    }

    &:hover {
      text-decoration: underline;
      cursor: text;
    }
    &:focus {
      opacity: 0.8;
      // outline: 1px solid #fafafa;
      background: rgba(255, 255, 255, 0.15);
      text-decoration: underline;
    }
  }

  &__task {
    margin-top: 3.5rem;
    margin-bottom: 5rem;
    font-weight: bold;

    &-top {
      display: block;
      font-size: 2.6rem;
    }

    &-count {
      font-size: 5.4rem;
    }

    &-total {
      font-size: 50%;
    }

    &-bottom {
      display: block;
      font-size: 2.8rem;
      line-height: 50%;
    }
  }
}
</style>