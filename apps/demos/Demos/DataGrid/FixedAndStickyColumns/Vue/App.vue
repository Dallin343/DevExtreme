<template>
  <div>
    <DxDataGrid
      id="gridContainer"
      :data-source="employees"
      key-expr="ID"
      :column-auto-width="true"
      :show-borders="true"
    >
      <DxColumnFixing :enabled="true"/>
      <DxColumn
        :fixed="true"
        :calculate-cell-value="calculateCellValue"
        caption="Employee"
      />
      <DxColumn
        data-field="Position"
        alignment="right"
      />
      <DxColumn
        data-field="Address"
        :fixed="true"
        fixed-position="sticky"
      />
      <DxColumn data-field="City" />
      <DxColumn data-field="Zipcode" />
      <DxColumn data-field="State" />
      <DxColumn
        data-field="Department"
        :fixed="true"
        fixed-position="right"
      />
      <DxColumn
        data-field="BirthDate"
        data-type="date"
      />
      <DxColumn
        data-field="HireDate"
        data-type="date"
      />
      <DxColumn data-field="HomePhone" />
      <DxColumn data-field="MobilePhone" />
      <DxColumn data-field="Email" />
      <DxColumn data-field="Skype" />
    </DxDataGrid>
  </div>
</template>
<script setup lang="ts">
import {
  DxDataGrid,
  DxColumn,
  DxColumnFixing,
} from 'devextreme-vue/data-grid';
import { employees, Employee } from './data.ts';

function calculateCellValue(data: Employee) {
  return [data.Title, data.FirstName, data.LastName].join(' ');
}
</script>
<style scoped>
#gridContainer {
  height: 440px;
}
</style>
