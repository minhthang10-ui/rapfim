<template>
  <div class="table-wrapper">
    <table class="admin-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">
            {{ col.label }}
          </th>
          <th v-if="actions">Hành động</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="row in data"
          :key="row.id"
          class="table-row"
        >
          <td v-for="col in columns" :key="col.key">
            {{ row[col.key] }}
          </td>

          <td v-if="actions" class="actions">
            <button class="btn edit" @click="$emit('edit', row)">
              Sửa
            </button>
            <button class="btn delete" @click="$emit('delete', row.id)">
              Xóa
            </button>
          </td>
        </tr>

        <tr v-if="data.length === 0">
          <td :colspan="columns.length + 1" class="empty">
            Không có dữ liệu
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: Array,
  data: Array,
  actions: {
    type: Boolean,
    default: true,
  },
})
</script>

<style scoped>
/* === wrapper giống layout gốc === */
.table-wrapper {
  background: #fff;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
}

/* === table === */
.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

thead {
  background: #f3f4f6;
}

th {
  text-align: left;
  padding: 14px;
  font-weight: 600;
  color: #444;
}

td {
  padding: 14px;
  border-bottom: 1px solid #eee;
}

/* === hover giống bản gốc === */
.table-row:hover {
  background: #f9fafb;
}

/* === actions === */
.actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 13px;
}

.edit {
  background: #e0e7ff;
  color: #4338ca;
}

.delete {
  background: #fee2e2;
  color: #b91c1c;
}

/* === empty === */
.empty {
  text-align: center;
  padding: 20px;
  color: #999;
}
</style>
