const ItemToStats = (items, newItems) => {
 const itemsToUpdateStats = [
  { type: "Gładki", surfaceLeft: 0 },
  { type: "Gładki", surfaceRight: 0 },
  { type: "Frez", surfaceLeft: 0 },
  { type: "Frez", surfaceRight: 0 }
 ];

 newItems.forEach((item, index) => {
  if (!items[index]) {
   console.log("nowy element");
   if (item.type === "Gładki") {
    if (item.surfaceRight) {
     itemsToUpdateStats[1].surfaceRight += item.surfaceRight;
    } else if (item.surfaceLeft) {
     itemsToUpdateStats[0].surfaceLeft += item.surfaceLeft;
    }
   } else {
    if (item.surfaceRight) {
     itemsToUpdateStats[3].surfaceRight += item.surfaceRight;
    } else if (item.surfaceLeft) {
     itemsToUpdateStats[2].surfaceLeft += item.surfaceLeft;
    }
   }
   return;
  }
  if (
   item.type === items[index].type &&
   item.quantity == items[index].quantity &&
   item.height == items[index].height &&
   item.width == items[index].width
  ) {
   return;
  } else {
   if (item.surfaceRight && items[index].surfaceRight) {
    const difference = item.surfaceRight - items[index].surfaceRight;
    if (item.type === "Gładki") {
     itemsToUpdateStats[1].surfaceRight += difference;
    } else {
     itemsToUpdateStats[3].surfaceRight += difference;
    }
   } else if (item.surfaceLeft && items[index].surfaceLeft) {
    const difference = item.surfaceLeft - items[index].surfaceLeft;
    if (item.type === "Gładki") {
     itemsToUpdateStats[0].surfaceLeft += difference;
    } else {
     itemsToUpdateStats[2].surfaceLeft += difference;
    }
   }
  }
 });

 if (items.length > newItems.length) {
  const difference = items.length - newItems.length;
  for (let i = items.length - 1; i > items.length - 1 - difference; i--) {
   if (items[i].type === "Gładki") {
    if (items[i].surfaceRight) {
     itemsToUpdateStats[1].surfaceRight -= items[i].surfaceRight;
    } else if (items[i].surfaceLeft) {
     itemsToUpdateStats[0].surfaceLeft -= items[i].surfaceLeft;
    }
   } else {
    if (items[i].surfaceRight) {
     itemsToUpdateStats[3].surfaceRight -= items[i].surfaceRight;
    } else if (items[i].surfaceLeft) {
     itemsToUpdateStats[2].surfaceLeft -= items[i].surfaceLeft;
    }
   }
  }
 }

 return itemsToUpdateStats;
};

module.exports = ItemToStats;

//sprawdzić czy statystyki się zbierają i pomyśleć o ich wyświetlaniu.
