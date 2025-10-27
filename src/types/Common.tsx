export type MenuItem = {
  id: number,
  name: string,
  price: string,
  typeId: number,
  type: {
    id: number;
    name: string;
  }
}

export type OrderItem = {
  id: number,
  name: string,
  price: string,
  typeId: number,
  type: {
    id: number;
    name: string;
  }
  quantity: number;
}
