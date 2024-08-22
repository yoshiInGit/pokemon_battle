<script setup lang="ts">
import type { AttackOptionsType } from "@/domain/attack";
import type { PropType } from "vue";

defineProps({
  attacks: {
    type: Array as unknown as PropType<[string, string, string]>,
    required: true,
  },
});

const emits = defineEmits<{
  (e: "select", index: AttackOptionsType): void;
  (e: "close"): void;
}>();

const onClickSelection = (index: number) => {
  emits("select", index as AttackOptionsType);
};

const onClickCloseBtn = () => {
  emits("close");
};
</script>

<template>
  <div class="overLay">
    <div
      @click.stop=""
      class="modal"
    >
      <div class="description">青年部員が選んだ技をクリックしてください。</div>
      <div class="selections">
        <button
          v-for="(atk, index) of attacks"
          class="selectionBtn"
          :key="`attack_selections_${atk}`"
          v-text="atk"
          @click="onClickSelection(index)"
        ></button>
      </div>

      <div class="actions">
        <button
          class="closeBtn"
          @click="onClickCloseBtn"
        >
          閉じる
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overLay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
}

.modal {
  position: fixed;
  inset: 0;
  margin: auto;
  width: 40em;
  height: 25em;
  padding: 2em;
  background-color: white;
  z-index: 100;
  border-radius: 2rem;
}

.description {
  font-size: 1.5rem;
  margin: 0.5em 0;
}

.selections {
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  align-items: center;
}

.selectionBtn {
  cursor: pointer;
  background-color: white;
  padding: 0.5em 1em;
  font-size: 2rem;
  width: 100%;
  text-align: start;
  border-radius: 0.5em;
}
.selectionBtn:hover {
  background-color: rgb(184, 184, 184);
}

.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
}

.closeBtn {
  font-size: 1.5rem;
  padding: 0.5em 0.7em;
  border: solid gray 4px;
  border-radius: 0.7em;
  background-color: white;
  cursor: pointer;
}
.closeBtn:hover {
  background-color: #bdbdbd;
}
</style>
