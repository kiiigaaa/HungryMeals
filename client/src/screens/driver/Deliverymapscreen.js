import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import axios from "axios";
import { useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 0,
  lng: 0,
};

const columns = [
  { key: "orderId", title: "Order ID" },
  { key: "customerName", title: "Customer Name" },
  { key: "driverName", title: "Driver Name" },
  { key: "amount", title: "Amount" },
  { key: "isdelivered", title: "Is Delivered" },
];

const MapScreen = () => {
  const userstate = useSelector((state) => state.driverloginReducer);
  const { currentDriver } = userstate;

  const [coordinates, setCoordinates] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showDelivered, setShowDelivered] = useState(false);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    axios
      .get("/api/delivery/getalldeliveries")
      .then((res) => {
        const allDeliveries = res.data;
        const deliveredDeliveries = allDeliveries.filter(
          (delivery) => delivery.driverName === currentDriver.name
        );

        // Extracting coordinates for the current driver
        const coordinates = deliveredDeliveries.map(
          (delivery) => delivery.coordinates
        );

        setCoordinates(coordinates);
        console.log("Coordinates:", coordinates);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
              console.log(error);
            }
          );
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const getMapZoom = () => {
    if (coordinates.length === 0) {
      return 10; // Default zoom value if no coordinates are available
    }
    return 10; // Adjust the zoom level according to your needs
  };

  const handleMarkDelivered = (delivery) => {
    axios
      .put(`/api/delivery/status/${delivery._id}`, {
        isdelivered: true,
      })
      .then((res) => {
        // Remove the delivered delivery from the list
        const updatedDeliveries = deliveries.filter(
          (item) => item._id !== delivery._id
        );
        setDeliveries(updatedDeliveries);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <h1>Map</h1>
      <LoadScript googleMapsApiKey="AIzaSyCM-k7pe6dYYfkRlKBvwnYXCebq8ciexwM">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            coordinates.length > 0
              ? {
                  lat: coordinates[0].latitude,
                  lng: coordinates[0].longitude,
                }
              : center
          }
          zoom={getMapZoom()}
        >
          {coordinates
            .filter(
              (coordinate) =>
                coordinate &&
                typeof coordinate.latitude === "number" &&
                typeof coordinate.longitude === "number"
            )
            .map((coordinate, index) => {
              const position = {
                lat: coordinate.latitude,
                lng: coordinate.longitude,
              };

              return <Marker key={index} position={position} />;
            })}

          {currentLocation && (
            <Marker
              position={currentLocation}
              icon="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            />
          )}
        </GoogleMap>
      </LoadScript>

      <Table striped bordered hover>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {showDelivered
            ? deliveries
                .filter((delivery) => delivery.isdelivered)
                .map((delivery) => (
                  <tr key={delivery._id}>
                    <td>{delivery.orderId}</td>
                    <td>{delivery.customerName}</td>
                    <td>{delivery.driverName}</td>
                    <td>{delivery.amount}</td>
                    <td>{String(delivery.isdelivered)}</td>
                    <td>
                      {String(delivery.isdelivered)}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleMarkDelivered(delivery)}
                      >
                        Mark Delivered
                      </Button>
                    </td>
                  </tr>
                ))
            : null}
        </tbody>
      </Table>
      <Button
        variant="primary"
        onClick={() => setShowDelivered(!showDelivered)}
      >
        {showDelivered ? "Hide Deliveries" : "Show Deliveries"}
      </Button>
    </div>
  );
};

export default MapScreen;
