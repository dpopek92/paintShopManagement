import { RealizationDatesT } from 'services/store/types/settings/Settings';
import { OrderPaintTypeT } from 'services/store/types/orders/Orders';

export const getOrderFinishDate = (
 realizationDates: RealizationDatesT,
 paintType: OrderPaintTypeT,
 veneerSymbol: boolean,
 millingSymbol: boolean,
) => {
 let term = realizationDates.semiGloss;
 if (millingSymbol) term = realizationDates.milling;
 else if (veneerSymbol) term = realizationDates.veneer;
 else if (paintType === 'połysk') term = realizationDates.gloss;

 const newDate = new Date();
 const finishDate = new Date(newDate.setDate(newDate.getDate() + term));
 return finishDate;
};
