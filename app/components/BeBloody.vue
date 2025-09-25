<script setup lang="ts">
  import {ModalDonationForm} from "#components";
  import { computeNextDonationDates } from "~~/services/DonationService";
  import type {Donation} from "~/components/models/Donation";

  let prochainDonSang = new Date()
  let prochainDonPlasma = new Date()
  let prochainDonPlaquettes = new Date()

  const overlay = useOverlay();
  const modal = overlay.create(ModalDonationForm)

  async function open() {
    const instance = modal.open()

    const donation = await instance.result as Donation
    if (donation && donation.type && donation.date) {
      // Store new donation
      console.log("Type du don: " + donation.type);
      console.log("Date du don: " + donation.date);
      const donations = JSON.parse(localStorage["donations"] || "[]")
      donations.push(donation)
      localStorage["donations"] = JSON.stringify(donations)

      // Compute next donation dates
      const result: Date[] = computeNextDonationDates(donations)
      console.log("Computed: " + result)
      console.log("--------------------------")
      // console.log(Date.parse(result[0]))
      // console.log(Date.parse(result[1].date))
      // console.log(Date.parse(result[2].date))
      prochainDonSang = result[0] || new Date()
      prochainDonPlasma = result[1] || new Date()
      prochainDonPlaquettes = result[2] || new Date()
      return result
    }
  }
</script>

<template>
  Vos prochains dons
  <ul>
    <li>de sang: {{ prochainDonSang.toDateString() }}</li>
    <li>de plasma:{{ prochainDonPlasma.toDateString() }} </li>
    <li>de plaquettes: {{ prochainDonPlaquettes.toDateString() }}</li>
  </ul>
  <UButton label="Encodez un don" color="neutral" variant="subtle" @click="open()" />

  <!--  <ModalDonationForm/>-->
</template>

<style scoped>

</style>