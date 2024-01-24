export const isActiveLink = (index: number) => {
  switch (index) {
    case 0:
      return "create_order";
    case 1:
      return "";
    case 2:
      return "my_orders";
  }
};
