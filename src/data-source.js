// import { mockData } from "./mock.js";
import { formatNoteTitle } from "@utils/index";
import { NOTE_STATUS } from "@consts/index.js";

const _ls = window.localStorage;

export default class DataSource {
  constructor() {
    this.storageKey = "__VUE_NOTEPAD__";
    this.allNotes = [];

    this._init();
  }

  _init() {
    try {
      const dataStr = _ls.getItem(this.storageKey);
      this.allNotes = JSON.parse(dataStr) || [];
      // this.allNotes = mockData;
    } catch (e) {
      this.allNotes = [];
      _ls.removeItem(this.storageKey);
    }
  }
  getGroupedNotes() {
    const timeArr = this.allNotes
      .sort((a, b) => b.time - a.time)
      .map(n => formatNoteTitle(n.time));
    const titleSet = new Set(timeArr);
    const result = [];
    titleSet.forEach(title => {
      result.push({
        title,
        notes: this.allNotes.filter(n => formatNoteTitle(n.time) === title)
      });
    });
    return result;
  }
  getNote(noteId) {
    return this.allNotes.find(n => n.id === +noteId) || {};
  }
  getBiggestId() {
    const idArr = this.allNotes.map(n => n.id);
    return idArr.length > 0 ? Math.max(...idArr) : 1;
  }
  saveNote(noteObj) {
    const no = {
      ...noteObj,
      id: this.getBiggestId() + 1,
      status: NOTE_STATUS.UNDONE,
      time: Date.now()
    };
    const newAllNotes = [...this.allNotes, no];
    try {
      _ls.setItem(this.storageKey, JSON.stringify(newAllNotes));
      this.allNotes = newAllNotes;
    } catch (e) {
      // console.error("save sync error");
    }
  }
  deleteNote(noteId) {
    const newAllNotes = this.allNotes.filter(n => n.id !== +noteId) || [];
    try {
      _ls.setItem(this.storageKey, JSON.stringify(newAllNotes));
      this.allNotes = newAllNotes;
    } catch (e) {
      // console.error("delete sync error");
    }
  }
  modifyNote(noteObj) {
    const oldObj = this.allNotes.find(n => n.id === +noteObj.id) || {};
    const newAllNotes = [
      ...(this.allNotes.filter(n => n.id !== +noteObj.id) || []),
      { ...oldObj, ...noteObj, modifyTime: Date.now() }
    ];
    try {
      _ls.setItem(this.storageKey, JSON.stringify(newAllNotes));
      this.allNotes = newAllNotes;
    } catch (e) {
      // console.error("modify sync error");
    }
  }
}
