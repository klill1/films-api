<template>
  <table>
    <caption>
      {{
        caption
      }}
    </caption>
    <tr>
      <th v-for="(keyName, index) in keyNames" :key="index">
        {{ keyName }}
      </th>
      <th v-if="showControls"></th>
      <slot name="additionalHeaders"></slot>
    </tr>
    <tr v-for="item in items" :key="item.id">
      <td v-for="(keyName, index) in Object.keys(item)" :key="index">
        {{ item[keyName] }}
      </td>
      <td v-if="showControls">
        <button @click="($event) => $emit('show', item)">Kuva detailid</button>
        <button @click="($event) => $emit('delete', item)">Kustuta</button>
      </td>
      <slot name="additionalColumns"></slot>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    caption: String,
    headers: Array,
    items: Array,
    showControls: Boolean,
  },
  emits : ["show", "delete"],
  
  computed: {
    keyNames() {
      return this.items.length > 0 ? Object.keys(this.items[0]) : []
    }
  }
}
</script>

<style>
table,
th,
td {
  border: 1px solid black;
}
</style>
