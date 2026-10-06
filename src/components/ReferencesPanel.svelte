<script lang="ts">
  import { ruleSetRegistry } from '../lib/rules/registry';
  import { getLanguageName } from '../lib/languages';
  import { getFlag } from '../lib/flags';
  import { t } from '../lib/i18n';

  const countries = Object.values(ruleSetRegistry).map((ruleSet) => {
    const references = ruleSet.officialReferences();
    const languages = Array.from(references.entries())
      .map(([code, urls]) => ({ code, name: getLanguageName(code), urls }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return { countryName: ruleSet.countryName, flag: getFlag(ruleSet.countryCode), languages };
  });
</script>

<p class="intro">
  {$t('references.intro1')}<br><br>
  {$t('references.intro2a')} <b>{$t('references.intro2bold')}</b> {$t('references.intro2b')}<br><br>
  {$t('references.intro3')}<br>
</p>

<div class="card-stack">
  {#each countries as country (country.countryName)}
    <div class="card-group">
      <span class="card-group-title country-title">{country.flag} {country.countryName}</span>
      {#if country.languages.length === 1}
        {#each country.languages[0].urls as url (url)}
          <a class="card-row url-row" href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        {/each}
      {:else}
        {#each country.languages as language (language.code)}
          <div class="card-row">
            <span class="language-name">{language.name}</span>
            <div class="urls">
              {#each language.urls as url (url)}
                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
              {/each}
            </div>
          </div>
        {/each}
      {/if}
    </div>
  {/each}
</div>

<style>
  /* The grouped-card look itself (.card-stack/.card-group/.card-row/
   * .card-group-title) lives in src/lib/styles/groupedCard.css, shared
   * with SettingsPanel and AboutPanel — only content-specific styling
   * stays here. */

  .intro {
    color: var(--color-text-secondary);
    margin-top: 0;
    margin-bottom: 1.25rem;
  }

  /* Overrides .card-group-title's small secondary-color label look: a
   * country name is this card's own heading, not a label for what
   * follows it (unlike e.g. SettingsPanel's "Types de dons possibles").
   * Doubled-up class selector so it reliably wins over the shared rule
   * regardless of CSS source order. */
  .card-group-title.country-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .language-name {
    font-weight: 600;
  }

  .urls {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .url-row,
  .urls a {
    color: var(--color-primary);
    word-break: break-all;
  }
</style>
