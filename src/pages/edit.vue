<template>
  <div>
    <note-header
      class="one-px-line-bottom"
      :title="editTitle"
      show-left-icon
      show-right-icon
      @click-left="handleClickBack"
    >
      <div style="display: flex" slot="right">
        <div class="icon-wrap" v-if="noteChanged" @click="handleSaveNote">
          <div class="save-icon"></div>
        </div>
        <div class="icon-wrap" v-if="!isAdd" @click="handleClickDeleteBtn">
          <div class="del-icon"></div>
        </div>
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
    <note-confirm
      v-model="showConfirm"
      header-text="请您确认"
      body-text="您确认要删除这条笔记吗？"
      show-cancel
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    ></note-confirm>
  </div>
</template>

<script>
import NoteHeader from "@components/header.vue";
import NoteTextarea from "@components/textarea.vue";
import NoteConfirm from "@components/confirm.vue";

export default {
  name: "note-edit",
  components: {
    NoteHeader,
    NoteTextarea,
    NoteConfirm
  },
  data() {
    const noteId = this.$route.params.id;
    const activeNote = this.$dataSource.getNote(noteId);
    return {
      activeNote,
      currTitle: activeNote.title || "",
      currDetail: activeNote.detail || "",
      showConfirm: false
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
    handleClickDeleteBtn() {
      this.showConfirm = true;
    },
    handleConfirmDelete() {
      this.handleDeleteNote();
    },
    handleCancelDelete() {
      this.showConfirm = false;
    },
    handleDeleteNote() {
      if (this.activeNote.id >= 0) {
        try {
          this.$dataSource.deleteNote(this.activeNote.id);
          this.$bus.emit("show-toast", "删除成功");
          this.$router.back();
        } catch (e) {
          this.$bus.emit("show-toast", `删除失败：${e.message || "未知错误"}`);
        }
      }
    },
    handleSaveNote() {
      if (!this.currTitle) {
        this.$bus.emit("show-toast", "请输入笔记标题");
        return;
      }
      if (this.currTitle.trim().length > 20) {
        this.$bus.emit("show-toast", "笔记标题字数不能超过20个");
        return;
      }
      const newNote = {
        title: this.currTitle,
        detail: this.currDetail
      };
      if (this.activeNote.id >= 0) {
        try {
          this.activeNote = this.$dataSource.modifyNote({
            ...this.activeNote,
            ...newNote
          });
          this.$bus.emit("show-toast", "修改成功");
        } catch (e) {
          this.$bus.emit("show-toast", `修改失败：${e.message || "未知错误"}`);
        }
      } else {
        try {
          this.activeNote = this.$dataSource.saveNote({
            ...this.activeNote,
            ...newNote
          });
          this.$bus.emit("show-toast", "新建成功");
        } catch (e) {
          this.$bus.emit("show-toast", `新建失败：${e.message || "未知错误"}`);
        }
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0);
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
</style>
