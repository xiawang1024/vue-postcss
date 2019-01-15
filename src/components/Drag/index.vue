<template>
  <div
    class="drag"
    ref="drag"
  >
    <p class="text">抽奖</p>
  </div>
</template>
<script>
import Draggabilly from "draggabilly";
export default {
  name: "Drag",
  mounted() {
    this.initDrag();
  },
  methods: {
    handlerClick() {
      alert("aaa");
    },

    onResize() {
      this.initDrag();
    },
    initDrag() {
      let dragDom = this.$refs.drag;
      this.draggie = new Draggabilly(dragDom, {
        containment: "body"
      });
      let screenWidth = document.documentElement.clientWidth;
      let screenHeight = document.documentElement.clientHeight;

      let dragDomWidth = dragDom.offsetWidth + 4;
      this.draggie.setPosition(screenWidth - dragDomWidth, screenWidth * 1.2);
      this.draggie.on("dragEnd", (event, pointer) => {
        let { pageX, pageY } = pointer;
        if (pageX < screenWidth / 2) {
          this.draggie.setPosition(4, pageY);
        } else {
          this.draggie.setPosition(screenWidth - dragDomWidth, pageY);
        }
      });
      this.draggie.on("staticClick", (event, pointer) => {
        this.handlerClick();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.drag {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: 30px;
  background: #e47612;
}
</style>


