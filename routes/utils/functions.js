// *
const checkPermission = (permissions, userPermission) => {
  return permissions.includes(userPermission);
};

// *
const checkPermissionToGetOrder = (
  permissions,
  userPermission,
  user,
  subordinates,
  orderOwner
) => {
  if (checkPermission(permissions, userPermission)) return true;
  if (user._id.toString() === orderOwner._id.toString()) return true;
  if (subordinates.includes(orderOwner._id.toString())) return true;
  return false;
};

// *
const getYearsFromArray = async arr => {
  const years = [];
  arr.forEach(item => {
    if (!years.includes(item.year)) {
      years.push(item.year);
    }
  });
  return years;
};

module.exports = {
  checkPermission,
  checkPermissionToGetOrder,
  getYearsFromArray
};
