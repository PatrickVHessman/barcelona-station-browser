import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
// import icon from '../img/marker-icon.png';
import redIcon from '../img/marker-red.png';
import Select from 'react-select'

// const GET_STATIONS = gql`{
//   metroStations(first: 20) {
//     edges {
//       node {
//         id
//         name
//         coordinates {
//           latitude
//           longitude
//         }
//       }
//     }
//   }
//   bikeStations(first: 20) {
//     edges {
//       node {
//         id
//         name
//         coordinates {
//           latitude
//           longitude
//         }
//       }
//     }
//   }
// }`;

const GET_STATIONS = gql`{
  bikeStations(first: 100) {
    edges {
      node {
        id
        name
        coordinates {
          latitude
          longitude
        }
      }
    }
  }
}`;

const customStyles = {
  option: () => ({
    zIndex: "1001",
    textAlign: "left",

  })
}

const StationList = () => {  
    // const [selectedMetros, selectMetros] = useState([]);
    const [selectedBikes, selectBikes] = useState([]);
    // const [selectedDataSets, selectDataSets] = useState([]);
    const { loading, error, data } = useQuery(GET_STATIONS);
    // const [customMetroIcon, setCustomMetroIcon] = useState(icon);
    const [customBikeIcon, setCustomBikeIcon] = useState(redIcon);

    // const dataSets = [{value: "bike", label: "Bike Stations"},
    //                 {value: "metro", label: "Metro Stations"}];

  // const handleDatasetChange = (e) => {
  //   selectDataSets(e);
  // }

  // const handleMetroChange = (e) => {
  //   selectMetros(e);
  // }

  const handleBikeChange = (e) => {
    selectBikes(e);
  }

  // const metroFileSelect = (event) => {
  //   const file = URL.createObjectURL(event.target.files[0]);
  //   setCustomMetroIcon(file);
	// };

  const bikeFileSelect = (event) => {
    const file = URL.createObjectURL(event.target.files[0]);
    setCustomBikeIcon(file);
	};

  const optionsArr = (arr) => {
    const newArr = arr.map((item, index) => {
      const label = item.node.name.toString();
      return {value: index, label: label, name: label}
    });
    return newArr;
  }

  // const MetroMarkers = () => {
  //   if (selectedDataSets.some(item => item.value === "metro")) {
  //       if (selectedMetros[0] !== undefined) {
  //     return <div>{
  //       selectedMetros.map((item, index) => (
          // <Marker key={index} position={[data.metroStations.edges[item.value].node.coordinates.latitude, data.metroStations.edges[item.value].node.coordinates.longitude]} icon={leaflet.icon({iconUrl: customBikeIcon, iconSize: [20, "auto"]})}>

  //     <Marker key={index} position={[data.bikeStations.edges[item.value].node.coordinates.latitude, data.bikeStations.edges[item.value].node.coordinates.longitude]} icon={leaflet.icon({iconUrl: customMetroIcon, iconSize: [20, "auto"]})}>
  //   <Popup>
  //     {item.name}
  //   </Popup>
  // </Marker>
  //   ))
  //   }
  //   </div>
  //   }
  //   else {
  //     return <div />
  //   }
  // }
  // else {
  //     return <div />
  //   }
  // }

  const BikeMarkers = () => {
        if (selectedBikes[0] !== undefined) {
          
      return <div>{
        selectedBikes.map((item, index) => (
      <Marker key={index} position={[data.bikeStations.edges[item.value].node.coordinates.latitude, data.bikeStations.edges[item.value].node.coordinates.longitude]} icon={leaflet.icon({iconUrl: customBikeIcon, iconSize: [20, "auto"]})}>

<Popup>
      {item.name}
    </Popup>
  </Marker>
    ))
    }
    </div>
    }
    else {
      return <div />
    }

  }

  // const MetroControls = () => {
  //   if (selectedDataSets.some(item => item.value === "metro")) {
  //     return (<div>
  //       <h3>Select a Metro Station</h3>
  //     <Select options={optionsArr(data.metroStations.edges)}  
  //     className="basic-multi-select" 
  //     classNamePrefix="select" 
  //     isMulti styles={customStyles} 
  //     width="100%" 
  //     value={selectedMetros} 
  //     onChange={handleMetroChange} />
      
  //     <div style={{marginBottom: "1rem"}}>
  //       <label for="file" style={{fontWeight: "bold"}}>Upload a Custom Marker Icon</label>
  //       {" | "}
  //     <input type="file" name="file" onChange={metroFileSelect} />
  //     </div>
  //     </div>)
  //   }
  //   else {
  //     return null;
  //   }
  // }

  const BikeControls = () => {
      return (<div>
        <h3>Select a Bike Station</h3>
      <Select options={optionsArr(data.bikeStations.edges)}  
      className="basic-multi-select" 
      classNamePrefix="select" 
      isMulti styles={customStyles} 
      width="100%" 
      value={selectedBikes} 
      onChange={handleBikeChange} />
      
      <div style={{marginBottom: "1rem"}}>
        <label htmlFor="file" style={{fontWeight: "bold"}}>Upload a Custom Marker Icon</label>
        {" | "}
      <input type="file" name="file" onChange={bikeFileSelect} />
      </div>
      </div>)
  }

     if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>An error occured!</p>};
  return (
    <div>
      {/* <h3>Select a Data Set</h3>
      <Select options={dataSets}  
      className="basic-multi-select" 
      classNamePrefix="select" 
      isMulti styles={customStyles} 
      width="400px" 
      value={selectedDataSets} 
      onChange={handleDatasetChange} /> */}


      <div >
      {/* <MetroControls /> */}
      <BikeControls />
      </div>
<MapContainer center={[41.403716,2.203371]} zoom={11} scrollWheelZoom={false} style={{ height: "50vh", width: "50vw", margin: "auto" }}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {/* <MetroMarkers /> */}
  <BikeMarkers />
  
</MapContainer>
</div>
  );
}

export default StationList;