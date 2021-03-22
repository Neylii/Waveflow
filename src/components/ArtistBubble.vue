<template>
  <div id="bubble">
    {{ artistName }}
  </div>
</template>

<script>
export default {
  props: {
    artistName: String,
  },
};
</script>

<style>
#bubble {
  position: absolute;
  display: flex;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background: rgba(255, 0, 0, 0.349);
  justify-content: center;
  align-items: center;
  margin-left: 20%;
  margin-top: 3%;
  font-size: 80%;
}
</style>