<template>
  <div class="note-textarea" :class="error ? 'note-textarea-error' : ''">
    <pre class="note-textarea__pre">{{ (v || placeholder) + '\n\n'}}</pre>
    <textarea
      class="note-textarea__self"
      v-model="v"
      :placeholder="placeholder"
      @change="onChange"
      @input="onChange"
    />
    <span v-if="maxCount" class="note-textarea__extra">
      <span class="current-count">{{v.length}}</span>
      /{{maxCount}}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: [String, Number]
    },
    validation: {
      type: Function
    },
    value: {
      type: [String, Number],
      default: ""
    },
    maxCount: {
      type: Number,
      validator(count) {
        return count > 10;
      }
    }
  },
  methods: {
    onChange() {
      if (
        (this.validation && this.validation(this.v)) ||
        this.v.length > this.maxCount
      ) {
        this.error = true;
      } else {
        this.error = false;
      }
      this.$emit("input", this.v);
    }
  },
  data() {
    return { v: this.value, error: false };
  }
};
</script>

<style lang="less" rel="stylesheet/less">
.note-textarea {
  position: relative;
  border: 1px solid white;
}
.note-textarea-error {
  .note-textarea__self,
  .current-count {
    color: rgba(255, 0, 0, 0.66);
  }
}
.note-textarea__pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  display: block;
  visibility: hidden;
  font-family: Helvetica, sans-serif;
  line-height: 1.4;
}
.note-textarea__self {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  resize: none;
  outline: none;
  border: none;
  padding: 10px 0px;
  line-height: 1.4;

  &::placeholder {
    color: #ccc;
  }
}
.note-textarea__extra {
  position: absolute;
  right: 0px;
  bottom: 5px;
  color: #ff9b0f;
}
</style>
