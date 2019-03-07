<template>
  <div class="note-card" v-if="showCard">
    <div class="card__name one-px-line-bottom">{{title}}</div>
    <div class="item__container">
      <div
        v-for="(note, index) in notes"
        :key="`${index}_${note.id}`"
        class="card__item one-px-line-bottom"
        @click="handleClickItem(note.id)"
      >
        <div class="card__item-title ellipsis info">{{note.title}}</div>
        <div class="card__item-content ellipsis info">{{note.detail}}</div>
        <div class="card__item-time">{{formatNoteTime(note.time)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatNoteTime } from "@utils/index";

export default {
  props: {
    title: { type: String, isRequired: true },
    notes: { type: Array, default: () => [] }
  },
  computed: {
    showCard() {
      return this.notes.length > 0;
    }
  },
  methods: {
    formatNoteTime,
    handleClickItem(id) {
      this.$emit("click-item", id);
    }
  }
};
</script>

<style lang="less">
.note-card {
  position: relative;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  margin-top: 10px;
  margin-top: 15px;
  padding-left: 12px;

  .card__name {
    // color: #fec200;
    color: #5470fe;
    padding: 12px 0;
    font-weight: 500;
  }

  .item__container {
    position: relative;

    .card__item:last-child::after {
      display: none;
    }
  }

  .card__item {
    padding: 12px 0;
  }
  .card__item-title {
    font-size: 16px;
    color: #000;
  }
  .card__item-content {
    font-size: 14px;
    color: #666;
  }
  .card__item-time {
    font-size: 12px;
    color: #999;
  }
  .info {
    margin-bottom: 6px;
    margin-right: 10px;
  }
}
</style>
