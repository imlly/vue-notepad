<template>
  <div class="note-card" v-if="showCard">
    <div class="card__name one-px-line-bottom">{{title}}</div>
    <div class="item__container">
      <div
        v-for="(note, index) in notes"
        data-type="0"
        :key="`${index}_${note.id}`"
        class="card__item one-px-line-bottom"
        @click="handleClickItem(note.id)"
        @touchstart.capture="handleTouchstart"
        @touchend.capture="handleTouchend"
      >
        <div class="card__item-title ellipsis info">{{note.title}}</div>
        <div class="card__item-content ellipsis info">{{note.detail}}</div>
        <div class="card__item-time">{{formatNoteTime(note.time)}}</div>
        <div class="card__item-delete" @click.stop="handleClickDelete(note.id)">删除</div>
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
  data() {
    return { startX: 0, endX: 0, startY: 0, endY: 0 };
  },
  computed: {
    showCard() {
      return this.notes.length > 0;
    }
  },
  methods: {
    formatNoteTime,
    handleClickItem(id) {
      this.restSlide();
      this.$emit("click-item", id);
    },
    handleClickDelete(id) {
      this.restSlide();
      this.$emit("click-delete", id);
    },
    handleTouchstart(e) {
      const touch = e.touches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;
    },
    handleTouchend(e) {
      let pel = e.target.parentElement;
      this.endY = e.changedTouches[0].clientY;
      if (Math.abs(this.startY - this.endY) > 80) {
        return;
      }
      this.endX = e.changedTouches[0].clientX;
      if (pel.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide();
        pel.dataset.type = 1;
      }
      if (pel.dataset.type == 1 && this.startX - this.endX < -20) {
        this.restSlide();
        pel.dataset.type = 0;
      }
      this.startX = 0;
      this.endX = 0;
      this.startY = 0;
      this.endY = 0;
    },
    restSlide() {
      let cardItems = document.querySelectorAll(".card__item");
      for (let i = 0; i < cardItems.length; i++) {
        cardItems[i].dataset.type = 0;
      }
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
  overflow: hidden;

  .card__name {
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
    position: relative;
    transition: all 0.2s ease-in-out;
  }
  .card__item[data-type="0"] {
    transform: translateX(0);
  }
  .card__item[data-type="1"] {
    transform: translateX(-80px);
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
    padding-bottom: 6px;
    padding-right: 10px;
  }
  .card__item-delete {
    position: absolute;
    top: -1px;
    bottom: 1px;
    right: -80px;
    width: 80px;
    color: white;
    background-color: #fe381e;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
}
</style>
