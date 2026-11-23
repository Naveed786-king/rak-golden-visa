// Brand of the client dashboard (the Abu Dhabi Golden Visa dashboard design, run for RAK Golden Visa).
export const DEFAULT_BRAND: string = 'Abu Dhabi Golden Visa';
export const BRAND_NAME: string = 'RAK Golden Visa';
export const BRAND_CODE = 'RAK';
export const BRAND_PX = 'rakgv';
export const BRAND_DIR = '/brand';
export const brandText = (s: string) => s.split(DEFAULT_BRAND).join(BRAND_NAME);
