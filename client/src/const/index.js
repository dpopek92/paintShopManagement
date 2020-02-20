import Axios from 'axios';

export const signal = Axios.CancelToken.source();

export const currentDate = new Date();

export const reasonsOfComplaint = [
 { type: 'Paproch', name: 'particle' },
 { type: 'Uszkodzenie mechaniczne', name: 'mechanicalDamage' },
 { type: 'Uszkodzony laminat', name: 'damagedLaminate' },
 { type: 'Zaciek', name: 'bruise' },
 { type: 'Element źle polakierowany', name: 'badlyPainted' },
 { type: 'Niepolakierowana druga strona', name: 'leftSide' },
 { type: 'Przetarcie', name: 'polishingHole' },
 { type: 'Inny', name: 'other' },
];
export const reasonsOfComplaintTranslate = {
 particle: 'Paproch',
 mechanicalDamage: 'Uszkodzenie mechaniczne',
 damagedLaminate: 'Uszkodzony laminat',
 bruise: 'Zaciek',
 badlyPainted: 'Element źle polakierowany',
 leftSide: 'Niepolakierowana druga strona',
 polishingHole: 'Przetarcie',
 other: 'Inny',
};

export const positionsArray = [
 'Surówka',
 'Podkład',
 'Szlifiernia',
 'Lakiernia',
 'Polernia',
 'Pakowanie',
 'Zakończone',
];
export const allStates = [
 'Surówka',
 'Podkład',
 'Szlifiernia',
 'Lakiernia',
 'Polernia',
 'Pakowanie',
 'Zakończone',
 'Odebrane',
];

export const employeesPositions = [
 'Surówka',
 'Podkład',
 'Szlifiernia',
 'Lakiernia',
 'Polernia',
 'Pakowanie',
 'Transport',
];

export const positions = [
 { value: 'Surówka', label: 'Surówka' },
 { value: 'Podkład', label: 'Podkład' },
 { value: 'Szlifiernia', label: 'Szlifiernia' },
 { value: 'Lakiernia', label: 'Lakiernia' },
 { value: 'Polernia', label: 'Polernia' },
 { value: 'Pakowanie', label: 'Pakowanie' },
 { value: 'Zakończone', label: 'Zakończone' },
];

export const months = [
 'Styczeń',
 'Luty',
 'Marzec',
 'Kwiecień',
 'Maj',
 'Czerwiec',
 'Lipiec',
 'Sierpień',
 'Wrzesień',
 'Październik',
 'Listopad',
 'Grudzień',
];

export const orderTypes = [
 'Reklamacja (wina BLOW)',
 'Poprawa (wina klienta)',
 'Domówienie',
 'Materiał klienta',
 'Lista elementów',
];

export const weekDays = [
 'Poniedziałek',
 'Wtorek',
 'Środa',
 'Czwartek',
 'Piątek',
 'Sobota',
 'Niedziela',
];

export const positionsForTimetables = [
 'Surówka',
 'Podkład',
 'Szlifiernia',
 'Lakiernia',
 'Polernia',
 'Pakowanie',
 'Transport',
];
