export const getPriorityId = (label, items) => {
  const priorityItem = items.find((item) => item.label === label);
  return priorityItem ? priorityItem.id : null;
};
