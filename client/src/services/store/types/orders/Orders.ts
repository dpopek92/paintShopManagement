export interface OrderT {
 type: OrderTypeT;
 date: Date;
 finishDate: Date;
 pickUpDate?: Date;
 user: string;
 author: string;
 number: string;
 name?: string;
 comments?: string;
 productionComments?: ProductionCommentT[] | [];
 status: OrderStatusT;
 color: string;
 paintType: OrderPaintTypeT;
 paintStyle: OrderPaintStyleT;
 millingSymbol?: string;
 customMilling?: CustomMillingT;
 handleSymbol1?: HandleT;
 handleSymbol2?: HandleT;
 glassCaseSymbol?: string;
 veneerSymbol?: string;
 elements: number;
 pickedUpElements?: number;
 isReadyToPickUp: boolean;
 surfacePL?: number;
 surfacePP?: number;
 surfaceCNC?: number;
 milledHandle?: number;
 backMilling?: number;
 chamfering?: number;
 hingeHoles?: number;
 milledPartHandle?: number;
 price: number;
 isPaid: boolean;
 isMailToCustomer: number;
 paintProducer: string;
 baseProducer: string;
 isPaintOrdered: boolean;
 priority: boolean;
 reasonOfComplaint?: ReasonOfComplaintT;
 updateHistory?: UpdateHistoryItemT[] | [];
 manHours?: ManHoursT;
 items: OrderItemT[] | [];
 //  productionHistory:
}

export interface OrderItemT {
 type: OrderItemTypeT;
 height: number;
 h1P: OrderItemRightSideEdgeT;
 h2P: OrderItemRightSideEdgeT;
 h1L: OrderItemLeftSideEdgeT;
 h2L: OrderItemLeftSideEdgeT;
 hLPaintedEdge: boolean;
 width: number;
 w1P: OrderItemRightSideEdgeT;
 w2P: OrderItemRightSideEdgeT;
 w1L: OrderItemLeftSideEdgeT;
 w2L: OrderItemLeftSideEdgeT;
 wLPaintedEdge: boolean;
 paintRight: boolean;
 paintLeft: boolean;
 surfacePL?: number;
 surfacePP?: number;
 milledHandle?: number;
 thickness: OrderItemThicknessT;
 quantity: number;
 comments: string;
 includedToPrice: boolean;
 image?: OrderItemImageT;
}
export interface OrderItemImageT {
 path: string;
 file: File;
}
export interface ManHoursT {
 hours: number;
 price: number;
}
export interface CustomMillingT {
 path: string;
 file: File;
}
export interface ProductionCommentT {
 date: Date;
 user: string;
 comment: string;
}
export interface UpdateHistoryItemT {
 user: string;
 date: Date;
 key: string;
 description: string;
}

export type OrderItemThicknessT =
 | 3
 | 6
 | 8
 | 10
 | 12
 | 16
 | 18
 | 19
 | 22
 | 25
 | 28
 | 30
 | 38;
export type OrderItemRightSideEdgeT = 'r1' | 'r2' | '-' | 'gierunek' | HandleT;
export type OrderItemLeftSideEdgeT =
 | 'r1'
 | 'r2'
 | '-'
 | '2 otw.'
 | '3 otw.'
 | '4 otw.'
 | '5 otw.'
 | '6 otw.'
 | '7 otw.'
 | '8 otw.'
 | 'felc'
 | 'nut'
 | 'gierunek';
export type OrderItemTypeT = 'gładki' | 'frez' | 'witryna';
export type OrderTypeT =
 | 'nowe'
 | 'reklamacja'
 | 'poprawa'
 | 'materiał klienta'
 | 'domówienie';
export type HandleT = 'uk' | 'up' | 'up45' | 'uk45' | 'p45' | 'uc';
export type OrderStatusT =
 | 'wysłane'
 | 'surówka'
 | 'podkład'
 | 'szlifiernia'
 | 'lakiernia'
 | 'polernia'
 | 'pakowanie'
 | 'zakończone'
 | 'odebrane';
// export type OrderStatusT = 'wysłane'|'produckja'|'zakończone'|'odebrane'
export type OrderPaintStyleT =
 | 'jednostronne'
 | 'dwustronne'
 | 'p. połysk/l. półmat';
export type OrderPaintTypeT = 'mat' | 'półmat' | 'połysk';
export type ReasonOfComplaintT =
 | 'paproch'
 | 'uszkodzenie mechaniczne'
 | 'uszkodzony laminat'
 | 'zaciek'
 | 'błąd lakierniczy'
 | 'przetarcie'
 | 'inny';

// export interface ProductionHistoryItemT{
//     users:
//     position:
//     date:
//     time:
//     description:
// }
