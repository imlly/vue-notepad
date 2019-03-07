import { mockData } from "./mock-data.js";
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
    } catch (e) {
      this.allNotes = [];
      _ls.removeItem(this.storageKey);
    }
  }
  useMockData() {
    try {
      _ls.setItem(this.storageKey, JSON.stringify(mockData));
      this.allNotes = mockData;
    } catch (e) {
      throw e;
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
      return no;
    } catch (e) {
      throw e;
    }
  }
  deleteNote(noteId) {
    const newAllNotes = this.allNotes.filter(n => n.id !== +noteId) || [];
    try {
      _ls.setItem(this.storageKey, JSON.stringify(newAllNotes));
      this.allNotes = newAllNotes;
    } catch (e) {
      throw e;
    }
  }
  modifyNote(noteObj) {
    const oldObj = this.allNotes.find(n => n.id === +noteObj.id) || {};
    const no = { ...oldObj, ...noteObj, modifyTime: Date.now() };
    const newAllNotes = [
      ...(this.allNotes.filter(n => n.id !== +noteObj.id) || []),
      no
    ];
    try {
      _ls.setItem(this.storageKey, JSON.stringify(newAllNotes));
      this.allNotes = newAllNotes;
      return no;
    } catch (e) {
      throw e;
    }
  }
}
