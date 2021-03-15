#


## Install

```
$ npm install --save v-lyy
```


## Use
![image](https://github.com/JasonCloud/v-lyy/blob/master/demo/images/pic1.png)

## import compontent
import {VlyyButton, FlexBox, Loading, FlexItem, Picker, Toast, Modal} from 'v-lyy'

## VlyyButton
```
  props: {
    type: { // button styles
      type: String,
      default: 'default'
    },
    disabled: Boolean,// button isDisabled
    min: Boolean,// button size controller
    plain: Boolean, // button no fill color
    actionType: String, // button type ex: submit
    text: String,// button txt
    vlyyButtonStyle: [String, Array] // element inline-style
  }
  ```
## FlexBox FlexItem    layout
```
 FlexBox:
  props: {
     gapping: {
       type: Number,
       default: 10
     },
     inline: Boolean,
     justify: String,
     align: String,
     wrap: String,
     direction: String
   }
  FlexItem:
  props: {
      width: [String],// 每个的宽度
      shrink: [Number, String],// 是否能被压缩
      grow: [Number, String],// 设置分配比例
      order: [Number, String] //
    }
```
## Toast Loading
```
Toast:
 props: {
    value: Boolean, // Toast展示隐藏控制
    isShowMask: {  // 是否要遮罩层
      type: Boolean,
      default: false
    },
    text: { // toast 内容
      type: String,
      default: '我是 toast'
    },
    toastTransition: String, // 动画模式
    position: String, // 上中下三个方式
    timeNum: { // toast 显示时间
      type: Number,
      default: 2000
    }
  },

Loading:
  props: {
    text: { // loading 文字
      type: String,
      default: 'Loading'
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
  ```
## Modal

```Modal:
  props: {
    value: Boolean,// 控制modal显示隐藏
    title: { // Modal 标题
      type: String,
      default: '我是标题'
    },
    content: { // Modal内容
      type: String,
      default: '我是内容'
    },
    buttonCloseText: { // Modal 按钮
      type: String,
      default: '关闭'
    },
    buttonOkText: {// 按钮文字
      type: String,
      default: ''
    },
    dialogTransition: { // 动画方式
      type: String,
      default: 'vlyy-dialog'
    },
    maskZIndex: { // 遮罩层zIndex
      type: Number,
      default: null
    },
    dialogZIndex: { // 弹框zIndex值
      type: Number,
      default: null
    },
    top: [Number, String],// modal 位置
    width: [Number, String]// modal 宽度
  }
```
## Picker
```
  props: {
    value: Array, // 选择的数据
    showColumn: Number, // 展示的列数
    linkage: Number, // 联动的列数
    showRow: Number, // 展示的高度
    rowHeight: {
      type: Number,
      default: 35
    },
    list: [Array], // 列表数据
    columnWidth: {
      type: Array,
      default: () => {
        return []
      }
    }, // 设置各列的宽度
    defaultData: {
      type: Array,
      default: () => {
        return []
      }
    } // 默认显示的数据
  }
```
## GitHub

[JasonCloud](https://github.com/JasonCloud/v-lyy)
## License

MIT
