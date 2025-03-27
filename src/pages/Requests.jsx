import { useEffect, useState } from "react";
import { rentalRequestsCollection } from "../firebase/config";
import { getDocs } from "firebase/firestore";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getDocs(rentalRequestsCollection);
      setRequests(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Rental & Exchange Requests</h2>
      {requests.map((req) => (
        <div key={req.id} className="border p-3 my-2">
          <p>Request from: {req.fromUser}</p>
          <p>Product: {req.productId}</p>
          <p>Type: {req.requestType}</p>
          {req.exchangeOffer && <p>Exchange Offer: {req.exchangeOffer}</p>}
          <button className="bg-green-500 px-2 py-1 rounded">Accept</button>
          <button className="bg-red-500 px-2 py-1 rounded ml-2">Reject</button>
        </div>
      ))}
    </div>
  );
};
export default Requests;
