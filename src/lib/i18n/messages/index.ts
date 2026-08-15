import type { Locale } from '../locales';
import en, { type Messages } from './en';
import ja from './ja';
import ko from './ko';
import th from './th';
import hi from './hi';
import pt from './pt';
import de from './de';
import zh from './zh';
import fr from './fr';
import no from './no';
import fil from './fil';
import it from './it';
import es from './es';

export type { Messages };

export const messages: Record<Locale, Messages> = {
	en,
	ja,
	ko,
	th,
	hi,
	pt,
	de,
	zh,
	fr,
	no,
	fil,
	it,
	es
};
