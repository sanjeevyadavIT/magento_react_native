// eslint-disable-next-line import/prefer-default-export
export const parseOrderDetail = _order => {
  const order = { ..._order };
  const { items } = order;
  const simpleItems = items.filter(i => i.product_type === 'simple');
  const simpleItemsWithPriceAndName = simpleItems.map(_simpleItem => {
    const simpleItem = { ..._simpleItem };
    if (simpleItem.parent_item) {
      simpleItem.price = simpleItem.parent_item.price;
      simpleItem.row_total = simpleItem.parent_item.row_total;
      simpleItem.name = simpleItem.parent_item.name || simpleItem.name;
    }
    return simpleItem;
  });
  order.items = simpleItemsWithPriceAndName;
  return order;
};
