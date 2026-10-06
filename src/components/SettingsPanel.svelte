<script lang="ts">
  import { donorSettings, getAllowedTypes, getAllowedTypesRecord, getSexSymbol } from '../lib/settings/storage';
  import { ruleSetRegistry } from '../lib/rules/registry';
  import { getFlag } from '../lib/flags';
  import { DONATION_TYPES, type DonationType } from '../lib/donations/types';
  import { AVAILABLE_LOCALES, LOCALE_FLAGS, LOCALE_LABELS, t } from '../lib/i18n';

  const countries = Object.values(ruleSetRegistry);

  $: allowedCount = getAllowedTypes($donorSettings).length;

  function toggleAllowedType(type: DonationType, checked: boolean) {
    // Refuse to uncheck the last remaining type: with none allowed, nothing
    // could ever be shown in NextDonationSummary or added via DonationForm,
    // and there'd be no way back to a working state short of clearing
    // localStorage.
    if (!checked && allowedCount <= 1) return;

    donorSettings.update((settings) => ({
      ...settings,
      allowedDonationTypes: { ...getAllowedTypesRecord(settings), [type]: checked }
    }));
  }
</script>

<div class="card-stack">
  <div class="card-group">
    <label class="card-row">
      {$t('settings.country')}
      <select bind:value={$donorSettings.countryCode}>
        {#each countries as country}
          <option value={country.countryCode}>{getFlag(country.countryCode)} {country.countryName}</option>
        {/each}
      </select>
    </label>

    <label class="card-row">
      {$t('settings.sex')}
      <select bind:value={$donorSettings.sex}>
        <option value="male">{getSexSymbol('male')} {$t('settings.male')}</option>
        <option value="female">{getSexSymbol('female')} {$t('settings.female')}</option>
      </select>
    </label>

    <label class="card-row">
      {$t('settings.language')}
      <select bind:value={$donorSettings.language}>
        <option value="system">{$t('settings.languageSystem')}</option>
        {#each AVAILABLE_LOCALES as availableLocale}
          <option value={availableLocale}>{LOCALE_FLAGS[availableLocale]} {LOCALE_LABELS[availableLocale]}</option>
        {/each}
      </select>
    </label>

    <label class="card-row">
      {$t('settings.theme')}
      <select bind:value={$donorSettings.theme}>
        <option value="system">{$t('settings.themeSystem')}</option>
        <option value="light">{$t('settings.themeLight')}</option>
        <option value="dark">{$t('settings.themeDark')}</option>
      </select>
    </label>
  </div>

  <div class="card-group allowed-types">
    <span class="card-group-title">{$t('settings.allowedTypes')}</span>
    {#each DONATION_TYPES as type}
      {@const checked = $donorSettings.allowedDonationTypes?.[type] ?? true}
      <label class="card-row card-row-inline">
        <span>{$t(`donationTypes.${type}`)}</span>
        <input
          type="checkbox"
          {checked}
          disabled={checked && allowedCount <= 1}
          on:change={(event) => toggleAllowedType(type, event.currentTarget.checked)}
        />
      </label>
    {/each}
  </div>

  <div class="card-group">
    <label class="card-row card-row-inline">
      <span>{$t('settings.highlightUpcoming')}</span>
      <input type="checkbox" bind:checked={$donorSettings.highlightUpcoming} />
    </label>

    {#if $donorSettings.highlightUpcoming}
      <label class="card-row card-row-inline">
        <span>{$t('settings.highlightUpcomingDays')}</span>
        <input type="number" min="1" step="1" class="days" bind:value={$donorSettings.highlightUpcomingDays} />
      </label>
    {/if}
  </div>

  <div class="card-group">
    <label class="card-row card-row-inline">
      <span>{$t('settings.debugMode')}</span>
      <input type="checkbox" bind:checked={$donorSettings.debugMode} />
    </label>
  </div>
</div>

<style>
  /* The grouped-card look itself (.card-stack/.card-group/.card-row/
   * .card-row-inline) lives in src/lib/styles/groupedCard.css, shared with
   * ReferencesPanel and AboutPanel — only field-specific styling stays
   * here. */

  select,
  input[type='number'] {
    padding: 0;
    font-size: 1rem;
    color: var(--color-text);
    border: none;
    border-radius: 0;
    background: transparent;
  }

  .days {
    width: 5rem;
  }

  .card-row-inline input[type='checkbox'] {
    width: 1.2rem;
    height: 1.2rem;
    flex-shrink: 0;
    accent-color: var(--color-primary);
  }

  .card-row-inline input[type='number'] {
    text-align: right;
  }
</style>
