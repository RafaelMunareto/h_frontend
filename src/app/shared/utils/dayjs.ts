import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';

dayjs.locale(ptBr);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(duration);

export default dayjs;
