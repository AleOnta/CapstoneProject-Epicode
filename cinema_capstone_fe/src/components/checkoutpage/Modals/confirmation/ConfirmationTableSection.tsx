import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";

export const ConfirmationTableSection = () => {
  const store = useSelector((state: RootState) => state);

  const determinePrice = (priceId: string) => {
    switch (priceId) {
      case "price_1NArYmIBuKJCZStF7phyinwz": {
        return 7.5;
      }
      case "price_1NArZwIBuKJCZStF2JFdiB1J": {
        return 7.5;
      }
      case "price_1NAracIBuKJCZStFRyyt96J1": {
        return 8.2;
      }
      default: {
        return 0.0;
      }
    }
  };

  return (
    <>
      <h4 className="modal-section mt-3">Recap</h4>
      <Table
        striped
        bordered
        hover
        variant="dark"
        className="recap-table-container"
      >
        <thead>
          <tr>
            <th className="d-none d-sm-block">Type</th>
            <th>Article</th>
            <th>Quantity</th>
            <th>Price </th>
            <th>User</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="d-none d-sm-block">Purchase</td>
            <td>
              Seats [
              {store.checkout.pickedSeats.map(
                (el, index) =>
                  el +
                  (index !== store.checkout.pickedSeats.length - 1 ? ", " : ".")
              )}
              ]
            </td>
            <td>{store.checkout.pickedSeats.length}</td>
            <td>
              €{" "}
              {store.checkout.pickedProgram?.price &&
                determinePrice(store.checkout.pickedProgram.price).toFixed(1)}
              0
            </td>
            <td>{store.user.logged_in?.username}</td>
            <td>
              €{" "}
              {store.checkout.pickedProgram?.price &&
                (
                  determinePrice(store.checkout.pickedProgram.price) *
                  store.checkout.pickedSeats.length
                ).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
