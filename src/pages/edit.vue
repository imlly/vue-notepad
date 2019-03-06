<template>
  <div>
    <note-header
      class="one-px-line-bottom"
      :title="editTitle"
      show-left-icon
      show-right-icon
      @click-left="handleClickBack"
    >
      <div class="right-icon" slot="right" v-if="noteChanged" @click="handleSaveNote">
        <div class="save-icon"></div>
      </div>
      <div class="right-icon" slot="right" v-else-if="!isAdd" @click="handleDeleteNote">
        <div class="del-icon"></div>
      </div>
    </note-header>
    <div class="note-page edit-page">
      <div class="textarea-block one-px-line-bottom">
        <div class="block__title">标题</div>
        <note-textarea placeholder="请输入笔记标题" :max-count="20" v-model="currTitle"/>
      </div>
      <div class="textarea-block">
        <div class="block__title">内容</div>
        <note-textarea placeholder="请输入笔记内容" v-model="currDetail"/>
      </div>
    </div>
  </div>
</template>

<script>
import NoteHeader from "@components/header.vue";
import NoteTextarea from "@components/textarea.vue";

export default {
  name: "note-edit",
  components: {
    NoteHeader,
    NoteTextarea
  },
  props: {
    ds: { type: Object, isRequired: true }
  },
  data() {
    const noteId = this.$route.params.id;
    const activeNote = this.ds.getNote(noteId);
    return {
      activeNote,
      currTitle: activeNote.title || "",
      currDetail: activeNote.detail || ""
    };
  },
  computed: {
    noteChanged() {
      return (
        (this.activeNote.title || "") !== this.currTitle ||
        (this.activeNote.detail || "") !== this.currDetail
      );
    },
    isAdd() {
      return !this.activeNote.id;
    },
    editTitle() {
      return this.isAdd ? "新增笔记" : "笔记详情";
    }
  },
  methods: {
    handleClickBack() {
      this.$router.back();
    },
    handleDeleteNote() {
      if (this.activeNote.id >= 0) {
        this.ds.deleteNote(this.activeNote.id);
        this.$router.back();
      }
    },
    handleSaveNote() {
      const newNote = {
        title: this.currTitle,
        detail: this.currDetail
      };
      if (this.activeNote.id >= 0) {
        this.ds.modifyNote({
          ...this.activeNote,
          ...newNote
        });
      } else {
        this.ds.saveNote({
          ...this.activeNote,
          ...newNote
        });
      }
    }
  }
};
</script>

<style lang="less">
.edit-page {
  .textarea-block {
    margin: 20px 0;
  }
  .block__title {
    color: #666;
  }
}
.right-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}
</style>
