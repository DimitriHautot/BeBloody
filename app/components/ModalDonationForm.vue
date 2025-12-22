<script setup lang="ts">
  import type { RadioGroupItem, RadioGroupValue } from '@nuxt/ui'
  import {CalendarDate, getLocalTimeZone} from "@internationalized/date";
  // import type { Donation } from './models/Donation'

  const items = ref<RadioGroupItem[]>([
      {label: 'Sang', value: 'BLOOD'},
      {label: 'Plasma', value: 'PLASMA'},
      {label: 'Plaquettes', value: 'PLATELETS'}
  ])
  const donationType = shallowRef<RadioGroupValue>()
  const today = ref<Date>(new Date())
  const donationDate = shallowRef(new CalendarDate(today.value.getFullYear(), today.value.getMonth() + 1, today.value.getDate()))

  const emit = defineEmits<{ close: {type: string, date: Date} }>()
</script>

<template>
  <UModal
      :title="`Encodez un don`"
      :close="{
        // onClick: () => emit('close', {null, null}),
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full'
      }"
      :overlay="true"
      :dismissible="false"
      :ui="{ footer: 'justify-end' }"
      :description="`Blood donation encoding form`"
  >
    <template #body>
      <URadioGroup
          v-model="donationType" value-key="value" variant="card"
          indicator="hidden" :items="items" />
      <br>
      <UCalendar v-model="donationDate" :year-controls="false" />
    </template>

    <template #footer>
      <UButton
          label="Annuler" color="neutral" variant="outline" @click="emit('close', {type: null, date: null})" />
      <UButton
          :disabled="!donationType"
          label="OK"
          color="neutral"
          @click="emit('close', {type: donationType, date: donationDate.toDate(getLocalTimeZone())})" />
    </template>
  </UModal>
</template>


<style scoped>

</style>