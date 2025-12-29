<script setup lang="ts">
  import { onMounted } from 'vue'
  import {ModalDonationForm} from "#components";
  import { computeNextDonationDates } from "~/services/DonationService";
  import {Donation} from "~/components/models/Donation";
  // import {toDonationType} from "~/components/models/DonationType";

  const overlay = useOverlay();
  const modal = overlay.create(ModalDonationForm)
  let computedDates: Date[] = [new Date(), new Date(), new Date()]

  function loadDonations() : Donation[] {
    const loaded = JSON.parse(localStorage["donations"] || "[]")
    // Parse ISO date-time strings into real Date objects
    for (let loop=0; loop < loaded.length; loop++) {
      loaded[loop].date = new Date(loaded[loop].date)
    }
    return loaded
  }

  function appendAndStore(donation : Donation) : Donation[] {
    const updated : Donation[] = loadDonations()
    updated.push(donation)
    localStorage["donations"] = JSON.stringify(updated)
    return updated
  }

  onMounted(() => computedDates = computeNextDonationDates(loadDonations()))

  async function open() {
    const instance = modal.open()

    const data = await instance.result as object
    if (data && data.type && data.date) {
      // Store new donation
      const type: string = /** @type {string} */ (data.type)
      const date: Date = /** @type {Date} */ (data.date)
      console.log("Type du don: " + type);
      console.log("Date du don: " + date);
      const donations: Donation[] = appendAndStore(new Donation(type, date))

      // Parse ISO date-time strings into real Date objects
      // for (let loop=0; loop < donations.length; loop++) {
      //   donations[loop].date = new Date(donations[loop].date)
      // }

      // Compute next donation dates
      const result: Date[] = computeNextDonationDates(donations)
      console.log("Computed: " + result)
      console.log("--------------------------")
      computedDates = result
      return result
    }
  }
</script>

<template>
  Vos prochains dons
  <ul>
    <li>de sang: {{ computedDates[0].toDateString() }}</li>
    <li>de plasma:{{ computedDates[1].toDateString() }} </li>
    <li>de plaquettes: {{ computedDates[2].toDateString() }}</li>
  </ul>
  <UButton label="Encodez un don" color="neutral" variant="subtle" @click="open()" />

  <!--  <ModalDonationForm/>-->
</template>

<style scoped>

</style>