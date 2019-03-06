import { NOTE_STATUS } from "@consts/index.js";

export const mockData = [
  {
    id: 0,
    time: Date.now(),
    title: "笔记一",
    detail: "创建 import 或 require 的别名，来确保模块引入变得更简单。",
    level: "",
    status: NOTE_STATUS.UNDONE
  },
  {
    id: 1,
    time: new Date("2019/01/01 12:00:00").getTime(),
    title: "笔记二",
    detail: "或许这就是面试官要问你的问题：请手写一个webpack4.0的配置。",
    level: "",
    status: NOTE_STATUS.DONE
  },
  {
    id: 2,
    time: new Date("2019/01/01 12:03:00").getTime(),
    title: "笔记二-01",
    detail:
      "或许这就是面试官要问你的问题：请手写一个webpack4.0的配置。就是面试官要问你的问题",
    level: "",
    status: NOTE_STATUS.DONE
  },
  {
    id: 3,
    time: new Date("2019/01/05 12:00:00").getTime(),
    title: "笔记三iyp",
    detail:
      '在升级webpack4的时候，发现scss里面使用webpack定义的alias，都会爆路径错误. "webpack": "^4.6.0", "node-sass": "^4.9.0", "sass": "^1.3.2"。',
    level: "",
    status: NOTE_STATUS.DONE
  },
  {
    id: 4,
    time: new Date("2018/01/05 12:00:00").getTime(),
    title: "笔记三qrwyrt",
    detail:
      '在升级webpack4的时候，发现scss里面使用webpack定义的alias，都会爆路径错误. "webpack": "^4.6.0", "node-sass": "^4.9.0", "sass": "^1.3.2"。',
    level: "",
    status: NOTE_STATUS.DONE
  },
  {
    id: 5,
    time: new Date("2017/01/05 12:00:00").getTime(),
    title: "笔记三5463576548",
    detail:
      '在升级webpack4的时候，发现scss里面使用webpack定义的alias，都会爆路径错误. "webpack": "^4.6.0", "node-sass": "^4.9.0", "sass": "^1.3.2"。',
    level: "",
    status: NOTE_STATUS.DONE
  }
];
