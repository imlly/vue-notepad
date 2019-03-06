<template>
  <div class="common-page">
    <note-header title="我的笔记"/>
    <div class="note-page list-page">
      <card
        v-for="(item, index) in groupedList"
        :key="`${index}_${item.title}`"
        :title="item.title"
        :notes="item.notes"
        @click-item="handleClickNoteItem"
      />
    </div>
    <div class="add-icon" @click="handleClickAddBtn">
      <div class="cross"></div>
    </div>
  </div>
</template>

<script>
import NoteHeader from "@components/header.vue";
import Card from "@components/card.vue";

export default {
  name: "note-list",
  components: {
    NoteHeader,
    Card
  },
  props: {
    ds: { type: Object, isRequired: true }
  },
  data() {
    return {
      groupedList: this.ds.getGroupedNotes()
    };
  },
  methods: {
    handleClickNoteItem(id) {
      this.$router.push({
        name: "note-edit",
        params: { id }
      });
    },
    handleClickAddBtn() {
      this.$router.push({
        name: "note-edit",
        params: { id: "add" }
      });
    }
  }
};
</script>

<style lang="less">
.list-page {
  position: relative;
}
</style>
