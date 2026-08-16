/**
 * Picks the CLDR plural form of `n` for `locale`.
 *
 * Only locales with more than one form need this. Arabic has six
 * (`zero one two few many other`), Slovenian has a dual, the Slavic languages
 * have three to four, and `ja ko zh zh-hant th vi id ms fil ta` have a single
 * form and should interpolate the number directly instead of calling this.
 *
 * ```ts
 * attendees: (n) => `${n} ${plural('ru', n, { one: 'участник', few: 'участника', many: 'участников' })}`
 * ```
 */
export function plural(
	locale: string,
	n: number,
	forms: Partial<Record<Intl.LDMLPluralRule, string>>
): string {
	return forms[new Intl.PluralRules(locale).select(n)] ?? forms.other ?? '';
}
