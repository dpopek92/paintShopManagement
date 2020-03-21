export interface GlobalSettingsT {
 prices: PricesT | null;
 paintsProducers: PaintsProducersT | null;
 realizationDates: RealizationDatesT | null;
 contact: ContactT | null;
}

// SETTINGS
export interface RealizationDatesT {
 gloss: number;
 semiGloss: number;
 milling: number;
 veneer: number;
}
export interface PaintsProducersT {
 gloss: string;
 semiGloss: string;
 base: string;
}

// PRICES
export interface PricesT {
 companyMaterial: CompanyMaterialPricesT;
 customerMaterial: CustomerMaterialPricesT;
 services: ServicesPricesT;
}
export interface CompanyMaterialPricesT {
 gloss: GlossPricesT;
 semiGloss: SemiGlossPricesT;
 board: BoardPricesT;
}
export interface CustomerMaterialPricesT {
 gloss: GlossPricesT;
 semiGloss: CustomerMaterialSemiGlossT;
 paintHandle: number;
}
export interface GlossPricesT {
 oneSide: number;
 bothSides: number;
 oneGlossSecondSemigloss: number;
}
export interface SemiGlossPricesT {
 oneSide: number;
 bothSides: number;
 milledElement: number;
 milledElementBothSides: number;
}
export interface CustomerMaterialSemiGlossT extends SemiGlossPricesT {
 mordant: number;
 veneerColorless: number;
}

export interface BoardPricesT {
 3: number;
 6: number;
 8: number;
 10: number;
 12: number;
 16: number;
 18: number;
 19: number;
 22: number;
 25: number;
 28: number;
 30: number;
 38: number;
}
export interface ServicesPricesT {
 manHour: number;
 chamfering: number;
 backMilling: number;
 milledHandle: number;
 milledPartHandle: number;
 millingHandle: number;
 zobalHandle: number;
 hingeHole: number;
}

// CONTACT
export interface ContactT {
 companyName: string;
 NIP: string;
 REGON: string;
 webPages: WebPageT[];
 emails: EmailT[];
 phones: PhoneT[];
 addresses: AddressT[];
 bankAccounts: BankAccountT[];
}
export interface AddressT {
 name: string;
 postcode: string;
 city: string;
 street: string;
 description: string;
}
export interface BankAccountT {
 name: string;
 bankName: string;
 accountNumber: string;
}
export interface WebPageT {
 name: string;
 webPage: string;
}
export interface EmailT {
 name: string;
 email: string;
}
export interface PhoneT {
 name: string;
 number: string;
}

export type ContactItemsT =
 | AddressT
 | BankAccountT
 | WebPageT
 | EmailT
 | PhoneT;
export type ContactKeysT =
 | 'emails'
 | 'webPages'
 | 'phones'
 | 'addresses'
 | 'bankAccounts';
