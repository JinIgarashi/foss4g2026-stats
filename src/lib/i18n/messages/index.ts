import type { Locale } from '../locales';
import en, { type Messages } from './en';
import ja from './ja';
import ko from './ko';
import fr from './fr';
import th from './th';
import pt from './pt';
import hi from './hi';
import de from './de';
import zh from './zh';
import ms from './ms';
import it from './it';
import es from './es';
import no from './no';
import fil from './fil';
import ta from './ta';
import nl from './nl';
import sw from './sw';
import id from './id';
import pl from './pl';
import sl from './sl';
import hr from './hr';
import zhHant from './zh-hant';
import ar from './ar';
import ro from './ro';
import sv from './sv';
import cs from './cs';
import et from './et';
import tr from './tr';
import ur from './ur';
import da from './da';
import fi from './fi';
import ne from './ne';
import si from './si';
import vi from './vi';
import fa from './fa';
import ru from './ru';
import sk from './sk';
import sq from './sq';
import sr from './sr';
import uk from './uk';

export type { Messages };

/**
 * Every locale is imported eagerly: 40 message objects are ~80 KB uncompressed,
 * which is noise next to the map bundle, and keeping them synchronous is what
 * lets `currentMessages()` stay a plain function instead of a load-time
 * dependency. If that ever stops being true, turn the values into
 * `() => import('./xx')` and resolve them in a `[lang]/+layout.ts`.
 */
export const messages: Record<Locale, Messages> = {
	en,
	ja,
	ko,
	fr,
	th,
	pt,
	hi,
	de,
	zh,
	ms,
	it,
	es,
	no,
	fil,
	ta,
	nl,
	sw,
	id,
	pl,
	sl,
	hr,
	'zh-hant': zhHant,
	ar,
	ro,
	sv,
	cs,
	et,
	tr,
	ur,
	da,
	fi,
	ne,
	si,
	vi,
	fa,
	ru,
	sk,
	sq,
	sr,
	uk
};
