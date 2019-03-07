<template>
  <div class="common-page">
    <note-header title="我的笔记" show-right-icon>
      <div class="icon-wrap" slot="right" @click="handleClickAddBtn">
        <div class="cross-icon top"></div>
      </div>
    </note-header>
    <div class="note-page list-page">
      <template v-if="groupedList && groupedList.length > 0">
        <card
          v-for="(item, index) in groupedList"
          :key="`${index}_${item.title}`"
          :title="item.title"
          :notes="item.notes"
          @click-item="handleClickNoteItem"
        />
      </template>
      <no-result v-else message="还没有笔记，快快新建吧~" show-mock-btn @click-mock-btn="handleUseMockData"/>
    </div>
    <!-- <div class="add-icon" @click="handleClickAddBtn">
      <div class="cross-icon"></div>
    </div>-->
  </div>
</template>

<script>
import NoteHeader from "@components/header.vue";
import NoResult from "@components/no-result.vue";
import Card from "@components/card.vue";

export default {
  name: "note-list",
  components: {
    NoteHeader,
    Card,
    NoResult
  },
  data() {
    return {
      groupedList: this.$dataSource.getGroupedNotes()
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
    },
    handleUseMockData() {
      this.$dataSource.useMockData();
      this.groupedList = this.$dataSource.getGroupedNotes();
    }
  }
};
</script>

<style lang="less">
.list-page {
  position: relative;
}
</style>
